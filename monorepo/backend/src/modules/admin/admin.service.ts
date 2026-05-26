import { db, FieldValue } from '../../config/firebase';
import { emailService } from '../../services/email.service';
import { countries } from '../../data/countries';

export class AdminService {
  private usersRef = db.collection('users');
  private petsRef = db.collection('pets');
  private categoriesRef = db.collection('pet_categories');

  async getStats() {
    const [usersCount, petsCount, listingsCount] = await Promise.all([
      this.usersRef.count().get(),
      db.collection('pets').count().get(),
      db.collection('mating_listings').where('status', '==', 'active').count().get(),
    ]);
    return {
      totalUsers: usersCount.data().count,
      totalPets: petsCount.data().count,
      activeListings: listingsCount.data().count,
    };
  }

  async getGrowthStats(period: string) {
    const now = new Date();
    const daysBack = period === 'week' ? 7 : period === 'month' ? 30 : 90;
    const since = new Date(now.getTime() - daysBack * 24 * 60 * 60 * 1000);

    const snapshot = await this.usersRef
      .where('createdAt', '>=', since)
      .get();

    return { newUsers: snapshot.size, period };
  }

  async getUsers(page = 1, limit = 20, status?: string) {
    let query: any = this.usersRef;
    if (status) {
      query = query.where('status', '==', status);
    }

    const countSnap = await query.count().get();
    const total = countSnap.data().count;
    const offset = (page - 1) * limit;

    const snapshot = await query
      .orderBy('createdAt', 'desc')
      .offset(offset)
      .limit(limit)
      .get();

    const users = snapshot.docs.map((doc: any) => ({ id: doc.id, ...doc.data() }));
    return { data: users, total, page, limit, totalPages: Math.ceil(total / limit) };
  }

  async getUserById(userId: string) {
    const doc = await this.usersRef.doc(userId).get();
    if (!doc.exists) {
      const error: any = new Error('User not found');
      error.statusCode = 404;
      throw error;
    }
    return { id: doc.id, ...doc.data() };
  }

  async createUser(data: { displayName: string; email: string; role?: string; phone?: string; timezone?: string }) {
    const ref = await this.usersRef.add({
      displayName: data.displayName,
      email: data.email,
      role: data.role || 'user',
      status: 'active',
      isVerifiedBreeder: false,
      petsCount: 0,
      phone: data.phone || null,
      timezone: data.timezone || null,
      createdAt: new Date().toISOString(),
    });
    return { id: ref.id, ...data, role: data.role || 'user', status: 'active', isVerifiedBreeder: false, petsCount: 0 };
  }

  async updateUser(userId: string, data: { displayName?: string; phone?: string; timezone?: string }) {
    await this.getUserById(userId);
    await this.usersRef.doc(userId).update({ ...data, updatedAt: FieldValue.serverTimestamp() });
    return this.getUserById(userId);
  }

  async updateUserRole(userId: string, role: string) {
    await this.getUserById(userId);
    await this.usersRef.doc(userId).update({ role, updatedAt: FieldValue.serverTimestamp() });
    return this.getUserById(userId);
  }

  async banUser(userId: string, reason: string) {
    await this.getUserById(userId);
    await this.usersRef.doc(userId).update({
      status: 'banned',
      banReason: reason,
      bannedAt: new Date().toISOString(),
      updatedAt: FieldValue.serverTimestamp(),
    });
    return this.getUserById(userId);
  }

  async unbanUser(userId: string) {
    await this.getUserById(userId);
    await this.usersRef.doc(userId).update({
      status: 'active',
      banReason: null,
      bannedAt: null,
      updatedAt: FieldValue.serverTimestamp(),
    });
    return this.getUserById(userId);
  }

  async deleteUser(userId: string) {
    await this.getUserById(userId);
    await this.usersRef.doc(userId).delete();
  }

  // --- Pet Management ---

