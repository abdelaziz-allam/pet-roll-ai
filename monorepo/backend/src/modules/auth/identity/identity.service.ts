import { db, FieldValue } from '../../../config/firebase';
import { env } from '../../../config/env';
import { authService } from '../auth.service';
import type { RegisterInput } from '../auth.schema';
import {
  FirebaseScryptParams,
  hashPassword,
  needsRehash,
  verifyFirebaseScrypt,
  verifyPassword,
} from './passwords';
import { verifyAppleIdentityToken, verifyGoogleIdToken, VerifiedIdentity } from './provider-tokens';
import { identityId, normalizeEmail, type Provider } from './identity-keys';

export { identityId, normalizeEmail, type Provider };

/**
 * Sign-in owned by the API. One `auth_identities` document per way a user can sign in, pointing at
 * the user's id (the `users` document id). Users imported from Firebase Auth keep their Firebase
 * uid, so everything they own stays linked.
 *
 *   password_<sha256(email)>  email + password; `passwordHash` (ours) or `firebase` (imported hash)
 *   google_<sub>              Google account
 *   apple_<sub>               Apple ID
 */


export interface IdentityRecord {
  uid: string;
  provider: Provider;
  email?: string;
  displayName?: string;
  passwordHash?: string;
  /** Imported from Firebase Auth; replaced by passwordHash on the first successful login. */
  firebase?: { hash: string; salt: string };
}

export type ProfileHints = Partial<RegisterInput>;

const identities = () => db.collection('auth_identities');


const invalidCredentials = () => Object.assign(new Error('Invalid email or password'), { statusCode: 401 });

/** FIREBASE_SCRYPT_PARAMS holds the Firebase project's hash config as JSON (Key Vault); null if unusable. */
export function parseScryptParams(raw: string | undefined): FirebaseScryptParams | null {
  try {
    const p = raw ? JSON.parse(raw) : null;
    if (p?.signerKey && p?.saltSeparator && Number.isInteger(p?.rounds) && Number.isInteger(p?.memoryCost)) return p;
  } catch {
    // Not JSON, e.g. the Key Vault placeholder before the real value is set.
  }
  return null;
}

let configuredScryptParams: FirebaseScryptParams | null | undefined;
const scryptParams = () => (configuredScryptParams ??= parseScryptParams(env.FIREBASE_SCRYPT_PARAMS));

async function issueSession(uid: string, email: string, hints: ProfileHints, fallbackName: string) {
  const user = await db.collection('users').doc(uid).get();
  if (user.exists) return { ...(await authService.login(uid, email)), isNewUser: false };
  const displayName = hints.displayName && hints.displayName.length >= 2 ? hints.displayName : fallbackName;
  const registered = await authService.register({ timezone: 'UTC', ...hints, displayName } as RegisterInput, uid, email);
  return { ...registered, isNewUser: true };
}

const nameFromEmail = (email: string) => {
  const local = email.split('@')[0] ?? '';
  return local.length >= 2 ? local.slice(0, 50) : 'PetFolioo user';
};

export class IdentityService {
  async registerWithPassword(email: string, password: string, hints: ProfileHints) {
    const id = identityId('password', email);
    const ref = identities().doc(id);
    if ((await ref.get()).exists) {
      throw Object.assign(new Error('An account with this email already exists'), { statusCode: 409 });
    }
    const existingUser = await db.collection('users').where('email', '==', normalizeEmail(email)).limit(1).get();
    if (!existingUser.empty) {
      // The email belongs to a Google or Apple account; signing in with that provider works.
      throw Object.assign(new Error('An account with this email already exists'), { statusCode: 409 });
    }
    const uid = db.collection('users').doc().id;
    const record: IdentityRecord = {
      uid,
      provider: 'password',
      email: normalizeEmail(email),
      passwordHash: await hashPassword(password),
    };
    // create() fails if a concurrent registration took the email first.
    await ref.create({ ...record, createdAt: FieldValue.serverTimestamp() });
    return issueSession(uid, normalizeEmail(email), hints, hints.displayName ?? nameFromEmail(email));
  }

  async loginWithPassword(email: string, password: string) {
    const ref = identities().doc(identityId('password', email));
    const snap = await ref.get();
    if (!snap.exists) throw invalidCredentials();
    const record = snap.data() as IdentityRecord;

    let ok = false;
    if (record.passwordHash) {
      ok = await verifyPassword(password, record.passwordHash);
    } else if (record.firebase) {
      const params = scryptParams();
      if (!params) throw new Error('FIREBASE_SCRYPT_PARAMS is not configured; imported passwords cannot be checked');
      ok = await verifyFirebaseScrypt(password, record.firebase.salt, record.firebase.hash, params);
    }
    if (!ok) throw invalidCredentials();

    if (!record.passwordHash || needsRehash(record.passwordHash)) {
      await ref.update({ passwordHash: await hashPassword(password), firebase: FieldValue.delete() });
    }
    await ref.update({ lastLoginAt: FieldValue.serverTimestamp() });
    return issueSession(record.uid, record.email ?? normalizeEmail(email), {}, record.displayName ?? nameFromEmail(email));
  }

  async signInWithGoogle(idToken: string, hints: ProfileHints) {
    const verified = await verifyGoogleIdToken(idToken, env.GOOGLE_CLIENT_IDS);
    return this.signInWithProvider('google', verified, hints);
  }

  async signInWithApple(identityToken: string, rawNonce: string, hints: ProfileHints) {
    const verified = await verifyAppleIdentityToken(identityToken, rawNonce, env.APPLE_CLIENT_IDS);
    return this.signInWithProvider('apple', verified, hints);
  }

  /**
   * Known provider account: sign in. New one: attach it to the user with the same verified email
   * (Firebase also kept one account per email), or create a user.
   */
  private async signInWithProvider(provider: Provider, verified: VerifiedIdentity, hints: ProfileHints) {
    const ref = identities().doc(identityId(provider, verified.subject));
    const snap = await ref.get();
    const email = verified.email ? normalizeEmail(verified.email) : '';

    if (snap.exists) {
      const record = snap.data() as IdentityRecord;
      await ref.update({ lastLoginAt: FieldValue.serverTimestamp() });
      return issueSession(record.uid, record.email ?? email, hints, record.displayName ?? nameFromEmail(email));
    }

    let existingUid: string | undefined;
    if (email && verified.emailVerified) {
      const sameEmail = await db.collection('users').where('email', '==', email).limit(1).get();
      existingUid = sameEmail.empty ? undefined : sameEmail.docs[0].id;
    }
    const uid: string = existingUid ?? db.collection('users').doc().id;

    const record: IdentityRecord = { uid, provider, ...(email ? { email } : {}) };
    await ref.set({ ...record, createdAt: FieldValue.serverTimestamp(), lastLoginAt: FieldValue.serverTimestamp() });
    return issueSession(uid, email, hints, hints.displayName ?? (email ? nameFromEmail(email) : 'PetFolioo user'));
  }

  /** Called when a user deletes their account, so none of their sign-in methods works afterwards. */
  async removeAll(uid: string) {
    const snap = await identities().where('uid', '==', uid).get();
    const batch = db.batch();
    snap.docs.forEach((doc: { ref: unknown }) => batch.delete(doc.ref));
    await batch.commit();
  }
}

export const identityService = new IdentityService();
