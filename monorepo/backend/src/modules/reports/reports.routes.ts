import type { FastifyInstance } from 'fastify';
import { requireAuth } from '../../middleware/require-auth.js';
import { db } from '../../config/firebase.js';
import { uploadImage, getSignedUrl } from '../../utils/image-upload.js';
import { generateHealthReport } from '../../utils/pdf-generator.js';
import { generateReportSchema } from './reports.schema.js';

export async function reportsRoutes(app: FastifyInstance) {
  // POST /pets/:petId/reports/health - generate health PDF
  app.post('/pets/:petId/reports/health', { preHandler: [requireAuth] }, async (request, reply) => {
    const { petId } = request.params as { petId: string };
    const uid = request.user!.uid;

    const body = generateReportSchema.parse({ ...request.body as object, petId });

    // Verify pet ownership
    const petDoc = await db.collection('pets').doc(petId).get();
    if (!petDoc.exists) {
      return reply.status(404).send({ message: 'Pet not found' });
    }
    const petData = petDoc.data()!;
    if (petData.ownerId !== uid) {
      return reply.status(403).send({ message: 'Access denied' });
    }
    const pet = { id: petDoc.id, ...petData } as { id: string; name: string; [key: string]: unknown };

    // Fetch health records
    let healthQuery = db
      .collection('pets')
      .doc(petId)
      .collection('health_records')
      .orderBy('date', 'desc');

    if (body.dateRange) {
      healthQuery = healthQuery
        .where('date', '>=', body.dateRange.from)
        .where('date', '<=', body.dateRange.to);
    }

    const healthSnap = await healthQuery.get();
    const healthRecords = healthSnap.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

    // Fetch vaccinations
    let vaccQuery = db
      .collection('pets')
      .doc(petId)
      .collection('vaccinations')
      .orderBy('dateAdministered', 'desc');

    if (body.dateRange) {
      vaccQuery = vaccQuery
        .where('dateAdministered', '>=', body.dateRange.from)
        .where('dateAdministered', '<=', body.dateRange.to);
    }

    const vaccSnap = await vaccQuery.get();
    const vaccinations = vaccSnap.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

    // Generate PDF
    const pdfBuffer = await generateHealthReport(pet, healthRecords, vaccinations);

    // Upload to Cloud Storage
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const filename = `${pet.name}_health_report_${timestamp}.pdf`;
    const destination = `reports/${uid}`;

    const uploadResult = await uploadImage(pdfBuffer, destination, 'application/pdf');

    // Save report metadata
    const reportRef = await db
      .collection('pets')
      .doc(petId)
      .collection('reports')
      .add({
        type: body.type,
        fileName: filename,
        storagePath: uploadResult.path,
        downloadUrl: uploadResult.url,
        dateRange: body.dateRange ?? null,
        generatedAt: new Date().toISOString(),
        userId: uid,
      });

    return reply.status(201).send({
      id: reportRef.id,
      fileName: filename,
      downloadUrl: uploadResult.url,
      generatedAt: new Date().toISOString(),
    });
  });

  // GET /pets/:petId/reports - list generated reports
  app.get('/pets/:petId/reports', { preHandler: [requireAuth] }, async (request, reply) => {
    const { petId } = request.params as { petId: string };
    const uid = request.user!.uid;

    // Verify pet ownership
    const petDoc = await db.collection('pets').doc(petId).get();
    if (!petDoc.exists) {
      return reply.status(404).send({ message: 'Pet not found' });
    }
    if (petDoc.data()!.ownerId !== uid) {
      return reply.status(403).send({ message: 'Access denied' });
    }

    const reportsSnap = await db
      .collection('pets')
      .doc(petId)
      .collection('reports')
      .orderBy('generatedAt', 'desc')
      .get();

    const reports = reportsSnap.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return reply.send({ reports });
  });

  // GET /reports/:reportId/download - get signed download URL
  app.get('/reports/:reportId/download', { preHandler: [requireAuth] }, async (request, reply) => {
    const { reportId } = request.params as { reportId: string };
    const uid = request.user!.uid;

    // Search across all pets for this report
    const petsSnap = await db.collection('pets').where('ownerId', '==', uid).get();

    let reportData: FirebaseFirestore.DocumentData | null = null;

    for (const petDoc of petsSnap.docs) {
      const reportDoc = await db
        .collection('pets')
        .doc(petDoc.id)
        .collection('reports')
        .doc(reportId)
        .get();

      if (reportDoc.exists) {
        reportData = reportDoc.data()!;
        break;
      }
    }

    if (!reportData) {
      return reply.status(404).send({ message: 'Report not found' });
    }

    if (reportData.userId !== uid) {
      return reply.status(403).send({ message: 'Access denied' });
    }

    const downloadUrl = await getSignedUrl(reportData.storagePath, 24);

    return reply.send({ downloadUrl });
  });
}