  async getPets(page = 1, limit = 20, species?: string, status?: string, country?: string, city?: string) {
    let query: any = this.petsRef;
    if (species) query = query.where('species', '==', species);
    if (status) query = query.where('status', '==', status);
    if (country) query = query.where('location.country', '==', country);
    if (city) query = query.where('location.city', '==', city);

    const countSnap = await query.count().get();
    const total = countSnap.data().count;
    const offset = (page - 1) * limit;

    const snapshot = await query
      .orderBy('createdAt', 'desc')
      .offset(offset)
      .limit(limit)
      .get();

    const pets = await Promise.all(
      snapshot.docs.map(async (doc: any) => {
        const data = doc.data();
        let ownerName = 'Unknown';
        if (data.ownerId) {
          try {
            const ownerDoc = await this.usersRef.doc(data.ownerId).get();
            if (ownerDoc.exists) ownerName = ownerDoc.data()!.displayName || ownerName;
          } catch {}
        }
        const { location, ...rest } = data;
        return { id: doc.id, ...rest, country: location?.country || null, city: location?.city || null, ownerName };
      })
    );

    return { data: pets, total, page, limit, totalPages: Math.ceil(total / limit) };
  }

  async getPetById(petId: string) {
    const doc = await this.petsRef.doc(petId).get();
    if (!doc.exists) {
      const error: any = new Error('Pet not found');
      error.statusCode = 404;
      throw error;
    }
    const data = doc.data()!;
    let ownerName = 'Unknown';
    if (data.ownerId) {
      try {
        const ownerDoc = await this.usersRef.doc(data.ownerId).get();
        if (ownerDoc.exists) ownerName = ownerDoc.data()!.displayName || ownerName;
      } catch {}
    }
    const { location, ...rest } = data;
    return { id: doc.id, ...rest, country: location?.country || null, city: location?.city || null, ownerName };
  }

  async banPet(petId: string, reason: string) {
    const doc = await this.petsRef.doc(petId).get();
    if (!doc.exists) {
      const error: any = new Error('Pet not found');
      error.statusCode = 404;
      throw error;
    }
    await this.petsRef.doc(petId).update({
      status: 'banned',
      banReason: reason,
      bannedAt: new Date().toISOString(),
      updatedAt: FieldValue.serverTimestamp(),
    });
    return this.getPetById(petId);
  }

  async unbanPet(petId: string) {
    const doc = await this.petsRef.doc(petId).get();
    if (!doc.exists) {
      const error: any = new Error('Pet not found');
      error.statusCode = 404;
      throw error;
    }
    await this.petsRef.doc(petId).update({
      status: 'active',
      banReason: null,
      bannedAt: null,
      updatedAt: FieldValue.serverTimestamp(),
    });
    return this.getPetById(petId);
  }

  // --- Verifications ---

  async getVerificationRequests(status?: string) {
    let query: any = db.collection('verification_requests');
    if (status) {
      query = query.where('status', '==', status);
    }
    query = query.orderBy('createdAt', 'desc');

    const snapshot = await query.get();
    const requests = await Promise.all(
      snapshot.docs.map(async (doc: any) => {
        const data = doc.data();
        // Join user data for admin listing
        let displayName = data.userName || 'Unknown';
        let email = data.userEmail || 'Unknown';
        if (data.userId) {
          try {
            const userDoc = await this.usersRef.doc(data.userId).get();
            if (userDoc.exists) {
              const userData = userDoc.data()!;
              displayName = userData.displayName || displayName;
              email = userData.email || email;
            }
          } catch {}
        }
        return {
          id: doc.id,
          ...data,
          displayName,
          email,
        };
      })
    );
    return requests;
  }

  async getVerificationById(requestId: string) {
    const doc = await db.collection('verification_requests').doc(requestId).get();
    if (!doc.exists) {
      const error: any = new Error('Verification request not found');
      error.statusCode = 404;
      throw error;
    }
    const data = doc.data()!;

    // Get user details
    let displayName = data.userName || 'Unknown';
    let email = data.userEmail || 'Unknown';
    if (data.userId) {
      try {
        const userDoc = await this.usersRef.doc(data.userId).get();
        if (userDoc.exists) {
          const userData = userDoc.data()!;
          displayName = userData.displayName || displayName;
          email = userData.email || email;
        }
      } catch {}
    }

    // Get all historical submissions for this user
    const historySnapshot = await db.collection('verification_requests')
      .where('userId', '==', data.userId)
      .orderBy('createdAt', 'desc')
      .get();

    const history = historySnapshot.docs.map((d: any) => ({ id: d.id, ...d.data() }));

    return {
      id: requestId,
      ...data,
      displayName,
      email,
      history,
    };
  }

  async getVerificationHistory(userId: string) {
    const snapshot = await db.collection('verification_requests')
      .where('userId', '==', userId)
      .orderBy('createdAt', 'desc')
      .get();

    return snapshot.docs.map((doc: any) => ({ id: doc.id, ...doc.data() }));
  }

