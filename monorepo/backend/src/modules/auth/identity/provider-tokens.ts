import { createHash, createPublicKey, type JsonWebKey } from 'crypto';
import jwt from 'jsonwebtoken';
import { OAuth2Client } from 'google-auth-library';

export interface VerifiedIdentity {
  /** The provider's stable account id (`sub`). */
  subject: string;
  email?: string;
  emailVerified: boolean;
}

const unauthorized = (message: string) => Object.assign(new Error(message), { statusCode: 401 });

const google = new OAuth2Client();

/** Google ID token from google_sign_in; audiences are the app's web and iOS OAuth client ids. */
export async function verifyGoogleIdToken(idToken: string, audiences: string[]): Promise<VerifiedIdentity> {
  if (audiences.length === 0) throw new Error('GOOGLE_CLIENT_IDS is not configured');
  let payload;
  try {
    payload = (await google.verifyIdToken({ idToken, audience: audiences })).getPayload();
  } catch {
    throw unauthorized('Invalid Google sign-in');
  }
  if (!payload?.sub) throw unauthorized('Invalid Google sign-in');
  return { subject: payload.sub, email: payload.email, emailVerified: payload.email_verified === true };
}

const APPLE_ISSUER = 'https://appleid.apple.com';
const APPLE_KEYS_URL = 'https://appleid.apple.com/auth/keys';
const APPLE_KEYS_TTL_MS = 60 * 60 * 1000;

type AppleKey = JsonWebKey & { kid: string };
let appleKeys: { keys: AppleKey[]; fetchedAt: number } | undefined;

async function appleKey(kid: string, fetchKeys: typeof fetch): Promise<AppleKey | undefined> {
  const fresh = appleKeys && Date.now() - appleKeys.fetchedAt < APPLE_KEYS_TTL_MS;
  let key = fresh ? appleKeys!.keys.find((k) => k.kid === kid) : undefined;
  // Apple rotates keys; an unknown kid triggers one refetch.
  if (!key) {
    const res = await fetchKeys(APPLE_KEYS_URL);
    if (!res.ok) throw new Error(`Apple keys request failed: ${res.status}`);
    appleKeys = { keys: ((await res.json()) as { keys: AppleKey[] }).keys, fetchedAt: Date.now() };
    key = appleKeys.keys.find((k) => k.kid === kid);
  }
  return key;
}

/**
 * Apple identity token from sign_in_with_apple. The app sends the raw nonce it generated; the token
 * must carry its SHA-256, which stops a captured token from being replayed.
 */
export async function verifyAppleIdentityToken(
  identityToken: string,
  rawNonce: string,
  audiences: string[],
  fetchKeys: typeof fetch = fetch,
): Promise<VerifiedIdentity> {
  if (audiences.length === 0) throw new Error('APPLE_CLIENT_IDS is not configured');
  const header = jwt.decode(identityToken, { complete: true })?.header;
  if (!header?.kid) throw unauthorized('Invalid Apple sign-in');
  const jwk = await appleKey(header.kid, fetchKeys);
  if (!jwk) throw unauthorized('Invalid Apple sign-in');

  let claims: jwt.JwtPayload;
  try {
    claims = jwt.verify(identityToken, createPublicKey({ key: jwk, format: 'jwk' }), {
      algorithms: ['RS256'],
      issuer: APPLE_ISSUER,
      audience: audiences as [string, ...string[]],
    }) as jwt.JwtPayload;
  } catch {
    throw unauthorized('Invalid Apple sign-in');
  }
  const expectedNonce = createHash('sha256').update(rawNonce).digest('hex');
  if (!claims.sub || claims.nonce !== expectedNonce) throw unauthorized('Invalid Apple sign-in');
  return {
    subject: claims.sub,
    email: typeof claims.email === 'string' ? claims.email : undefined,
    // Apple sends booleans as strings in some token versions.
    emailVerified: claims.email_verified === true || claims.email_verified === 'true',
  };
}

/** Test hook: forget cached Apple keys. */
export function resetAppleKeyCache(): void {
  appleKeys = undefined;
}
