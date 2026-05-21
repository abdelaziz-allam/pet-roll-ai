import { FastifyInstance } from 'fastify';
import { db, FieldValue } from '../../config/firebase';
import { requireAuth } from '../../middleware/require-auth';

export async function notificationsRoutes(fastify: FastifyInstance) {
  fastify.addHook('preHandler', requireAuth);

  fastify.get('/', async (request, reply) => {
    const { page = 1, limit = 20 } = request.query as any;
    const offset = (+page - 1) * +limit;

    const snapshot = await db.collection('notifications')
      .where('userId', '==', request.user!.uid)
      .orderBy('createdAt', 'desc')
      .offset(offset)
      .limit(+limit)
      .get();

    const notifications = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    return reply.code(200).send(notifications);
  });

  fastify.put('/:id/read', async (request, reply) => {
    const { id } = request.params as { id: string };
    const doc = await db.collection('notifications').doc(id).get();
    if (!doc.exists || doc.data()!.userId !== request.user!.uid) {
      return reply.code(404).send({ error: 'Notification not found' });
    }
    await db.collection('notifications').doc(id).update({ read: true, readAt: new Date().toISOString() });
    return reply.code(200).send({ success: true });
  });

  fastify.put('/read-all', async (request, reply) => {
    const snapshot = await db.collection('notifications')
      .where('userId', '==', request.user!.uid)
      .where('read', '==', false)
      .get();

    const batch = db.batch();
    snapshot.docs.forEach((doc) => {
      batch.update(doc.ref, { read: true, readAt: new Date().toISOString() });
    });
    await batch.commit();
    return reply.code(200).send({ success: true, count: snapshot.size });
  });

  fastify.post('/devices', async (request, reply) => {
    const { token } = request.body as { token: string };
    await db.collection('users').doc(request.user!.uid).update({
      fcmTokens: FieldValue.arrayUnion(token),
    });
    return reply.code(200).send({ success: true });
  });

  fastify.delete('/devices/:token', async (request, reply) => {
    const { token } = request.params as { token: string };
    await db.collection('users').doc(request.user!.uid).update({
      fcmTokens: FieldValue.arrayRemove(token),
    });
    return reply.code(204).send();
  });
}
