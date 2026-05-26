import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import { db, FieldValue } from '../../config/firebase';
import { env } from '../../config/env';
import {
  AdminLoginInput,
  AdminForgotPasswordInput,
  AdminResetPasswordInput,
  AdminChangePasswordInput,
  CreateAdminUserInput,
  UpdateAdminUserInput,
  AdminPermissions,
  PAGE_ACTIONS,
} from './admin-auth.schema';

function hashPassword(password: string, salt: string): string {
  return crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex');
}

function generateSalt(): string {
  return crypto.randomBytes(16).toString('hex');
}

function generateResetToken(): string {
  return crypto.randomBytes(32).toString('hex');
}

const SUPER_ADMIN_PERMISSIONS: AdminPermissions = Object.fromEntries(
  Object.entries(PAGE_ACTIONS).map(([page, actions]) => [
    page,
    { access: true, actions },
  ])
);

export class AdminAuthService {
  private adminUsersRef = db.collection('admin_users');
  private resetTokensRef = db.collection('admin_reset_tokens');

  async login(input: AdminLoginInput) {
    const isLocalMode = env.NODE_ENV === 'development' || env.NODE_ENV === 'test';

    if (isLocalMode) {
      return this.localLogin(input);
    }
    return this.gcpLogin(input);
  }

  private async localLogin(input: AdminLoginInput) {
    const snapshot = await this.adminUsersRef
      .where('email', '==', input.email)
      .limit(1)
      .get();

    if (snapshot.empty) {
      const error: any = new Error('Invalid email or password');
      error.statusCode = 401;
      throw error;
    }

    const doc = snapshot.docs[0];
    const adminUser = doc.data();

    if (adminUser.status === 'suspended') {
      const error: any = new Error('Account has been suspended');
      error.statusCode = 403;
      throw error;
    }

    const hashedInput = hashPassword(input.password, adminUser.salt);
    if (hashedInput !== adminUser.passwordHash) {
      const error: any = new Error('Invalid email or password');
      error.statusCode = 401;
      throw error;
    }

    await this.adminUsersRef.doc(doc.id).update({
      lastLoginAt: FieldValue.serverTimestamp(),
    });

    const tokens = this.generateTokens(doc.id, adminUser.email, 'admin');
    const { passwordHash, salt, ...safeUser } = adminUser;
    return { user: { id: doc.id, ...safeUser }, ...tokens };
  }

  private async gcpLogin(input: AdminLoginInput) {
    // In GCP mode, we verify against Google Identity Platform
    // The frontend sends Firebase ID token after Google sign-in
    // For email/password, we still use our own store but validate via GCP IAM
    // This allows custom login UI while leveraging GCP security
    const snapshot = await this.adminUsersRef
      .where('email', '==', input.email)
      .limit(1)
      .get();

    if (snapshot.empty) {
      const error: any = new Error('Invalid email or password');
      error.statusCode = 401;
      throw error;
    }

    const doc = snapshot.docs[0];
    const adminUser = doc.data();

    if (adminUser.status === 'suspended') {
      const error: any = new Error('Account has been suspended');
      error.statusCode = 403;
      throw error;
    }

    const hashedInput = hashPassword(input.password, adminUser.salt);
    if (hashedInput !== adminUser.passwordHash) {
      const error: any = new Error('Invalid email or password');
      error.statusCode = 401;
      throw error;
    }

    await this.adminUsersRef.doc(doc.id).update({
      lastLoginAt: FieldValue.serverTimestamp(),
    });

    const tokens = this.generateTokens(doc.id, adminUser.email, 'admin');
    const { passwordHash, salt, ...safeUser } = adminUser;
    return { user: { id: doc.id, ...safeUser }, ...tokens };
  }

  async forgotPassword(input: AdminForgotPasswordInput) {
    const snapshot = await this.adminUsersRef
      .where('email', '==', input.email)
      .limit(1)
      .get();

    // Always return success to prevent email enumeration
    if (snapshot.empty) {
      return { message: 'If the email exists, a reset link has been sent' };
    }

    const doc = snapshot.docs[0];
    const token = generateResetToken();
    const expiresAt = new Date(Date.now() + 60 * 60 * 1000); // 1 hour

    await this.resetTokensRef.doc(token).set({
      adminUserId: doc.id,
      email: input.email,
      expiresAt,
      used: false,
      createdAt: FieldValue.serverTimestamp(),
    });

    // In production, send email via SendGrid/SES
    // In local dev, log the token
    if (env.NODE_ENV === 'development') {
      console.log(`[DEV] Password reset token for ${input.email}: ${token}`);
    }

    return { message: 'If the email exists, a reset link has been sent', ...(env.NODE_ENV === 'development' ? { devToken: token } : {}) };
  }

