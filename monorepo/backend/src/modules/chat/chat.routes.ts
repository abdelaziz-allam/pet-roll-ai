import type { FastifyInstance } from 'fastify';
import { requireAuth } from '../../middleware/require-auth.js';
import { db } from '../../config/firebase.js';
import { chatRoomQuerySchema } from './chat.schema.js';

export async function chatRoutes(app: FastifyInstance) {
  // GET /rooms - list user's chat rooms
  app.get('/rooms', { preHandler: [requireAuth] }, async (request, reply) => {
    const { limit, cursor } = chatRoomQuerySchema.parse(request.query);
    const uid = request.user!.uid;

    let query = db
      .collection('chat_rooms')
      .where('participants', 'array-contains', uid)
      .orderBy('lastMessage.timestamp', 'desc')
      .limit(limit);

    if (cursor) {
      const cursorDoc = await db.collection('chat_rooms').doc(cursor).get();
      if (cursorDoc.exists) {
        query = query.startAfter(cursorDoc);
      }
    }

    const snapshot = await query.get();

    const rooms = snapshot.docs.map((doc) => {
      const data = doc.data();
      // Calculate unread count for the current user
      const unreadCount = data.unreadCounts?.[uid] ?? 0;

      return {
        id: doc.id,
        participants: data.participants,
        matchId: data.matchId,
        createdAt: data.createdAt,
        lastMessage: data.lastMessage ?? null,
        unreadCount,
      };
    });

    const nextCursor = snapshot.docs.length === limit
      ? snapshot.docs[snapshot.docs.length - 1]?.id
      : undefined;

    return reply.send({ rooms, nextCursor });
  });

  // GET /rooms/:roomId - get room detail
  app.get('/rooms/:roomId', { preHandler: [requireAuth] }, async (request, reply) => {
    const { roomId } = request.params as { roomId: string };
    const uid = request.user!.uid;

    const roomDoc = await db.collection('chat_rooms').doc(roomId).get();

    if (!roomDoc.exists) {
      return reply.status(404).send({ message: 'Chat room not found' });
    }

    const roomData = roomDoc.data()!;

    // Verify user is a participant
    if (!roomData.participants.includes(uid)) {
      return reply.status(403).send({ message: 'Access denied' });
    }

    // Fetch participant profiles
    const participantProfiles = await Promise.all(
      roomData.participants.map(async (participantUid: string) => {
        const userDoc = await db.collection('users').doc(participantUid).get();
        const userData = userDoc.data();
        return {
          uid: participantUid,
          displayName: userData?.displayName ?? 'Unknown',
          photoUrl: userData?.photoUrl ?? undefined,
        };
      })
    );

    return reply.send({
      id: roomDoc.id,
      participants: roomData.participants,
      matchId: roomData.matchId,
      createdAt: roomData.createdAt,
      lastMessage: roomData.lastMessage ?? null,
      unreadCount: roomData.unreadCounts?.[uid] ?? 0,
      participantProfiles,
    });
  });
}
