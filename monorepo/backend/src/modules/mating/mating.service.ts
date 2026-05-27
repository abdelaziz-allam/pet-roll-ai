import { db, FieldValue } from '../../config/firebase';
import { emailService } from '../../services/email.service';

export class MatingService {
  private listingsRef = db.collection('mating_listings');
  private requestsRef = db.collection('mating_requests');
  private petsRef = db.collection('pets');

  async createListing(ownerId: string, input: any) {
    const data = {
      ...input,
      ownerId,
      status: 'active',
      viewCount: 0,
      createdAt: FieldValue.serverTimestamp(),
      updatedAt: FieldValue.serverTimestamp(),
    };
    const doc = await this.listingsRef.add(data);
    return { id: doc.id, ...data };
  }

  async getPetProfile(petId: string) {
    const doc = await this.petsRef.doc(petId).get();
    if (!doc.exists) {
      const error: any = new Error('Pet not found');
      error.statusCode = 404;
      throw error;
    }
    const data = doc.data()!;
    const ownerDoc = await db.collection('users').doc(data.ownerId).get();
    const owner = ownerDoc.exists
      ? { displayName: ownerDoc.data()!.displayName, avatar: ownerDoc.data()!.avatar || null }
      : { displayName: 'Unknown', avatar: null };

    const healthSnap = await db.collection('health_records')
      .where('petId', '==', petId)
      .orderBy('date', 'desc')
      .limit(5)
      .get();
    const healthRecords = healthSnap.docs.map((d) => ({ id: d.id, ...d.data() }));

    const vaccSnap = await db.collection('vaccinations')
      .where('petId', '==', petId)
      .orderBy('date', 'desc')
      .limit(10)
      .get();
    const vaccinations = vaccSnap.docs.map((d) => ({ id: d.id, ...d.data() }));

    return {
      id: doc.id,
      name: data.name,
      species: data.species,
      breed: data.breed,
      gender: data.gender,
      dateOfBirth: data.dateOfBirth,
      weight: data.weight || null,
      color: data.color || null,
      isNeutered: data.isNeutered || false,
      isAvailableForMating: data.isAvailableForMating || false,
      notes: data.notes || null,
      photos: data.photos || [],
      location: data.location || null,
      owner,
      healthRecords,
      vaccinations,
    };
  }

  async browseListings(filters: any, page = 1, limit = 20) {
    let query: any = this.listingsRef.where('status', '==', 'active');

    if (filters.species) {
      query = query.where('species', '==', filters.species);
    }
    if (filters.city && filters.city.trim() !== '') {
      query = query.where('location.city', '==', filters.city);
    }

    const countSnap = await query.count().get();
    const total = countSnap.data().count;
    const offset = (page - 1) * limit;

    const snapshot = await query
      .orderBy('createdAt', 'desc')
      .offset(offset)
      .limit(limit)
      .get();

    let listings = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

    if (filters.breed) {
      const breedLower = filters.breed.toLowerCase();
      listings = listings.sort((a: any, b: any) => {
        const aBreed = (a.breed || '').toLowerCase();
        const bBreed = (b.breed || '').toLowerCase();
        const aExact = aBreed === breedLower ? 1 : 0;
        const bExact = bBreed === breedLower ? 1 : 0;
        if (aExact !== bExact) return bExact - aExact;
        const aPartial = aBreed.includes(breedLower) || breedLower.includes(aBreed) ? 1 : 0;
        const bPartial = bBreed.includes(breedLower) || breedLower.includes(bBreed) ? 1 : 0;
        return bPartial - aPartial;
      });
    }

    return { data: listings, total, page, limit, totalPages: Math.ceil(total / limit) };
  }

