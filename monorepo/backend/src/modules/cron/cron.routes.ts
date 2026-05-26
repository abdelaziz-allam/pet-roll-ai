import type { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';
import { db } from '../../config/firebase.js';
import { sendPushNotification, createNotificationRecord } from '../../utils/push-sender.js';
import * as adminService from '../admin/admin.service.js';

const CRON_SECRET = process.env.CRON_SECRET || 'cron-secret-change-me';

function verifyCronAuth(request: FastifyRequest, reply: FastifyReply) {
  const secret = request.headers['x-cron-secret'] as string;
  if (secret !== CRON_SECRET) {
    return reply.status(403).send({ message: 'Forbidden: invalid cron secret' });
  }
}

export async function cronRoutes(app: FastifyInstance) {
  // POST /send-reminders - hourly job
  app.post('/send-reminders', { preHandler: [verifyCronAuth] }, async (_request, reply) => {
    const currentHour = new Date().getUTCHours();

    const usersSnap = await db
      .collection('users')
      .where('settings.reminderTimeUTC', '==', currentHour)
      .where('status', '==', 'active')
      .where('settings.pushEnabled', '==', true)
      .get();

    let sentCount = 0;

    for (const userDoc of usersSnap.docs) {
      const userId = userDoc.id;
      const userData = userDoc.data();
      const tokens: string[] = userData.fcmTokens || [];

      if (tokens.length === 0) continue;

      // Check vaccinations due within 3 days (nextDueDate is stored as ISO string)
      const now = new Date();
      const threeDaysFromNow = new Date();
      threeDaysFromNow.setDate(threeDaysFromNow.getDate() + 3);

      const vaccinationsSnap = await db
        .collection('vaccinations')
        .where('ownerId', '==', userId)
        .where('nextDueDate', '<=', threeDaysFromNow.toISOString())
        .where('nextDueDate', '>=', now.toISOString())
        .get();

      for (const vacDoc of vaccinationsSnap.docs) {
        const vac = vacDoc.data();
        await sendPushNotification({
          userId,
          title: 'Vaccination Reminder',
          body: `${vac.petName || 'Your pet'} has a vaccination (${vac.name}) due soon.`,
          data: { type: 'vaccination_reminder', vaccinationId: vacDoc.id },
        });
        await createNotificationRecord(
          userId,
          'vaccination_reminder',
          'Vaccination Reminder',
          `${vac.petName || 'Your pet'} has a vaccination (${vac.name}) due soon.`,
          { vaccinationId: vacDoc.id },
        );
        sentCount++;
      }

      // Check active schedules
      const schedulesSnap = await db
        .collection('schedules')
        .where('ownerId', '==', userId)
        .where('active', '==', true)
        .get();

      for (const schedDoc of schedulesSnap.docs) {
        const sched = schedDoc.data();
        await sendPushNotification({
          userId,
          title: 'Schedule Reminder',
          body: `Reminder: ${sched.title || 'Scheduled task'} for ${sched.petName || 'your pet'}.`,
          data: { type: 'schedule_reminder', scheduleId: schedDoc.id },
        });
        await createNotificationRecord(
          userId,
          'schedule_reminder',
          'Schedule Reminder',
          `Reminder: ${sched.title || 'Scheduled task'} for ${sched.petName || 'your pet'}.`,
          { scheduleId: schedDoc.id },
        );
        sentCount++;
      }
    }

    return reply.send({ message: 'Reminders sent', sentCount, usersProcessed: usersSnap.size });
  });

  // POST /cleanup - weekly job
  app.post('/cleanup', { preHandler: [verifyCronAuth] }, async (_request, reply) => {
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const deletedUsersSnap = await db
      .collection('users')
      .where('status', '==', 'deleted')
      .where('updatedAt', '<=', thirtyDaysAgo)
      .get();

    let deletedCount = 0;
    for (const userDoc of deletedUsersSnap.docs) {
      const userId = userDoc.id;

      const petsSnap = await db.collection('pets').where('ownerId', '==', userId).get();
      const batch = db.batch();
      petsSnap.docs.forEach((doc) => batch.delete(doc.ref));
      batch.delete(userDoc.ref);
      await batch.commit();

      const notifsSnap = await db.collection('notifications').where('userId', '==', userId).get();
      if (!notifsSnap.empty) {
        const notifBatch = db.batch();
        notifsSnap.docs.forEach((doc) => notifBatch.delete(doc.ref));
        await notifBatch.commit();
      }

      deletedCount++;
    }

    const oneDayAgo = new Date();
    oneDayAgo.setDate(oneDayAgo.getDate() - 1);

    const tempFilesSnap = await db
      .collection('temp_files')
      .where('createdAt', '<=', oneDayAgo)
      .get();

    let tempFilesRemoved = 0;
    if (!tempFilesSnap.empty) {
      const tempBatch = db.batch();
      tempFilesSnap.docs.forEach((doc) => tempBatch.delete(doc.ref));
      await tempBatch.commit();
      tempFilesRemoved = tempFilesSnap.size;
    }

    return reply.send({
      message: 'Cleanup complete',
      deletedUsers: deletedCount,
      tempFilesRemoved,
    });
  });

  // POST /compute-stats - daily job
  app.post('/compute-stats', { preHandler: [verifyCronAuth] }, async (_request, reply) => {
    const result = await adminService.computeStats();
    return reply.send(result);
  });

  // GET /ping - health check for scheduler validation
  app.get('/ping', async (_request, reply) => {
    return reply.send({ status: 'ok', timestamp: new Date().toISOString() });
  });
}
