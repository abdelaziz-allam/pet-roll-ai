import jwt from 'jsonwebtoken';
import { db, auth as firebaseAuth } from '../../config/firebase.js';
import { env } from '../../config/env.js';
import type { RegisterInput, UpdateProfileInput } from './auth.schema.js';
import type { User } from '../../types/user.js';
import { FieldValue } from 'firebase-admin/firestore';

const USERS = 'users';

export async function register(input: RegisterInput, firebaseUid: string, email: string) {
  const existingUser = await db.collection(USERS).doc(firebaseUid).get();
  if (existingUser.exists) {
    throw Object.assign(new Error('User already registered'), { statusCode: 409 });
  }

  const userData: Omit<User, 'id'> = {
    email,
    displayName: input.displayName,
    role: 'user',
    status: 'active',
    timezone: input.timezone,
    settings: {
      reminderTimeUTC: 8,
      pushEnabled: true,
      emailNotifications: true,
      language: 'en',
    },
    fcmTokens: [],
    isVerifiedBreeder: false,
    createdAt: FieldValue.serverTimestamp() as any,
    updatedAt: FieldValue.serverTimestamp() as any,
  };

  await db.collection(USERS).doc(firebaseUid).set(userData);

  return generateTokens(firebaseUid, email, 'user');
}

export async function login(firebaseUid: string, email: string) {
  const userDoc = await db.collection(USERS).doc(firebaseUid).get();

  if (!userDoc.exists) {
    throw Object.assign(new Error('User not registered. Call /register first.'), { statusCode: 404 });
  }

  const user = userDoc.data() as User;

  if (user.status === 'banned') {
    throw Object.assign(new Error('Account has been suspended'), { statusCode: 403 });
  }

  if (user.status === 'deleted') {
    throw Object.assign(new Error('Account has been deleted'), { statusCode: 410 });
  }

  return generateTokens(firebaseUid, email, user.role);
}

export async function getProfile(uid: string) {
  const userDoc = await db.collection(USERS).doc(uid).get();
  if (!userDoc.exists) {
    throw Object.assign(new Error('User not found'), { statusCode: 404 });
  }
  return { id: userDoc.id, ...userDoc.data() };
}

export async function updateProfile(uid: string, input: UpdateProfileInput) {
  const updateData: Record<string, any> = {
    ...input,
    updatedAt: FieldValue.serverTimestamp(),
  };

  if (input.settings) {
    for (const [key, value] of Object.entries(input.settings)) {
      if (value !== undefined) {
        updateData[`settings.${key}`] = value;
      }
    }
    delete updateData.settings;
  }

  await db.collection(USERS).doc(uid).update(updateData);
  return getProfile(uid);
}

export async function deleteAccount(uid: string) {
  await db.collection(USERS).doc(uid).update({
    status: 'deleted',
    email: `deleted_${uid}@petfolioo.com`,
    displayName: 'Deleted User',
    phone: FieldValue.delete(),
    photoURL: FieldValue.delete(),
    fcmTokens: [],
    updatedAt: FieldValue.serverTimestamp(),
  });

  // TODO: Queue Cloud Task for full cascade deletion (Phase 2 Addendum #2)
  // For MVP, mark as deleted and clean up in weekly cron

  try {
    await firebaseAuth.deleteUser(uid);
  } catch {
    // User may already be deleted from Firebase Auth
  }
}

export async function refreshToken(uid: string) {
  const userDoc = await db.collection(USERS).doc(uid).get();
  if (!userDoc.exists) {
    throw Object.assign(new Error('User not found'), { statusCode: 404 });
  }
  const user = userDoc.data() as User;
  return generateTokens(uid, user.email, user.role);
}

function generateTokens(uid: string, email: string, role: string) {
  const accessToken = jwt.sign(
    { uid, email, role },
    env.JWT_SECRET,
    { expiresIn: env.JWT_EXPIRY } as jwt.SignOptions
  );

  const refreshToken = jwt.sign(
    { uid, type: 'refresh' },
    env.JWT_SECRET,
    { expiresIn: env.REFRESH_TOKEN_EXPIRY } as jwt.SignOptions
  );

  return { accessToken, refreshToken, expiresIn: env.JWT_EXPIRY };
}
