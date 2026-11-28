import { FastifyInstance, FastifyReply } from 'fastify';
import { db, FieldValue } from '../../config/firebase';
import { requireAuth } from '../../middleware/require-auth';
import { messagesQuerySchema, sendMessageSchema } from './chat.schema';

/** The room's data if the caller takes part in it; otherwise replies 404/403 and returns undefined. */
async function roomForParticipant(roomId: string, uid: string, reply: FastifyReply) {
  const doc = await db.collection('chat_rooms').doc(roomId).get();
  if (!doc.exists) {
    reply.code(404).send({ error: 'Room not found' });
    return undefined;
  }
  const data = doc.data()!;
  if (!Array.isArray(data.participants) || !data.participants.includes(uid)) {
    reply.code(403).send({ error: 'Access denied' });
    return undefined;
  }
  return data;
}

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

  // The app reads and sends messages here (it polls while a conversation is open), so every
  // message passes the participant check above.
  fastify.get('/rooms/:roomId/messages', async (request, reply) => {
    const { roomId } = request.params as { roomId: string };
    const { limit } = messagesQuerySchema.parse(request.query);
    if (!(await roomForParticipant(roomId, request.user!.uid, reply))) return reply;

    const snap = await db.collection('chat_rooms').doc(roomId).collection('messages').orderBy('createdAt', 'desc').limit(limit).get();
    return reply.code(200).send(snap.docs.map((doc: any) => ({ id: doc.id, ...doc.data() })));
  });

  fastify.post(
    '/rooms/:roomId/messages',
    { config: { rateLimit: { max: 30, timeWindow: '1 minute' } } },
    async (request, reply) => {
      const { roomId } = request.params as { roomId: string };
      const { text, imageUrl } = sendMessageSchema.parse(request.body);
      const uid = request.user!.uid;
      if (!(await roomForParticipant(roomId, uid, reply))) return reply;

      const room = db.collection('chat_rooms').doc(roomId);
      const ref = await room.collection('messages').add({
        roomId,
        senderId: uid,
        text: text ?? null,
        imageUrl: imageUrl ?? null,
        type: imageUrl ? 'image' : 'text',
        createdAt: FieldValue.serverTimestamp(),
      });
      await room.update({
        lastMessage: text ?? 'Photo',
        lastMessageAt: FieldValue.serverTimestamp(),
        lastSenderId: uid,
      });
      const saved = await ref.get();
      return reply.code(201).send({ id: ref.id, ...saved.data() });
    },
  );
}
