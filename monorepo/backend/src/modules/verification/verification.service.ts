import { db } from '../../config/firebase';

interface DocumentInput {
  url: string;
  path: string;
  name: string;
  type: string;
}

interface SubmitVerificationInput {
  kennelName: string;
  breedExperience: string;
  documents: DocumentInput[];
}

export class VerificationService {
  private collectionName = 'verification_requests';

  async submitVerification(userId: string, userName: string, userEmail: string, input: SubmitVerificationInput) {
    const pendingSnapshot = await db.collection(this.collectionName)
      .where('userId', '==', userId)
      .where('status', '==', 'pending')
      .get();

    if (!pendingSnapshot.empty) {
      const error: any = new Error('You already have a pending verification request');
      error.statusCode = 400;
      throw error;
    }

    const userSubmissions = await db.collection(this.collectionName)
      .where('userId', '==', userId)
      .get();

    const submissionNumber = userSubmissions.size + 1;

    const now = new Date().toISOString();
    const documents = input.documents.map((doc) => ({
      ...doc,
      uploadedAt: now,
    }));

    const record = {
      userId,
      userName,
      userEmail,
      kennelName: input.kennelName,
      breedExperience: input.breedExperience,
      documents,
      status: 'pending' as const,
      submissionNumber,
      rejectionReason: null,
      processedBy: null,
      processedAt: null,
      expiryDate: null,
      revokedAt: null,
      revokedBy: null,
      revokeReason: null,
      createdAt: now,
    };

    const ref = await db.collection(this.collectionName).add(record);
    return { id: ref.id, ...record };
  }

  async getStatus(userId: string) {
    const snapshot = await db.collection(this.collectionName)
      .where('userId', '==', userId)
      .orderBy('createdAt', 'desc')
      .limit(1)
      .get();

    if (snapshot.empty) {
      return null;
    }

    const doc = snapshot.docs[0];
    return { id: doc.id, ...doc.data() };
  }

  async getHistory(userId: string) {
    let snapshot;
    try {
      snapshot = await db.collection(this.collectionName)
        .where('userId', '==', userId)
        .orderBy('createdAt', 'desc')
        .get();
    } catch (err: any) {
      if (err?.code === 9) {
        snapshot = await db.collection(this.collectionName)
          .where('userId', '==', userId)
          .get();
      } else { throw err; }
    }

    return snapshot.docs.map((doc: any) => ({ id: doc.id, ...doc.data() }));
  }

  async updateStatus(requestId: string, status: 'approved' | 'rejected' | 'pending', rejectionReason?: string, expiryDate?: string) {
    const doc = await db.collection(this.collectionName).doc(requestId).get();
    if (!doc.exists) {
      const error: any = new Error('Request not found');
      error.statusCode = 404;
      throw error;
    }
    const updateData: any = {
      status,
      processedAt: new Date().toISOString(),
      processedBy: 'system',
    };
    if (rejectionReason) updateData.rejectionReason = rejectionReason;
    if (status === 'approved' && expiryDate) {
      updateData.expiryDate = expiryDate;
    }
    await db.collection(this.collectionName).doc(requestId).update(updateData);

    if (status === 'approved') {
      const data = doc.data()!;
      await db.collection('users').doc(data.userId).update({ isVerifiedBreeder: true });
    }

    const updated = await db.collection(this.collectionName).doc(requestId).get();
    return { id: updated.id, ...updated.data() };
  }

  async revokeVerification(requestId: string, adminId: string, reason: string) {
    const doc = await db.collection(this.collectionName).doc(requestId).get();
    if (!doc.exists) {
      const error: any = new Error('Request not found');
      error.statusCode = 404;
      throw error;
    }

    const data = doc.data()!;
    if (data.status !== 'approved') {
      const error: any = new Error('Can only revoke approved verifications');
      error.statusCode = 400;
      throw error;
    }

    await db.collection(this.collectionName).doc(requestId).update({
      status: 'revoked',
      revokedAt: new Date().toISOString(),
      revokedBy: adminId,
      revokeReason: reason,
    });

    await db.collection('users').doc(data.userId).update({
      isVerifiedBreeder: false,
    });

    const updated = await db.collection(this.collectionName).doc(requestId).get();
    return { id: updated.id, ...updated.data() };
  }

  async getCertificate(userId: string) {
    const snapshot = await db.collection(this.collectionName)
      .where('userId', '==', userId)
      .where('status', '==', 'approved')
      .orderBy('createdAt', 'desc')
      .limit(1)
      .get();

    if (snapshot.empty) {
      return null;
    }

    const doc = snapshot.docs[0];
    const data = doc.data();
    return {
      id: doc.id,
      userId: data.userId,
      userName: data.userName,
      userEmail: data.userEmail,
      kennelName: data.kennelName,
      breedExperience: data.breedExperience,
      status: data.status,
      submissionNumber: data.submissionNumber,
      approvedAt: data.processedAt,
      expiryDate: data.expiryDate || null,
      certificateNumber: `PF-BV-${doc.id.substring(0, 8).toUpperCase()}`,
    };
  }

  async getLastRejected(userId: string) {
    const snapshot = await db.collection(this.collectionName)
      .where('userId', '==', userId)
      .where('status', '==', 'rejected')
      .orderBy('createdAt', 'desc')
      .limit(1)
      .get();

    if (snapshot.empty) {
      return null;
    }

    const doc = snapshot.docs[0];
    return { id: doc.id, ...doc.data() };
  }
}

export const verificationService = new VerificationService();
