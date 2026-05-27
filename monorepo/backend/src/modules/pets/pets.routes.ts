import type { FastifyInstance } from 'fastify';
import { createPetSchema, updatePetSchema } from './pets.schema.js';
import * as petsService from './pets.service.js';
import { requireAuth } from '../../middleware/require-auth.js';
import { uploadImage, MAX_FILE_SIZE, ALLOWED_MIME_TYPES } from '../../utils/image-upload.js';
import { db } from '../../config/firebase.js';

export async function petsRoutes(app: FastifyInstance) {
  // Create pet
  app.post('/', { preHandler: [requireAuth] }, async (request, reply) => {
    const body = createPetSchema.parse(request.body);
    const pet = await petsService.createPet(request.user!.uid, body);
    return reply.status(201).send(pet);
  });

  // List user's pets
  app.get('/', { preHandler: [requireAuth] }, async (request, reply) => {
    const pets = await petsService.getUserPets(request.user!.uid);
    return reply.send(pets);
  });

  // Get species list
  app.get('/species', { preHandler: [requireAuth] }, async (_request, reply) => {
    const species = [
      'dog', 'cat', 'bird', 'rabbit', 'horse', 'hamster', 'guinea pig',
      'fish', 'turtle', 'snake', 'lizard', 'parrot', 'ferret', 'chinchilla',
      'hedgehog', 'frog', 'hermit crab', 'gerbil', 'mouse', 'rat',
      'sugar glider', 'axolotl', 'chameleon', 'gecko', 'iguana',
      'cockatiel', 'canary', 'dove', 'pigeon', 'duck', 'chicken',
      'goat', 'sheep', 'pig', 'cow', 'donkey', 'alpaca', 'llama',
      'other',
    ];
    return reply.send(species);
  });

  // Get breeds (search/list from breeds collection)
  app.get('/breeds', { preHandler: [requireAuth] }, async (request, reply) => {
    const { species, search } = request.query as { species?: string; search?: string };

    let query: FirebaseFirestore.Query = db.collection('breeds');

    if (species) {
      query = query.where('species', '==', species);
    }

    const snapshot = await query.orderBy('name').get();
    let breeds = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

    if (search) {
      const searchLower = search.toLowerCase();
      breeds = breeds.filter((b: any) => b.name.toLowerCase().includes(searchLower));
    }

    return reply.send(breeds);
  });

  // Get single pet
  app.get('/:petId', { preHandler: [requireAuth] }, async (request, reply) => {
    const { petId } = request.params as { petId: string };
    const pet = await petsService.getPetById(petId, request.user!.uid);
    return reply.send(pet);
  });

  // Update pet
  app.put('/:petId', { preHandler: [requireAuth] }, async (request, reply) => {
    const { petId } = request.params as { petId: string };
    const body = updatePetSchema.parse(request.body);
    const pet = await petsService.updatePet(petId, request.user!.uid, body);
    return reply.send(pet);
  });

  // Delete pet
  app.delete('/:petId', { preHandler: [requireAuth] }, async (request, reply) => {
    const { petId } = request.params as { petId: string };
    await petsService.deletePet(petId, request.user!.uid);
    return reply.status(204).send();
  });

  // Upload pet photo
  app.post('/:petId/photos', { preHandler: [requireAuth] }, async (request, reply) => {
    const { petId } = request.params as { petId: string };
    const data = await request.file();

    if (!data) {
      return reply.status(400).send({ message: 'No file uploaded' });
    }

    if (!ALLOWED_MIME_TYPES.includes(data.mimetype)) {
      return reply.status(400).send({
        message: `Invalid file type. Allowed: ${ALLOWED_MIME_TYPES.join(', ')}`,
      });
    }

    const buffer = await data.toBuffer();

    if (buffer.length > MAX_FILE_SIZE) {
      return reply.status(400).send({
        message: `File too large. Maximum size: ${MAX_FILE_SIZE / 1024 / 1024}MB`,
      });
    }

    const result = await uploadImage(buffer, `pets/${petId}`, data.mimetype, {
      ownerId: request.user!.uid,
    });
    const photo = await petsService.addPetPhoto(petId, request.user!.uid, result.url, result.path);

    return reply.status(201).send(photo);
  });

  // Remove pet photo
  app.delete('/:petId/photos/:photoId', { preHandler: [requireAuth] }, async (request, reply) => {
    const { petId, photoId } = request.params as { petId: string; photoId: string };

    // photoId is the encoded storage path
    const path = decodeURIComponent(photoId);
    await petsService.removePetPhoto(petId, request.user!.uid, path);

    return reply.status(204).send();
  });
}
