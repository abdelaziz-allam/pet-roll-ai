import { db, FieldValue } from '../../config/firebase';

export class SchedulesService {
  private schedulesRef = db.collection('schedules');
  private petsRef = db.collection('pets');

  async verifyPetOwnership(petId: string, ownerId: string) {
    const pet = await this.petsRef.doc(petId).get();
    if (!pet.exists || pet.data()!.ownerId !== ownerId) {
      const error: any = new Error('Pet not found');
      error.statusCode = 404;
      throw error;
    }
  }

  async createSchedule(petId: string, ownerId: string, input: any) {
    await this.verifyPetOwnership(petId, ownerId);
    const data = {
      ...input,
      petId,
      ownerId,
      completionLog: [],
      createdAt: FieldValue.serverTimestamp(),
      updatedAt: FieldValue.serverTimestamp(),
    };
    const doc = await this.schedulesRef.add(data);
    return { id: doc.id, ...data };
  }

  async getSchedules(petId: string, ownerId: string, page = 1, limit = 20) {
    await this.verifyPetOwnership(petId, ownerId);
    const countSnap = await this.schedulesRef.where('petId', '==', petId).count().get();
    const total = countSnap.data().count;
    const offset = (page - 1) * limit;

    const snapshot = await this.schedulesRef
      .where('petId', '==', petId)
      .orderBy('nextDue', 'asc')
      .offset(offset)
      .limit(limit)
      .get();

    const schedules = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    return { data: schedules, total, page, limit, totalPages: Math.ceil(total / limit) };
  }

  async updateSchedule(scheduleId: string, ownerId: string, input: any) {
    const doc = await this.schedulesRef.doc(scheduleId).get();
    if (!doc.exists || doc.data()!.ownerId !== ownerId) {
      const error: any = new Error('Schedule not found');
      error.statusCode = 404;
      throw error;
    }
    await this.schedulesRef.doc(scheduleId).update({ ...input, updatedAt: FieldValue.serverTimestamp() });
    const updated = await this.schedulesRef.doc(scheduleId).get();
    return { id: updated.id, ...updated.data() };
  }

  async deleteSchedule(scheduleId: string, ownerId: string) {
    const doc = await this.schedulesRef.doc(scheduleId).get();
    if (!doc.exists || doc.data()!.ownerId !== ownerId) {
      const error: any = new Error('Schedule not found');
      error.statusCode = 404;
      throw error;
    }
    await this.schedulesRef.doc(scheduleId).delete();
  }

  async logCompletion(scheduleId: string, ownerId: string) {
    const doc = await this.schedulesRef.doc(scheduleId).get();
    if (!doc.exists || doc.data()!.ownerId !== ownerId) {
      const error: any = new Error('Schedule not found');
      error.statusCode = 404;
      throw error;
    }
    await this.schedulesRef.doc(scheduleId).update({
      completionLog: FieldValue.arrayUnion({ completedAt: new Date().toISOString() }),
      lastCompleted: new Date().toISOString(),
      updatedAt: FieldValue.serverTimestamp(),
    });
    const updated = await this.schedulesRef.doc(scheduleId).get();
    return { id: updated.id, ...updated.data() };
  }
}

export const schedulesService = new SchedulesService();
