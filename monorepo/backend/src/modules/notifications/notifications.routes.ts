import type { FastifyInstance } from 'fastify';
import { requireAuth } from '../../middleware/require-auth.js';
import { db } from '../../config/firebase.js';
import { FieldValue } from 'firebase-admin/firestore';
import { paginationSchema } from '../../types/common.js';
import { z } from 'zod';

const notificationQuerySchema = paginationSchema.extend({
  read: z.enum(['true', 'false']).optional(),
});

export async function notificationRoutes(app: FastifyInstance) {
  // GET / - list user's notifications (paginated, ordered by createdAt desc, filter by read)
  app.get('/', { preHandler: [requireAuth] }, async (request, reply) => {
    const query = notificationQuerySchema.parse(request.query);
    const { page, limit, read } = query;
    const offset = (page - 1) * limit;

    let ref = db
      .collection('notifications')
      .where('userId', '==', request.user!.uid)
      .orderBy('createdAt', 'desc');

    if (read !== undefined) {
      ref = ref.where('read', '==', read === 'true');
    }

    // Get total count
    const countSnap = await ref.count().get();
    const total = countSnap.data().count;

    // Get page
    const snapshot = await ref.offset(offset).limit(limit).get();
    const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

    return reply.send({
      data,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
        hasNext: page * limit < total,
      },
    });
  });

  // PUT /:id/read - mark single notification as read
  app.put('/:id/read', { preHandler: [requireAuth] }, async (request, reply) => {
    const { id } = request.params as { id: string };

    const docRef = db.collection('notifications').doc(id);
    const doc = await docRef.get();

    if (!doc.exists || doc.data()?.userId !== request.user!.uid) {
      return reply.status(404).send({ message: 'Notification not found' });
    }

    await docRef.update({ read: true, readAt: FieldValue.serverTimestamp() });
    return reply.send({ message: 'Notification marked as read' });
  });

  // PUT /read-all - mark all user's notifications as read
  app.put('/read-all', { preHandler: [requireAuth] }, async (request, reply) => {
    const snapshot = await db
      .collection('notifications')
      .where('userId', '==', request.user!.uid)
      .where('read', '==', false)
      .get();

    const batch = db.batch();
    snapshot.docs.forEach((doc) => {
      batch.update(doc.ref, { read: true, readAt: FieldValue.serverTimestamp() });
    });
    await batch.commit();

    return reply.send({ message: 'All notifications marked as read', count: snapshot.size });
  });

  // POST /devices - register FCM token
  app.post('/devices', { preHandler: [requireAuth] }, async (request, reply) => {
    const { token } = request.body as { token: string };

    if (!token) {
      return reply.status(400).send({ message: 'token is required' });
    }

    await db.collection('users').doc(request.user!.uid).update({
      fcmTokens: FieldValue.arrayUnion(token),
    });

    return reply.status(201).send({ message: 'Device token registered' });
  });

  // DELETE /devices/:token - unregister FCM token
  app.delete('/devices/:token', { preHandler: [requireAuth] }, async (request, reply) => {
    const { token } = request.params as { token: string };

    await db.collection('users').doc(request.user!.uid).update({
      fcmTokens: FieldValue.arrayRemove(token),
    });

    return reply.send({ message: 'Device token removed' });
  });
}