  async browseSmartListings(userId: string, page = 1, limit = 20) {
    const userPetsSnap = await this.petsRef
      .where('ownerId', '==', userId)
      .where('isAvailableForMating', '==', true)
      .get();

    let userPet: any;

    if (userPetsSnap.empty) {
      const allPetsSnap = await this.petsRef
        .where('ownerId', '==', userId)
        .limit(1)
        .get();
      if (allPetsSnap.empty) {
        return { data: [], total: 0, page, limit, totalPages: 0, filters_applied: {} };
      }
      userPet = allPetsSnap.docs[0].data();
    } else {
      userPet = userPetsSnap.docs[0].data();
    }

    const city = userPet.location?.city;
    const species = userPet.species;
    const breed = userPet.breed;

    let result = await this.browseListings({ species, city, breed }, page, limit);
    let filtered = (result.data as any[]).filter((l: any) => l.ownerId !== userId);

    if (filtered.length === 0 && city) {
      result = await this.browseListings({ species, breed }, page, limit);
      filtered = (result.data as any[]).filter((l: any) => l.ownerId !== userId);
    }

    if (filtered.length === 0) {
      result = await this.browseListings({ species }, page, limit);
      filtered = (result.data as any[]).filter((l: any) => l.ownerId !== userId);
    }

    return {
      ...result,
      data: filtered,
      total: filtered.length,
      filters_applied: { city: city || null, species: species || null, breed: breed || null },
    };
  }

  async getListingById(listingId: string) {
    const doc = await this.listingsRef.doc(listingId).get();
    if (!doc.exists) {
      const error: any = new Error('Listing not found');
      error.statusCode = 404;
      throw error;
    }
    await this.listingsRef.doc(listingId).update({
      viewCount: FieldValue.increment(1),
    });
    return { id: doc.id, ...doc.data() };
  }

  async updateListing(listingId: string, ownerId: string, input: any) {
    const doc = await this.listingsRef.doc(listingId).get();
    if (!doc.exists || doc.data()!.ownerId !== ownerId) {
      const error: any = new Error('Listing not found');
      error.statusCode = 404;
      throw error;
    }
    await this.listingsRef.doc(listingId).update({ ...input, updatedAt: FieldValue.serverTimestamp() });
    const updated = await this.listingsRef.doc(listingId).get();
    return { id: updated.id, ...updated.data() };
  }

  async deleteListing(listingId: string, ownerId: string) {
    const doc = await this.listingsRef.doc(listingId).get();
    if (!doc.exists || doc.data()!.ownerId !== ownerId) {
      const error: any = new Error('Listing not found');
      error.statusCode = 404;
      throw error;
    }
    await this.listingsRef.doc(listingId).delete();
  }

  async sendRequest(senderId: string, input: any) {
    const listing = await this.listingsRef.doc(input.listingId).get();
    if (!listing.exists) {
      const error: any = new Error('Listing not found');
      error.statusCode = 404;
      throw error;
    }
    if (listing.data()!.ownerId === senderId) {
      const error: any = new Error('Cannot request your own listing');
      error.statusCode = 400;
      throw error;
    }

    const data = {
      listingId: input.listingId,
      senderId,
      receiverId: listing.data()!.ownerId,
      petId: input.petId,
      message: input.message || null,
      status: 'pending',
      createdAt: FieldValue.serverTimestamp(),
      updatedAt: FieldValue.serverTimestamp(),
    };
    const doc = await this.requestsRef.add(data);
    return { id: doc.id, ...data };
  }

  async getSentRequests(senderId: string) {
    const snapshot = await this.requestsRef
      .where('senderId', '==', senderId)
      .orderBy('createdAt', 'desc')
      .get();
    const requests = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    return this.enrichRequests(requests);
  }

  async getReceivedRequests(receiverId: string) {
    const snapshot = await this.requestsRef
      .where('receiverId', '==', receiverId)
      .orderBy('createdAt', 'desc')
      .get();
    const requests = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    return this.enrichRequests(requests);
  }

