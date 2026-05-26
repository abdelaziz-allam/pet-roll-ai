import { db } from '../../config/firebase.js';
import { FieldValue } from 'firebase-admin/firestore';
import { deleteFolder, deleteFile } from '../../utils/image-upload.js';
import type { CreatePetInput, UpdatePetInput } from './pets.schema.js';

const PETS = 'pets';

export async function createPet(ownerId: string, input: CreatePetInput) {
  const petData = {
    ...input,
    ownerId,
    photos: [],
    createdAt: FieldValue.serverTimestamp(),
    updatedAt: FieldValue.serverTimestamp(),
  };

  const docRef = await db.collection(PETS).add(petData);
  const doc = await docRef.get();

  return { id: doc.id, ...doc.data() };
}

export async function getUserPets(ownerId: string) {
  const snapshot = await db
    .collection(PETS)
    .where('ownerId', '==', ownerId)
    .orderBy('createdAt', 'desc')
    .get();

  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
}

export async function getPetById(petId: string, ownerId: string) {
  const doc = await db.collection(PETS).doc(petId).get();

  if (!doc.exists) {
    throw Object.assign(new Error('Pet not found'), { statusCode: 404 });
  }

  const pet = doc.data()!;
  if (pet.ownerId !== ownerId) {
    throw Object.assign(new Error('Pet not found'), { statusCode: 404 });
  }

  return { id: doc.id, ...pet };
}

export async function updatePet(petId: string, ownerId: string, input: UpdatePetInput) {
  await getPetById(petId, ownerId); // Verify ownership

  const updateData: Record<string, any> = {
    ...input,
    updatedAt: FieldValue.serverTimestamp(),
  };

  await db.collection(PETS).doc(petId).update(updateData);

  const updated = await db.collection(PETS).doc(petId).get();
  return { id: updated.id, ...updated.data() };
}

export async function deletePet(petId: string, ownerId: string) {
  await getPetById(petId, ownerId); // Verify ownership

  // Cascade delete related collections
  const relatedCollections = ['health_records', 'vaccinations', 'pregnancies', 'schedules'];

  await Promise.all(
    relatedCollections.map(async (collection) => {
      const snapshot = await db
        .collection(collection)
        .where('petId', '==', petId)
        .get();

      const batch = db.batch();
      snapshot.docs.forEach((doc) => batch.delete(doc.ref));
      if (!snapshot.empty) {
        await batch.commit();
      }
    })
  );

  // Delete pet photos from storage
  await deleteFolder(`pets/${petId}`);

  // Delete the pet document
  await db.collection(PETS).doc(petId).delete();
}

export async function addPetPhoto(petId: string, ownerId: string, url: string, path: string) {
  await getPetById(petId, ownerId); // Verify ownership

  const photo = {
    url,
    path,
    uploadedAt: new Date().toISOString(),
  };

  await db.collection(PETS).doc(petId).update({
    photos: FieldValue.arrayUnion(photo),
    updatedAt: FieldValue.serverTimestamp(),
  });

  return photo;
}

export async function removePetPhoto(petId: string, ownerId: string, path: string) {
  const pet = await getPetById(petId, ownerId); // Verify ownership

  const photos = (pet as any).photos || [];
  const photo = photos.find((p: any) => p.path === path);

  if (!photo) {
    throw Object.assign(new Error('Photo not found'), { statusCode: 404 });
  }

  // Remove from storage
  await deleteFile(path);

  // Remove from array
  await db.collection(PETS).doc(petId).update({
    photos: FieldValue.arrayRemove(photo),
    updatedAt: FieldValue.serverTimestamp(),
  });
}
