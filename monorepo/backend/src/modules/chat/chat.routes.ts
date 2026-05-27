import { FastifyInstance } from 'fastify';
import { db } from '../../config/firebase';
import { requireAuth } from '../../middleware/require-auth';

export async function chatRoutes(fastify: FastifyInstance) {
  fastify.addHook('preHandler', requireAuth);

  fastify.get('/rooms', async (request, reply) => {
    const snapshot = await db.collection('chat_rooms')
      .where('participants', 'array-contains', request.user!.uid)
      .orderBy('lastMessageAt', 'desc')
      .get();

    const rooms = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    return reply.code(200).send(rooms);
  });

  fastify.get('/rooms/:roomId', async (request, reply) => {
    const { roomId } = request.params as { roomId: string };
    const doc = await db.collection('chat_rooms').doc(roomId).get();

    if (!doc.exists) {
      return reply.code(404).send({ error: 'Room not found' });
    }

    const data = doc.data()!;
    if (!data.participants.includes(request.user!.uid)) {
      return reply.code(403).send({ error: 'Access denied' });
    }

    const messagesSnap = await db.collection('chat_rooms')
      .doc(roomId)
      .collection('messages')
      .orderBy('createdAt', 'desc')
      .limit(50)
      .get();

    const messages = messagesSnap.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    return reply.code(200).send({ room: { id: doc.id, ...data }, messages });
  });
}
