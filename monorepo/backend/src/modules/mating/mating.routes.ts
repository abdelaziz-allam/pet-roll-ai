import { FastifyInstance } from 'fastify';
import { matingService } from './mating.service';
import { createListingSchema, updateListingSchema, sendRequestSchema, respondRequestSchema } from './mating.schema';
import { requireAuth } from '../../middleware/require-auth';
import { db } from '../../config/firebase';

export async function matingRoutes(fastify: FastifyInstance) {
  fastify.addHook('preHandler', requireAuth);

  fastify.post('/listings', async (request, reply) => {
    const body = createListingSchema.parse(request.body);

    const petDoc = await db.collection('pets').doc(body.petId).get();
    if (!petDoc.exists || petDoc.data()!.ownerId !== request.user!.uid) {
      return reply.code(404).send({ error: 'Pet not found' });
    }
    if (!petDoc.data()!.isAvailableForMating) {
      return reply.code(400).send({ error: 'Pet must be marked as available for mating' });
    }

    const pregSnap = await db.collection('pregnancies')
      .where('petId', '==', body.petId)
      .where('status', '==', 'active')
      .limit(1)
      .get();
    if (!pregSnap.empty) {
      return reply.code(400).send({ error: 'Cannot create listing for a pregnant pet' });
    }

    const listing = await matingService.createListing(request.user!.uid, body);
    return reply.code(201).send(listing);
  });

  fastify.get('/eligible-pets', async (request, reply) => {
    const petsSnap = await db.collection('pets')
      .where('ownerId', '==', request.user!.uid)
      .where('isAvailableForMating', '==', true)
      .get();

    const eligible: any[] = [];
    for (const doc of petsSnap.docs) {
      const pregSnap = await db.collection('pregnancies')
        .where('petId', '==', doc.id)
        .where('status', '==', 'active')
        .limit(1)
        .get();
      if (pregSnap.empty) {
        eligible.push({ id: doc.id, ...doc.data() });
      }
    }
    return reply.code(200).send(eligible);
  });

  fastify.get('/listings', async (request, reply) => {
    const { species, breed, city, page = 1, limit = 20 } = request.query as any;
    const result = await matingService.browseListings({ species, breed, city }, +page, +limit);
    return reply.code(200).send(result);
  });

  fastify.get('/listings/smart', async (request, reply) => {
    const { page = 1, limit = 20 } = request.query as any;
    const result = await matingService.browseSmartListings(request.user!.uid, +page, +limit);
    return reply.code(200).send(result);
  });

  fastify.get('/listings/:id', async (request, reply) => {
    const { id } = request.params as { id: string };
    const listing = await matingService.getListingById(id);
    return reply.code(200).send(listing);
  });

  fastify.get('/pets/:petId/profile', async (request, reply) => {
    const { petId } = request.params as { petId: string };
    const profile = await matingService.getPetProfile(petId);
    return reply.code(200).send(profile);
  });

  fastify.put('/listings/:id', async (request, reply) => {
    const { id } = request.params as { id: string };
    const body = updateListingSchema.parse(request.body);
    const listing = await matingService.updateListing(id, request.user!.uid, body);
    return reply.code(200).send(listing);
  });

  fastify.delete('/listings/:id', async (request, reply) => {
    const { id } = request.params as { id: string };
    await matingService.deleteListing(id, request.user!.uid);
    return reply.code(204).send();
  });

  fastify.post('/requests', async (request, reply) => {
    const body = sendRequestSchema.parse(request.body);

    const senderPetDoc = await db.collection('pets').doc(body.petId).get();
    if (!senderPetDoc.exists || senderPetDoc.data()!.ownerId !== request.user!.uid) {
      return reply.code(404).send({ error: 'Pet not found' });
    }
    if (!senderPetDoc.data()!.isAvailableForMating) {
      return reply.code(400).send({ error: 'Pet must be marked as available for mating' });
    }

    const pregSnap = await db.collection('pregnancies')
      .where('petId', '==', body.petId)
      .where('status', '==', 'active')
      .limit(1)
      .get();
    if (!pregSnap.empty) {
      return reply.code(400).send({ error: 'Cannot send request with a pregnant pet' });
    }

    const result = await matingService.sendRequest(request.user!.uid, body);
    return reply.code(201).send(result);
  });

  fastify.get('/requests/sent', async (request, reply) => {
    const result = await matingService.getSentRequests(request.user!.uid);
    return reply.code(200).send(result);
  });

  fastify.get('/requests/received', async (request, reply) => {
    const result = await matingService.getReceivedRequests(request.user!.uid);
    return reply.code(200).send(result);
  });

  fastify.put('/requests/:id', async (request, reply) => {
    const { id } = request.params as { id: string };
    const { status } = respondRequestSchema.parse(request.body);
    const result = await matingService.respondToRequest(id, request.user!.uid, status);
    return reply.code(200).send(result);
  });

  fastify.put('/requests/:id/respond', async (request, reply) => {
    const { id } = request.params as { id: string };
    const { status } = respondRequestSchema.parse(request.body);
    const result = await matingService.respondToRequest(id, request.user!.uid, status);
    return reply.code(200).send(result);
  });

  fastify.get('/wedding-cards', async (request, reply) => {
    const cards = await matingService.getWeddingCards(request.user!.uid);
    return reply.code(200).send(cards);
  });

  fastify.get('/wedding-cards/:id', async (request, reply) => {
    const { id } = request.params as { id: string };
    const card = await matingService.getWeddingCard(id, request.user!.uid);
    return reply.code(200).send(card);
  });
}
