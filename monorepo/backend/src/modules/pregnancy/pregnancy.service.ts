import { db } from '../../config/firebase.js';
import { FieldValue } from 'firebase-admin/firestore';
import { addDays, toISODate } from '../../utils/date-helpers.js';
import type { CreatePregnancyInput, UpdatePregnancyInput, AddWeightInput } from './pregnancy.schema.js';

const PREGNANCIES = 'pregnancies';
const PETS = 'pets';
const PREGNANCY_MILESTONES = 'pregnancy_milestones';

export async function startTracking(ownerId: string, input: CreatePregnancyInput) {
  // Verify pet ownership
  const petDoc = await db.collection(PETS).doc(input.petId).get();
  if (!petDoc.exists) {
    throw Object.assign(new Error('Pet not found'), { statusCode: 404 });
  }
  const pet = petDoc.data()!;
  if (pet.ownerId !== ownerId) {
    throw Object.assign(new Error('Not authorized to manage this pet'), { statusCode: 403 });
  }

  // Check for existing active pregnancy
  const existingSnap = await db.collection(PREGNANCIES)
    .where('petId', '==', input.petId)
    .where('status', '==', 'active')
    .limit(1)
    .get();
  if (!existingSnap.empty) {
    throw Object.assign(new Error('Pet already has an active pregnancy'), { statusCode: 409 });
  }

  // Get gestation milestones based on species
  const species = pet.species || 'dog';
  const milestonesSnap = await db.collection(PREGNANCY_MILESTONES)
    .where('species', '==', species)
    .orderBy('dayOffset', 'asc')
    .get();

  const breedingDate = new Date(input.breedingDate);

  // Calculate expected due date from seed data or use species defaults
  let gestationDays = species === 'cat' ? 65 : 63; // defaults
  const milestonesDocs = milestonesSnap.docs;
  if (milestonesDocs.length > 0) {
    const lastMilestone = milestonesDocs[milestonesDocs.length - 1]!.data();
    if (lastMilestone.gestationDays) {
      gestationDays = lastMilestone.gestationDays;
    }
  }

  const expectedDueDate = toISODate(addDays(breedingDate, gestationDays));

  // Generate milestones
  const milestones = milestonesDocs.map((doc) => {
    const data = doc.data();
    return {
      id: doc.id,
      title: data.title,
      description: data.description || '',
      dayOffset: data.dayOffset,
      expectedDate: toISODate(addDays(breedingDate, data.dayOffset)),
      completed: false,
      completedAt: null,
    };
  });

  const pregnancyData = {
    petId: input.petId,
    ownerId,
    breedingDate: input.breedingDate,
    expectedDueDate,
    gestationDays,
    status: 'active',
    notes: input.notes || '',
    milestones,
    weightLog: [],
    actualDeliveryDate: null,
    numberOfOffspring: null,
    createdAt: FieldValue.serverTimestamp(),
    updatedAt: FieldValue.serverTimestamp(),
  };

  const docRef = await db.collection(PREGNANCIES).add(pregnancyData);

  return { id: docRef.id, ...pregnancyData };
}

export async function getActivePregnancy(petId: string, ownerId: string) {
  // Verify pet ownership
  const petDoc = await db.collection(PETS).doc(petId).get();
  if (!petDoc.exists) {
    throw Object.assign(new Error('Pet not found'), { statusCode: 404 });
  }
  if (petDoc.data()!.ownerId !== ownerId) {
    throw Object.assign(new Error('Not authorized to access this pet'), { statusCode: 403 });
  }

  const snap = await db.collection(PREGNANCIES)
    .where('petId', '==', petId)
    .where('status', '==', 'active')
    .limit(1)
    .get();

  if (snap.empty) {
    throw Object.assign(new Error('No active pregnancy found'), { statusCode: 404 });
  }

  const doc = snap.docs[0]!;
  return { id: doc.id, ...doc.data() };
}

export async function getPregnancyById(id: string, ownerId: string) {
  const doc = await db.collection(PREGNANCIES).doc(id).get();
  if (!doc.exists) {
    throw Object.assign(new Error('Pregnancy not found'), { statusCode: 404 });
  }
  const data = doc.data()!;
  if (data.ownerId !== ownerId) {
    throw Object.assign(new Error('Not authorized to access this pregnancy'), { statusCode: 403 });
  }
  return { id: doc.id, ...data };
}

export async function updatePregnancy(id: string, ownerId: string, input: UpdatePregnancyInput) {
  const doc = await db.collection(PREGNANCIES).doc(id).get();
  if (!doc.exists) {
    throw Object.assign(new Error('Pregnancy not found'), { statusCode: 404 });
  }
  const data = doc.data()!;
  if (data.ownerId !== ownerId) {
    throw Object.assign(new Error('Not authorized to update this pregnancy'), { statusCode: 403 });
  }

  const updateData: Record<string, any> = {
    ...input,
    updatedAt: FieldValue.serverTimestamp(),
  };

  await db.collection(PREGNANCIES).doc(id).update(updateData);

  const updated = await db.collection(PREGNANCIES).doc(id).get();
  return { id: updated.id, ...updated.data() };
}

export async function getMilestones(pregnancyId: string, ownerId: string) {
  const doc = await db.collection(PREGNANCIES).doc(pregnancyId).get();
  if (!doc.exists) {
    throw Object.assign(new Error('Pregnancy not found'), { statusCode: 404 });
  }
  const data = doc.data()!;
  if (data.ownerId !== ownerId) {
    throw Object.assign(new Error('Not authorized to access this pregnancy'), { statusCode: 403 });
  }

  return data.milestones || [];
}

export async function completeMilestone(pregnancyId: string, milestoneId: string, ownerId: string) {
  const doc = await db.collection(PREGNANCIES).doc(pregnancyId).get();
  if (!doc.exists) {
    throw Object.assign(new Error('Pregnancy not found'), { statusCode: 404 });
  }
  const data = doc.data()!;
  if (data.ownerId !== ownerId) {
    throw Object.assign(new Error('Not authorized to update this pregnancy'), { statusCode: 403 });
  }

  const milestones = data.milestones || [];
  const milestoneIndex = milestones.findIndex((m: any) => m.id === milestoneId);
  if (milestoneIndex === -1) {
    throw Object.assign(new Error('Milestone not found'), { statusCode: 404 });
  }

  milestones[milestoneIndex].completed = true;
  milestones[milestoneIndex].completedAt = new Date().toISOString();

  await db.collection(PREGNANCIES).doc(pregnancyId).update({
    milestones,
    updatedAt: FieldValue.serverTimestamp(),
  });

  return milestones[milestoneIndex];
}

export async function addWeight(pregnancyId: string, ownerId: string, input: AddWeightInput) {
  const doc = await db.collection(PREGNANCIES).doc(pregnancyId).get();
  if (!doc.exists) {
    throw Object.assign(new Error('Pregnancy not found'), { statusCode: 404 });
  }
  const data = doc.data()!;
  if (data.ownerId !== ownerId) {
    throw Object.assign(new Error('Not authorized to update this pregnancy'), { statusCode: 403 });
  }

  const weightEntry = {
    date: input.date,
    weight: input.weight,
    unit: input.unit,
    notes: input.notes || '',
    recordedAt: new Date().toISOString(),
  };

  await db.collection(PREGNANCIES).doc(pregnancyId).update({
    weightLog: FieldValue.arrayUnion(weightEntry),
    updatedAt: FieldValue.serverTimestamp(),
  });

  return weightEntry;
}
