import { describe, it, expect, beforeEach, vi } from 'vitest';
import { createHash, generateKeyPairSync } from 'crypto';
import jwt from 'jsonwebtoken';
import { resetAppleKeyCache, verifyAppleIdentityToken } from '../../src/modules/auth/identity/provider-tokens';

const { privateKey, publicKey } = generateKeyPairSync('rsa', { modulusLength: 2048 });
const jwk = { ...publicKey.export({ format: 'jwk' }), kid: 'k1', alg: 'RS256', use: 'sig' };
const RAW_NONCE = 'raw-nonce-0123456789abcdef';

const keysFetch = vi.fn(async () => new Response(JSON.stringify({ keys: [jwk] }), { status: 200 }));

function appleToken(claims: Record<string, unknown> = {}, kid = 'k1') {
  return jwt.sign(
    {
      sub: 'apple-sub',
      email: 'u@privaterelay.appleid.com',
      email_verified: 'true',
      nonce: createHash('sha256').update(RAW_NONCE).digest('hex'),
      ...claims,
    },
    privateKey,
    { algorithm: 'RS256', keyid: kid, issuer: 'https://appleid.apple.com', audience: 'com.petroll.app', expiresIn: '5m' },
  );
}

describe('verifyAppleIdentityToken', () => {
  beforeEach(() => {
    resetAppleKeyCache();
    keysFetch.mockClear();
  });

  it('accepts a token signed by Apple for this app with the matching nonce', async () => {
    await expect(verifyAppleIdentityToken(appleToken(), RAW_NONCE, ['com.petroll.app'], keysFetch)).resolves.toEqual({
      subject: 'apple-sub',
      email: 'u@privaterelay.appleid.com',
      emailVerified: true,
    });
  });

  it('caches Apple keys between sign-ins', async () => {
    await verifyAppleIdentityToken(appleToken(), RAW_NONCE, ['com.petroll.app'], keysFetch);
    await verifyAppleIdentityToken(appleToken(), RAW_NONCE, ['com.petroll.app'], keysFetch);
    expect(keysFetch).toHaveBeenCalledTimes(1);
  });

  it('rejects a replayed token whose nonce does not match', async () => {
    await expect(verifyAppleIdentityToken(appleToken(), 'another-raw-nonce-000', ['com.petroll.app'], keysFetch)).rejects.toMatchObject({
      statusCode: 401,
    });
  });

  it('rejects a token issued for another app', async () => {
    await expect(verifyAppleIdentityToken(appleToken(), RAW_NONCE, ['com.other.app'], keysFetch)).rejects.toMatchObject({
      statusCode: 401,
    });
  });

  it('rejects a token signed with a key Apple does not publish', async () => {
    await expect(verifyAppleIdentityToken(appleToken({}, 'unknown'), RAW_NONCE, ['com.petroll.app'], keysFetch)).rejects.toMatchObject({
      statusCode: 401,
    });
    // An unknown kid triggers one refetch, in case Apple rotated its keys.
    expect(keysFetch).toHaveBeenCalledTimes(1);
  });

  it('rejects an expired token', async () => {
    const expired = jwt.sign({ sub: 's', nonce: createHash('sha256').update(RAW_NONCE).digest('hex'), exp: 1 }, privateKey, {
      algorithm: 'RS256',
      keyid: 'k1',
      issuer: 'https://appleid.apple.com',
      audience: 'com.petroll.app',
    });
    await expect(verifyAppleIdentityToken(expired, RAW_NONCE, ['com.petroll.app'], keysFetch)).rejects.toMatchObject({ statusCode: 401 });
  });

  it('fails loudly when no audience is configured', async () => {
    await expect(verifyAppleIdentityToken(appleToken(), RAW_NONCE, [], keysFetch)).rejects.toThrow(/APPLE_CLIENT_IDS/);
  });
});
