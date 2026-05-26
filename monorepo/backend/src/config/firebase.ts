import { initializeApp, cert, getApps, type App } from 'firebase-admin/app';
import { getFirestore, type Firestore } from 'firebase-admin/firestore';
import { getAuth, type Auth } from 'firebase-admin/auth';
import { getStorage, type Storage } from 'firebase-admin/storage';
import { getMessaging, type Messaging } from 'firebase-admin/messaging';
import { env } from './env.js';

let app: App;

if (getApps().length === 0) {
  if (env.GOOGLE_APPLICATION_CREDENTIALS) {
    app = initializeApp({
      credential: cert(env.GOOGLE_APPLICATION_CREDENTIALS),
      projectId: env.FIREBASE_PROJECT_ID,
      storageBucket: env.FIREBASE_STORAGE_BUCKET,
    });
  } else {
    app = initializeApp({
      projectId: env.FIREBASE_PROJECT_ID,
      storageBucket: env.FIREBASE_STORAGE_BUCKET,
    });
  }
} else {
  app = getApps()[0]!;
}

export const db: Firestore = getFirestore(app);
export const auth: Auth = getAuth(app);
export const storage: Storage = getStorage(app);
export const messaging: Messaging = getMessaging(app);

db.settings({ ignoreUndefinedProperties: true });
