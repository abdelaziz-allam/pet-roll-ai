import type { FastifyInstance } from 'fastify';
import {
  createListingSchema,
  updateListingSchema,
  createMatchRequestSchema,
  updateMatchRequestSchema,
  browseListingsQuerySchema,
} from './mating.schema.js';
import * as matingService from './mating.service.js';
import { requireAuth } from '../../middleware/require-auth.js';

export async function matingRoutes(app: FastifyInstance) {
  // POST /listings - create a mating listing
  app.post('/listings', { preHandler: [requireAuth] }, async (request, reply) => {
    const body = createListingSchema.parse(request.body);
    const result = await matingService.createListing(request.user!.uid, body);
    return reply.status(201).send(result);
  });

  // GET /listings - browse listings with filters
  app.get('/listings', { preHandler: [requireAuth] }, async (request, reply) => {
    const query = browseListingsQuerySchema.parse(request.query);
    const result = await matingService.browseListings(query, request.user!.uid);
    return reply.send(result);
  });

  // GET /listings/:id - get listing detail
  app.get('/listings/:id', { preHandler: [requireAuth] }, async (request, reply) => {
    const { id } = request.params as { id: string };
    const result = await matingService.getListingById(id);
    return reply.send(result);
  });

  // PUT /listings/:id - update listing
  app.put('/listings/:id', { preHandler: [requireAuth] }, async (request, reply) => {
    const { id } = request.params as { id: string };
    const body = updateListingSchema.parse(request.body);
    const result = await matingService.updateListing(id, request.user!.uid, body);
    return reply.send(result);
  });

  // DELETE /listings/:id - remove listing
  app.delete('/listings/:id', { preHandler: [requireAuth] }, async (request, reply) => {
    const { id } = request.params as { id: string };
    await matingService.deleteListing(id, request.user!.uid);
    return reply.status(204).send();
  });

  // POST /requests - send match request
  app.post('/requests', { preHandler: [requireAuth] }, async (request, reply) => {
    const body = createMatchRequestSchema.parse(request.body);
    const result = await matingService.sendMatchRequest(request.user!.uid, body);
    return reply.status(201).send(result);
  });

  // GET /requests/sent - my sent requests
  app.get('/requests/sent', { preHandler: [requireAuth] }, async (request, reply) => {
    const result = await matingService.getSentRequests(request.user!.uid);
    return reply.send(result);
  });

  // GET /requests/received - requests to me
  app.get('/requests/received', { preHandler: [requireAuth] }, async (request, reply) => {
    const result = await matingService.getReceivedRequests(request.user!.uid);
    return reply.send(result);
  });

  // PUT /requests/:id - accept/reject match request
  app.put('/requests/:id', { preHandler: [requireAuth] }, async (request, reply) => {
    const { id } = request.params as { id: string };
    const body = updateMatchRequestSchema.parse(request.body);
    const result = await matingService.updateMatchRequest(id, request.user!.uid, body);
    return reply.send(result);
  });
}
