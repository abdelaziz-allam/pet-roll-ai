import { db, FieldValue, storage } from '../../config/firebase';
import { CreatePetInput, UpdatePetInput } from './pets.schema';

export class PetsService {
  private petsRef = db.collection('pets');

  async createPet(ownerId: string, input: CreatePetInput) {
    const petInput = { ...input };

    if (!petInput.location?.country && !petInput.location?.city) {
      const ownerDoc = await db.collection('users').doc(ownerId).get();
      if (ownerDoc.exists) {
        const ownerData = ownerDoc.data()!;
        if (ownerData.country || ownerData.city) {
          petInput.location = {
            ...petInput.location,
            country: ownerData.country || undefined,
            city: ownerData.city || undefined,
          };
        }
      }
    }

    const petData = {
      ...petInput,
      ownerId,
      photos: [],
      createdAt: FieldValue.serverTimestamp(),
      updatedAt: FieldValue.serverTimestamp(),
    };

    const doc = await this.petsRef.add(petData);
    return { id: doc.id, ...petData };
  }

  async getUserPets(ownerId: string, page = 1, limit = 20) {
    const countSnap = await this.petsRef.where('ownerId', '==', ownerId).count().get();
    const total = countSnap.data().count;

    const offset = (page - 1) * limit;
    const snapshot = await this.petsRef
      .where('ownerId', '==', ownerId)
      .orderBy('createdAt', 'desc')
      .offset(offset)
      .limit(limit)
      .get();

    const pets = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    return { data: pets, total, page, limit, totalPages: Math.ceil(total / limit) };
  }

  async getPetById(petId: string, ownerId: string) {
    const doc = await this.petsRef.doc(petId).get();
    if (!doc.exists) {
      const error: any = new Error('Pet not found');
      error.statusCode = 404;
      throw error;
    }

    const data = doc.data()!;
    if (data.ownerId !== ownerId) {
      const error: any = new Error('Pet not found');
      error.statusCode = 404;
      throw error;
    }

    return { id: doc.id, ...data };
  }

  async updatePet(petId: string, ownerId: string, input: UpdatePetInput) {
    await this.getPetById(petId, ownerId);
    const updateData = { ...input, updatedAt: FieldValue.serverTimestamp() };
    await this.petsRef.doc(petId).update(updateData);
    return this.getPetById(petId, ownerId);
  }

  async deletePet(petId: string, ownerId: string) {
    await this.getPetById(petId, ownerId);

    const batch = db.batch();
    const collections = ['health_records', 'vaccinations', 'pregnancies', 'schedules'];
    for (const col of collections) {
      const snap = await db.collection(col).where('petId', '==', petId).get();
      snap.docs.forEach((doc) => batch.delete(doc.ref));
    }
    batch.delete(this.petsRef.doc(petId));
    await batch.commit();

    try {
      const bucket = storage.bucket();
      await bucket.deleteFiles({ prefix: `pets/${ownerId}/${petId}/` });
    } catch {}
  }

  async addPetPhoto(petId: string, ownerId: string, url: string, path: string) {
    const pet = await this.getPetById(petId, ownerId) as any;
    const currentPhotos = pet.photos || [];
    if (currentPhotos.length >= 50) {
      const error: any = new Error('Maximum 50 photos per pet reached');
      error.statusCode = 400;
      throw error;
    }
    await this.petsRef.doc(petId).update({
      photos: FieldValue.arrayUnion({ url, path, uploadedAt: new Date().toISOString() }),
      updatedAt: FieldValue.serverTimestamp(),
    });
    return this.getPetById(petId, ownerId);
  }

  async removePetPhoto(petId: string, ownerId: string, path: string) {
    const pet = await this.getPetById(petId, ownerId) as any;
    const photo = pet.photos?.find((p: any) => p.path === path);
    if (!photo) {
      const error: any = new Error('Photo not found');
      error.statusCode = 404;
      throw error;
    }

    await this.petsRef.doc(petId).update({
      photos: FieldValue.arrayRemove(photo),
      updatedAt: FieldValue.serverTimestamp(),
    });

    try {
      await storage.bucket().file(path).delete();
    } catch {}
  }
}

export const petsService = new PetsService();
