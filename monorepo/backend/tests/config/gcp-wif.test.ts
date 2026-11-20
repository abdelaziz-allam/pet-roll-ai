import { describe, it, expect } from 'vitest';
import { readFileSync } from 'fs';
import { buildWifCredential, federatedFirebaseCredential, prepareWifCredentialFile } from '../../src/config/gcp-wif';

const PROVIDER = 'projects/123/locations/global/workloadIdentityPools/azure/providers/petfolioo-stage';
const SA = 'petfolioo-azure-stage@petfolioo-stage.iam.gserviceaccount.com';

describe('buildWifCredential', () => {
  it('asks the Container Apps identity endpoint for a token and impersonates the service account', () => {
    const cred: any = buildWifCredential({
      provider: PROVIDER,
      serviceAccount: SA,
      tokenResource: 'https://management.azure.com/',
      identityEndpoint: 'http://localhost:42356/msi/token',
      identityHeader: 'hdr',
      azureClientId: 'client-1',
    });

    expect(cred.type).toBe('external_account');
    expect(cred.audience).toBe(`//iam.googleapis.com/${PROVIDER}`);
    expect(cred.service_account_impersonation_url).toContain(`${SA}:generateAccessToken`);
    const url = new URL(cred.credential_source.url);
    expect(url.origin + url.pathname).toBe('http://localhost:42356/msi/token');
    expect(url.searchParams.get('resource')).toBe('https://management.azure.com/');
    expect(url.searchParams.get('client_id')).toBe('client-1');
    expect(url.searchParams.get('api-version')).toBe('2019-08-01');
    expect(cred.credential_source.headers).toEqual({ 'X-IDENTITY-HEADER': 'hdr' });
    expect(cred.credential_source.format).toEqual({ type: 'json', subject_token_field_name: 'access_token' });
  });

  it('accepts a provider already in audience form', () => {
    const cred: any = buildWifCredential({
      provider: `//iam.googleapis.com/${PROVIDER}`, serviceAccount: SA, tokenResource: 'r',
      identityEndpoint: 'http://e', identityHeader: 'h',
    });
    expect(cred.audience).toBe(`//iam.googleapis.com/${PROVIDER}`);
  });
});

describe('prepareWifCredentialFile', () => {
  it('does nothing when WIF is not configured, so GCP keeps its own credentials', () => {
    expect(prepareWifCredentialFile({})).toBeUndefined();
  });

  it('fails loudly when WIF is configured but no managed identity exists', () => {
    expect(() => prepareWifCredentialFile({ GCP_WIF_PROVIDER: PROVIDER, GCP_WIF_SERVICE_ACCOUNT: SA })).toThrow(/managed identity/);
  });

  it('writes the credential file Google libraries read', () => {
    const path = prepareWifCredentialFile({
      GCP_WIF_PROVIDER: PROVIDER, GCP_WIF_SERVICE_ACCOUNT: SA,
      IDENTITY_ENDPOINT: 'http://e', IDENTITY_HEADER: 'h', AZURE_CLIENT_ID: 'c',
    })!;
    expect(JSON.parse(readFileSync(path, 'utf8')).type).toBe('external_account');
  });
});

describe('federatedFirebaseCredential', () => {
  const fakeAuth = (token: string | null, expiresInMs: number) => ({
    getClient: async () => ({
      getAccessToken: async () => ({ token }),
      credentials: { expiry_date: Date.now() + expiresInMs },
    }),
  }) as any;

  it('hands Auth API calls the federated Google token', async () => {
    const base = { getAccessToken: async () => ({ access_token: 'metadata-server', expires_in: 1 }) };
    const cred = federatedFirebaseCredential(() => base, '/unused', fakeAuth('federated', 3_600_000));
    const token = await cred.getAccessToken();
    expect(token.access_token).toBe('federated');
    expect(token.expires_in).toBeGreaterThan(3590);
  });

  it('fails clearly when federation yields no token', async () => {
    const base = { getAccessToken: async () => ({ access_token: 'x', expires_in: 1 }) };
    const cred = federatedFirebaseCredential(() => base, '/unused', fakeAuth(null, 0));
    await expect(cred.getAccessToken()).rejects.toThrow(/no Google access token/);
  });

  // Regression: firebase-admin rejects an external_account credential file, and Firestore only
  // accepts application-default credentials; this checks both with the real library.
  it('is accepted by the real firebase-admin Firestore client', async () => {
    const admin = (await import('firebase-admin')).default;
    const saved = process.env.GOOGLE_APPLICATION_CREDENTIALS;
    delete process.env.GOOGLE_APPLICATION_CREDENTIALS;
    try {
      const credential = federatedFirebaseCredential(() => admin.credential.applicationDefault(), '/unused', fakeAuth('federated', 3_600_000));
      const app = admin.initializeApp({ projectId: 'petfolioo-test', credential }, `wif-${Date.now()}`);
      expect(() => app.firestore()).not.toThrow();
      expect((await credential.getAccessToken()).access_token).toBe('federated');
      await app.delete();
    } finally {
      if (saved) process.env.GOOGLE_APPLICATION_CREDENTIALS = saved;
    }
  });
});
