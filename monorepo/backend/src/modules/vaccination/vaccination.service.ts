import { db } from '../../config/firebase.js';
import { FieldValue } from 'firebase-admin/firestore';
import type { CreateVaccinationInput, UpdateVaccinationInput } from './vaccination.schema.js';

const VACCINATIONS = 'vaccinations';
const VACCINE_TEMPLATES = 'vaccine_templates';
const PETS = 'pets';

async function verifyPetOwnership(petId: string, ownerId: string) {
  const petDoc = await db.collection(PETS).doc(petId).get();
  if (!petDoc.exists || petDoc.data()?.ownerId !== ownerId) {
    throw Object.assign(new Error('Pet not found or access denied'), { statusCode: 404 });
  }
}

async function calculateNextDueDate(vaccineId: string, dateAdministered: string): Promise<string | null> {
  const templateDoc = await db.collection(VACCINE_TEMPLATES).doc(vaccineId).get();
  if (!templateDoc.exists) {
    return null;
  }

  const template = templateDoc.data();
  if (!template?.intervalDays) {
    return null;
  }

  const administered = new Date(dateAdministered);
  administered.setDate(administered.getDate() + template.intervalDays);
  return administered.toISOString();
}

export async function logVaccination(ownerId: string, input: CreateVaccinationInput) {
  await verifyPetOwnership(input.petId, ownerId);

  let nextDueDate: string | null = input.nextDueDate ?? null;
  if (!nextDueDate && input.vaccineId) {
    nextDueDate = await calculateNextDueDate(input.vaccineId, input.dateAdministered);
  }

  const vaccinationData = {
    ...input,
    ownerId,
    nextDueDate,
    createdAt: FieldValue.serverTimestamp(),
    updatedAt: FieldValue.serverTimestamp(),
  };

  const docRef = await db.collection(VACCINATIONS).add(vaccinationData);
  return { id: docRef.id, ...vaccinationData };
}

export async function getVaccinations(petId: string, ownerId: string) {
  await verifyPetOwnership(petId, ownerId);

  const snapshot = await db
    .collection(VACCINATIONS)
    .where('petId', '==', petId)
    .where('ownerId', '==', ownerId)
    .orderBy('dateAdministered', 'desc')
    .get();

  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
}

export async function getUpcoming(ownerId: string) {
  const now = new Date();
  const thirtyDaysFromNow = new Date();
  thirtyDaysFromNow.setDate(thirtyDaysFromNow.getDate() + 30);

  const snapshot = await db
    .collection(VACCINATIONS)
    .where('ownerId', '==', ownerId)
    .where('nextDueDate', '!=', null)
    .where('nextDueDate', '<=', thirtyDaysFromNow.toISOString())
    .orderBy('nextDueDate', 'asc')
    .get();

  return snapshot.docs.map((doc) => {
    const data = doc.data();
    const isOverdue = data.nextDueDate < now.toISOString();
    return { id: doc.id, ...data, isOverdue };
  });
}

export async function updateVaccination(id: string, ownerId: string, input: UpdateVaccinationInput) {
  const doc = await db.collection(VACCINATIONS).doc(id).get();
  if (!doc.exists || doc.data()?.ownerId !== ownerId) {
    throw Object.assign(new Error('Vaccination record not found'), { statusCode: 404 });
  }

  const currentData = doc.data()!;

  // Enforce: cannot mark vaccination as completed unless all doses are completed
  if (input.status === 'completed') {
    const doses = input.doses ?? currentData.doses ?? [];
    if (doses.length === 0) {
      throw Object.assign(
        new Error('Cannot mark vaccination as completed: no doses defined'),
        { statusCode: 400 }
      );
    }
    const allCompleted = doses.every((d: any) => d.status === 'completed');
    if (!allCompleted) {
      throw Object.assign(
        new Error('Cannot mark vaccination as completed: all doses must be completed first'),
        { statusCode: 400 }
      );
    }
  }

  // Auto-set status to completed when all doses become completed
  if (input.doses && input.doses.length > 0 && !input.status) {
    const allCompleted = input.doses.every((d) => d.status === 'completed');
    if (allCompleted) {
      (input as any).status = 'completed';
    } else {
      (input as any).status = 'active';
    }
  }

  const updateData: Record<string, any> = {
    ...input,
    updatedAt: FieldValue.serverTimestamp(),
  };

  // Recalculate nextDueDate if dateAdministered or vaccineId changed
  if (input.dateAdministered || input.vaccineId) {
    const vaccineId = input.vaccineId || currentData.vaccineId;
    const dateAdministered = input.dateAdministered || currentData.dateAdministered;
    if (vaccineId) {
      updateData.nextDueDate = await calculateNextDueDate(vaccineId, dateAdministered);
    }
  }

  await db.collection(VACCINATIONS).doc(id).update(updateData);
  return { id, ...currentData, ...updateData };
}

export async function deleteVaccination(id: string, ownerId: string) {
  const doc = await db.collection(VACCINATIONS).doc(id).get();
  if (!doc.exists || doc.data()?.ownerId !== ownerId) {
    throw Object.assign(new Error('Vaccination record not found'), { statusCode: 404 });
  }

  await db.collection(VACCINATIONS).doc(id).delete();
}
