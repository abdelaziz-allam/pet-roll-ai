import { FastifyInstance } from 'fastify';
import { db } from '../../config/firebase';

export async function cronRoutes(fastify: FastifyInstance) {
  fastify.get('/ping', async (request, reply) => {
    return reply.code(200).send({ status: 'ok', timestamp: new Date().toISOString() });
  });

  fastify.post('/send-reminders', async (request, reply) => {
    const now = new Date();
    const oneHourFromNow = new Date(now.getTime() + 60 * 60 * 1000).toISOString();

    const schedules = await db.collection('schedules')
      .where('enabled', '==', true)
      .where('nextDue', '<=', oneHourFromNow)
      .get();

    let sent = 0;
    for (const doc of schedules.docs) {
      const data = doc.data();
      await db.collection('notifications').add({
        userId: data.ownerId,
        type: 'schedule_reminder',
        title: `Reminder: ${data.title}`,
        body: `${data.title} is due soon for your pet.`,
        read: false,
        data: { scheduleId: doc.id, petId: data.petId },
        createdAt: new Date().toISOString(),
      });
      sent++;
    }

    return reply.code(200).send({ sent, processedAt: now.toISOString() });
  });

  fastify.post('/cleanup', async (request, reply) => {
    const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString();
    const oldNotifications = await db.collection('notifications')
      .where('read', '==', true)
      .where('createdAt', '<=', thirtyDaysAgo)
      .limit(500)
      .get();

    const batch = db.batch();
    oldNotifications.docs.forEach((doc) => batch.delete(doc.ref));
    await batch.commit();

    return reply.code(200).send({ deleted: oldNotifications.size });
  });

  fastify.post('/compute-stats', async (request, reply) => {
    const [users, pets, listings] = await Promise.all([
      db.collection('users').where('status', '==', 'active').count().get(),
      db.collection('pets').count().get(),
      db.collection('mating_listings').where('status', '==', 'active').count().get(),
    ]);

    await db.collection('app_stats').add({
      date: new Date().toISOString().split('T')[0],
      activeUsers: users.data().count,
      totalPets: pets.data().count,
      activeListings: listings.data().count,
      computedAt: new Date().toISOString(),
    });

    return reply.code(200).send({ computed: true });
  });
}