  async processVerification(requestId: string, approved: boolean, adminId: string, rejectionReason?: string) {
    const doc = await db.collection('verification_requests').doc(requestId).get();
    if (!doc.exists) {
      const error: any = new Error('Request not found');
      error.statusCode = 404;
      throw error;
    }
    const data = doc.data()!;
    const newStatus = approved ? 'approved' : 'rejected';

    const updateData: any = {
      status: newStatus,
      processedBy: adminId,
      processedAt: new Date().toISOString(),
    };

    if (!approved && rejectionReason) {
      updateData.rejectionReason = rejectionReason;
    }

    await db.collection('verification_requests').doc(requestId).update(updateData);

    if (approved) {
      await this.usersRef.doc(data.userId).update({
        isVerifiedBreeder: true,
        updatedAt: FieldValue.serverTimestamp(),
      });
    }

    return { id: requestId, status: newStatus, rejectionReason: updateData.rejectionReason || null };
  }
  // --- Mating ---

  async getMatingListings(status?: string, species?: string) {
    let query: any = db.collection('mating_listings');
    if (status) query = query.where('status', '==', status);
    if (species) query = query.where('species', '==', species);
    query = query.orderBy('createdAt', 'desc');

    const snapshot = await query.get();
    const listings = await Promise.all(
      snapshot.docs.map(async (doc: any) => {
        const data = doc.data();
        let ownerName = 'Unknown';
        let ownerEmail = '';
        if (data.ownerId) {
          try {
            const userDoc = await this.usersRef.doc(data.ownerId).get();
            if (userDoc.exists) {
              ownerName = userDoc.data()!.displayName || ownerName;
              ownerEmail = userDoc.data()!.email || '';
            }
          } catch {}
        }
        return { id: doc.id, ...data, ownerName, ownerEmail };
      })
    );
    return listings;
  }

  async getMatingStats() {
    const [listingsSnap, requestsSnap] = await Promise.all([
      db.collection('mating_listings').get(),
      db.collection('mating_requests').get(),
    ]);

    const listings = listingsSnap.docs.map((d: any) => d.data());
    const requests = requestsSnap.docs.map((d: any) => d.data());

    return {
      totalListings: listings.length,
      activeListings: listings.filter((l: any) => l.status === 'active').length,
      totalRequests: requests.length,
      acceptedRequests: requests.filter((r: any) => r.status === 'accepted').length,
      rejectedRequests: requests.filter((r: any) => r.status === 'rejected').length,
      pendingRequests: requests.filter((r: any) => r.status === 'pending').length,
      totalViews: listings.reduce((sum: number, l: any) => sum + (l.viewCount || 0), 0),
    };
  }

  async getBreederRankings(filters?: { country?: string; city?: string; species?: string }) {
    const usersSnap = await this.usersRef.where('isVerifiedBreeder', '==', true).get();
    const breeders = usersSnap.docs.map((d: any) => ({ id: d.id, ...d.data() }));

    const [listingsSnap, requestsSnap] = await Promise.all([
      db.collection('mating_listings').get(),
      db.collection('mating_requests').get(),
    ]);

    let allListings = listingsSnap.docs.map((d: any) => ({ id: d.id, ...d.data() }));
    const allRequests = requestsSnap.docs.map((d: any) => ({ id: d.id, ...d.data() }));

    if (filters?.country) {
      allListings = allListings.filter((l: any) => l.location?.country === filters.country);
    }
    if (filters?.city) {
      allListings = allListings.filter((l: any) => l.location?.city === filters.city);
    }
    if (filters?.species) {
      allListings = allListings.filter((l: any) => l.species === filters.species);
    }

    const filteredListingIds = new Set(allListings.map((l: any) => l.id));
    const filteredRequests = allRequests.filter((r: any) => filteredListingIds.has(r.listingId));

    const hasFilters = filters?.country || filters?.city || filters?.species;

    const rankings = breeders.map((breeder: any) => {
      const myListings = allListings.filter((l: any) => l.ownerId === breeder.id);
      const myMatches = filteredRequests.filter((r: any) => r.receiverId === breeder.id && r.status === 'accepted');
      const totalViews = myListings.reduce((sum: number, l: any) => sum + (l.viewCount || 0), 0);

      const primaryListing = myListings.find((l: any) => l.location?.country) || myListings[0];
      const country = primaryListing?.location?.country || breeder.country || null;
      const city = primaryListing?.location?.city || breeder.city || null;

      return {
        userId: breeder.id,
        displayName: breeder.displayName || 'Unknown',
        email: breeder.email || '',
        isVerifiedBreeder: true,
        country,
        city,
        totalListings: myListings.length,
        activeListings: myListings.filter((l: any) => l.status === 'active').length,
        totalMatches: myMatches.length,
        totalViews,
        successRate: myListings.length > 0 ? Math.round((myMatches.length / myListings.length) * 100) : 0,
        joinedAt: breeder.createdAt || '',
        speciesBreakdown: this.computeSpeciesBreakdown(myListings, filteredRequests, breeder.id),
      };
    }).filter((r: any) => !hasFilters || r.totalListings > 0);

    rankings.sort((a: any, b: any) => b.totalMatches - a.totalMatches || b.totalListings - a.totalListings);

    const speciesRankings = this.computeTopPerSpecies(allListings, filteredRequests, breeders);

    const availableCountries = [...new Set(listingsSnap.docs.map((d: any) => d.data().location?.country).filter(Boolean))] as string[];
    const availableCities = [...new Set(
      listingsSnap.docs
        .filter((d: any) => !filters?.country || d.data().location?.country === filters.country)
        .map((d: any) => d.data().location?.city)
        .filter(Boolean)
    )] as string[];
    const availableSpecies = [...new Set(listingsSnap.docs.map((d: any) => d.data().species).filter(Boolean))] as string[];

    return {
      rankings: rankings.slice(0, 10),
      speciesRankings,
      filters: { countries: availableCountries, cities: availableCities, species: availableSpecies },
    };
  }

