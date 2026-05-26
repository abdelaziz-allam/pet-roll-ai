import { db } from '../../config/firebase';
import { FieldValue } from 'firebase-admin/firestore';
import type { CreateTipInput, UpdateTipInput } from './tips.schema';

const TIPS = 'tips';

export async function createTip(input: CreateTipInput, createdBy: string) {
  const tipData = {
    ...input,
    createdBy,
    createdAt: FieldValue.serverTimestamp(),
    updatedAt: FieldValue.serverTimestamp(),
  };

  const docRef = await db.collection(TIPS).add(tipData);
  const doc = await docRef.get();
  return { id: doc.id, ...doc.data() };
}

export async function updateTip(tipId: string, input: UpdateTipInput) {
  const docRef = db.collection(TIPS).doc(tipId);
  const doc = await docRef.get();

  if (!doc.exists) {
    throw { statusCode: 404, message: 'Tip not found' };
  }

  await docRef.update({
    ...input,
    updatedAt: FieldValue.serverTimestamp(),
  });

  const updated = await docRef.get();
  return { id: updated.id, ...updated.data() };
}

export async function deleteTip(tipId: string) {
  const docRef = db.collection(TIPS).doc(tipId);
  const doc = await docRef.get();

  if (!doc.exists) {
    throw { statusCode: 404, message: 'Tip not found' };
  }

  await docRef.delete();
  return { message: 'Tip deleted' };
}

export async function listTips(params: { page: number; limit: number; category?: string; active?: string }) {
  const { page, limit, category, active } = params;
  const offset = (page - 1) * limit;

  let ref: FirebaseFirestore.Query = db.collection(TIPS).orderBy('createdAt', 'desc');

  if (category) {
    ref = ref.where('category', '==', category);
  }

  if (active !== undefined) {
    ref = ref.where('active', '==', active === 'true');
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

export async function getDailyTip(species?: string) {
  let ref: FirebaseFirestore.Query = db
    .collection(TIPS)
    .where('active', '==', true);

  if (species) {
    ref = ref.where('species', 'array-contains', species);
  }

  const snapshot = await ref.get();

  if (snapshot.empty) {
    const fallback = await db.collection(TIPS).where('active', '==', true).get();
    if (fallback.empty) {
      return { id: '', title: 'Daily Tip', body: 'Keep your pet happy and healthy!', category: 'general' };
    }
    const docs = fallback.docs;
    const dayIndex = Math.floor(Date.now() / 86400000) % docs.length;
    const doc = docs[dayIndex];
    return { id: doc.id, ...doc.data() };
  }

  const docs = snapshot.docs;
  const dayIndex = Math.floor(Date.now() / 86400000) % docs.length;
  const doc = docs[dayIndex];
  return { id: doc.id, ...doc.data() };
}

export async function getTipById(tipId: string) {
  const doc = await db.collection(TIPS).doc(tipId).get();
  if (!doc.exists) {
    throw { statusCode: 404, message: 'Tip not found' };
  }
  return { id: doc.id, ...doc.data() };
}
