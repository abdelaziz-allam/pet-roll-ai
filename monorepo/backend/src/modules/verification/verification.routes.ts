import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';
import { verificationService } from './verification.service';
import { storage } from '../../config/firebase';
import { env } from '../../config/env';

export async function verificationRoutes(fastify: FastifyInstance) {
  fastify.addHook('preHandler', async (request: FastifyRequest, reply: FastifyReply) => {
    if (!request.user) {
      return reply.code(401).send({ error: 'Unauthorized', message: 'Authentication required' });
    }
  });

  // POST /verification/documents/upload — Upload a document file
  fastify.post('/documents/upload', async (request: FastifyRequest, reply: FastifyReply) => {
    const user = request.user!;
    const data = await request.file();
    if (!data) {
      return reply.code(400).send({ error: 'No file uploaded' });
    }

    const allowedTypes = [
      'image/jpeg', 'image/png', 'image/webp',
      'application/pdf',
      'image/gif',
    ];
    const allowedExtensions = ['jpg', 'jpeg', 'png', 'webp', 'gif', 'pdf'];
    const ext = data.filename.split('.').pop()?.toLowerCase() || '';
    const isValidType = allowedTypes.includes(data.mimetype) || allowedExtensions.includes(ext);

    if (!isValidType) {
      return reply.code(400).send({ error: 'Invalid file type. Allowed: JPEG, PNG, WebP, GIF, PDF' });
    }

    // Resolve correct MIME type from extension if the reported type is generic
    let resolvedMime = data.mimetype;
    if (resolvedMime === 'application/octet-stream') {
      const extToMime: Record<string, string> = {
        jpg: 'image/jpeg', jpeg: 'image/jpeg', png: 'image/png',
        webp: 'image/webp', gif: 'image/gif', pdf: 'application/pdf',
      };
      resolvedMime = extToMime[ext] || resolvedMime;
    }

    const timestamp = Date.now();
    const safeName = data.filename.replace(/[^a-zA-Z0-9._-]/g, '_');
    const storagePath = `verifications/${user.uid}/${timestamp}_${safeName}`;

    if (env.USE_MEMORY_STORE) {
      const fakeUrl = `https://storage.example.com/${storagePath}`;
      return reply.code(200).send({ url: fakeUrl, path: storagePath, name: data.filename, type: resolvedMime });
    }

    const bucket = storage.bucket(env.GCS_BUCKET);
    const file = bucket.file(storagePath);

    const stream = file.createWriteStream({
      metadata: { contentType: resolvedMime },
      resumable: false,
    });

    await new Promise<void>((resolve, reject) => {
      data.file.pipe(stream);
      stream.on('error', reject);
      stream.on('finish', resolve);
    });

    await file.makePublic();

    const publicUrl = `https://storage.googleapis.com/${env.GCS_BUCKET}/${storagePath}`;
    return reply.code(200).send({ url: publicUrl, path: storagePath, name: data.filename, type: resolvedMime });
  });

  // POST /verification/submit — Submit a new verification request
  fastify.post('/submit', async (request: FastifyRequest, reply: FastifyReply) => {
    const { kennelName, breedExperience, documents } = request.body as {
      kennelName: string;
      breedExperience: string;
      documents: Array<{ url: string; path: string; name: string; type: string }>;
    };

    if (!kennelName || !breedExperience || !documents || !Array.isArray(documents) || documents.length === 0) {
      return reply.code(400).send({
        error: 'Bad Request',
        message: 'kennelName, breedExperience, and at least one document are required',
      });
    }

    if (documents.length > 10) {
      return reply.code(400).send({ error: 'Bad Request', message: 'Maximum 10 documents allowed' });
    }

    const user = request.user!;
    const result = await verificationService.submitVerification(
      user.uid,
      user.email,
      user.email,
      { kennelName, breedExperience, documents }
    );

    return reply.code(201).send(result);
  });

  // GET /verification/status — Get current verification status
  fastify.get('/status', async (request: FastifyRequest, reply: FastifyReply) => {
    const user = request.user!;
    const result = await verificationService.getStatus(user.uid);

    if (!result) {
      return reply.code(200).send({ status: 'none', message: 'No verification request found' });
    }

    return reply.code(200).send(result);
  });

  // GET /verification/history — Get ALL historical submissions
  fastify.get('/history', async (request: FastifyRequest, reply: FastifyReply) => {
    const user = request.user!;
    const result = await verificationService.getHistory(user.uid);
    return reply.code(200).send(result);
  });

  // GET /verification/documents — Get documents for current/latest submission
  fastify.get('/documents', async (request: FastifyRequest, reply: FastifyReply) => {
    const user = request.user!;
    const result = await verificationService.getStatus(user.uid);
    if (!result || result.status === 'none') {
      return reply.code(200).send([]);
    }
    return reply.code(200).send((result as any).documents || []);
  });

  // GET /verification/certificate — Get the breeder certificate for sharing
  fastify.get('/certificate', async (request: FastifyRequest, reply: FastifyReply) => {
    const user = request.user!;
    const certificate = await verificationService.getCertificate(user.uid);

    if (!certificate) {
      return reply.code(404).send({ error: 'No approved verification found' });
    }

    return reply.code(200).send(certificate);
  });

  // GET /verification/last-rejected — Get last rejected submission for resubmit pre-fill
  fastify.get('/last-rejected', async (request: FastifyRequest, reply: FastifyReply) => {
    const user = request.user!;
    const result = await verificationService.getLastRejected(user.uid);

    if (!result) {
      return reply.code(200).send(null);
    }

    return reply.code(200).send(result);
  });

  // PUT /verification/:id/status — Update verification status (for testing/admin)
  fastify.put('/:id/status', async (request: FastifyRequest, reply: FastifyReply) => {
    const { id } = request.params as { id: string };
    const { status, rejectionReason, expiryDate } = request.body as {
      status: 'approved' | 'rejected' | 'pending';
      rejectionReason?: string;
      expiryDate?: string;
    };
    const result = await verificationService.updateStatus(id, status, rejectionReason, expiryDate);
    return reply.code(200).send(result);
  });
}
