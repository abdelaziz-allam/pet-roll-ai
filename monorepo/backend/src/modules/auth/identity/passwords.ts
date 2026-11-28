import { createCipheriv, randomBytes, scrypt as scryptCb, timingSafeEqual, type ScryptOptions } from 'crypto';

const scrypt = (password: string | Buffer, salt: Buffer, keylen: number, options: ScryptOptions) =>
  new Promise<Buffer>((resolve, reject) =>
    scryptCb(password, salt, keylen, options, (err, key) => (err ? reject(err) : resolve(key))),
  );

/**
 * Project-wide parameters of Firebase Auth's modified scrypt (Identity Toolkit
 * projects.config signIn.hashConfig). Every password hash exported from Firebase needs them.
 */
export interface FirebaseScryptParams {
  signerKey: string; // base64
  saltSeparator: string; // base64
  rounds: number;
  memoryCost: number;
}

/**
 * Firebase's modified scrypt: derive a key from the password and (salt + separator), then
 * AES-256-CTR encrypt the project's signer key with it. The result is the stored hash.
 * Reference implementation: github.com/firebase/scrypt.
 */
export async function verifyFirebaseScrypt(
  password: string,
  saltB64: string,
  hashB64: string,
  params: FirebaseScryptParams,
): Promise<boolean> {
  const salt = Buffer.concat([Buffer.from(saltB64, 'base64'), Buffer.from(params.saltSeparator, 'base64')]);
  const N = 2 ** params.memoryCost;
  const derived = await scrypt(password, salt, 64, { N, r: params.rounds, p: 1, maxmem: 256 * N * params.rounds });
  const cipher = createCipheriv('aes-256-ctr', derived.subarray(0, 32), Buffer.alloc(16, 0));
  const computed = Buffer.concat([cipher.update(Buffer.from(params.signerKey, 'base64')), cipher.final()]);
  const expected = Buffer.from(hashB64, 'base64');
  return computed.length === expected.length && timingSafeEqual(computed, expected);
}

// OWASP's scrypt minimum (N=2^17, r=8, p=1) needs 128 MiB per hash; that is too much for a 1 GiB
// replica under concurrent logins. N=2^15 keeps each hash at 32 MiB and still costs ~50 ms.
const N = 2 ** 15;
const R = 8;
const P = 1;
const KEY_LENGTH = 32;

/** Stored as scrypt$N$r$p$salt$hash (base64), so the parameters can be raised later per hash. */
export async function hashPassword(password: string): Promise<string> {
  const salt = randomBytes(16);
  const key = await scrypt(password, salt, KEY_LENGTH, { N, r: R, p: P, maxmem: 256 * N * R });
  return ['scrypt', N, R, P, salt.toString('base64'), key.toString('base64')].join('$');
}

export async function verifyPassword(password: string, stored: string): Promise<boolean> {
  const [algo, n, r, p, saltB64, keyB64] = stored.split('$');
  if (algo !== 'scrypt' || !saltB64 || !keyB64) return false;
  const expected = Buffer.from(keyB64, 'base64');
  const key = await scrypt(password, Buffer.from(saltB64, 'base64'), expected.length, {
    N: Number(n),
    r: Number(r),
    p: Number(p),
    maxmem: 256 * Number(n) * Number(r),
  });
  return timingSafeEqual(key, expected);
}

export function needsRehash(stored: string): boolean {
  const [algo, n, r, p] = stored.split('$');
  return algo !== 'scrypt' || Number(n) < N || Number(r) !== R || Number(p) !== P;
}
