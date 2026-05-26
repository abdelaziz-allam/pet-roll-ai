import { db } from '../../config/firebase.js';
import { FieldValue } from 'firebase-admin/firestore';
import { sendPushNotification, createNotificationRecord } from '../../utils/push-sender.js';
import type {
  CreateListingInput,
  UpdateListingInput,
  CreateMatchRequestInput,
  UpdateMatchRequestInput,
  BrowseListingsQuery,
} from './mating.schema.js';

const MATING_LISTINGS = 'mating_listings';
const MATCH_REQUESTS = 'match_requests';

export async function createListing(ownerId: string, input: CreateListingInput) {
  const petDoc = await db.collection('pets').doc(input.petId).get();
  if (!petDoc.exists) {
    throw Object.assign(new Error('Pet not found'), { statusCode: 404 });
  }

  const pet = petDoc.data()!;
  if (pet.ownerId !== ownerId) {
    throw Object.assign(new Error('You do not own this pet'), { statusCode: 403 });
  }

  if (!pet.isAvailableForMating) {
    throw Object.assign(new Error('Pet is not marked as available for mating'), { statusCode: 400 });
  }

  const ownerDoc = await db.collection('users').doc(ownerId).get();
  const owner = ownerDoc.data()!;

  const listingData = {
    petId: input.petId,
    ownerId,
    description: input.description || null,
    location: input.location,
    preferences: input.preferences || null,
    status: 'active',
    pet: {
      breed: pet.breed || null,
      species: pet.species,
      name: pet.name,
      photoURL: pet.photoURL || null,
    },
    ownerName: owner.displayName,
    isVerifiedBreeder: owner.isVerifiedBreeder || false,
    createdAt: FieldValue.serverTimestamp(),
    updatedAt: FieldValue.serverTimestamp(),
  };

  const ref = await db.collection(MATING_LISTINGS).add(listingData);
  return { id: ref.id, ...listingData };
}

export async function browseListings(query: BrowseListingsQuery, currentUserId: string) {
  let ref: FirebaseFirestore.Query = db
    .collection(MATING_LISTINGS)
    .where('status', '==', 'active')
    .where('ownerId', '!=', currentUserId)
    .orderBy('ownerId')
    .orderBy('createdAt', 'desc');

  if (query.species) {
    ref = ref.where('pet.species', '==', query.species);
  }
  if (query.breed) {
    ref = ref.where('pet.breed', '==', query.breed);
  }
  if (query.city) {
    ref = ref.where('location.city', '==', query.city);
  }
  if (query.country) {
    ref = ref.where('location.country', '==', query.country);
  }

  const countSnapshot = await ref.count().get();
  const total = countSnapshot.data().count;

  const offset = (query.page - 1) * query.limit;
  const snapshot = await ref.offset(offset).limit(query.limit).get();

  const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

  const totalPages = Math.ceil(total / query.limit);
  return {
    data,
    pagination: {
      page: query.page,
      limit: query.limit,
      total,
      totalPages,
      hasNext: query.page < totalPages,
    },
  };
}

export async function getListingById(id: string) {
  const doc = await db.collection(MATING_LISTINGS).doc(id).get();
  if (!doc.exists) {
    throw Object.assign(new Error('Listing not found'), { statusCode: 404 });
  }
  return { id: doc.id, ...doc.data() };
}

export async function updateListing(id: string, ownerId: string, input: UpdateListingInput) {
  const doc = await db.collection(MATING_LISTINGS).doc(id).get();
  if (!doc.exists) {
    throw Object.assign(new Error('Listing not found'), { statusCode: 404 });
  }

  const listing = doc.data()!;
  if (listing.ownerId !== ownerId) {
    throw Object.assign(new Error('You do not own this listing'), { statusCode: 403 });
  }

  const updateData: Record<string, any> = {
    ...input,
    updatedAt: FieldValue.serverTimestamp(),
  };

  await db.collection(MATING_LISTINGS).doc(id).update(updateData);
  return getListingById(id);
}

export async function deleteListing(id: string, ownerId: string) {
  const doc = await db.collection(MATING_LISTINGS).doc(id).get();
  if (!doc.exists) {
    throw Object.assign(new Error('Listing not found'), { statusCode: 404 });
  }

  const listing = doc.data()!;
  if (listing.ownerId !== ownerId) {
    throw Object.assign(new Error('You do not own this listing'), { statusCode: 403 });
  }

  await db.collection(MATING_LISTINGS).doc(id).update({
    status: 'removed',
    updatedAt: FieldValue.serverTimestamp(),
  });
}

