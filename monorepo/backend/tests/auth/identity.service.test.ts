import { describe, it, expect, vi, beforeEach } from 'vitest';

const { store, DELETE, mocks } = vi.hoisted(() => {
  const store: Record<string, Record<string, any>> = {};
  const DELETE = Symbol('delete');
  const mocks = {
    login: vi.fn(async (uid: string, email: string) => ({ user: { id: uid, email }, accessToken: 'a', refreshToken: 'r' })),
    register: vi.fn(async (input: any, uid: string, email: string) => {
      store.users[uid] = { email, displayName: input.displayName };
      return { user: { id: uid, email }, accessToken: 'a', refreshToken: 'r' };
    }),
    google: vi.fn(),
    apple: vi.fn(),
    env: {
      GOOGLE_CLIENT_IDS: ['web-client'],
      APPLE_CLIENT_IDS: ['com.petroll.app'],
      FIREBASE_SCRYPT_PARAMS: JSON.stringify({
        signerKey: 'jxspr8Ki0RYycVU8zykbdLGjFQ3McFUH0uiiTvC8pVMXAn210wjLNmdZJzxUECKbm0QsEmYUSDzZvpjeJ9WmXA==',
        saltSeparator: 'Bw==',
        rounds: 8,
        memoryCost: 14,
      }),
    },
  };
  return { store, DELETE, mocks };
});

function docRef(collection: string, id: string) {
  const col = () => (store[collection] ??= {});
  return {
    id,
    get: async () => ({ exists: id in col(), id, data: () => (id in col() ? structuredClone(col()[id]) : undefined), ref: docRef(collection, id) }),
    set: async (data: any) => void (col()[id] = { ...data }),
    create: async (data: any) => {
      if (id in col()) throw Object.assign(new Error('exists'), { code: 6 });
      col()[id] = { ...data };
    },
    update: async (data: any) => {
      for (const [k, v] of Object.entries(data)) {
        if (v === DELETE) delete col()[id][k];
        else col()[id][k] = v;
      }
    },
    delete: async () => void delete col()[id],
  };
}

let autoId = 0;
vi.mock('../../src/config/firebase', () => ({
  db: {
    collection: (name: string) => {
      const query = (filters: Array<[string, any]>) => ({
        limit: () => query(filters),
        get: async () => {
          const docs = Object.entries(store[name] ?? {})
            .filter(([, d]) => filters.every(([f, v]) => d[f] === v))
            .map(([id]) => ({ id, data: () => store[name][id], ref: docRef(name, id) }));
          return { empty: docs.length === 0, docs };
        },
      });
      return {
        doc: (id?: string) => docRef(name, id ?? `auto-${++autoId}`),
        where: (f: string, _op: string, v: any) => query([[f, v]]),
      };
    },
    batch: () => {
      const ops: Array<() => Promise<void>> = [];
      return { delete: (ref: any) => ops.push(() => ref.delete()), commit: async () => { for (const op of ops) await op(); } };
    },
  },
  FieldValue: { serverTimestamp: () => 'TS', delete: () => DELETE },
}));
vi.mock('../../src/config/env', () => ({ env: mocks.env }));
vi.mock('../../src/modules/auth/auth.service', () => ({ authService: { login: mocks.login, register: mocks.register } }));
vi.mock('../../src/modules/auth/identity/provider-tokens', () => ({
  verifyGoogleIdToken: mocks.google,
  verifyAppleIdentityToken: mocks.apple,
}));

import { identityId, identityService, parseScryptParams } from '../../src/modules/auth/identity/identity.service';

