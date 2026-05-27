import { db, FieldValue } from '../../config/firebase';

export class PregnancyService {
  private pregRef = db.collection('pregnancies');
  private petsRef = db.collection('pets');

  async verifyPetOwnership(petId: string, ownerId: string) {
    const pet = await this.petsRef.doc(petId).get();
    if (!pet.exists || pet.data()!.ownerId !== ownerId) {
      const error: any = new Error('Pet not found');
      error.statusCode = 404;
      throw error;
    }
    return pet.data()!;
  }

  async startTracking(petId: string, ownerId: string, input: any) {
    const petData = await this.verifyPetOwnership(petId, ownerId);

    const activeSnap = await this.pregRef
      .where('petId', '==', petId)
      .where('status', '==', 'active')
      .get();

    if (!activeSnap.empty) {
      const error: any = new Error('Pet already has an active pregnancy');
      error.statusCode = 409;
      throw error;
    }

    const matingDateStr = input.matingDate || input.startDate;
    const matingDate = new Date(matingDateStr);
    const gestationDays = petData.species === 'dog' ? 63 : 65;
    const calculatedDueDate = new Date(matingDate.getTime() + gestationDays * 24 * 60 * 60 * 1000);
    const expectedDueDate = input.expectedDueDate || calculatedDueDate.toISOString().split('T')[0];

    const data = {
      petId,
      ownerId,
      matingDate: matingDateStr,
      startDate: matingDateStr,
      expectedDueDate,
      status: input.status || 'active',
      mateInfo: input.mateInfo || null,
      fatherInfo: input.fatherInfo || null,
      weightLog: [],
      milestones: [],
      notes: input.notes || null,
      createdAt: FieldValue.serverTimestamp(),
      updatedAt: FieldValue.serverTimestamp(),
    };

    const doc = await this.pregRef.add(data);
    return { id: doc.id, ...data };
  }

  async getAll(petId: string, ownerId: string, page = 1, limit = 20) {
    await this.verifyPetOwnership(petId, ownerId);
    const countSnap = await this.pregRef.where('petId', '==', petId).count().get();
    const total = countSnap.data().count;
    const offset = (page - 1) * limit;

    const snapshot = await this.pregRef
      .where('petId', '==', petId)
      .orderBy('createdAt', 'desc')
      .offset(offset)
      .limit(limit)
      .get();

    const records = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    return { data: records, total, page, limit, totalPages: Math.ceil(total / limit) };
  }

  async getActive(petId: string, ownerId: string) {
    await this.verifyPetOwnership(petId, ownerId);
    const snapshot = await this.pregRef
      .where('petId', '==', petId)
      .where('status', '==', 'active')
      .limit(1)
      .get();

    if (snapshot.empty) {
      return null;
    }
    const doc = snapshot.docs[0];
    return { id: doc.id, ...doc.data() };
  }

  async getById(pregId: string, ownerId: string) {
    const doc = await this.pregRef.doc(pregId).get();
    if (!doc.exists || doc.data()!.ownerId !== ownerId) {
      const error: any = new Error('Pregnancy record not found');
      error.statusCode = 404;
      throw error;
    }
    return { id: doc.id, ...doc.data() };
  }

  async update(pregId: string, ownerId: string, input: any) {
    await this.getById(pregId, ownerId);
    await this.pregRef.doc(pregId).update({ ...input, updatedAt: FieldValue.serverTimestamp() });
    return this.getById(pregId, ownerId);
  }

  async addWeight(pregId: string, ownerId: string, weight: number) {
    await this.getById(pregId, ownerId);
    await this.pregRef.doc(pregId).update({
      weightLog: FieldValue.arrayUnion({ weight, date: new Date().toISOString(), }),
      updatedAt: FieldValue.serverTimestamp(),
    });
    return this.getById(pregId, ownerId);
  }

  async getMilestones(pregId: string, ownerId: string) {
    const preg = await this.getById(pregId, ownerId) as any;
    return preg.milestones || [];
  }

  async completeMilestone(pregId: string, milestoneId: string, ownerId: string) {
    const preg = await this.getById(pregId, ownerId) as any;
    const milestones = preg.milestones || [];
    const idx = milestones.findIndex((m: any) => m.id === milestoneId);
    if (idx === -1) {
      const error: any = new Error('Milestone not found');
      error.statusCode = 404;
      throw error;
    }
    milestones[idx].completed = true;
    milestones[idx].completedAt = new Date().toISOString();
    await this.pregRef.doc(pregId).update({ milestones, updatedAt: FieldValue.serverTimestamp() });
    return milestones[idx];
  }
}

export const pregnancyService = new PregnancyService();