  private computeSpeciesBreakdown(listings: any[], requests: any[], breederId: string) {
    const speciesMap: Record<string, { listings: number; matches: number }> = {};
    for (const l of listings) {
      const sp = l.species || 'other';
      if (!speciesMap[sp]) speciesMap[sp] = { listings: 0, matches: 0 };
      speciesMap[sp].listings++;
    }
    for (const r of requests) {
      if (r.receiverId !== breederId || r.status !== 'accepted') continue;
      const listing = listings.find((l: any) => l.id === r.listingId);
      if (listing) {
        const sp = listing.species || 'other';
        if (speciesMap[sp]) speciesMap[sp].matches++;
      }
    }
    return speciesMap;
  }

  private computeTopPerSpecies(listings: any[], requests: any[], breeders: any[]) {
    const speciesSet = new Set(listings.map((l: any) => l.species).filter(Boolean));
    const result: Record<string, any[]> = {};

    for (const species of speciesSet) {
      const speciesListings = listings.filter((l: any) => l.species === species);
      const speciesListingIds = new Set(speciesListings.map((l: any) => l.id));
      const speciesRequests = requests.filter((r: any) => speciesListingIds.has(r.listingId));

      const ranked = breeders.map((breeder: any) => {
        const myListings = speciesListings.filter((l: any) => l.ownerId === breeder.id);
        if (myListings.length === 0) return null;
        const myMatches = speciesRequests.filter((r: any) => r.receiverId === breeder.id && r.status === 'accepted');
        const totalViews = myListings.reduce((sum: number, l: any) => sum + (l.viewCount || 0), 0);
        return {
          userId: breeder.id,
          displayName: breeder.displayName || 'Unknown',
          totalListings: myListings.length,
          activeListings: myListings.filter((l: any) => l.status === 'active').length,
          totalMatches: myMatches.length,
          totalViews,
          successRate: myListings.length > 0 ? Math.round((myMatches.length / myListings.length) * 100) : 0,
        };
      }).filter(Boolean);

      ranked.sort((a: any, b: any) => b.totalMatches - a.totalMatches || b.totalListings - a.totalListings);
      result[species] = ranked.slice(0, 10);
    }

    return result;
  }

