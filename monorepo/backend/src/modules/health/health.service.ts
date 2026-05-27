import { db } from '../../config/firebase.js';
import { FieldValue } from 'firebase-admin/firestore';
import { paginate, getOffset } from '../../utils/pagination.js';
import type { PaginationQuery } from '../../types/common.js';
import type { CreateHealthRecordInput, UpdateHealthRecordInput } from './health.schema.js';

const HEALTH_RECORDS = 'health_records';
const PETS = 'pets';

async function verifyPetOwnership(petId: string, ownerId: string) {
  const petDoc = await db.collection(PETS).doc(petId).get();
  if (!petDoc.exists || petDoc.data()?.ownerId !== ownerId) {
    throw Object.assign(new Error('Pet not found or access denied'), { statusCode: 404 });
  }
}

export async function createRecord(ownerId: string, input: CreateHealthRecordInput) {
  await verifyPetOwnership(input.petId, ownerId);

  const recordData = {
    ...input,
    ownerId,
    createdAt: FieldValue.serverTimestamp(),
    updatedAt: FieldValue.serverTimestamp(),
  };

  const docRef = await db.collection(HEALTH_RECORDS).add(recordData);
  return { id: docRef.id, ...recordData };
}

export async function getRecords(petId: string, ownerId: string, pagination: PaginationQuery) {
  await verifyPetOwnership(petId, ownerId);

  const countSnapshot = await db
    .collection(HEALTH_RECORDS)
    .where('petId', '==', petId)
    .where('ownerId', '==', ownerId)
    .count()
    .get();

  const total = countSnapshot.data().count;
  const offset = getOffset(pagination);

  const snapshot = await db
    .collection(HEALTH_RECORDS)
    .where('petId', '==', petId)
    .where('ownerId', '==', ownerId)
    .orderBy('date', 'desc')
    .offset(offset)
    .limit(pagination.limit)
    .get();

  const records = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  return paginate(records, total, pagination);
}

export async function getRecordById(recordId: string, ownerId: string) {
  const doc = await db.collection(HEALTH_RECORDS).doc(recordId).get();
  if (!doc.exists || doc.data()?.ownerId !== ownerId) {
    throw Object.assign(new Error('Health record not found'), { statusCode: 404 });
  }
  return { id: doc.id, ...doc.data() };
}

export async function updateRecord(recordId: string, ownerId: string, input: UpdateHealthRecordInput) {
  const doc = await db.collection(HEALTH_RECORDS).doc(recordId).get();
  if (!doc.exists || doc.data()?.ownerId !== ownerId) {
    throw Object.assign(new Error('Health record not found'), { statusCode: 404 });
  }

  const updateData = {
    ...input,
    updatedAt: FieldValue.serverTimestamp(),
  };

  await db.collection(HEALTH_RECORDS).doc(recordId).update(updateData);
  return { id: recordId, ...doc.data(), ...updateData };
}

export async function deleteRecord(recordId: string, ownerId: string) {
  const doc = await db.collection(HEALTH_RECORDS).doc(recordId).get();
  if (!doc.exists || doc.data()?.ownerId !== ownerId) {
    throw Object.assign(new Error('Health record not found'), { statusCode: 404 });
  }

  await db.collection(HEALTH_RECORDS).doc(recordId).delete();
}

export async function addAttachment(recordId: string, ownerId: string, url: string) {
  const doc = await db.collection(HEALTH_RECORDS).doc(recordId).get();
  if (!doc.exists || doc.data()?.ownerId !== ownerId) {
    throw Object.assign(new Error('Health record not found'), { statusCode: 404 });
  }

  await db.collection(HEALTH_RECORDS).doc(recordId).update({
    attachments: FieldValue.arrayUnion([url]),
    updatedAt: FieldValue.serverTimestamp(),
  });

  const updated = await db.collection(HEALTH_RECORDS).doc(recordId).get();
  return { id: recordId, ...updated.data() };
}