  private async enrichRequests(requests: any[]) {
    return Promise.all(requests.map(async (req) => {
      const enriched: any = { ...req };

      if (req.listingId) {
        const listingDoc = await this.listingsRef.doc(req.listingId).get();
        if (listingDoc.exists) {
          const listing = listingDoc.data()!;
          enriched.listing = {
            id: listingDoc.id,
            petName: listing.petName || listing.name || null,
            species: listing.species || null,
            breed: listing.breed || null,
            location: listing.location || null,
            photos: listing.photos || [],
            petId: listing.petId || null,
          };
        }
      }

      if (req.petId) {
        const petDoc = await this.petsRef.doc(req.petId).get();
        if (petDoc.exists) {
          const pet = petDoc.data()!;
          enriched.pet = {
            id: petDoc.id,
            name: pet.name,
            species: pet.species,
            breed: pet.breed,
            photos: pet.photos || [],
          };
        }
      }

      if (req.senderId) {
        const senderDoc = await db.collection('users').doc(req.senderId).get();
        if (senderDoc.exists) {
          const sender = senderDoc.data()!;
          enriched.sender = {
            displayName: sender.displayName || null,
            avatar: sender.avatar || null,
          };
        }
      }

      if (req.receiverId) {
        const receiverDoc = await db.collection('users').doc(req.receiverId).get();
        if (receiverDoc.exists) {
          const receiver = receiverDoc.data()!;
          enriched.receiver = {
            displayName: receiver.displayName || null,
            avatar: receiver.avatar || null,
          };
        }
      }

      return enriched;
    }));
  }

  async respondToRequest(requestId: string, receiverId: string, status: 'accepted' | 'rejected') {
    const doc = await this.requestsRef.doc(requestId).get();
    if (!doc.exists || doc.data()!.receiverId !== receiverId) {
      const error: any = new Error('Request not found');
      error.statusCode = 404;
      throw error;
    }
    if (doc.data()!.status !== 'pending') {
      const error: any = new Error('Request already responded');
      error.statusCode = 400;
      throw error;
    }
    await this.requestsRef.doc(requestId).update({
      status,
      respondedAt: new Date().toISOString(),
      updatedAt: FieldValue.serverTimestamp(),
    });
    const updated = await this.requestsRef.doc(requestId).get();
    const result = { id: updated.id, ...updated.data() };

    if (status === 'accepted') {
      this.sendWeddingCard(doc.data()!).catch(() => {});
    }

    return result;
  }

  private async sendWeddingCard(requestData: any) {
    try {
      const [senderDoc, receiverDoc, listingDoc] = await Promise.all([
        db.collection('users').doc(requestData.senderId).get(),
        db.collection('users').doc(requestData.receiverId).get(),
        this.listingsRef.doc(requestData.listingId).get(),
      ]);

      const sender = senderDoc.exists ? senderDoc.data()! : {};
      const receiver = receiverDoc.exists ? receiverDoc.data()! : {};
      const listing = listingDoc.exists ? listingDoc.data()! : {};

      let senderPet: any = {};
      let receiverPet: any = {};
      if (requestData.petId) {
        const petDoc = await db.collection('pets').doc(requestData.petId).get();
        if (petDoc.exists) senderPet = petDoc.data()!;
      }
      if (listing.petId) {
        const petDoc = await db.collection('pets').doc(listing.petId).get();
        if (petDoc.exists) receiverPet = petDoc.data()!;
      }

      const getPhotoUrl = (pet: any) => {
        if (pet.photos && pet.photos.length > 0) {
          const p = pet.photos[0];
          return typeof p === 'string' ? p : p.url;
        }
        return undefined;
      };

      const location = listing.location
        ? `${listing.location.city || ''}${listing.location.city && listing.location.country ? ', ' : ''}${listing.location.country || ''}`
        : undefined;

      await emailService.sendMatchWeddingCard({
        senderName: sender.displayName || 'Pet Parent',
        senderEmail: sender.email || '',
        senderPetName: senderPet.name || 'Your Pet',
        senderPetBreed: senderPet.breed || listing.breed || '',
        senderPetPhoto: getPhotoUrl(senderPet),
        receiverName: receiver.displayName || 'Pet Parent',
        receiverEmail: receiver.email || '',
        receiverPetName: receiverPet.name || listing.petName || 'Their Pet',
        receiverPetBreed: receiverPet.breed || listing.breed || '',
        receiverPetPhoto: getPhotoUrl(receiverPet),
        species: listing.species || '',
        location: location || undefined,
        matchDate: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
      });
    } catch (err) {
      console.error('[MATING] Failed to send wedding card:', err);
    }
  }
}

export const matingService = new MatingService();