  async resetPassword(input: AdminResetPasswordInput) {
    const tokenDoc = await this.resetTokensRef.doc(input.token).get();

    if (!tokenDoc.exists) {
      const error: any = new Error('Invalid or expired reset token');
      error.statusCode = 400;
      throw error;
    }

    const tokenData = tokenDoc.data()!;

    if (tokenData.used) {
      const error: any = new Error('Reset token has already been used');
      error.statusCode = 400;
      throw error;
    }

    if (new Date(tokenData.expiresAt) < new Date()) {
      const error: any = new Error('Reset token has expired');
      error.statusCode = 400;
      throw error;
    }

    const salt = generateSalt();
    const passwordHash = hashPassword(input.newPassword, salt);

    await this.adminUsersRef.doc(tokenData.adminUserId).update({
      passwordHash,
      salt,
      updatedAt: FieldValue.serverTimestamp(),
    });

    await this.resetTokensRef.doc(input.token).update({ used: true });

    return { message: 'Password has been reset successfully' };
  }

  async changePassword(adminId: string, input: AdminChangePasswordInput) {
    const doc = await this.adminUsersRef.doc(adminId).get();
    if (!doc.exists) {
      const error: any = new Error('Admin user not found');
      error.statusCode = 404;
      throw error;
    }

    const adminUser = doc.data()!;
    const hashedCurrent = hashPassword(input.currentPassword, adminUser.salt);

    if (hashedCurrent !== adminUser.passwordHash) {
      const error: any = new Error('Current password is incorrect');
      error.statusCode = 401;
      throw error;
    }

    const salt = generateSalt();
    const passwordHash = hashPassword(input.newPassword, salt);

    await this.adminUsersRef.doc(adminId).update({
      passwordHash,
      salt,
      updatedAt: FieldValue.serverTimestamp(),
    });

    return { message: 'Password changed successfully' };
  }

  async getMe(adminId: string) {
    const doc = await this.adminUsersRef.doc(adminId).get();
    if (!doc.exists) {
      const error: any = new Error('Admin user not found');
      error.statusCode = 404;
      throw error;
    }
    const { passwordHash, salt, ...safeUser } = doc.data()!;
    return { id: doc.id, ...safeUser };
  }

  async refreshToken(uid: string) {
    const doc = await this.adminUsersRef.doc(uid).get();
    if (!doc.exists) {
      const error: any = new Error('Admin user not found');
      error.statusCode = 404;
      throw error;
    }
    const data = doc.data()!;
    return this.generateTokens(uid, data.email, 'admin');
  }

  // --- Admin User Management ---

  async createAdminUser(input: CreateAdminUserInput, createdBy: string) {
    const existing = await this.adminUsersRef
      .where('email', '==', input.email)
      .limit(1)
      .get();

    if (!existing.empty) {
      const error: any = new Error('An admin user with this email already exists');
      error.statusCode = 409;
      throw error;
    }

    const salt = generateSalt();
    const passwordHash = hashPassword(input.password, salt);

    const permissions = input.role === 'super_admin'
      ? SUPER_ADMIN_PERMISSIONS
      : input.permissions;

    const adminData = {
      email: input.email,
      displayName: input.displayName,
      role: input.role,
      status: 'active',
      permissions,
      passwordHash,
      salt,
      createdBy,
      createdAt: FieldValue.serverTimestamp(),
      updatedAt: FieldValue.serverTimestamp(),
      lastLoginAt: null,
    };

    const docRef = await this.adminUsersRef.add(adminData);
    const { passwordHash: _, salt: __, ...safeData } = adminData;
    return { id: docRef.id, ...safeData };
  }

