import { FastifyInstance } from 'fastify';
import { db, FieldValue, storage } from '../../config/firebase';
import { requireAuth } from '../../middleware/require-auth';

export async function reportsRoutes(fastify: FastifyInstance) {
  fastify.addHook('preHandler', requireAuth);

  fastify.post('/pets/:petId/reports/health', async (request, reply) => {
    const { petId } = request.params as { petId: string };
    const uid = request.user!.uid;

    const pet = await db.collection('pets').doc(petId).get();
    if (!pet.exists || pet.data()!.ownerId !== uid) {
      return reply.code(404).send({ error: 'Pet not found' });
    }

    const healthRecords = await db.collection('health_records')
      .where('petId', '==', petId)
      .orderBy('date', 'desc')
      .limit(50)
      .get();

    const vaccinations = await db.collection('vaccinations')
      .where('petId', '==', petId)
      .orderBy('dateAdministered', 'desc')
      .get();

    const reportData = {
      petId,
      ownerId: uid,
      type: 'health_summary',
      status: 'generated',
      petName: pet.data()!.name,
      recordCount: healthRecords.size,
      vaccinationCount: vaccinations.size,
      generatedAt: new Date().toISOString(),
      createdAt: FieldValue.serverTimestamp(),
    };

    const reportDoc = await db.collection('reports').add(reportData);
    return reply.code(201).send({ id: reportDoc.id, ...reportData });
  });

  fastify.get('/pets/:petId/reports', async (request, reply) => {
    const { petId } = request.params as { petId: string };
    const snapshot = await db.collection('reports')
      .where('petId', '==', petId)
      .where('ownerId', '==', request.user!.uid)
      .orderBy('createdAt', 'desc')
      .get();

    const reports = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    return reply.code(200).send(reports);
  });

  fastify.get('/reports/:reportId/download', async (request, reply) => {
    const { reportId } = request.params as { reportId: string };
    const doc = await db.collection('reports').doc(reportId).get();
    if (!doc.exists || doc.data()!.ownerId !== request.user!.uid) {
      return reply.code(404).send({ error: 'Report not found' });
    }

    const filePath = `reports/${request.user!.uid}/${reportId}.pdf`;
    const [url] = await storage.bucket().file(filePath).getSignedUrl({
      action: 'read',
      expires: Date.now() + 15 * 60 * 1000,
    });

    return reply.code(200).send({ downloadUrl: url });
  });
}
