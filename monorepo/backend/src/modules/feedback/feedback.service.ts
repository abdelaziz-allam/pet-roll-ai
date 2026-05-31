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

  try {
    let ref: FirebaseFirestore.Query = db.collection(FEEDBACK);

    if (status) {
      ref = ref.where('status', '==', status);
    }

    if (type) {
      ref = ref.where('type', '==', type);
    }

    if (isTodo === 'true' || isTodo === 'false') {
      ref = ref.where('isTodo', '==', isTodo === 'true');
    }

    if (dateFrom) {
      ref = ref.where('createdAt', '>=', new Date(dateFrom));
    }

    if (dateTo) {
      ref = ref.where('createdAt', '<=', new Date(dateTo));
    }

    ref = ref.orderBy('createdAt', 'desc');

    const snapshot = await ref.offset(offset).limit(limit).get();
    const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

    let total = data.length;
    if (snapshot.size === limit) {
      try {
        const countSnap = await ref.count().get();
        total = countSnap.data().count;
      } catch {
        total = offset + data.length + 1;
      }
    } else {
      total = offset + data.length;
    }

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
  } catch (err: any) {
    // Fallback: fetch all docs without complex query, filter in memory
    const allSnap = await db.collection(FEEDBACK).orderBy('createdAt', 'desc').get();
    let docs = allSnap.docs.map((doc) => ({ id: doc.id, ...doc.data() } as any));

    if (status) {
      docs = docs.filter((d) => d.status === status);
    }
    if (type) {
      docs = docs.filter((d) => d.type === type);
    }
    if (isTodo === 'true') {
      docs = docs.filter((d) => d.isTodo === true);
    } else if (isTodo === 'false') {
      docs = docs.filter((d) => d.isTodo === false);
    }

    const total = docs.length;
    const data = docs.slice(offset, offset + limit);

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
