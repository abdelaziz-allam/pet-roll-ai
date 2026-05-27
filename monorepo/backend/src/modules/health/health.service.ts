import { db, FieldValue } from '../../config/firebase';

export class HealthService {
  private recordsRef = db.collection('health_records');
  private petsRef = db.collection('pets');

  async verifyPetOwnership(petId: string, ownerId: string) {
    const pet = await this.petsRef.doc(petId).get();
    if (!pet.exists || pet.data()!.ownerId !== ownerId) {
      const error: any = new Error('Pet not found');
      error.statusCode = 404;
      throw error;
    }
    return pet;
  }

  async createRecord(petId: string, ownerId: string, input: any) {
    await this.verifyPetOwnership(petId, ownerId);
    const data = {
      ...input,
      petId,
      ownerId,
      createdAt: FieldValue.serverTimestamp(),
      updatedAt: FieldValue.serverTimestamp(),
    };
    const doc = await this.recordsRef.add(data);
    return { id: doc.id, ...data };
  }

  async getRecords(petId: string, ownerId: string, page = 1, limit = 20) {
    await this.verifyPetOwnership(petId, ownerId);

    const countSnap = await this.recordsRef.where('petId', '==', petId).count().get();
    const total = countSnap.data().count;
    const offset = (page - 1) * limit;

    const snapshot = await this.recordsRef
      .where('petId', '==', petId)
      .orderBy('date', 'desc')
      .offset(offset)
      .limit(limit)
      .get();

    const records = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    return { data: records, total, page, limit, totalPages: Math.ceil(total / limit) };
  }

  async getRecordById(recordId: string, ownerId: string) {
    const doc = await this.recordsRef.doc(recordId).get();
    if (!doc.exists || doc.data()!.ownerId !== ownerId) {
      const error: any = new Error('Record not found');
      error.statusCode = 404;
      throw error;
    }
    return { id: doc.id, ...doc.data() };
  }

  async updateRecord(recordId: string, ownerId: string, input: any) {
    await this.getRecordById(recordId, ownerId);
    const updateData = { ...input, updatedAt: FieldValue.serverTimestamp() };
    await this.recordsRef.doc(recordId).update(updateData);
    return this.getRecordById(recordId, ownerId);
  }

  async deleteRecord(recordId: string, ownerId: string) {
    await this.getRecordById(recordId, ownerId);
    await this.recordsRef.doc(recordId).delete();
  }
}

export const healthService = new HealthService();