export async function sendMatchRequest(senderId: string, input: CreateMatchRequestInput) {
  const listing = await getListingById(input.listingId);

  if ((listing as any).ownerId === senderId) {
    throw Object.assign(new Error('Cannot send a match request to your own listing'), { statusCode: 400 });
  }

  // Check for duplicate pending request
  const existing = await db
    .collection(MATCH_REQUESTS)
    .where('senderId', '==', senderId)
    .where('listingId', '==', input.listingId)
    .where('status', '==', 'pending')
    .limit(1)
    .get();

  if (!existing.empty) {
    throw Object.assign(new Error('You already have a pending request for this listing'), { statusCode: 409 });
  }

  const requestData = {
    listingId: input.listingId,
    senderId,
    receiverId: (listing as any).ownerId,
    message: input.message || null,
    status: 'pending',
    createdAt: FieldValue.serverTimestamp(),
    updatedAt: FieldValue.serverTimestamp(),
  };

  const ref = await db.collection(MATCH_REQUESTS).add(requestData);

  // Send push notification to listing owner
  const senderDoc = await db.collection('users').doc(senderId).get();
  const senderName = senderDoc.data()?.displayName || 'Someone';

  await sendPushNotification({
    userId: (listing as any).ownerId,
    title: 'New Mating Request',
    body: `${senderName} is interested in mating with your pet`,
    data: { type: 'match_request', requestId: ref.id },
  });

  await createNotificationRecord(
    (listing as any).ownerId,
    'match_request_received',
    'New Mating Request',
    `${senderName} is interested in mating with your pet`,
    { requestId: ref.id, listingId: input.listingId },
  );

  return { id: ref.id, ...requestData };
}

export async function getSentRequests(userId: string) {
  const snapshot = await db
    .collection(MATCH_REQUESTS)
    .where('senderId', '==', userId)
    .get();

  const requests = await Promise.all(
    snapshot.docs.map(async (doc) => {
      const data = doc.data();
      let listing = null;
      try {
        listing = await getListingById(data.listingId);
      } catch {
        // listing may have been removed
      }
      return { id: doc.id, ...data, listing };
    }),
  );

  requests.sort((a: any, b: any) => {
    const aTime = a.createdAt?.toMillis?.() ?? 0;
    const bTime = b.createdAt?.toMillis?.() ?? 0;
    return bTime - aTime;
  });

  return requests;
}

export async function getReceivedRequests(userId: string) {
  const snapshot = await db
    .collection(MATCH_REQUESTS)
    .where('receiverId', '==', userId)
    .get();

  const results = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  results.sort((a: any, b: any) => {
    const aTime = a.createdAt?.toMillis?.() ?? 0;
    const bTime = b.createdAt?.toMillis?.() ?? 0;
    return bTime - aTime;
  });

  return results;
}

export async function updateMatchRequest(
  requestId: string,
  receiverId: string,
  input: UpdateMatchRequestInput,
) {
  const doc = await db.collection(MATCH_REQUESTS).doc(requestId).get();
  if (!doc.exists) {
    throw Object.assign(new Error('Match request not found'), { statusCode: 404 });
  }

  const request = doc.data()!;
  if (request.receiverId !== receiverId) {
    throw Object.assign(new Error('You are not the receiver of this request'), { statusCode: 403 });
  }

  if (request.status !== 'pending') {
    throw Object.assign(new Error('This request has already been processed'), { statusCode: 400 });
  }

  // If accepted, use a batch to atomically update request + create chat room
  if (input.status === 'accepted') {
    const batch = db.batch();

    batch.update(db.collection(MATCH_REQUESTS).doc(requestId), {
      status: input.status,
      updatedAt: FieldValue.serverTimestamp(),
    });

    const chatRoomRef = db.collection('chat_rooms').doc();
    batch.set(chatRoomRef, {
      participants: [request.senderId, receiverId],
      listingId: request.listingId,
      matchRequestId: requestId,
      createdAt: FieldValue.serverTimestamp(),
    });

    await batch.commit();
  } else {
    await db.collection(MATCH_REQUESTS).doc(requestId).update({
      status: input.status,
      updatedAt: FieldValue.serverTimestamp(),
    });
  }

  // Send notification to the sender
  const receiverDoc = await db.collection('users').doc(receiverId).get();
  const receiverName = receiverDoc.data()?.displayName || 'The owner';

  const title = input.status === 'accepted' ? 'Match Request Accepted!' : 'Match Request Declined';
  const body =
    input.status === 'accepted'
      ? `${receiverName} accepted your mating request. You can now chat!`
      : `${receiverName} declined your mating request.`;

  await sendPushNotification({
    userId: request.senderId,
    title,
    body,
    data: { type: 'match_request_update', requestId, status: input.status },
  });

  await createNotificationRecord(
    request.senderId,
    `match_request_${input.status}`,
    title,
    body,
    { requestId, listingId: request.listingId },
  );

  return { id: requestId, ...request, status: input.status };
}