  async getBreederDetail(userId: string) {
    const userDoc = await this.usersRef.doc(userId).get();
    if (!userDoc.exists) {
      const error: any = new Error('User not found');
      error.statusCode = 404;
      throw error;
    }
    const user = { id: userDoc.id, ...userDoc.data() };

    // Get their listings
    const listingsSnap = await db.collection('mating_listings')
      .where('ownerId', '==', userId)
      .orderBy('createdAt', 'desc')
      .get();
    const listings = listingsSnap.docs.map((d: any) => ({ id: d.id, ...d.data() }));

    // Get their received requests (matches)
    const requestsSnap = await db.collection('mating_requests')
      .where('receiverId', '==', userId)
      .orderBy('createdAt', 'desc')
      .get();
    const requests = requestsSnap.docs.map((d: any) => ({ id: d.id, ...d.data() }));

    const totalMatches = requests.filter((r: any) => r.status === 'accepted').length;
    const totalViews = listings.reduce((sum: number, l: any) => sum + (l.viewCount || 0), 0);

    return {
      ...(user as any),
      listings,
      requests,
      stats: {
        totalListings: listings.length,
        activeListings: listings.filter((l: any) => l.status === 'active').length,
        totalMatches,
        totalViews,
        successRate: listings.length > 0 ? Math.round((totalMatches / listings.length) * 100) : 0,
      },
    };
  }

  async getMatingMatches(filters?: { status?: string; species?: string; country?: string; city?: string }) {
    let query: any = db.collection('mating_requests');
    if (filters?.status) {
      query = query.where('status', '==', filters.status);
    }
    const requestsSnap = await query.orderBy('createdAt', 'desc').get();
    const allRequests = requestsSnap.docs.map((d: any) => ({ id: d.id, ...d.data() }));

    const matches = await Promise.all(
      allRequests.map(async (req: any) => {
        let listing: any = null;
        try {
          const listingDoc = await db.collection('mating_listings').doc(req.listingId).get();
          if (listingDoc.exists) listing = { id: listingDoc.id, ...listingDoc.data() };
        } catch {}

        if (filters?.species && listing?.species !== filters.species) return null;
        if (filters?.country && listing?.location?.country !== filters.country) return null;
        if (filters?.city && listing?.location?.city !== filters.city) return null;

        let sender: any = null;
        let senderPet: any = null;
        try {
          const senderDoc = await this.usersRef.doc(req.senderId).get();
          if (senderDoc.exists) sender = { id: senderDoc.id, ...senderDoc.data() };
        } catch {}
        if (req.petId) {
          try {
            const petDoc = await this.petsRef.doc(req.petId).get();
            if (petDoc.exists) senderPet = { id: petDoc.id, ...petDoc.data() };
          } catch {}
        }

        let receiver: any = null;
        let receiverPet: any = null;
        try {
          const receiverDoc = await this.usersRef.doc(req.receiverId).get();
          if (receiverDoc.exists) receiver = { id: receiverDoc.id, ...receiverDoc.data() };
        } catch {}
        if (listing?.petId) {
          try {
            const petDoc = await this.petsRef.doc(listing.petId).get();
            if (petDoc.exists) receiverPet = { id: petDoc.id, ...petDoc.data() };
          } catch {}
        }

        return {
          id: req.id,
          status: req.status,
          message: req.message || null,
          respondedAt: req.respondedAt || null,
          createdAt: req.createdAt,
          listing: listing ? {
            id: listing.id,
            breed: listing.breed,
            species: listing.species,
            gender: listing.gender,
            age: listing.age,
            price: listing.price || 0,
            location: listing.location || null,
            description: listing.description || null,
            healthCertified: listing.healthCertified || false,
          } : null,
          sender: {
            id: sender?.id || req.senderId,
            displayName: sender?.displayName || 'Unknown',
            email: sender?.email || '',
          },
          senderPet: senderPet ? {
            id: senderPet.id,
            name: senderPet.name,
            breed: senderPet.breed,
            species: senderPet.species,
            gender: senderPet.gender,
            photos: senderPet.photos || [],
            color: senderPet.color || null,
          } : null,
          receiver: {
            id: receiver?.id || req.receiverId,
            displayName: receiver?.displayName || 'Unknown',
            email: receiver?.email || '',
          },
          receiverPet: receiverPet ? {
            id: receiverPet.id,
            name: receiverPet.name,
            breed: receiverPet.breed,
            species: receiverPet.species,
            gender: receiverPet.gender,
            photos: receiverPet.photos || [],
            color: receiverPet.color || null,
          } : null,
        };
      })
    );

    return matches.filter(Boolean);
  }

  async deleteMatingListing(listingId: string) {
    const doc = await db.collection('mating_listings').doc(listingId).get();
    if (!doc.exists) {
      const error: any = new Error('Listing not found');
      error.statusCode = 404;
      throw error;
    }
    await db.collection('mating_listings').doc(listingId).delete();
  }

