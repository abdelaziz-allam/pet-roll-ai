import { db, auth } from '../config/firebase.js';
import { FieldValue } from 'firebase-admin/firestore';

async function seedAdmin() {
  const email = process.env.ADMIN_EMAIL || 'admin@petfolioo.com';
  const password = process.env.ADMIN_PASSWORD || 'P@tF0lioo@2612210106022312';

  let uid: string;

  try {
    const existing = await auth.getUserByEmail(email);
    uid = existing.uid;
    console.log(`Admin user already exists: ${uid}`);
  } catch {
    const user = await auth.createUser({
      email,
      password,
      displayName: 'PET Roll Admin',
    });
    uid = user.uid;
    console.log(`Created admin user: ${uid}`);
  }

  await db.collection('users').doc(uid).set({
    email,
    displayName: 'PET Roll Admin',
    role: 'super_admin',
    status: 'active',
    timezone: 'UTC',
    settings: {
      reminderTimeUTC: 8,
      pushEnabled: true,
      emailNotifications: true,
      language: 'en',
    },
    fcmTokens: [],
    isVerifiedBreeder: false,
    createdAt: FieldValue.serverTimestamp(),
    updatedAt: FieldValue.serverTimestamp(),
  }, { merge: true });

  // Seed app_config
  await db.collection('app_config').doc('current').set({
    minAppVersion: '1.0.0',
    latestAppVersion: '1.0.0',
    maintenanceMode: false,
    maintenanceMessage: '',
    featureFlags: {
      matingEnabled: true,
      chatEnabled: true,
      pregnancyTrackingEnabled: true,
      pdfExportEnabled: true,
    },
    updatedAt: FieldValue.serverTimestamp(),
    updatedBy: uid,
  }, { merge: true });

  console.log(`Admin seeded: ${email} (role: super_admin)`);
  console.log('App config seeded with default values.');
}

seedAdmin().catch(console.error);
