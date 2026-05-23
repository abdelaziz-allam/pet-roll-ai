import jwt from 'jsonwebtoken';
import { buildApp } from '../../src/app';
import { seedStore, clearStore } from './setup';

export async function createTestApp() {
  const app = await buildApp();
  await app.ready();
  return app;
}

export function generateToken(uid: string, email: string) {
  return jwt.sign({ uid, email }, process.env.JWT_SECRET!, { expiresIn: '1h' });
}

export function generateExpiredToken(uid: string, email: string) {
  return jwt.sign({ uid, email }, process.env.JWT_SECRET!, { expiresIn: '-1h' });
}

export function seedUser(id: string, overrides: Record<string, any> = {}) {
  const defaults = {
    email: `${id}@test.com`,
    displayName: `User ${id}`,
    phone: '+1234567890',
    timezone: 'UTC',
    role: 'user',
    status: 'active',
    isVerifiedBreeder: false,
    fcmTokens: [],
    settings: { notifications: true, language: 'en', theme: 'light' },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  seedStore('users', id, { ...defaults, ...overrides });
}

export function seedAdminUser(id: string) {
  seedUser(id, { role: 'admin', email: `${id}@admin.com` });
}

export function seedSuperAdmin(id: string) {
  seedUser(id, { role: 'super_admin', email: `${id}@admin.com` });
}

export function seedPet(id: string, ownerId: string, overrides: Record<string, any> = {}) {
  const defaults = {
    name: 'Buddy',
    species: 'dog',
    breed: 'Golden Retriever',
    gender: 'male',
    dateOfBirth: '2022-01-15',
    weight: 30,
    microchipId: null,
    isAvailableForMating: true,
    ownerId,
    photos: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  seedStore('pets', id, { ...defaults, ...overrides });
}

export function seedHealthRecord(id: string, petId: string, ownerId: string, overrides: Record<string, any> = {}) {
  const defaults = {
    petId,
    ownerId,
    type: 'checkup',
    date: '2024-03-15',
    title: 'Annual checkup',
    notes: 'All good',
    veterinarian: 'Dr. Smith',
    clinic: 'Pet Clinic',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  seedStore('health_records', id, { ...defaults, ...overrides });
}

export function seedVaccination(id: string, petId: string, ownerId: string, overrides: Record<string, any> = {}) {
  const defaults = {
    petId,
    ownerId,
    vaccineName: 'Rabies',
    dateAdministered: '2024-03-15',
    nextDueDate: '2025-03-15',
    veterinarian: 'Dr. Smith',
    batchNumber: 'BATCH-001',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  seedStore('vaccinations', id, { ...defaults, ...overrides });
}

export function seedSchedule(id: string, petId: string, ownerId: string, overrides: Record<string, any> = {}) {
  const defaults = {
    petId,
    ownerId,
    type: 'feeding',
    title: 'Morning Feed',
    frequency: 'daily',
    time: '08:00',
    enabled: true,
    reminderMinutesBefore: 30,
    completionLog: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  seedStore('schedules', id, { ...defaults, ...overrides });
}

export function seedMatingListing(id: string, ownerId: string, overrides: Record<string, any> = {}) {
  const defaults = {
    ownerId,
    petId: 'pet-1',
    petName: 'Buddy',
    species: 'dog',
    breed: 'Golden Retriever',
    gender: 'male',
    age: 3,
    description: 'Healthy purebred golden',
    price: 500,
    status: 'active',
    location: { city: 'Seattle', country: 'US' },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  seedStore('mating_listings', id, { ...defaults, ...overrides });
}

export function seedNotification(id: string, userId: string, overrides: Record<string, any> = {}) {
  const defaults = {
    userId,
    title: 'Vaccination Due',
    body: 'Your pet Buddy is due for Rabies vaccination',
    type: 'vaccination_reminder',
    read: false,
    createdAt: new Date().toISOString(),
  };
  seedStore('notifications', id, { ...defaults, ...overrides });
}

export { clearStore, seedStore };