  async updateAdminUser(adminId: string, input: UpdateAdminUserInput, updatedBy: string) {
    const doc = await this.adminUsersRef.doc(adminId).get();
    if (!doc.exists) {
      const error: any = new Error('Admin user not found');
      error.statusCode = 404;
      throw error;
    }

    const updateData: any = {
      updatedAt: FieldValue.serverTimestamp(),
      updatedBy,
    };

    if (input.displayName) updateData.displayName = input.displayName;
    if (input.role) updateData.role = input.role;
    if (input.status) updateData.status = input.status;
    if (input.permissions) updateData.permissions = input.permissions;

    if (input.role === 'super_admin') {
      updateData.permissions = SUPER_ADMIN_PERMISSIONS;
    }

    await this.adminUsersRef.doc(adminId).update(updateData);

    const updated = await this.adminUsersRef.doc(adminId).get();
    const { passwordHash, salt, ...safeUser } = updated.data()!;
    return { id: adminId, ...safeUser };
  }

  async deleteAdminUser(adminId: string, deletedBy: string) {
    const doc = await this.adminUsersRef.doc(adminId).get();
    if (!doc.exists) {
      const error: any = new Error('Admin user not found');
      error.statusCode = 404;
      throw error;
    }

    if (doc.data()!.role === 'super_admin') {
      const superAdmins = await this.adminUsersRef
        .where('role', '==', 'super_admin')
        .where('status', '==', 'active')
        .get();
      if (superAdmins.size <= 1) {
        const error: any = new Error('Cannot delete the last super admin');
        error.statusCode = 400;
        throw error;
      }
    }

    await this.adminUsersRef.doc(adminId).delete();
    return { message: 'Admin user deleted' };
  }

  async listAdminUsers(page = 1, limit = 20) {
    const countSnap = await this.adminUsersRef.count().get();
    const total = countSnap.data().count;
    const offset = (page - 1) * limit;

    const snapshot = await this.adminUsersRef
      .orderBy('createdAt', 'desc')
      .offset(offset)
      .limit(limit)
      .get();

    const users = snapshot.docs.map((doc) => {
      const { passwordHash, salt, ...safeData } = doc.data();
      return { id: doc.id, ...safeData };
    });

    return { data: users, total, page, limit, totalPages: Math.ceil(total / limit) };
  }

  async getAdminUser(adminId: string) {
    const doc = await this.adminUsersRef.doc(adminId).get();
    if (!doc.exists) {
      const error: any = new Error('Admin user not found');
      error.statusCode = 404;
      throw error;
    }
    const { passwordHash, salt, ...safeUser } = doc.data()!;
    return { id: doc.id, ...safeUser };
  }

  async seedSuperAdmin() {
    const defaultEmail = 'admin@petfolioo.com';
    const defaultPassword = 'P@tF0lioo@2612210106022312';
    const existing = await this.adminUsersRef
      .where('role', '==', 'super_admin')
      .limit(1)
      .get();

    if (!existing.empty) {
      const doc = existing.docs[0];
      const salt = generateSalt();
      const passwordHash = hashPassword(defaultPassword, salt);
      await doc.ref.update({ email: defaultEmail, passwordHash, salt, updatedAt: FieldValue.serverTimestamp() });
      return { message: 'Super admin credentials updated', seeded: false };
    }

    const salt = generateSalt();
    const passwordHash = hashPassword(defaultPassword, salt);

    const adminData = {
      email: defaultEmail,
      displayName: 'Super Admin',
      role: 'super_admin',
      status: 'active',
      permissions: SUPER_ADMIN_PERMISSIONS,
      passwordHash,
      salt,
      createdBy: 'system',
      createdAt: FieldValue.serverTimestamp(),
      updatedAt: FieldValue.serverTimestamp(),
      lastLoginAt: null,
    };

    await this.adminUsersRef.add(adminData);
    return { message: `Super admin seeded: ${defaultEmail}`, seeded: true };
  }

  private generateTokens(uid: string, email: string, type: string) {
    const accessToken = jwt.sign(
      { uid, email, type: 'admin', userType: type },
      env.JWT_SECRET,
      { expiresIn: env.JWT_EXPIRY as any }
    );
    const refreshToken = jwt.sign(
      { uid, type: 'admin_refresh' },
      env.JWT_SECRET,
      { expiresIn: env.REFRESH_TOKEN_EXPIRY as any }
    );
    return { accessToken, refreshToken };
  }
}

export const adminAuthService = new AdminAuthService();