describe('IdentityService', () => {
  beforeEach(() => {
    for (const k of Object.keys(store)) delete store[k];
    store.users = {};
    store.auth_identities = {};
    vi.clearAllMocks();
  });

  describe('password', () => {
    it('registers a new user, storing only a scrypt hash', async () => {
      const result = await identityService.registerWithPassword('New@Example.com ', 'correct horse', { displayName: 'New User' });
      expect(result.isNewUser).toBe(true);
      const identity = store.auth_identities[identityId('password', 'new@example.com')];
      expect(identity.uid).toBe(result.user.id);
      expect(identity.email).toBe('new@example.com');
      expect(identity.passwordHash).toMatch(/^scrypt\$32768\$8\$1\$/);
      expect(JSON.stringify(identity)).not.toContain('correct horse');
    });

    it('signs in with the password it registered, and rejects a wrong one with a generic 401', async () => {
      await identityService.registerWithPassword('a@b.co', 'correct horse', { displayName: 'Ann' });
      await expect(identityService.loginWithPassword('A@B.co', 'correct horse')).resolves.toMatchObject({ isNewUser: false });
      await expect(identityService.loginWithPassword('a@b.co', 'wrong')).rejects.toMatchObject({
        statusCode: 401,
        message: 'Invalid email or password',
      });
      await expect(identityService.loginWithPassword('nobody@b.co', 'x')).rejects.toMatchObject({ statusCode: 401 });
    });

    it('refuses a second registration for the same email', async () => {
      await identityService.registerWithPassword('a@b.co', 'correct horse', { displayName: 'Ann' });
      await expect(identityService.registerWithPassword('a@b.co', 'other pass', { displayName: 'Ann' })).rejects.toMatchObject({
        statusCode: 409,
      });
    });

    it('refuses to register an email that a Google or Apple account already uses', async () => {
      store.users.u1 = { email: 'g@b.co' };
      await expect(identityService.registerWithPassword('g@b.co', 'correct horse', { displayName: 'G' })).rejects.toMatchObject({
        statusCode: 409,
      });
    });

    it('checks a password imported from Firebase, then re-stores it with our own hash', async () => {
      // github.com/firebase/scrypt published example: password "user1password".
      const id = identityId('password', 'legacy@b.co');
      store.users['firebase-uid'] = { email: 'legacy@b.co' };
      store.auth_identities[id] = {
        uid: 'firebase-uid',
        provider: 'password',
        email: 'legacy@b.co',
        firebase: {
          salt: '42xEC+ixf3L2lw==',
          hash: 'lSrfV15cpx95/sZS2W9c9Kp6i/LVgQNDNC/qzrCnh1SAyZvqmZqAjTdn3aoItz+VHjoZilo78198JAdRuid5lQ==',
        },
      };
      await expect(identityService.loginWithPassword('legacy@b.co', 'not it')).rejects.toMatchObject({ statusCode: 401 });
      const result = await identityService.loginWithPassword('legacy@b.co', 'user1password');
      expect(result.user.id).toBe('firebase-uid');
      expect(store.auth_identities[id].firebase).toBeUndefined();
      expect(store.auth_identities[id].passwordHash).toMatch(/^scrypt\$/);
      await expect(identityService.loginWithPassword('legacy@b.co', 'user1password')).resolves.toMatchObject({ isNewUser: false });
    });

    it('creates the users document when an imported identity has none yet', async () => {
      await identityService.registerWithPassword('x@b.co', 'correct horse', { displayName: 'Xavier' });
      const uid = store.auth_identities[identityId('password', 'x@b.co')].uid;
      delete store.users[uid];
      const result = await identityService.loginWithPassword('x@b.co', 'correct horse');
      expect(result.isNewUser).toBe(true);
      // The email's local part is too short for a display name, so the generic one is used.
      expect(mocks.register).toHaveBeenLastCalledWith(expect.objectContaining({ displayName: 'PetFolioo user' }), uid, 'x@b.co');
    });
  });

  describe('Google and Apple', () => {
    it('signs in a known Google account without creating anything', async () => {
      store.auth_identities[identityId('google', 'g-sub')] = { uid: 'u-google', provider: 'google', email: 'g@b.co' };
      store.users['u-google'] = { email: 'g@b.co' };
      mocks.google.mockResolvedValue({ subject: 'g-sub', email: 'g@b.co', emailVerified: true });
      const result = await identityService.signInWithGoogle('token', {});
      expect(result).toMatchObject({ isNewUser: false, user: { id: 'u-google' } });
      expect(mocks.google).toHaveBeenCalledWith('token', ['web-client']);
    });

    it('links a new provider account to the user with the same verified email', async () => {
      store.users['existing'] = { email: 'same@b.co' };
      mocks.apple.mockResolvedValue({ subject: 'a-sub', email: 'Same@b.co', emailVerified: true });
      const result = await identityService.signInWithApple('token', 'raw-nonce-0123456789', {});
      expect(result.user.id).toBe('existing');
      expect(store.auth_identities[identityId('apple', 'a-sub')].uid).toBe('existing');
      expect(mocks.apple).toHaveBeenCalledWith('token', 'raw-nonce-0123456789', ['com.petroll.app']);
    });

    it('does not link on an unverified email; it creates a separate user', async () => {
      store.users['existing'] = { email: 'same@b.co' };
      mocks.google.mockResolvedValue({ subject: 'g2', email: 'same@b.co', emailVerified: false });
      const result = await identityService.signInWithGoogle('token', { displayName: 'Someone' });
      expect(result.user.id).not.toBe('existing');
      expect(result.isNewUser).toBe(true);
    });
  });

  it('removeAll deletes every sign-in method of a user', async () => {
    store.auth_identities.a = { uid: 'u1' };
    store.auth_identities.b = { uid: 'u1' };
    store.auth_identities.c = { uid: 'u2' };
    await identityService.removeAll('u1');
    expect(Object.keys(store.auth_identities)).toEqual(['c']);
  });

  it('treats missing or malformed scrypt parameters as not configured', () => {
    expect(parseScryptParams('PLACEHOLDER')).toBeNull();
    expect(parseScryptParams('{"signerKey":"x"}')).toBeNull();
    expect(parseScryptParams(undefined)).toBeNull();
    expect(parseScryptParams(mocks.env.FIREBASE_SCRYPT_PARAMS)).toMatchObject({ rounds: 8, memoryCost: 14 });
  });
});
