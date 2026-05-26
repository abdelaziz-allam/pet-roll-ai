import { db } from '../../config/firebase.js';
import { FieldValue } from 'firebase-admin/firestore';
import { addDays, addWeeks, toISODate } from '../../utils/date-helpers.js';
import type { CreateScheduleInput, UpdateScheduleInput, LogCompletionInput } from './schedules.schema.js';

const SCHEDULES = 'schedules';
const PETS = 'pets';

function calculateNextTrigger(startDate: string, times: string[], frequency: string, daysOfWeek?: number[]): string {
  const now = new Date();
  const start = new Date(startDate);

  // Use the earliest time in the array
  const sortedTimes = [...times].sort();
  const [hours, minutes] = sortedTimes[0]!.split(':').map(Number);

  let candidate = new Date(start);
  candidate.setHours(hours!, minutes!, 0, 0);

  if (frequency === 'daily') {
    while (candidate <= now) {
      candidate = addDays(candidate, 1);
    }
  } else if (frequency === 'weekly' && daysOfWeek && daysOfWeek.length > 0) {
    while (candidate <= now || !daysOfWeek.includes(candidate.getDay())) {
      candidate = addDays(candidate, 1);
    }
    candidate.setHours(hours!, minutes!, 0, 0);
  } else {
    // custom: default to daily behavior
    while (candidate <= now) {
      candidate = addDays(candidate, 1);
    }
  }

  return candidate.toISOString();
}

export async function createSchedule(ownerId: string, input: CreateScheduleInput) {
  // Verify pet ownership
  const petDoc = await db.collection(PETS).doc(input.petId).get();
  if (!petDoc.exists) {
    throw Object.assign(new Error('Pet not found'), { statusCode: 404 });
  }
  if (petDoc.data()!.ownerId !== ownerId) {
    throw Object.assign(new Error('Not authorized to manage this pet'), { statusCode: 403 });
  }

  const nextTrigger = calculateNextTrigger(input.startDate, input.times, input.frequency, input.daysOfWeek);

  const scheduleData = {
    ...input,
    ownerId,
    active: true,
    nextTrigger,
    createdAt: FieldValue.serverTimestamp(),
    updatedAt: FieldValue.serverTimestamp(),
  };

  const docRef = await db.collection(SCHEDULES).add(scheduleData);

  return { id: docRef.id, ...scheduleData };
}

export async function getSchedules(petId: string, ownerId: string) {
  // Verify pet ownership
  const petDoc = await db.collection(PETS).doc(petId).get();
  if (!petDoc.exists) {
    throw Object.assign(new Error('Pet not found'), { statusCode: 404 });
  }
  if (petDoc.data()!.ownerId !== ownerId) {
    throw Object.assign(new Error('Not authorized to access this pet'), { statusCode: 403 });
  }

  const snap = await db.collection(SCHEDULES)
    .where('petId', '==', petId)
    .where('ownerId', '==', ownerId)
    .where('active', '==', true)
    .get();

  return snap.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
}

export async function updateSchedule(id: string, ownerId: string, input: UpdateScheduleInput) {
  const doc = await db.collection(SCHEDULES).doc(id).get();
  if (!doc.exists) {
    throw Object.assign(new Error('Schedule not found'), { statusCode: 404 });
  }
  const data = doc.data()!;
  if (data.ownerId !== ownerId) {
    throw Object.assign(new Error('Not authorized to update this schedule'), { statusCode: 403 });
  }

  const updateData: Record<string, any> = {
    ...input,
    updatedAt: FieldValue.serverTimestamp(),
  };

  // Recalculate nextTrigger if schedule timing changed
  if (input.times || input.frequency || input.startDate || input.daysOfWeek) {
    const times = input.times || data.times;
    const frequency = input.frequency || data.frequency;
    const startDate = input.startDate || data.startDate;
    const daysOfWeek = input.daysOfWeek || data.daysOfWeek;
    updateData.nextTrigger = calculateNextTrigger(startDate, times, frequency, daysOfWeek);
  }

  await db.collection(SCHEDULES).doc(id).update(updateData);

  const updated = await db.collection(SCHEDULES).doc(id).get();
  return { id: updated.id, ...updated.data() };
}

export async function deleteSchedule(id: string, ownerId: string) {
  const doc = await db.collection(SCHEDULES).doc(id).get();
  if (!doc.exists) {
    throw Object.assign(new Error('Schedule not found'), { statusCode: 404 });
  }
  if (doc.data()!.ownerId !== ownerId) {
    throw Object.assign(new Error('Not authorized to delete this schedule'), { statusCode: 403 });
  }

  await db.collection(SCHEDULES).doc(id).delete();
}

export async function logCompletion(scheduleId: string, ownerId: string, input: LogCompletionInput) {
  const doc = await db.collection(SCHEDULES).doc(scheduleId).get();
  if (!doc.exists) {
    throw Object.assign(new Error('Schedule not found'), { statusCode: 404 });
  }
  const data = doc.data()!;
  if (data.ownerId !== ownerId) {
    throw Object.assign(new Error('Not authorized to log for this schedule'), { statusCode: 403 });
  }

  const completionEntry = {
    completedAt: input.completedAt,
    notes: input.notes || '',
    loggedAt: new Date().toISOString(),
  };

  const completionRef = await db.collection(SCHEDULES).doc(scheduleId)
    .collection('completions')
    .add({
      ...completionEntry,
      createdAt: FieldValue.serverTimestamp(),
    });

  // Recalculate nextTrigger after completion
  const nextTrigger = calculateNextTrigger(data.startDate, data.times, data.frequency, data.daysOfWeek);
  await db.collection(SCHEDULES).doc(scheduleId).update({
    nextTrigger,
    updatedAt: FieldValue.serverTimestamp(),
  });

  return { id: completionRef.id, ...completionEntry };
}
