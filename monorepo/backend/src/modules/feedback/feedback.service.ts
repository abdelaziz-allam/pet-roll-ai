import { db } from '../../config/firebase';
import { FieldValue } from 'firebase-admin/firestore';

const FEEDBACK = 'feedback';

export async function createFeedback(
  userId: string,
  userDisplayName: string,
  userEmail: string,
  data: { type: 'bug' | 'suggestion' | 'general'; message: string }
) {
  const feedbackData = {
    userId,
    userDisplayName,
    userEmail,
    type: data.type,
    message: data.message,
    status: 'open',
    isTodo: false,
    adminReply: null,
    adminRepliedBy: null,
    adminRepliedAt: null,
    createdAt: FieldValue.serverTimestamp(),
    updatedAt: FieldValue.serverTimestamp(),
  };

  const docRef = await db.collection(FEEDBACK).add(feedbackData);
  const doc = await docRef.get();
  return { id: doc.id, ...doc.data() };
}

export async function getUserFeedback(userId: string, page: number, limit: number) {
  const offset = (page - 1) * limit;

  const ref = db.collection(FEEDBACK)
    .where('userId', '==', userId)
    .orderBy('createdAt', 'desc');

  const countSnap = await ref.count().get();
  const total = countSnap.data().count;

  const snapshot = await ref.offset(offset).limit(limit).get();
  const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

  return {
    data,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
      hasNext: page * limit < total,
    },
  };
}

export async function listAllFeedback(params: {
  page: number;
  limit: number;
  status?: string;
  type?: string;
  isTodo?: string;
  dateFrom?: string;
  dateTo?: string;
}) {
  const { page, limit, status, type, isTodo, dateFrom, dateTo } = params;
  const offset = (page - 1) * limit;

  let ref: FirebaseFirestore.Query = db.collection(FEEDBACK).orderBy('createdAt', 'desc');

  if (status) {
    ref = ref.where('status', '==', status);
  }

  if (type) {
    ref = ref.where('type', '==', type);
  }

  if (isTodo !== undefined) {
    ref = ref.where('isTodo', '==', isTodo === 'true');
  }

  if (dateFrom) {
    ref = ref.where('createdAt', '>=', new Date(dateFrom));
  }

  if (dateTo) {
    ref = ref.where('createdAt', '<=', new Date(dateTo));
  }

  const countSnap = await ref.count().get();
  const total = countSnap.data().count;

  const snapshot = await ref.offset(offset).limit(limit).get();
  const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

  return {
    data,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
      hasNext: page * limit < total,
    },
  };
}

export async function replyToFeedback(feedbackId: string, adminReply: string, adminEmail: string) {
  const docRef = db.collection(FEEDBACK).doc(feedbackId);
  const doc = await docRef.get();

  if (!doc.exists) {
    throw { statusCode: 404, message: 'Feedback not found' };
  }

  await docRef.update({
    adminReply,
    adminRepliedBy: adminEmail,
    adminRepliedAt: FieldValue.serverTimestamp(),
    status: 'replied',
    updatedAt: FieldValue.serverTimestamp(),
  });

  const updated = await docRef.get();
  return { id: updated.id, ...updated.data() };
}

export async function updateFeedbackStatus(feedbackId: string, status: 'open' | 'replied' | 'closed') {
  const docRef = db.collection(FEEDBACK).doc(feedbackId);
  const doc = await docRef.get();

  if (!doc.exists) {
    throw { statusCode: 404, message: 'Feedback not found' };
  }

  await docRef.update({
    status,
    updatedAt: FieldValue.serverTimestamp(),
  });

  const updated = await docRef.get();
  return { id: updated.id, ...updated.data() };
}

export async function toggleTodo(feedbackId: string, isTodo: boolean) {
  const docRef = db.collection(FEEDBACK).doc(feedbackId);
  const doc = await docRef.get();

  if (!doc.exists) {
    throw { statusCode: 404, message: 'Feedback not found' };
  }

  await docRef.update({
    isTodo,
    updatedAt: FieldValue.serverTimestamp(),
  });

  const updated = await docRef.get();
  return { id: updated.id, ...updated.data() };
}
