import { FastifyInstance } from 'fastify';
import { petsService } from './pets.service';
import { createPetSchema, updatePetSchema } from './pets.schema';
import { requireAuth } from '../../middleware/require-auth';
import { db, storage } from '../../config/firebase';
import { env } from '../../config/env';
import { adminService } from '../admin/admin.service';
import { healthCertificationService } from './health-certification.service';

export async function petsRoutes(fastify: FastifyInstance) {
  fastify.addHook('preHandler', requireAuth);

  fastify.post('/', async (request, reply) => {
    const body = createPetSchema.parse(request.body);
    const pet = await petsService.createPet(request.user!.uid, body);
    return reply.code(201).send(pet);
  });

  fastify.get('/', async (request, reply) => {
    const { page = 1, limit = 20 } = request.query as any;
    const result = await petsService.getUserPets(request.user!.uid, +page, +limit);
    return reply.code(200).send(result);
  });

  fastify.get('/breeds', async (request, reply) => {
    const { species, search } = request.query as { species?: string; search?: string };
    let query: any = db.collection('breeds');

    if (species) {
      query = query.where('species', '==', species);
    }

    const snapshot = await query.get();
    let breeds = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

    if (search) {
      const term = search.toLowerCase();
      breeds = breeds.filter((b: any) => b.name.toLowerCase().includes(term));
    }

    return reply.code(200).send(breeds);
  });

  fastify.get('/:petId', async (request, reply) => {
    const { petId } = request.params as { petId: string };
    const pet = await petsService.getPetById(petId, request.user!.uid);
    return reply.code(200).send(pet);
  });

  fastify.put('/:petId', async (request, reply) => {
    const { petId } = request.params as { petId: string };
    const body = updatePetSchema.parse(request.body);
    const pet = await petsService.updatePet(petId, request.user!.uid, body);
    return reply.code(200).send(pet);
  });

  fastify.delete('/:petId', async (request, reply) => {
    const { petId } = request.params as { petId: string };
    await petsService.deletePet(petId, request.user!.uid);
    return reply.code(204).send();
  });

  fastify.post('/:petId/photos', async (request, reply) => {
    const { petId } = request.params as { petId: string };
    const { url, path } = request.body as { url: string; path: string };
    const pet = await petsService.addPetPhoto(petId, request.user!.uid, url, path);
    return reply.code(200).send(pet);
  });

  fastify.post('/:petId/photos/upload', async (request, reply) => {
    const { petId } = request.params as { petId: string };
    const ownerId = request.user!.uid;

    const data = await request.file();
    if (!data) {
      return reply.code(400).send({ error: 'No file uploaded' });
    }

    const timestamp = Date.now();
    const filename = data.filename;
    const storagePath = `pets/${ownerId}/${petId}/${timestamp}_${filename}`;

    if (env.USE_MEMORY_STORE) {
      const fakeUrl = `https://storage.example.com/${storagePath}`;
      return reply.code(200).send({ url: fakeUrl, path: storagePath });
    }

    const bucket = storage.bucket(env.GCS_BUCKET);
    const file = bucket.file(storagePath);

    const stream = file.createWriteStream({
      metadata: {
        contentType: data.mimetype,
      },
      resumable: false,
    });

    await new Promise<void>((resolve, reject) => {
      data.file.pipe(stream);
      stream.on('error', reject);
      stream.on('finish', resolve);
    });

    await file.makePublic();

    const publicUrl = `https://storage.googleapis.com/${env.GCS_BUCKET}/${storagePath}`;
    return reply.code(200).send({ url: publicUrl, path: storagePath });
  });

  fastify.delete('/:petId/photos/:photoId', async (request, reply) => {
    const { petId, photoId } = request.params as { petId: string; photoId: string };
    await petsService.removePetPhoto(petId, request.user!.uid, decodeURIComponent(photoId));
    return reply.code(204).send();
  });

  fastify.get('/locations/countries', async (_request, reply) => {
    const result = await adminService.getCountries();
    return reply.code(200).send(result);
  });

  fastify.get('/locations/cities', async (request, reply) => {
    const { country } = request.query as { country?: string };
    const result = await adminService.getCities(country);
    return reply.code(200).send(result);
  });

  // --- Dashboard Summary ---
  fastify.get('/:petId/summary', async (request, reply) => {
    const { petId } = request.params as { petId: string };
    const ownerId = request.user!.uid;

    const petDoc = await db.collection('pets').doc(petId).get();
    if (!petDoc.exists || petDoc.data()!.ownerId !== ownerId) {
      return reply.code(404).send({ error: 'Pet not found' });
    }
    const petData = petDoc.data()!;

    const now = new Date().toISOString();

    const vacSnap = await db.collection('vaccinations')
      .where('petId', '==', petId)
      .get();
    const vaccinations = vacSnap.docs.map((d) => d.data());
    const overdueVax = vaccinations.filter((v: any) => v.nextDueDate && v.nextDueDate < now);
    let vaccineStatus: string;
    if (vaccinations.length === 0) {
      vaccineStatus = 'No records';
    } else if (overdueVax.length > 0) {
      vaccineStatus = `${overdueVax.length} overdue`;
    } else {
      vaccineStatus = 'Up to date';
    }

    const healthSnap = await db.collection('health_records')
      .where('petId', '==', petId)
      .get();
    const healthRecords = healthSnap.docs.map((d) => d.data());
    const futureCheckups = healthRecords
      .filter((r: any) => r.nextVisitDate && r.nextVisitDate >= now)
      .sort((a: any, b: any) => (a.nextVisitDate || '').localeCompare(b.nextVisitDate || ''));
    const nextCheckup = futureCheckups.length > 0
      ? futureCheckups[0].nextVisitDate
      : null;

    const latestWeight = petData.weight
      || healthRecords
          .filter((r: any) => r.weight)
          .sort((a: any, b: any) => (b.date || '').localeCompare(a.date || ''))
          .map((r: any) => r.weight)[0]
      || null;

    return reply.code(200).send({
      vaccineStatus,
      nextCheckup,
      weight: latestWeight,
      totalVaccinations: vaccinations.length,
      totalHealthRecords: healthRecords.length,
    });
  });

  // --- Health Certification ---

  fastify.post('/:petId/health-certification', async (request, reply) => {
    const { petId } = request.params as { petId: string };
    const body = request.body as {
      vetName: string;
      vetClinic: string;
      certDate: string;
      expiryDate?: string;
      notes?: string;
      documents: Array<{ url: string; name: string }>;
    };
    const result = await healthCertificationService.submitCertification(request.user!.uid, petId, body);
    return reply.code(201).send(result);
  });

  fastify.get('/health-certifications', async (request, reply) => {
    const result = await healthCertificationService.getMyCertifications(request.user!.uid);
    return reply.code(200).send(result);
  });

  fastify.get('/:petId/health-certification', async (request, reply) => {
    const { petId } = request.params as { petId: string };
    const result = await healthCertificationService.getPetCertification(petId);
    return reply.code(200).send(result);
  });
}
