import { initializeApp, getApps, type App } from 'firebase-admin/app';
import { getFirestore, type Firestore } from 'firebase-admin/firestore';
import { getAuth, type Auth } from 'firebase-admin/auth';
import { getStorage, type Storage } from 'firebase-admin/storage';

let app: App;

const projectId = process.env.FIREBASE_PROJECT_ID || process.env.GCP_PROJECT_ID || 'petroll-production';
const storageBucket = process.env.FIREBASE_STORAGE_BUCKET || 'petroll-production-assets';

if (getApps().length === 0) {
  app = initializeApp({
    projectId,
    storageBucket,
  });
} else {
  app = getApps()[0]!;
}

export const db: Firestore = getFirestore(app);
export const auth: Auth = getAuth(app);
export const storage: Storage = getStorage(app);

db.settings({ ignoreUndefinedProperties: true });
