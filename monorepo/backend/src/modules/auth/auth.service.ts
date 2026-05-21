import jwt from 'jsonwebtoken';
import { db, FieldValue } from '../../config/firebase';
import { env } from '../../config/env';
import { RegisterInput, UpdateProfileInput } from './auth.schema';

export class AuthService {
  private usersRef = db.collection('users');

  async register(input: RegisterInput, firebaseUid: string, email: string) {
    const existing = await this.usersRef.doc(firebaseUid).get();
    if (existing.exists) {
      const error: any = new Error('User already registered');
      error.statusCode = 409;
      throw error;
    }

    const userData = {
      email,
      displayName: input.displayName,
      phone: input.phone || null,
      timezone: input.timezone,
      role: 'user',
      status: 'active',
      isVerifiedBreeder: false,
      fcmTokens: [],
      settings: { notifications: true, language: 'en', theme: 'light' },
      createdAt: FieldValue.serverTimestamp(),
      updatedAt: FieldValue.serverTimestamp(),
    };

    await this.usersRef.doc(firebaseUid).set(userData);
    const tokens = this.generateTokens(firebaseUid, email);
    return { user: { id: firebaseUid, ...userData }, ...tokens };
  }

  async login(firebaseUid: string, email: string) {
    const doc = await this.usersRef.doc(firebaseUid).get();
    if (!doc.exists) {
      const error: any = new Error('User not found');
      error.statusCode = 404;
      throw error;
    }

    const data = doc.data()!;
    if (data.status === 'banned') {
      const error: any = new Error('Account has been banned');
      error.statusCode = 403;
      throw error;
    }
    if (data.status === 'deleted') {
      const error: any = new Error('Account has been deleted');
      error.statusCode = 410;
      throw error;
    }

    await this.usersRef.doc(firebaseUid).update({
      lastLoginAt: FieldValue.serverTimestamp(),
    });

    const tokens = this.generateTokens(firebaseUid, email);
    return { user: { id: firebaseUid, ...data }, ...tokens };
  }

  async getProfile(uid: string) {
    const doc = await this.usersRef.doc(uid).get();
    if (!doc.exists) {
      const error: any = new Error('User not found');
      error.statusCode = 404;
      throw error;
    }
    return { id: uid, ...doc.data() };
  }

  async updateProfile(uid: string, input: UpdateProfileInput) {
    const updateData: any = { ...input, updatedAt: FieldValue.serverTimestamp() };

    if (input.settings) {
      Object.entries(input.settings).forEach(([key, value]) => {
        updateData[`settings.${key}`] = value;
      });
      delete updateData.settings;
    }

    await this.usersRef.doc(uid).update(updateData);
    return this.getProfile(uid);
  }

  async deleteAccount(uid: string) {
    await this.usersRef.doc(uid).update({
      status: 'deleted',
      email: FieldValue.delete(),
      phone: FieldValue.delete(),
      displayName: 'Deleted User',
      deletedAt: FieldValue.serverTimestamp(),
      updatedAt: FieldValue.serverTimestamp(),
    });
  }

  async refreshToken(uid: string) {
    const doc = await this.usersRef.doc(uid).get();
    if (!doc.exists) {
      const error: any = new Error('User not found');
      error.statusCode = 404;
      throw error;
    }
    const data = doc.data()!;
    return this.generateTokens(uid, data.email);
  }

  generateTokens(uid: string, email: string) {
    const accessToken = jwt.sign({ uid, email }, env.JWT_SECRET, {
      expiresIn: env.JWT_EXPIRY as any,
    });
    const refreshToken = jwt.sign({ uid, type: 'refresh' }, env.JWT_SECRET, {
      expiresIn: env.REFRESH_TOKEN_EXPIRY as any,
    });
    return { accessToken, refreshToken };
  }
}

export const authService = new AuthService();
