import { FastifyInstance } from 'fastify';
import { adminService } from './admin.service';
import { requireAdminAuth } from '../../middleware/require-admin-auth';
import { db } from '../../config/firebase';
import { env } from '../../config/env';
import { healthCertificationService } from '../pets/health-certification.service';

export async function adminRoutes(fastify: FastifyInstance) {
  fastify.addHook('preHandler', requireAdminAuth);

  fastify.get('/stats', async (request, reply) => {
    const stats = await adminService.getStats();
    return reply.code(200).send(stats);
  });

  fastify.get('/stats/growth', async (request, reply) => {
    const { period = 'month' } = request.query as { period?: string };
    const stats = await adminService.getGrowthStats(period);
    return reply.code(200).send(stats);
  });

  fastify.get('/users', async (request, reply) => {
    const { page = 1, limit = 20, status } = request.query as any;
    const result = await adminService.getUsers(+page, +limit, status);
    return reply.code(200).send(result);
  });

  fastify.get('/users/:id', async (request, reply) => {
    const { id } = request.params as { id: string };
    const user = await adminService.getUserById(id);
    return reply.code(200).send(user);
  });

  fastify.post('/users', async (request, reply) => {
    const body = request.body as { displayName: string; email: string; role?: string; phone?: string; timezone?: string };
    const user = await adminService.createUser(body);
    return reply.code(201).send(user);
  });

  fastify.put('/users/:id', async (request, reply) => {
    const { id } = request.params as { id: string };
    const body = request.body as { displayName?: string; phone?: string; timezone?: string };
    const user = await adminService.updateUser(id, body);
    return reply.code(200).send(user);
  });

  fastify.put('/users/:id/role', async (request, reply) => {
    const { id } = request.params as { id: string };
    const { role } = request.body as { role: string };
    const user = await adminService.updateUserRole(id, role);
    return reply.code(200).send(user);
  });

  fastify.put('/users/:id/ban', async (request, reply) => {
    const { id } = request.params as { id: string };
    const { reason } = request.body as { reason?: string };
    const user = await adminService.banUser(id, reason || '');
    return reply.code(200).send(user);
  });

  fastify.put('/users/:id/unban', async (request, reply) => {
    const { id } = request.params as { id: string };
    const user = await adminService.unbanUser(id);
    return reply.code(200).send(user);
  });

  fastify.delete('/users/:id', async (request, reply) => {
    const { id } = request.params as { id: string };
    await adminService.deleteUser(id);
    return reply.code(204).send();
  });

  // --- Pet Management ---

  fastify.get('/pets', async (request, reply) => {
    const { page = 1, limit = 20, species, status, country, city } = request.query as any;
    const result = await adminService.getPets(+page, +limit, species, status, country, city);
    return reply.code(200).send(result);
  });

  fastify.get('/pets/:id', async (request, reply) => {
    const { id } = request.params as { id: string };
    const pet = await adminService.getPetById(id);
    return reply.code(200).send(pet);
  });

  fastify.put('/pets/:id/ban', async (request, reply) => {
    const { id } = request.params as { id: string };
    const { reason } = request.body as { reason: string };
    const pet = await adminService.banPet(id, reason);
    return reply.code(200).send(pet);
  });

  fastify.put('/pets/:id/unban', async (request, reply) => {
    const { id } = request.params as { id: string };
    const pet = await adminService.unbanPet(id);
    return reply.code(200).send(pet);
  });

  // --- Pet Categories ---

  fastify.get('/categories', async (request, reply) => {
    const result = await adminService.getCategories();
    return reply.code(200).send(result);
  });

  fastify.post('/categories', async (request, reply) => {
    const body = request.body as { name: string; label: string; icon?: string; description?: string };
    const result = await adminService.createCategory(body);
    return reply.code(201).send(result);
  });

  fastify.put('/categories/:id', async (request, reply) => {
    const { id } = request.params as { id: string };
    const body = request.body as { label?: string; icon?: string; description?: string; isActive?: boolean };
    const result = await adminService.updateCategory(id, body);
    return reply.code(200).send(result);
  });

  fastify.delete('/categories/:id', async (request, reply) => {
    const { id } = request.params as { id: string };
    await adminService.deleteCategory(id);
    return reply.code(204).send();
  });

  fastify.post('/categories/seed', async (request, reply) => {
    const result = await adminService.seedDefaultCategories();
    return reply.code(200).send(result);
  });

  // --- Verifications ---

  fastify.get('/verifications', async (request, reply) => {
    const { status } = request.query as { status?: string };
    const result = await adminService.getVerificationRequests(status);
    return reply.code(200).send(result);
  });

  fastify.get('/verifications/user/:userId', async (request, reply) => {
    const { userId } = request.params as { userId: string };
    const result = await adminService.getVerificationHistory(userId);
    return reply.code(200).send(result);
  });

  fastify.get('/verifications/:id', async (request, reply) => {
    const { id } = request.params as { id: string };
    const result = await adminService.getVerificationById(id);
    return reply.code(200).send(result);
  });

  fastify.put('/verifications/:id', async (request, reply) => {
    const { id } = request.params as { id: string };
    const { approved, rejectionReason, expiryDate } = request.body as { approved: boolean; rejectionReason?: string; expiryDate?: string };
    const result = await adminService.processVerification(id, approved, request.adminUser!.uid, rejectionReason, expiryDate);
    return reply.code(200).send(result);
  });

  fastify.put('/verifications/:id/revoke', async (request, reply) => {
    const { id } = request.params as { id: string };
    const { reason } = request.body as { reason: string };
    if (!reason || !reason.trim()) {
      return reply.code(400).send({ error: 'Reason is required for revoking verification' });
    }
    const result = await adminService.revokeVerification(id, request.adminUser!.uid, reason);
    return reply.code(200).send(result);
  });

  // --- Mating Management ---

  fastify.get('/mating/listings', async (request, reply) => {
    const { status, species } = request.query as { status?: string; species?: string };
    const listings = await adminService.getMatingListings(status, species);
    return reply.code(200).send(listings);
  });

  fastify.get('/mating/stats', async (request, reply) => {
    const stats = await adminService.getMatingStats();
    return reply.code(200).send(stats);
  });

  fastify.get('/mating/breeders', async (request, reply) => {
    const { country, city, species } = request.query as { country?: string; city?: string; species?: string };
    const rankings = await adminService.getBreederRankings({ country, city, species });
    return reply.code(200).send(rankings);
  });

  fastify.get('/mating/breeders/:id', async (request, reply) => {
    const { id } = request.params as { id: string };
    const detail = await adminService.getBreederDetail(id);
    return reply.code(200).send(detail);
  });

  fastify.get('/mating/matches', async (request, reply) => {
    const { status, species, country, city } = request.query as { status?: string; species?: string; country?: string; city?: string };
    const matches = await adminService.getMatingMatches({ status, species, country, city });
    return reply.code(200).send(matches);
  });

  fastify.post('/mating/matches/:id/wedding-card', async (request, reply) => {
    const { id } = request.params as { id: string };
    await adminService.sendWeddingCardForMatch(id);
    return reply.code(200).send({ message: 'Wedding card sent successfully' });
  });

  fastify.get('/mating/matches/:id/wedding-card-preview', async (request, reply) => {
    const { id } = request.params as { id: string };
    const html = await adminService.getWeddingCardPreview(id);
    return reply.code(200).header('content-type', 'text/html').send(html);
  });

  fastify.delete('/mating/listings/:id', async (request, reply) => {
    const { id } = request.params as { id: string };
    await adminService.deleteMatingListing(id);
    return reply.code(204).send();
  });

  // --- App Settings ---

  fastify.get('/settings', async (request, reply) => {
    const settings = await adminService.getSettings();
    return reply.code(200).send(settings);
  });

  fastify.put('/settings/:section', async (request, reply) => {
    const { section } = request.params as { section: string };
    const values = request.body as Record<string, any>;
    const settings = await adminService.updateSettings(section, values);
    return reply.code(200).send(settings);
  });

  // --- Health Certifications ---

  fastify.get('/health-certifications', async (request, reply) => {
    const { status, petId, species, country, city } = request.query as {
      status?: string; petId?: string; species?: string; country?: string; city?: string;
    };
    if (petId) {
      const cert = await healthCertificationService.getPetCertification(petId);
      return reply.code(200).send(cert ? [cert] : []);
    }
    const result = await healthCertificationService.getAllCertifications({ status, species, country, city });
    return reply.code(200).send(result);
  });

  fastify.get('/health-certifications/filters', async (_request, reply) => {
    const result = await healthCertificationService.getCertificationFilters();
    return reply.code(200).send(result);
  });

  fastify.get('/health-certifications/:id', async (request, reply) => {
    const { id } = request.params as { id: string };
    const result = await healthCertificationService.getCertificationById(id);
    return reply.code(200).send(result);
  });

  fastify.put('/health-certifications/:id', async (request, reply) => {
    const { id } = request.params as { id: string };
    const { approved, rejectionReason } = request.body as { approved: boolean; rejectionReason?: string };
    const result = await healthCertificationService.processCertification(id, approved, request.adminUser!.uid, rejectionReason);
    return reply.code(200).send(result);
  });

  fastify.post('/pets/:petId/revoke-health-certification', async (request, reply) => {
    const { petId } = request.params as { petId: string };
    const { reason } = request.body as { reason: string };
    const result = await healthCertificationService.revokeCertification(petId, request.adminUser!.uid, reason);
    return reply.code(200).send(result);
  });

  // --- Vaccination Analytics ---

  fastify.get('/vaccination-analytics', async (request, reply) => {
    const { period, species, country, city } = request.query as {
      period?: string; species?: string; country?: string; city?: string;
    };
    const result = await adminService.getVaccinationAnalytics({ period, species, country, city });
    return reply.code(200).send(result);
  });

  // --- Locations (Countries / Cities) ---

  fastify.get('/locations/countries', async (request, reply) => {
    const result = await adminService.getCountries();
    return reply.code(200).send(result);
  });

  fastify.get('/locations/cities', async (request, reply) => {
    const { country } = request.query as { country?: string };
    const result = await adminService.getCities(country);
    return reply.code(200).send(result);
  });

  fastify.post('/locations/seed', async (request, reply) => {
    const result = await adminService.seedLocations();
    return reply.code(200).send(result);
  });

  // --- Seed Data ---

  fastify.post('/seed-mating', async (request, reply) => {
    if (env.NODE_ENV !== 'development') {
      return reply.code(403).send({ error: 'Only available in development' });
    }

    const usersRes = await adminService.getUsers(1, 100);
    const allUsers = usersRes.data;
    if (allUsers.length < 2) {
      return reply.code(400).send({ error: 'Need at least 2 users. Create users first via POST /admin/users' });
    }

    // Pick verified breeders, or fall back to any users
    let breeders = allUsers.filter((u: any) => u.isVerifiedBreeder);
    if (breeders.length === 0) {
      // Mark first 3 users as verified breeders for demo
      breeders = allUsers.slice(0, Math.min(3, allUsers.length));
      for (const b of breeders) {
        await db.collection('users').doc((b as any).id).update({ isVerifiedBreeder: true });
      }
    }

    const now = new Date();
    const listingsRef = db.collection('mating_listings');
    const requestsRef = db.collection('mating_requests');
    const petsRef = db.collection('pets');

    const sampleListings = [
      { petName: 'Champion Rex', species: 'dog', breed: 'German Shepherd', gender: 'male', age: 3, description: 'Purebred champion bloodline, excellent temperament.', status: 'active', viewCount: 42, price: 500, healthCertified: true, location: { city: 'Berlin', country: 'Germany', lat: 52.52, lng: 13.405 }, color: 'Black & Tan', photo: 'https://images.unsplash.com/photo-1589941013453-ec89f33b5e95?w=400' },
      { petName: 'Princess Luna', species: 'cat', breed: 'Persian', gender: 'female', age: 2, description: 'Show-quality Persian with stunning coat.', status: 'active', viewCount: 28, price: 300, healthCertified: true, location: { city: 'Paris', country: 'France', lat: 48.856, lng: 2.352 }, color: 'White', photo: 'https://images.unsplash.com/photo-1592194996308-7b43878e84a6?w=400' },
      { petName: 'Thunder', species: 'horse', breed: 'Arabian', gender: 'male', age: 5, description: 'Registered Arabian stallion, multiple show wins.', status: 'active', viewCount: 65, price: 2000, healthCertified: true, location: { city: 'Dubai', country: 'UAE', lat: 25.2, lng: 55.27 }, color: 'Bay', photo: 'https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?w=400' },
      { petName: 'Bella', species: 'dog', breed: 'Golden Retriever', gender: 'female', age: 4, description: 'Health tested, OFA certified hips and elbows.', status: 'active', viewCount: 35, price: 0, healthCertified: true, location: { city: 'London', country: 'UK', lat: 51.507, lng: -0.128 }, color: 'Golden', photo: 'https://images.unsplash.com/photo-1633722715463-d30f4f325e24?w=400' },
      { petName: 'Shadow', species: 'cat', breed: 'Siamese', gender: 'male', age: 3, description: 'Traditional Siamese, excellent pedigree.', status: 'active', viewCount: 19, price: 200, healthCertified: false, location: { city: 'Tokyo', country: 'Japan', lat: 35.68, lng: 139.76 }, color: 'Seal Point', photo: 'https://images.unsplash.com/photo-1568152950566-c1bf43f4ab28?w=400' },
      { petName: 'Duke', species: 'dog', breed: 'Rottweiler', gender: 'male', age: 4, description: 'Working line Rottweiler, Schutzhund titled.', status: 'closed', viewCount: 55, price: 800, healthCertified: true, location: { city: 'Munich', country: 'Germany', lat: 48.135, lng: 11.582 }, color: 'Black', photo: 'https://images.unsplash.com/photo-1567752881298-894bb81f9379?w=400' },
      { petName: 'Whiskers', species: 'cat', breed: 'Maine Coon', gender: 'female', age: 2, description: 'Large frame Maine Coon, beautiful markings.', status: 'active', viewCount: 31, price: 0, healthCertified: false, location: { city: 'New York', country: 'USA', lat: 40.713, lng: -74.006 }, color: 'Tabby', photo: 'https://images.unsplash.com/photo-1615497001839-b0a0eac3274c?w=400' },
      { petName: 'Storm', species: 'horse', breed: 'Thoroughbred', gender: 'female', age: 6, description: 'Retired racehorse with excellent bloodline.', status: 'active', viewCount: 48, price: 1500, healthCertified: true, location: { city: 'Kentucky', country: 'USA', lat: 38.04, lng: -84.5 }, color: 'Chestnut', photo: 'https://images.unsplash.com/photo-1598974357801-cbca100e65d3?w=400' },
    ];

    const createdListingIds: string[] = [];
    const createdPetIds: string[] = [];

    for (let i = 0; i < sampleListings.length; i++) {
      const breeder = breeders[i % breeders.length] as any;
      const listing = sampleListings[i];
      const createdAt = new Date(now.getTime() - (sampleListings.length - i) * 2 * 24 * 60 * 60 * 1000).toISOString();

      const petRef = await petsRef.add({
        name: listing.petName,
        species: listing.species,
        breed: listing.breed,
        gender: listing.gender,
        age: listing.age,
        color: listing.color,
        ownerId: breeder.id,
        photos: [{ url: listing.photo }],
        status: 'active',
        createdAt,
      });
      createdPetIds.push(petRef.id);

      const ref = await listingsRef.add({
        petId: petRef.id,
        petName: listing.petName,
        species: listing.species,
        breed: listing.breed,
        gender: listing.gender,
        age: listing.age,
        description: listing.description,
        status: listing.status,
        viewCount: listing.viewCount,
        price: listing.price,
        healthCertified: listing.healthCertified,
        location: listing.location,
        ownerId: breeder.id,
        createdAt,
        updatedAt: createdAt,
      });
      createdListingIds.push(ref.id);
    }

    // Create requester pets (the other side of the match)
    const requesterPets = [
      { name: 'Luna', species: 'dog', breed: 'German Shepherd', gender: 'female', color: 'Sable', photo: 'https://images.unsplash.com/photo-1605568427561-40dd23c2acea?w=400' },
      { name: 'Max', species: 'dog', breed: 'German Shepherd', gender: 'female', color: 'Black', photo: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400' },
      { name: 'Oscar', species: 'cat', breed: 'Persian', gender: 'male', color: 'Grey', photo: 'https://images.unsplash.com/photo-1574158622682-e40e69881006?w=400' },
      { name: 'Star', species: 'horse', breed: 'Arabian', gender: 'female', color: 'White', photo: 'https://images.unsplash.com/photo-1534773728080-884e3ffc8437?w=400' },
      { name: 'Cooper', species: 'dog', breed: 'Golden Retriever', gender: 'male', color: 'Cream', photo: 'https://images.unsplash.com/photo-1552053831-71594a27632d?w=400' },
      { name: 'Nala', species: 'dog', breed: 'Golden Retriever', gender: 'male', color: 'Golden', photo: 'https://images.unsplash.com/photo-1612774412771-005ed8e861d2?w=400' },
      { name: 'Milo', species: 'cat', breed: 'Siamese', gender: 'female', color: 'Blue Point', photo: 'https://images.unsplash.com/photo-1513245543132-31f507417b26?w=400' },
      { name: 'Freya', species: 'dog', breed: 'Rottweiler', gender: 'female', color: 'Black & Mahogany', photo: 'https://images.unsplash.com/photo-1601758124277-f0086d5ab253?w=400' },
      { name: 'Felix', species: 'cat', breed: 'Maine Coon', gender: 'male', color: 'Orange Tabby', photo: 'https://images.unsplash.com/photo-1596854407944-bf87f6fdd49e?w=400' },
      { name: 'Blaze', species: 'horse', breed: 'Thoroughbred', gender: 'male', color: 'Dark Bay', photo: 'https://images.unsplash.com/photo-1509914398892-963f53e6e2f1?w=400' },
    ];

    const nonBreeders = allUsers.filter((u: any) => !breeders.find((b: any) => b.id === (u as any).id));
    const requesters = nonBreeders.length > 0 ? nonBreeders : allUsers;

    const requesterPetIds: string[] = [];
    for (let i = 0; i < requesterPets.length; i++) {
      const owner = requesters[i % requesters.length] as any;
      const pet = requesterPets[i];
      const ref = await petsRef.add({
        ...pet,
        ownerId: owner.id,
        photos: [{ url: pet.photo }],
        status: 'active',
        createdAt: now.toISOString(),
      });
      requesterPetIds.push(ref.id);
    }

    const sampleRequests = [
      { listingIndex: 0, status: 'accepted', message: 'I have a beautiful female GSD, health tested.', petIdx: 0 },
      { listingIndex: 0, status: 'pending', message: 'Interested in mating with my female shepherd.', petIdx: 1 },
      { listingIndex: 1, status: 'accepted', message: 'I have a champion male Persian available.', petIdx: 2 },
      { listingIndex: 2, status: 'rejected', message: 'Would love to breed with my mare.', petIdx: 3 },
      { listingIndex: 3, status: 'accepted', message: 'My male Golden has excellent lineage.', petIdx: 4 },
      { listingIndex: 3, status: 'pending', message: 'Interested for my certified male.', petIdx: 5 },
      { listingIndex: 4, status: 'accepted', message: 'Have a Siamese female, same bloodline.', petIdx: 6 },
      { listingIndex: 5, status: 'accepted', message: 'My female Rottweiler is ready.', petIdx: 7 },
      { listingIndex: 6, status: 'pending', message: 'I have a large male Maine Coon.', petIdx: 8 },
      { listingIndex: 7, status: 'accepted', message: 'Thoroughbred stallion available.', petIdx: 9 },
    ];

    for (let i = 0; i < sampleRequests.length; i++) {
      const req = sampleRequests[i];
      const listingId = createdListingIds[req.listingIndex];
      const listingOwner = breeders[req.listingIndex % breeders.length] as any;
      const requester = requesters[i % requesters.length] as any;
      const createdAt = new Date(now.getTime() - (sampleRequests.length - i) * 12 * 60 * 60 * 1000).toISOString();

      await requestsRef.add({
        listingId,
        senderId: requester.id,
        receiverId: listingOwner.id,
        petId: requesterPetIds[req.petIdx],
        message: req.message,
        status: req.status,
        createdAt,
        respondedAt: req.status !== 'pending' ? new Date(now.getTime() - (sampleRequests.length - i - 1) * 12 * 60 * 60 * 1000).toISOString() : null,
        updatedAt: req.status !== 'pending' ? new Date(now.getTime() - (sampleRequests.length - i - 1) * 12 * 60 * 60 * 1000).toISOString() : createdAt,
      });
    }

    return reply.code(200).send({
      message: `Seeded ${sampleListings.length} mating listings, ${requesterPets.length} pets, and ${sampleRequests.length} requests`,
      listings: sampleListings.length,
      pets: sampleListings.length + requesterPets.length,
      requests: sampleRequests.length,
      breeders: breeders.length,
    });
  });

  fastify.post('/seed-data', async (request, reply) => {
    if (env.NODE_ENV !== 'development') {
      return reply.code(403).send({ error: 'Only available in development' });
    }

    const usersRes = await adminService.getUsers(1, 100);
    const userIds = usersRes.data.map((u: any) => u.id);
    if (userIds.length === 0) {
      return reply.code(400).send({ error: 'Create users first via POST /admin/users' });
    }

    const samplePhotos: Record<string, Array<{ url: string; path: string; uploadedAt: string }>> = {
      dog: [
        { url: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400&h=400&fit=crop', path: 'pets/sample/dog1.jpg', uploadedAt: new Date().toISOString() },
        { url: 'https://images.unsplash.com/photo-1561037404-61cd46aa615b?w=400&h=400&fit=crop', path: 'pets/sample/dog2.jpg', uploadedAt: new Date().toISOString() },
        { url: 'https://images.unsplash.com/photo-1517849845537-4d257902454a?w=400&h=400&fit=crop', path: 'pets/sample/dog3.jpg', uploadedAt: new Date().toISOString() },
        { url: 'https://images.unsplash.com/photo-1544568100-847a948585b9?w=400&h=400&fit=crop', path: 'pets/sample/dog4.jpg', uploadedAt: new Date().toISOString() },
      ],
      cat: [
        { url: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=400&h=400&fit=crop', path: 'pets/sample/cat1.jpg', uploadedAt: new Date().toISOString() },
        { url: 'https://images.unsplash.com/photo-1573865526739-10659fec78a5?w=400&h=400&fit=crop', path: 'pets/sample/cat2.jpg', uploadedAt: new Date().toISOString() },
        { url: 'https://images.unsplash.com/photo-1495360010541-f48722b34f7d?w=400&h=400&fit=crop', path: 'pets/sample/cat3.jpg', uploadedAt: new Date().toISOString() },
      ],
      bird: [
        { url: 'https://images.unsplash.com/photo-1552728089-57bdde30beb3?w=400&h=400&fit=crop', path: 'pets/sample/bird1.jpg', uploadedAt: new Date().toISOString() },
        { url: 'https://images.unsplash.com/photo-1444464666168-49d633b86797?w=400&h=400&fit=crop', path: 'pets/sample/bird2.jpg', uploadedAt: new Date().toISOString() },
      ],
      horse: [
        { url: 'https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?w=400&h=400&fit=crop', path: 'pets/sample/horse1.jpg', uploadedAt: new Date().toISOString() },
        { url: 'https://images.unsplash.com/photo-1534773728080-33d4b294e561?w=400&h=400&fit=crop', path: 'pets/sample/horse2.jpg', uploadedAt: new Date().toISOString() },
        { url: 'https://images.unsplash.com/photo-1598974357801-cbca100e65d3?w=400&h=400&fit=crop', path: 'pets/sample/horse3.jpg', uploadedAt: new Date().toISOString() },
      ],
      rabbit: [
        { url: 'https://images.unsplash.com/photo-1585110396000-c9ffd4e4b308?w=400&h=400&fit=crop', path: 'pets/sample/rabbit1.jpg', uploadedAt: new Date().toISOString() },
        { url: 'https://images.unsplash.com/photo-1452857297128-d9c29adba80b?w=400&h=400&fit=crop', path: 'pets/sample/rabbit2.jpg', uploadedAt: new Date().toISOString() },
      ],
      fish: [
        { url: 'https://images.unsplash.com/photo-1522069169874-c58ec4b76be5?w=400&h=400&fit=crop', path: 'pets/sample/fish1.jpg', uploadedAt: new Date().toISOString() },
      ],
      reptile: [
        { url: 'https://images.unsplash.com/photo-1504450874802-0ba2bcd659e0?w=400&h=400&fit=crop', path: 'pets/sample/reptile1.jpg', uploadedAt: new Date().toISOString() },
        { url: 'https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?w=400&h=400&fit=crop', path: 'pets/sample/reptile2.jpg', uploadedAt: new Date().toISOString() },
      ],
      hamster: [
        { url: 'https://images.unsplash.com/photo-1425082661507-d6d2f1f31fc1?w=400&h=400&fit=crop', path: 'pets/sample/hamster1.jpg', uploadedAt: new Date().toISOString() },
      ],
    };

    const testPets = [
      { name: 'Buddy', species: 'dog', breed: 'Golden Retriever', gender: 'male', weight: 30, color: 'Golden', country: 'United States', city: 'New York' },
      { name: 'Luna', species: 'cat', breed: 'Persian', gender: 'female', weight: 4, color: 'White', country: 'United States', city: 'Los Angeles' },
      { name: 'Max', species: 'dog', breed: 'German Shepherd', gender: 'male', weight: 35, color: 'Black & Tan', country: 'Egypt', city: 'Cairo' },
      { name: 'Whiskers', species: 'cat', breed: 'Siamese', gender: 'female', weight: 3.5, color: 'Cream', country: 'Egypt', city: 'Alexandria' },
      { name: 'Rocky', species: 'dog', breed: 'Bulldog', gender: 'male', weight: 22, color: 'Brindle', country: 'Egypt', city: 'Cairo' },
      { name: 'Tweety', species: 'bird', breed: 'Canary', gender: 'male', weight: 0.02, color: 'Yellow', country: 'Saudi Arabia', city: 'Riyadh' },
      { name: 'Storm', species: 'horse', breed: 'Arabian', gender: 'male', weight: 450, color: 'Gray', country: 'Saudi Arabia', city: 'Jeddah' },
      { name: 'Bella', species: 'dog', breed: 'Labrador', gender: 'female', weight: 27, color: 'Chocolate', country: 'United Kingdom', city: 'London' },
      { name: 'Nemo', species: 'fish', breed: 'Clownfish', gender: 'male', weight: 0.01, color: 'Orange', country: 'United States', city: 'Miami' },
      { name: 'Rex', species: 'reptile', breed: 'Bearded Dragon', gender: 'male', weight: 0.5, color: 'Brown', country: 'Egypt', city: 'Cairo' },
      { name: 'Coco', species: 'rabbit', breed: 'Holland Lop', gender: 'female', weight: 1.8, color: 'Brown', country: 'United Kingdom', city: 'Manchester' },
      { name: 'Duke', species: 'dog', breed: 'Rottweiler', gender: 'male', weight: 50, color: 'Black', country: 'Egypt', city: 'Alexandria' },
      { name: 'Patches', species: 'hamster', breed: 'Syrian', gender: 'female', weight: 0.15, color: 'Golden', country: 'United States', city: 'Chicago' },
    ];

    const petsRef = db.collection('pets');
    for (const pet of testPets) {
      const ownerId = userIds[Math.floor(Math.random() * userIds.length)];
      await petsRef.add({
        ...pet,
        ownerId,
        location: { country: pet.country, city: pet.city },
        isNeutered: Math.random() > 0.5,
        isAvailableForMating: Math.random() > 0.5,
        status: 'active',
        photos: samplePhotos[pet.species] || [],
        createdAt: new Date().toISOString(),
      });
    }

    // Ban one pet for demo
    const allPets = await petsRef.get();
    if (allPets.docs.length > 4) {
      const petToBan = allPets.docs[4];
      await petsRef.doc(petToBan.id).update({
        status: 'banned',
        banReason: 'Inappropriate profile images detected',
        bannedAt: new Date().toISOString(),
      });
    }

    return reply.code(200).send({ message: `Seeded ${testPets.length} pets`, count: testPets.length });
  });

  fastify.post('/seed-verifications', async (request, reply) => {
    if (env.NODE_ENV !== 'development') {
      return reply.code(403).send({ error: 'Only available in development' });
    }

    const usersRes = await adminService.getUsers(1, 100);
    const users = usersRes.data;
    if (users.length < 2) {
      return reply.code(400).send({ error: 'Need at least 2 users. Create users first.' });
    }

    const verificationRef = db.collection('verification_requests');

    const sampleDocuments = [
      { url: 'https://images.unsplash.com/photo-1586953208270-767889db8547?w=600&fit=crop', path: 'verifications/license1.jpg', name: 'breeding_license.jpg', type: 'image/jpeg' },
      { url: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=600&fit=crop', path: 'verifications/cert1.jpg', name: 'certificate.jpg', type: 'image/jpeg' },
      { url: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=600&fit=crop', path: 'verifications/kennel1.jpg', name: 'kennel_photo.jpg', type: 'image/jpeg' },
      { url: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=600&fit=crop', path: 'verifications/kennel2.jpg', name: 'kennel_exterior.jpg', type: 'image/jpeg' },
      { url: 'https://images.unsplash.com/photo-1601758174114-e711c0cbaa69?w=600&fit=crop', path: 'verifications/vet_cert.jpg', name: 'vet_certification.jpg', type: 'image/jpeg' },
    ];

    const now = new Date();

    // User 1: Has a rejected submission (#1) and a new pending one (#2)
    const user1 = users[0] as any;
    await verificationRef.add({
      userId: user1.id,
      userName: user1.displayName,
      userEmail: user1.email,
      kennelName: 'Golden Hearts Kennel',
      breedExperience: '3 years breeding Golden Retrievers',
      documents: [
        { ...sampleDocuments[0], uploadedAt: new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000).toISOString() },
      ],
      status: 'rejected',
      submissionNumber: 1,
      rejectionReason: 'License document is expired. Please submit a valid breeding license that is current and not expired.',
      processedBy: 'admin',
      processedAt: new Date(now.getTime() - 5 * 24 * 60 * 60 * 1000).toISOString(),
      createdAt: new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    });

    await verificationRef.add({
      userId: user1.id,
      userName: user1.displayName,
      userEmail: user1.email,
      kennelName: 'Golden Hearts Kennel',
      breedExperience: '3 years breeding Golden Retrievers. Updated with new valid license.',
      documents: [
        { ...sampleDocuments[0], uploadedAt: new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000).toISOString() },
        { ...sampleDocuments[1], uploadedAt: new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000).toISOString() },
        { ...sampleDocuments[2], uploadedAt: new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000).toISOString() },
      ],
      status: 'pending',
      submissionNumber: 2,
      rejectionReason: null,
      processedBy: null,
      processedAt: null,
      createdAt: new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    });

    // User 2: One pending submission
    const user2 = users[1] as any;
    await verificationRef.add({
      userId: user2.id,
      userName: user2.displayName,
      userEmail: user2.email,
      kennelName: 'Royal Paws Cattery',
      breedExperience: '5 years breeding Persian and Siamese cats. Member of National Cat Breeders Association.',
      documents: [
        { ...sampleDocuments[1], uploadedAt: new Date(now.getTime() - 1 * 24 * 60 * 60 * 1000).toISOString() },
        { ...sampleDocuments[3], uploadedAt: new Date(now.getTime() - 1 * 24 * 60 * 60 * 1000).toISOString() },
        { ...sampleDocuments[4], uploadedAt: new Date(now.getTime() - 1 * 24 * 60 * 60 * 1000).toISOString() },
      ],
      status: 'pending',
      submissionNumber: 1,
      rejectionReason: null,
      processedBy: null,
      processedAt: null,
      createdAt: new Date(now.getTime() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    });

    // User 3 (if exists): Approved
    if (users.length >= 3) {
      const user3 = users[2] as any;
      await verificationRef.add({
        userId: user3.id,
        userName: user3.displayName,
        userEmail: user3.email,
        kennelName: 'Hardy K9 Champions',
        breedExperience: '8 years breeding German Shepherds and Rottweilers. AKC registered breeder.',
        documents: [
          { ...sampleDocuments[0], uploadedAt: new Date(now.getTime() - 14 * 24 * 60 * 60 * 1000).toISOString() },
          { ...sampleDocuments[1], uploadedAt: new Date(now.getTime() - 14 * 24 * 60 * 60 * 1000).toISOString() },
          { ...sampleDocuments[4], uploadedAt: new Date(now.getTime() - 14 * 24 * 60 * 60 * 1000).toISOString() },
        ],
        status: 'approved',
        submissionNumber: 1,
        rejectionReason: null,
        processedBy: 'admin',
        processedAt: new Date(now.getTime() - 10 * 24 * 60 * 60 * 1000).toISOString(),
        createdAt: new Date(now.getTime() - 14 * 24 * 60 * 60 * 1000).toISOString(),
      });

      await db.collection('users').doc(user3.id).update({ isVerifiedBreeder: true });
    }

    return reply.code(200).send({ message: 'Seeded verification requests', count: users.length >= 3 ? 4 : 3 });
  });

  fastify.post('/seed-all-extra', async (request, reply) => {
    if (env.NODE_ENV !== 'development') {
      return reply.code(403).send({ error: 'Only available in development' });
    }

    const usersRes = await adminService.getUsers(1, 100);
    const users = usersRes.data as any[];
    const petsSnap = await db.collection('pets').limit(20).get();
    const pets = petsSnap.docs.map(d => ({ id: d.id, ...d.data() })) as any[];

    if (users.length === 0 || pets.length === 0) {
      return reply.code(400).send({ error: 'Seed users and pets first' });
    }

    const now = new Date();
    let healthCount = 0;
    let vacCount = 0;
    let schedCount = 0;
    let notifCount = 0;

    // --- Health Records ---
    const healthRef = db.collection('health_records');
    const healthRecords = [
      { type: 'checkup', title: 'Annual checkup', description: 'Regular annual wellness exam. All vitals normal.', vetName: 'Dr. Smith', vetClinic: 'PetCare Clinic', cost: 75, daysAgo: 30 },
      { type: 'illness', title: 'Upset stomach', description: 'Vomiting and diarrhea for 2 days. Prescribed anti-nausea medication.', vetName: 'Dr. Johnson', vetClinic: 'Animal Hospital', cost: 120, daysAgo: 15 },
      { type: 'dental', title: 'Teeth cleaning', description: 'Professional dental cleaning under anesthesia. Two minor extractions.', vetName: 'Dr. Patel', vetClinic: 'Dental Vet Specialists', cost: 350, daysAgo: 60 },
      { type: 'injury', title: 'Paw cut', description: 'Cut on front right paw from broken glass. Cleaned and bandaged.', vetName: 'Dr. Lee', vetClinic: 'Emergency Pet ER', cost: 95, daysAgo: 7 },
      { type: 'checkup', title: '6-month wellness check', description: 'Semi-annual checkup. Weight stable, heart and lungs clear.', vetName: 'Dr. Smith', vetClinic: 'PetCare Clinic', cost: 60, daysAgo: 180 },
      { type: 'surgery', title: 'Lump removal', description: 'Lipoma removed from left flank. Biopsy confirmed benign.', vetName: 'Dr. Martinez', vetClinic: 'Surgical Vet Center', cost: 800, daysAgo: 90 },
      { type: 'checkup', title: 'New pet examination', description: 'First vet visit for new puppy. Healthy, started vaccination schedule.', vetName: 'Dr. Brown', vetClinic: 'Happy Paws Vet', cost: 55, daysAgo: 120 },
      { type: 'illness', title: 'Ear infection', description: 'Left ear infection diagnosed. Prescribed ear drops for 10 days.', vetName: 'Dr. Johnson', vetClinic: 'Animal Hospital', cost: 85, daysAgo: 45 },
    ];

    for (const rec of healthRecords) {
      const pet = pets[healthCount % pets.length];
      await healthRef.add({
        petId: pet.id,
        ownerId: pet.ownerId,
        type: rec.type,
        title: rec.title,
        description: rec.description,
        vetName: rec.vetName,
        vetClinic: rec.vetClinic,
        cost: rec.cost,
        date: new Date(now.getTime() - rec.daysAgo * 24 * 60 * 60 * 1000).toISOString(),
        createdAt: new Date(now.getTime() - rec.daysAgo * 24 * 60 * 60 * 1000).toISOString(),
      });
      healthCount++;
    }

    // --- Vaccinations ---
    const vacRef = db.collection('vaccinations');
    const vaccinations = [
      { name: 'Rabies', manufacturer: 'Zoetis', batchNumber: 'RAB-2024-001', daysAgo: 90, nextDueDays: 275 },
      { name: 'DHPP (Distemper)', manufacturer: 'Merck', batchNumber: 'DHP-2024-045', daysAgo: 60, nextDueDays: 305 },
      { name: 'Bordetella', manufacturer: 'Elanco', batchNumber: 'BOR-2024-112', daysAgo: 180, nextDueDays: 185 },
      { name: 'Leptospirosis', manufacturer: 'Zoetis', batchNumber: 'LEP-2024-078', daysAgo: 120, nextDueDays: 245 },
      { name: 'FVRCP (Feline)', manufacturer: 'Boehringer', batchNumber: 'FVR-2024-033', daysAgo: 45, nextDueDays: 320 },
      { name: 'FeLV (Feline Leukemia)', manufacturer: 'Merck', batchNumber: 'FLV-2024-089', daysAgo: 30, nextDueDays: 335 },
      { name: 'Canine Influenza', manufacturer: 'Zoetis', batchNumber: 'CIF-2024-156', daysAgo: 200, nextDueDays: 165 },
      { name: 'Lyme Disease', manufacturer: 'Merck', batchNumber: 'LYM-2024-022', daysAgo: 150, nextDueDays: 215 },
      { name: 'Rabies (3-year)', manufacturer: 'Merial', batchNumber: 'RAB3-2023-044', daysAgo: 365, nextDueDays: 730 },
      { name: 'Parvovirus Booster', manufacturer: 'Zoetis', batchNumber: 'PAR-2024-201', daysAgo: 14, nextDueDays: 351 },
    ];

    for (const vac of vaccinations) {
      const pet = pets[vacCount % pets.length];
      await vacRef.add({
        petId: pet.id,
        ownerId: pet.ownerId,
        name: vac.name,
        manufacturer: vac.manufacturer,
        batchNumber: vac.batchNumber,
        administeredDate: new Date(now.getTime() - vac.daysAgo * 24 * 60 * 60 * 1000).toISOString(),
        nextDueDate: new Date(now.getTime() + vac.nextDueDays * 24 * 60 * 60 * 1000).toISOString(),
        vetName: 'Dr. Smith',
        vetClinic: 'PetCare Clinic',
        status: 'completed',
        createdAt: new Date(now.getTime() - vac.daysAgo * 24 * 60 * 60 * 1000).toISOString(),
      });
      vacCount++;
    }

    // --- Schedules ---
    const schedRef = db.collection('schedules');
    const schedules = [
      { type: 'feeding', title: 'Morning feed', frequency: 'daily', time: '08:00', notes: 'Dry food + wet food mix' },
      { type: 'feeding', title: 'Evening feed', frequency: 'daily', time: '18:00', notes: 'Dry food only' },
      { type: 'medication', title: 'Heartworm prevention', frequency: 'monthly', time: '09:00', notes: 'Heartgard Plus chewable' },
      { type: 'grooming', title: 'Bath and brush', frequency: 'weekly', time: '10:00', notes: 'Use hypoallergenic shampoo' },
      { type: 'exercise', title: 'Morning walk', frequency: 'daily', time: '07:00', notes: '30 minute walk in the park' },
      { type: 'exercise', title: 'Evening play', frequency: 'daily', time: '17:00', notes: 'Fetch and running in yard' },
      { type: 'vet_visit', title: 'Annual checkup', frequency: 'custom', time: '14:00', notes: 'Book 2 weeks in advance' },
      { type: 'medication', title: 'Flea treatment', frequency: 'monthly', time: '09:00', notes: 'Frontline Plus topical' },
      { type: 'grooming', title: 'Nail trimming', frequency: 'biweekly', time: '11:00', notes: 'Check for overgrown nails' },
      { type: 'feeding', title: 'Supplement', frequency: 'daily', time: '08:30', notes: 'Joint supplement with breakfast' },
    ];

    for (const sched of schedules) {
      const pet = pets[schedCount % pets.length];
      await schedRef.add({
        petId: pet.id,
        ownerId: pet.ownerId,
        type: sched.type,
        title: sched.title,
        frequency: sched.frequency,
        time: sched.time,
        notes: sched.notes,
        isActive: true,
        lastCompleted: new Date(now.getTime() - 24 * 60 * 60 * 1000).toISOString(),
        nextDue: new Date(now.getTime() + 12 * 60 * 60 * 1000).toISOString(),
        createdAt: new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000).toISOString(),
      });
      schedCount++;
    }

    // --- Notifications ---
    const notifRef = db.collection('notifications');
    const notifications = [
      { title: 'Vaccination due soon', body: 'Rabies vaccination for Buddy is due in 7 days', type: 'vaccination_reminder', daysAgo: 0 },
      { title: 'New mating request', body: 'Sarah Miller sent a mating request for Luna', type: 'mating_request', daysAgo: 1 },
      { title: 'Schedule reminder', body: 'Morning feed for Max is due at 08:00', type: 'schedule_reminder', daysAgo: 0 },
      { title: 'Mating request accepted', body: 'Your mating request for Champion Rex was accepted!', type: 'mating_accepted', daysAgo: 2 },
      { title: 'Health checkup reminder', body: 'Annual checkup for Bella is overdue by 2 weeks', type: 'health_reminder', daysAgo: 3 },
      { title: 'New message', body: 'You have a new message from Mohammed Ali', type: 'chat_message', daysAgo: 0 },
      { title: 'Verification approved', body: 'Your breeder verification has been approved!', type: 'verification_update', daysAgo: 5 },
      { title: 'Vaccination overdue', body: 'Bordetella vaccination for Rocky is overdue', type: 'vaccination_overdue', daysAgo: 1 },
      { title: 'New mating match!', body: 'A potential match was found for Princess Luna', type: 'mating_match', daysAgo: 4 },
      { title: 'Weight milestone', body: 'Duke has reached a healthy weight milestone!', type: 'milestone', daysAgo: 6 },
      { title: 'Schedule completed', body: 'Evening feed for Whiskers marked as done', type: 'schedule_completed', daysAgo: 0 },
      { title: 'New review', body: 'Emma Johnson left a 5-star breeder review', type: 'review', daysAgo: 2 },
    ];

    for (const notif of notifications) {
      const user = users[notifCount % users.length];
      await notifRef.add({
        userId: user.id,
        title: notif.title,
        body: notif.body,
        type: notif.type,
        read: notifCount > 6,
        readAt: notifCount > 6 ? new Date(now.getTime() - notif.daysAgo * 24 * 60 * 60 * 1000 + 3600000).toISOString() : null,
        createdAt: new Date(now.getTime() - notif.daysAgo * 24 * 60 * 60 * 1000).toISOString(),
      });
      notifCount++;
    }

    // --- Pregnancies ---
    const pregRef = db.collection('pregnancies');
    const femalePets = pets.filter(p => p.gender === 'female');
    let pregCount = 0;

    if (femalePets.length >= 2) {
      const pregnancies = [
        { status: 'active', startDaysAgo: 30, expectedDueDays: 33, notes: 'First pregnancy, ultrasound confirmed 4 puppies' },
        { status: 'completed', startDaysAgo: 90, expectedDueDays: -27, notes: 'Delivered 3 healthy kittens on expected date', litterSize: 3 },
      ];

      for (const preg of pregnancies) {
        const pet = femalePets[pregCount % femalePets.length];
        await pregRef.add({
          petId: pet.id,
          ownerId: pet.ownerId,
          status: preg.status,
          startDate: new Date(now.getTime() - preg.startDaysAgo * 24 * 60 * 60 * 1000).toISOString(),
          expectedDueDate: new Date(now.getTime() + preg.expectedDueDays * 24 * 60 * 60 * 1000).toISOString(),
          notes: preg.notes,
          litterSize: preg.litterSize || null,
          createdAt: new Date(now.getTime() - preg.startDaysAgo * 24 * 60 * 60 * 1000).toISOString(),
        });
        pregCount++;
      }
    }

    // --- Chat rooms ---
    const chatRef = db.collection('chat_rooms');
    const chatMsgRef = db.collection('chat_messages');
    if (users.length >= 2) {
      const room1 = await chatRef.add({
        participants: [users[0].id, users[1].id],
        participantNames: { [users[0].id]: users[0].displayName, [users[1].id]: users[1].displayName },
        lastMessage: 'Yes, Luna is available for viewing this weekend!',
        lastMessageAt: new Date(now.getTime() - 2 * 60 * 60 * 1000).toISOString(),
        createdAt: new Date(now.getTime() - 3 * 24 * 60 * 60 * 1000).toISOString(),
      });
      const msgs1 = [
        { senderId: users[0].id, text: 'Hi! I saw your mating listing for Princess Luna. Is she still available?', daysAgo: 3 },
        { senderId: users[1].id, text: 'Yes she is! Would you like to schedule a meet?', daysAgo: 2.5 },
        { senderId: users[0].id, text: 'That would be great. Is this weekend possible?', daysAgo: 2 },
        { senderId: users[1].id, text: 'Yes, Luna is available for viewing this weekend!', daysAgo: 0.08 },
      ];
      for (const msg of msgs1) {
        await chatMsgRef.add({
          roomId: room1.id,
          senderId: msg.senderId,
          text: msg.text,
          createdAt: new Date(now.getTime() - msg.daysAgo * 24 * 60 * 60 * 1000).toISOString(),
        });
      }

      if (users.length >= 4) {
        const room2 = await chatRef.add({
          participants: [users[2].id, users[3].id],
          participantNames: { [users[2].id]: users[2].displayName, [users[3].id]: users[3].displayName },
          lastMessage: 'The health certificate has been uploaded. Check the listing.',
          lastMessageAt: new Date(now.getTime() - 5 * 60 * 60 * 1000).toISOString(),
          createdAt: new Date(now.getTime() - 5 * 24 * 60 * 60 * 1000).toISOString(),
        });
        const msgs2 = [
          { senderId: users[2].id, text: 'Hello, I noticed your German Shepherd listing. Does he have a health certificate?', daysAgo: 5 },
          { senderId: users[3].id, text: 'Yes, all health tests are up to date. I can share the documents.', daysAgo: 4 },
          { senderId: users[2].id, text: 'That would be great, please share them.', daysAgo: 3 },
          { senderId: users[3].id, text: 'The health certificate has been uploaded. Check the listing.', daysAgo: 0.2 },
        ];
        for (const msg of msgs2) {
          await chatMsgRef.add({
            roomId: room2.id,
            senderId: msg.senderId,
            text: msg.text,
            createdAt: new Date(now.getTime() - msg.daysAgo * 24 * 60 * 60 * 1000).toISOString(),
          });
        }
      }
    }

    return reply.code(200).send({
      message: 'Seeded all extra data',
      health_records: healthCount,
      vaccinations: vacCount,
      schedules: schedCount,
      notifications: notifCount,
      pregnancies: pregCount,
      chat_rooms: users.length >= 4 ? 2 : 1,
    });
  });
}
