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
    // Check if user already has a pending request
    const pendingSnapshot = await db.collection(this.collectionName)
      .where('userId', '==', userId)
      .where('status', '==', 'pending')
      .get();

    if (!pendingSnapshot.empty) {
      const error: any = new Error('You already have a pending verification request');
      error.statusCode = 400;
      throw error;
    }

    // Get the next submission number for this user
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
    const snapshot = await db.collection(this.collectionName)
      .where('userId', '==', userId)
      .orderBy('createdAt', 'desc')
      .get();

    return snapshot.docs.map((doc: any) => ({ id: doc.id, ...doc.data() }));
  }
}

export const verificationService = new VerificationService();
