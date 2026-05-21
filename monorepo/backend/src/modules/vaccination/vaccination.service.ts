import { db, FieldValue } from '../../config/firebase';

export class VaccinationService {
  private vacRef = db.collection('vaccinations');
  private petsRef = db.collection('pets');

  async verifyPetOwnership(petId: string, ownerId: string) {
    const pet = await this.petsRef.doc(petId).get();
    if (!pet.exists || pet.data()!.ownerId !== ownerId) {
      const error: any = new Error('Pet not found');
      error.statusCode = 404;
      throw error;
    }
  }

  async logVaccination(petId: string, ownerId: string, input: any) {
    await this.verifyPetOwnership(petId, ownerId);
    const normalized = {
      ...input,
      name: input.name || input.vaccineName,
      vaccineName: input.vaccineName || input.name,
      dateAdministered: input.dateAdministered || input.administeredDate,
      administeredDate: input.administeredDate || input.dateAdministered,
      veterinarian: input.veterinarian || input.vetName,
    };
    const data = {
      ...normalized,
      petId,
      ownerId,
      createdAt: FieldValue.serverTimestamp(),
      updatedAt: FieldValue.serverTimestamp(),
    };
    const doc = await this.vacRef.add(data);
    return { id: doc.id, ...data };
  }

  async getVaccinations(petId: string, ownerId: string, page = 1, limit = 20) {
    await this.verifyPetOwnership(petId, ownerId);

    const countSnap = await this.vacRef.where('petId', '==', petId).count().get();
    const total = countSnap.data().count;
    const offset = (page - 1) * limit;

    const snapshot = await this.vacRef
      .where('petId', '==', petId)
      .orderBy('createdAt', 'desc')
      .offset(offset)
      .limit(limit)
      .get();

    const records = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    return { data: records, total, page, limit, totalPages: Math.ceil(total / limit) };
  }

  async getUpcoming(petId: string, ownerId: string) {
    await this.verifyPetOwnership(petId, ownerId);
    const now = new Date().toISOString();
    const snapshot = await this.vacRef
      .where('petId', '==', petId)
      .where('nextDueDate', '>=', now)
      .orderBy('nextDueDate', 'asc')
      .limit(10)
      .get();

    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  }

  async updateVaccination(vacId: string, ownerId: string, input: any) {
    const doc = await this.vacRef.doc(vacId).get();
    if (!doc.exists || doc.data()!.ownerId !== ownerId) {
      const error: any = new Error('Vaccination record not found');
      error.statusCode = 404;
      throw error;
    }
    await this.vacRef.doc(vacId).update({ ...input, updatedAt: FieldValue.serverTimestamp() });
    const updated = await this.vacRef.doc(vacId).get();
    return { id: updated.id, ...updated.data() };
  }

  async deleteVaccination(vacId: string, ownerId: string) {
    const doc = await this.vacRef.doc(vacId).get();
    if (!doc.exists || doc.data()!.ownerId !== ownerId) {
      const error: any = new Error('Vaccination record not found');
      error.statusCode = 404;
      throw error;
    }
    await this.vacRef.doc(vacId).delete();
  }
}

export const vaccinationService = new VaccinationService();
