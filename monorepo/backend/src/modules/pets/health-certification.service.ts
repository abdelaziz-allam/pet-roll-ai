import { db, FieldValue } from '../../config/firebase';

class HealthCertificationService {
  private certRef = db.collection('health_certifications');
  private petsRef = db.collection('pets');

  async submitCertification(ownerId: string, petId: string, input: {
    vetName: string;
    vetClinic: string;
    certDate: string;
    expiryDate?: string;
    notes?: string;
    documents: Array<{ url: string; name: string }>;
  }) {
    const petDoc = await this.petsRef.doc(petId).get();
    if (!petDoc.exists || petDoc.data()!.ownerId !== ownerId) {
      const error: any = new Error('Pet not found');
      error.statusCode = 404;
      throw error;
    }

    const existing = await this.certRef
      .where('petId', '==', petId)
      .where('status', '==', 'pending')
      .get();
    if (!existing.empty) {
      const error: any = new Error('A pending certification request already exists for this pet');
      error.statusCode = 400;
      throw error;
    }

    const data = {
      petId,
      ownerId,
      petName: petDoc.data()!.name,
      species: petDoc.data()!.species,
      breed: petDoc.data()!.breed,
      vetName: input.vetName,
      vetClinic: input.vetClinic,
      certDate: input.certDate,
      expiryDate: input.expiryDate || null,
      notes: input.notes || null,
      documents: input.documents,
      status: 'pending',
      rejectionReason: null,
      processedBy: null,
      processedAt: null,
      createdAt: FieldValue.serverTimestamp(),
      updatedAt: FieldValue.serverTimestamp(),
    };

    const doc = await this.certRef.add(data);
    return { id: doc.id, ...data };
  }

  async getMyCertifications(ownerId: string) {
    const snapshot = await this.certRef
      .where('ownerId', '==', ownerId)
      .orderBy('createdAt', 'desc')
      .get();
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  }

  async getPetCertification(petId: string) {
    const snapshot = await this.certRef
      .where('petId', '==', petId)
      .orderBy('createdAt', 'desc')
      .get();
    if (snapshot.empty) return null;
    const doc = snapshot.docs[0];
    return { id: doc.id, ...doc.data() };
  }

  // Admin methods
  async getAllCertifications(filters?: { status?: string; species?: string; country?: string; city?: string }) {
    let query: FirebaseFirestore.Query = this.certRef;
    if (filters?.status) {
      query = query.where('status', '==', filters.status);
    }
    if (filters?.species) {
      query = query.where('species', '==', filters.species);
    }
    const snapshot = await query.orderBy('createdAt', 'desc').get();
    let results = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as any[];

    if (filters?.country || filters?.city) {
      const petIds = [...new Set(results.map((r: any) => r.petId))];
      const petLocations: Record<string, { country?: string; city?: string }> = {};
      for (const petId of petIds) {
        const petDoc = await this.petsRef.doc(petId).get();
        if (petDoc.exists) {
          const data = petDoc.data()!;
          petLocations[petId] = {
            country: data.location?.country || data.country,
            city: data.location?.city || data.city,
          };
        }
      }
      results = results.map((r: any) => ({
        ...r,
        country: petLocations[r.petId]?.country || null,
        city: petLocations[r.petId]?.city || null,
      }));

      if (filters.country) {
        results = results.filter((r: any) => r.country === filters.country);
      }
      if (filters.city) {
        results = results.filter((r: any) => r.city === filters.city);
      }
    } else {
      const petIds = [...new Set(results.map((r: any) => r.petId))];
      const petLocations: Record<string, { country?: string; city?: string }> = {};
      for (const petId of petIds) {
        const petDoc = await this.petsRef.doc(petId).get();
        if (petDoc.exists) {
          const data = petDoc.data()!;
          petLocations[petId] = {
            country: data.location?.country || data.country,
            city: data.location?.city || data.city,
          };
        }
      }
      results = results.map((r: any) => ({
        ...r,
        country: petLocations[r.petId]?.country || null,
        city: petLocations[r.petId]?.city || null,
      }));
    }

    return results;
  }

  async getCertificationFilters() {
    const snapshot = await this.certRef.get();
    const certs = snapshot.docs.map(doc => doc.data());
    const speciesSet = new Set(certs.map((c: any) => c.species).filter(Boolean));

    const petIds = [...new Set(certs.map((c: any) => c.petId))];
    const countries = new Set<string>();
    const cities = new Set<string>();
    for (const petId of petIds) {
      const petDoc = await this.petsRef.doc(petId).get();
      if (petDoc.exists) {
        const data = petDoc.data()!;
        const country = data.location?.country || data.country;
        const city = data.location?.city || data.city;
        if (country) countries.add(country);
        if (city) cities.add(city);
      }
    }

    return {
      species: [...speciesSet],
      countries: [...countries],
      cities: [...cities],
    };
  }

  async getCertificationById(id: string) {
    const doc = await this.certRef.doc(id).get();
    if (!doc.exists) {
      const error: any = new Error('Certification not found');
      error.statusCode = 404;
      throw error;
    }
    return { id: doc.id, ...doc.data() };
  }

  async processCertification(id: string, approved: boolean, adminId: string, rejectionReason?: string) {
    const doc = await this.certRef.doc(id).get();
    if (!doc.exists) {
      const error: any = new Error('Certification not found');
      error.statusCode = 404;
      throw error;
    }

    const data = doc.data()!;
    if (data.status !== 'pending') {
      const error: any = new Error('Certification already processed');
      error.statusCode = 400;
      throw error;
    }

    const status = approved ? 'approved' : 'rejected';
    await this.certRef.doc(id).update({
      status,
      rejectionReason: approved ? null : (rejectionReason || 'Not approved'),
      processedBy: adminId,
      processedAt: new Date().toISOString(),
      updatedAt: FieldValue.serverTimestamp(),
    });

    if (approved) {
      await this.petsRef.doc(data.petId).update({
        healthCertified: true,
        healthCertifiedAt: new Date().toISOString(),
        healthCertificationId: id,
      });
    }

    const updated = await this.certRef.doc(id).get();
    return { id: updated.id, ...updated.data() };
  }

  async revokeCertification(petId: string, adminId: string, reason: string) {
    await this.petsRef.doc(petId).update({
      healthCertified: false,
      healthCertifiedAt: null,
      healthCertificationId: null,
    });

    const snapshot = await this.certRef
      .where('petId', '==', petId)
      .where('status', '==', 'approved')
      .get();

    for (const doc of snapshot.docs) {
      await this.certRef.doc(doc.id).update({
        status: 'revoked',
        revokedBy: adminId,
        revokedAt: new Date().toISOString(),
        revokeReason: reason,
        updatedAt: FieldValue.serverTimestamp(),
      });
    }

    return { message: 'Certification revoked' };
  }
}

export const healthCertificationService = new HealthCertificationService();
