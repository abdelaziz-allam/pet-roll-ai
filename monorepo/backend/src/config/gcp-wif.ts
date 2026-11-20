import { writeFileSync } from 'fs';
import { tmpdir } from 'os';
import { join } from 'path';
import { GoogleAuth } from 'google-auth-library';

export interface WifSettings {
  provider: string;
  serviceAccount: string;
  tokenResource: string;
  identityEndpoint: string;
  identityHeader: string;
  azureClientId?: string;
}

/**
 * Builds a Google "external_account" credential that trades the Container
 * App's managed-identity token for Google access, so no Google key is stored
 * in Azure. Container Apps expose the identity through IDENTITY_ENDPOINT and
 * IDENTITY_HEADER rather than the VM metadata endpoint.
 */
export function buildWifCredential(s: WifSettings): Record<string, unknown> {
  const query = new URLSearchParams({ 'api-version': '2019-08-01', resource: s.tokenResource });
  if (s.azureClientId) query.set('client_id', s.azureClientId);
  return {
    type: 'external_account',
    audience: s.provider.startsWith('//') ? s.provider : `//iam.googleapis.com/${s.provider}`,
    subject_token_type: 'urn:ietf:params:oauth:token-type:jwt',
    token_url: 'https://sts.googleapis.com/v1/token',
    service_account_impersonation_url:
      `https://iamcredentials.googleapis.com/v1/projects/-/serviceAccounts/${s.serviceAccount}:generateAccessToken`,
    credential_source: {
      url: `${s.identityEndpoint}?${query.toString()}`,
      headers: { 'X-IDENTITY-HEADER': s.identityHeader },
      format: { type: 'json', subject_token_field_name: 'access_token' },
    },
  };
}

/**
 * When running on Azure with WIF configured, writes the credential file and
 * returns its path; otherwise returns undefined and Google's usual credential
 * lookup applies.
 */
export function prepareWifCredentialFile(env: NodeJS.ProcessEnv = process.env): string | undefined {
  const { GCP_WIF_PROVIDER, GCP_WIF_SERVICE_ACCOUNT, IDENTITY_ENDPOINT, IDENTITY_HEADER } = env;
  if (!GCP_WIF_PROVIDER || !GCP_WIF_SERVICE_ACCOUNT) return undefined;
  if (!IDENTITY_ENDPOINT || !IDENTITY_HEADER) {
    throw new Error('GCP_WIF_PROVIDER is set but no Azure managed identity is available');
  }
  const credential = buildWifCredential({
    provider: GCP_WIF_PROVIDER,
    serviceAccount: GCP_WIF_SERVICE_ACCOUNT,
    tokenResource: env.GCP_WIF_TOKEN_RESOURCE || 'https://management.azure.com/',
    identityEndpoint: IDENTITY_ENDPOINT,
    identityHeader: IDENTITY_HEADER,
    azureClientId: env.AZURE_CLIENT_ID,
  });
  const path = join(tmpdir(), 'gcp-wif-credential.json');
  writeFileSync(path, JSON.stringify(credential), { mode: 0o600 });
  return path;
}

const GOOGLE_SCOPES = [
  'https://www.googleapis.com/auth/cloud-platform',
  'https://www.googleapis.com/auth/firebase',
  'https://www.googleapis.com/auth/userinfo.email',
];

interface FirebaseCredential {
  getAccessToken(): Promise<{ access_token: string; expires_in: number }>;
}

/**
 * Returns a firebase-admin credential that signs Auth API calls with the federated token.
 *
 * firebase-admin cannot read an external_account file itself, and Firestore refuses any credential
 * that is not "application default". So the credential is the one applicationDefault() builds
 * (taken before GOOGLE_APPLICATION_CREDENTIALS points at the federation file), with only its token
 * source replaced; Firestore then authenticates through google-auth-library, which reads the
 * federation file natively.
 */
export function federatedFirebaseCredential<T extends FirebaseCredential>(
  applicationDefault: () => T,
  credentialFile: string,
  auth: Pick<GoogleAuth, 'getClient'> = new GoogleAuth({ keyFile: credentialFile, scopes: GOOGLE_SCOPES }),
): T {
  const credential = applicationDefault();
  credential.getAccessToken = async () => {
    const client = await auth.getClient();
    const { token } = await client.getAccessToken();
    if (!token) throw new Error('Workload Identity Federation returned no Google access token');
    const expiry = client.credentials.expiry_date ?? Date.now() + 3000 * 1000;
    return { access_token: token, expires_in: Math.max(0, Math.floor((expiry - Date.now()) / 1000)) };
  };
  return credential;
}
