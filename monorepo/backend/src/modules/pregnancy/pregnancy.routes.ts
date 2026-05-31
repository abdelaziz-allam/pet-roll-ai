import { FastifyInstance } from 'fastify';
import { pregnancyService } from './pregnancy.service';
import { startPregnancySchema, updatePregnancySchema, addWeightSchema } from './pregnancy.schema';
import { requireAuth } from '../../middleware/require-auth';
import { storage, FieldValue, db } from '../../config/firebase';
import { env } from '../../config/env';

export async function pregnancyRoutes(fastify: FastifyInstance) {
  fastify.addHook('preHandler', requireAuth);

  fastify.post('/pets/:petId/pregnancy', async (request, reply) => {
    const { petId } = request.params as { petId: string };
    const body = startPregnancySchema.parse(request.body);
    const result = await pregnancyService.startTracking(petId, request.user!.uid, body);
    return reply.code(201).send(result);
  });

  fastify.post('/pets/:petId/pregnancies', async (request, reply) => {
    const { petId } = request.params as { petId: string };
    const body = startPregnancySchema.parse(request.body);
    const result = await pregnancyService.startTracking(petId, request.user!.uid, body);
    return reply.code(201).send(result);
  });

  fastify.get('/pets/:petId/pregnancies', async (request, reply) => {
    const { petId } = request.params as { petId: string };
    const { page = 1, limit = 20 } = request.query as any;
    const result = await pregnancyService.getAll(petId, request.user!.uid, +page, +limit);
    return reply.code(200).send(result);
  });

  fastify.get('/pets/:petId/pregnancy', async (request, reply) => {
    const { petId } = request.params as { petId: string };
    const result = await pregnancyService.getActive(petId, request.user!.uid);
    if (!result) {
      return reply.code(404).send({ message: 'No active pregnancy found' });
    }
    return reply.code(200).send(result);
  });

  fastify.get('/pets/:petId/pregnancy/:pregId', async (request, reply) => {
    const { pregId } = request.params as { petId: string; pregId: string };
    const result = await pregnancyService.getById(pregId, request.user!.uid);
    return reply.code(200).send(result);
  });

  fastify.put('/pets/:petId/pregnancy/:pregId', async (request, reply) => {
    const { pregId } = request.params as { petId: string; pregId: string };
    const body = updatePregnancySchema.parse(request.body);
    const result = await pregnancyService.update(pregId, request.user!.uid, body);
    return reply.code(200).send(result);
  });

  fastify.get('/pets/:petId/pregnancy/:pregId/milestones', async (request, reply) => {
    const { pregId } = request.params as { petId: string; pregId: string };
    const milestones = await pregnancyService.getMilestones(pregId, request.user!.uid);
    return reply.code(200).send(milestones);
  });

  fastify.put('/pets/:petId/pregnancy/:pregId/milestones/:milestoneId/complete', async (request, reply) => {
    const { pregId, milestoneId } = request.params as { petId: string; pregId: string; milestoneId: string };
    const milestone = await pregnancyService.completeMilestone(pregId, milestoneId, request.user!.uid);
    return reply.code(200).send(milestone);
  });

  fastify.post('/pets/:petId/pregnancy/:pregId/weight', async (request, reply) => {
    const { pregId } = request.params as { petId: string; pregId: string };
    const { weight } = addWeightSchema.parse(request.body);
    const result = await pregnancyService.addWeight(pregId, request.user!.uid, weight);
    return reply.code(200).send(result);
  });

  fastify.post('/pets/:petId/pregnancy/:pregId/father-photos', async (request, reply) => {
    const { petId, pregId } = request.params as { petId: string; pregId: string };
    const ownerId = request.user!.uid;

    const preg = await pregnancyService.getById(pregId, ownerId);
    const currentPhotos = (preg as any).fatherInfo?.photos || [];
    if (currentPhotos.length >= 10) {
      return reply.code(400).send({ error: 'Maximum 10 father photos allowed' });
    }

    const data = await request.file();
    if (!data) {
      return reply.code(400).send({ error: 'No file uploaded' });
    }

    const timestamp = Date.now();
    const safeName = data.filename.replace(/[^a-zA-Z0-9._-]/g, '_');
    const storagePath = `pregnancies/${ownerId}/${pregId}/father/${timestamp}_${safeName}`;

    const ext = data.filename.split('.').pop()?.toLowerCase() || '';
    const extToMime: Record<string, string> = {
      jpg: 'image/jpeg', jpeg: 'image/jpeg', png: 'image/png',
      webp: 'image/webp', gif: 'image/gif', pdf: 'application/pdf',
    };
    const resolvedMime = (data.mimetype === 'application/octet-stream' && extToMime[ext])
      ? extToMime[ext]
      : data.mimetype;

    if (env.USE_MEMORY_STORE) {
      const fakeUrl = `https://storage.example.com/${storagePath}`;
      const updatedPhotos = [...currentPhotos, fakeUrl];
      await db.collection('pregnancies').doc(pregId).update({
        'fatherInfo.photos': updatedPhotos,
        updatedAt: FieldValue.serverTimestamp(),
      });
      return reply.code(200).send({ url: fakeUrl, path: storagePath, totalPhotos: updatedPhotos.length });
    }

    try {
      const bucket = storage.bucket(env.GCS_BUCKET);
      const file = bucket.file(storagePath);
      const stream = file.createWriteStream({ metadata: { contentType: resolvedMime }, resumable: false });

      await new Promise<void>((resolve, reject) => {
        data.file.pipe(stream);
        stream.on('error', reject);
        stream.on('finish', resolve);
      });

      await file.makePublic();
      const publicUrl = `https://storage.googleapis.com/${env.GCS_BUCKET}/${storagePath}`;
      const updatedPhotos = [...currentPhotos, publicUrl];
      await db.collection('pregnancies').doc(pregId).update({
        'fatherInfo.photos': updatedPhotos,
        updatedAt: FieldValue.serverTimestamp(),
      });

      return reply.code(200).send({ url: publicUrl, path: storagePath, totalPhotos: updatedPhotos.length });
    } catch (err: any) {
      request.log.error({ err, storagePath }, 'Failed to upload pregnancy photo to GCS');
      return reply.code(500).send({ error: 'Upload failed', message: err.message || 'Storage error' });
    }
  });
}