  async sendWeddingCardForMatch(requestId: string) {
    const reqDoc = await db.collection('mating_requests').doc(requestId).get();
    if (!reqDoc.exists) {
      const error: any = new Error('Match request not found');
      error.statusCode = 404;
      throw error;
    }
    const reqData = reqDoc.data()!;
    if (reqData.status !== 'accepted') {
      const error: any = new Error('Can only send wedding cards for accepted matches');
      error.statusCode = 400;
      throw error;
    }

    const [senderDoc, receiverDoc, listingDoc] = await Promise.all([
      this.usersRef.doc(reqData.senderId).get(),
      this.usersRef.doc(reqData.receiverId).get(),
      db.collection('mating_listings').doc(reqData.listingId).get(),
    ]);

    const sender = senderDoc.exists ? senderDoc.data()! : {};
    const receiver = receiverDoc.exists ? receiverDoc.data()! : {};
    const listing = listingDoc.exists ? listingDoc.data()! : {};

    let senderPet: any = {};
    let receiverPet: any = {};
    if (reqData.petId) {
      const petDoc = await this.petsRef.doc(reqData.petId).get();
      if (petDoc.exists) senderPet = petDoc.data()!;
    }
    if (listing.petId) {
      const petDoc = await this.petsRef.doc(listing.petId).get();
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
      senderPetName: senderPet.name || 'Pet',
      senderPetBreed: senderPet.breed || listing.breed || '',
      senderPetPhoto: getPhotoUrl(senderPet),
      receiverName: receiver.displayName || 'Pet Parent',
      receiverEmail: receiver.email || '',
      receiverPetName: receiverPet.name || listing.petName || 'Pet',
      receiverPetBreed: receiverPet.breed || listing.breed || '',
      receiverPetPhoto: getPhotoUrl(receiverPet),
      species: listing.species || '',
      location: location || undefined,
      matchDate: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
    });
  }

  async getWeddingCardPreview(requestId: string): Promise<string> {
    const reqDoc = await db.collection('mating_requests').doc(requestId).get();
    if (!reqDoc.exists) {
      const error: any = new Error('Match request not found');
      error.statusCode = 404;
      throw error;
    }
    const reqData = reqDoc.data()!;

    const [senderDoc, receiverDoc, listingDoc] = await Promise.all([
      this.usersRef.doc(reqData.senderId).get(),
      this.usersRef.doc(reqData.receiverId).get(),
      db.collection('mating_listings').doc(reqData.listingId).get(),
    ]);

    const sender = senderDoc.exists ? senderDoc.data()! : {};
    const receiver = receiverDoc.exists ? receiverDoc.data()! : {};
    const listing = listingDoc.exists ? listingDoc.data()! : {};

    let senderPet: any = {};
    let receiverPet: any = {};
    if (reqData.petId) {
      const petDoc = await this.petsRef.doc(reqData.petId).get();
      if (petDoc.exists) senderPet = petDoc.data()!;
    }
    if (listing.petId) {
      const petDoc = await this.petsRef.doc(listing.petId).get();
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

    return emailService.buildWeddingCardTemplate({
      senderName: sender.displayName || 'Pet Parent',
      senderEmail: sender.email || '',
      senderPetName: senderPet.name || 'Pet',
      senderPetBreed: senderPet.breed || listing.breed || '',
      senderPetPhoto: getPhotoUrl(senderPet),
      receiverName: receiver.displayName || 'Pet Parent',
      receiverEmail: receiver.email || '',
      receiverPetName: receiverPet.name || listing.petName || 'Pet',
      receiverPetBreed: receiverPet.breed || listing.breed || '',
      receiverPetPhoto: getPhotoUrl(receiverPet),
      species: listing.species || '',
      location: location || undefined,
      matchDate: reqData.respondedAt
        ? new Date(reqData.respondedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
        : new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
    });
  }

  // --- Pet Categories ---

  async getCategories() {
    const snapshot = await this.categoriesRef.orderBy('name', 'asc').get();
    return snapshot.docs.map((doc: any) => ({ id: doc.id, ...doc.data() }));
  }

  async createCategory(data: { name: string; label: string; icon?: string; description?: string }) {
    const ref = await this.categoriesRef.add({
      ...data,
      name: data.name.toLowerCase(),
      isActive: true,
      createdAt: new Date().toISOString(),
    });
    return { id: ref.id, ...data, name: data.name.toLowerCase(), isActive: true };
  }

  async updateCategory(id: string, data: { label?: string; icon?: string; description?: string; isActive?: boolean }) {
    const doc = await this.categoriesRef.doc(id).get();
    if (!doc.exists) {
      const error: any = new Error('Category not found');
      error.statusCode = 404;
      throw error;
    }
    await this.categoriesRef.doc(id).update({ ...data, updatedAt: new Date().toISOString() });
    const updated = await this.categoriesRef.doc(id).get();
    return { id: updated.id, ...updated.data() };
  }

  async deleteCategory(id: string) {
    const doc = await this.categoriesRef.doc(id).get();
    if (!doc.exists) {
      const error: any = new Error('Category not found');
      error.statusCode = 404;
      throw error;
    }
    await this.categoriesRef.doc(id).delete();
  }

  async seedDefaultCategories() {
    const existing = await this.categoriesRef.get();
    if (!existing.empty) return { message: 'Categories already exist', seeded: false };

    const defaults = [
      { name: 'dog', label: 'Dog', icon: '🐕', description: 'Domestic dogs of all breeds' },
      { name: 'cat', label: 'Cat', icon: '🐈', description: 'Domestic cats of all breeds' },
      { name: 'bird', label: 'Bird', icon: '🦜', description: 'Pet birds including parrots, canaries, cockatiels' },
      { name: 'horse', label: 'Horse', icon: '🐴', description: 'Horses and ponies' },
      { name: 'rabbit', label: 'Rabbit', icon: '🐰', description: 'Domestic rabbits' },
      { name: 'fish', label: 'Fish', icon: '🐠', description: 'Aquarium and pond fish' },
      { name: 'reptile', label: 'Reptile', icon: '🦎', description: 'Reptiles including lizards, snakes, turtles' },
      { name: 'hamster', label: 'Hamster', icon: '🐹', description: 'Hamsters and gerbils' },
      { name: 'other', label: 'Other', icon: '🐾', description: 'Other pet types' },
    ];

    for (const cat of defaults) {
      await this.categoriesRef.add({ ...cat, isActive: true, createdAt: new Date().toISOString() });
    }
    return { message: 'Default categories seeded', seeded: true, count: defaults.length };
  }

  // --- Vaccination Analytics ---

  async getVaccinationAnalytics(filters: { period?: string; species?: string; country?: string; city?: string }) {
    const now = new Date();
    let sinceDate: Date | null = null;

    switch (filters.period) {
      case '30d': sinceDate = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000); break;
      case '90d': sinceDate = new Date(now.getTime() - 90 * 24 * 60 * 60 * 1000); break;
      case '6m': sinceDate = new Date(now.getTime() - 180 * 24 * 60 * 60 * 1000); break;
      case '1y': sinceDate = new Date(now.getTime() - 365 * 24 * 60 * 60 * 1000); break;
      default: sinceDate = null;
    }

    const vacSnap = await db.collection('vaccinations').get();
    const petsSnap = await this.petsRef.get();

    const petsMap: Record<string, any> = {};
    for (const doc of petsSnap.docs) {
      const data = doc.data();
      petsMap[doc.id] = {
        species: data.species || null,
        country: data.location?.country || data.country || null,
        city: data.location?.city || data.city || null,
      };
    }

    let vaccinations = vacSnap.docs.map((doc: any) => ({ id: doc.id, ...doc.data() }));

    if (sinceDate) {
      vaccinations = vaccinations.filter((v: any) => {
        const d = v.administeredDate || v.createdAt;
        return d && new Date(d) >= sinceDate!;
      });
    }

    if (filters.species) {
      vaccinations = vaccinations.filter((v: any) => {
        const pet = petsMap[v.petId];
        return pet && pet.species === filters.species;
      });
    }

    if (filters.country) {
      vaccinations = vaccinations.filter((v: any) => {
        const pet = petsMap[v.petId];
        return pet && pet.country === filters.country;
      });
    }

    if (filters.city) {
      vaccinations = vaccinations.filter((v: any) => {
        const pet = petsMap[v.petId];
        return pet && pet.city === filters.city;
      });
    }

    const vaccineAgg: Record<string, { count: number; speciesBreakdown: Record<string, number>; countries: Record<string, number>; cities: Record<string, number> }> = {};
    const uniquePetIds = new Set<string>();
    const allSpecies = new Set<string>();
    const allCountries = new Set<string>();
    const allCities = new Set<string>();

    for (const vac of vaccinations as any[]) {
      const name = vac.name || 'Unknown';
      if (!vaccineAgg[name]) {
        vaccineAgg[name] = { count: 0, speciesBreakdown: {}, countries: {}, cities: {} };
      }
      vaccineAgg[name].count++;
      uniquePetIds.add(vac.petId);

      const pet = petsMap[vac.petId];
      if (pet) {
        if (pet.species) {
          vaccineAgg[name].speciesBreakdown[pet.species] = (vaccineAgg[name].speciesBreakdown[pet.species] || 0) + 1;
          allSpecies.add(pet.species);
        }
        if (pet.country) {
          vaccineAgg[name].countries[pet.country] = (vaccineAgg[name].countries[pet.country] || 0) + 1;
          allCountries.add(pet.country);
        }
        if (pet.city) {
          vaccineAgg[name].cities[pet.city] = (vaccineAgg[name].cities[pet.city] || 0) + 1;
          allCities.add(pet.city);
        }
      }
    }

    const topVaccines = Object.entries(vaccineAgg)
      .map(([vaccineName, data]) => ({ vaccineName, ...data }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 20);

    return {
      topVaccines,
      summary: {
        totalVaccinations: vaccinations.length,
        uniqueVaccines: Object.keys(vaccineAgg).length,
        uniquePetsVaccinated: uniquePetIds.size,
        period: filters.period || 'all',
      },
      filters: {
        species: [...allSpecies].sort(),
        countries: [...allCountries].sort(),
        cities: [...allCities].sort(),
      },
    };
  }

  // --- App Settings ---

  private settingsRef = db.collection('app_settings');
  private locationsRef = db.collection('locations');

  private defaultSettings = {
    general: {
      appName: 'PET Roll',
      supportEmail: 'support@petfolioo.com',
      defaultLanguage: 'en',
      maintenanceMode: false,
    },
    notifications: {
      vaccinationReminders: true,
      pregnancyAlerts: true,
      matingUpdates: true,
      reminderDaysBefore: 7,
    },
    security: {
      rateLimitPerMinute: 100,
      tokenExpiryHours: 1,
      refreshTokenExpiryDays: 7,
      maxPhotoSizeMB: 10,
      maxAvatarSizeMB: 5,
      allowedFileTypes: ['jpeg', 'png', 'webp'],
    },
  };

  async getSettings(): Promise<Record<string, any>> {
    const doc = await this.settingsRef.doc('global').get();
    if (!doc.exists) {
      await this.settingsRef.doc('global').set({
        ...this.defaultSettings,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });
      return this.defaultSettings;
    }
    const data = doc.data() as any;
    return {
      general: data.general || this.defaultSettings.general,
      notifications: data.notifications || this.defaultSettings.notifications,
      security: data.security || this.defaultSettings.security,
    };
  }

  async updateSettings(section: string, values: Record<string, any>): Promise<Record<string, any>> {
    const validSections = ['general', 'notifications', 'security'];
    if (!validSections.includes(section)) {
      const error: any = new Error(`Invalid settings section: ${section}`);
      error.statusCode = 400;
      throw error;
    }

    const doc = await this.settingsRef.doc('global').get();
    if (!doc.exists) {
      await this.settingsRef.doc('global').set({
        ...this.defaultSettings,
        [section]: values,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });
    } else {
      await this.settingsRef.doc('global').update({
        [section]: values,
        updatedAt: new Date().toISOString(),
      });
    }

    return this.getSettings();
  }

  // --- Locations ---

  async getCountries() {
    const snap = await this.locationsRef.orderBy('name', 'asc').get();
    return snap.docs.map((d: any) => ({ id: d.id, code: d.data().code, name: d.data().name }));
  }

  async getCities(country?: string) {
    if (!country) return [];
    const snap = await this.locationsRef.where('name', '==', country).get();
    if (snap.empty) {
      const byCode = await this.locationsRef.where('code', '==', country).get();
      if (byCode.empty) return [];
      return byCode.docs[0].data().cities || [];
    }
    return snap.docs[0].data().cities || [];
  }

  async seedLocations() {
    let count = 0;
    for (const country of countries) {
      await this.locationsRef.doc(country.code).set({
        code: country.code,
        name: country.name,
        cities: country.cities,
        createdAt: new Date().toISOString(),
      });
      count++;
    }
    return { message: `Seeded ${count} countries with cities`, count };
  }
}

export const adminService = new AdminService();
