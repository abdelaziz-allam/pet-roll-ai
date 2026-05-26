import { messaging } from '../config/firebase.js';
import { db } from '../config/firebase.js';
import { FieldValue } from 'firebase-admin/firestore';

interface PushPayload {
  userId: string;
  title: string;
  body: string;
  data?: Record<string, string>;
}

export async function sendPushNotification(payload: PushPayload): Promise<void> {
  const userDoc = await db.collection('users').doc(payload.userId).get();
  if (!userDoc.exists) return;

  const user = userDoc.data()!;
  const tokens: string[] = user.fcmTokens || [];

  if (tokens.length === 0) return;

  const message = {
    notification: {
      title: payload.title,
      body: payload.body,
    },
    data: payload.data || {},
    tokens,
  };

  try {
    const response = await messaging.sendEachForMulticast(message);

    const tokensToRemove: string[] = [];
    response.responses.forEach((resp, idx) => {
      if (!resp.success && resp.error?.code === 'messaging/registration-token-not-registered') {
        tokensToRemove.push(tokens[idx]!);
      }
    });

    if (tokensToRemove.length > 0) {
      await db.collection('users').doc(payload.userId).update({
        fcmTokens: FieldValue.arrayRemove(...tokensToRemove),
      });
    }
  } catch (error) {
    console.error('Push notification failed:', error);
  }
}

export async function createNotificationRecord(
  userId: string,
  type: string,
  title: string,
  body: string,
  data?: Record<string, string>
): Promise<void> {
  await db.collection('notifications').add({
    userId,
    type,
    title,
    body,
    data: data || {},
    read: false,
    createdAt: FieldValue.serverTimestamp(),
  });
}
