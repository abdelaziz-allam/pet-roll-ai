import { db, auth } from '../config/firebase.js';
import { FieldValue } from 'firebase-admin/firestore';

interface TestUser {
  email: string;
  password: string;
  displayName: string;
  role: string;
  pets?: Array<{ name: string; species: string; breed: string }>;
}

const TEST_USERS: TestUser[] = [
  {
    email: 'owner1@test.com',
    password: 'Test1234!',
    displayName: 'Test Owner 1',
    role: 'user',
    pets: [
      { name: 'Max', species: 'dog', breed: 'Labrador Retriever' },
      { name: 'Whiskers', species: 'cat', breed: 'Persian' },
      { name: 'Tweety', species: 'bird', breed: 'Budgerigar (Budgie)' },
    ],
  },
  {
    email: 'owner2@test.com',
    password: 'Test1234!',
    displayName: 'Test Owner 2',
    role: 'user',
    pets: [
      { name: 'Buddy', species: 'dog', breed: 'Golden Retriever' },
    ],
  },
  {
    email: 'breeder@test.com',
    password: 'Test1234!',
    displayName: 'Test Breeder',
    role: 'breeder',
    pets: [
      { name: 'Luna', species: 'dog', breed: 'German Shepherd' },
      { name: 'Rex', species: 'dog', breed: 'German Shepherd' },
    ],
  },
  {
    email: 'mod@test.com',
    password: 'Test1234!',
    displayName: 'Test Moderator',
    role: 'moderator',
  },
  {
    email: 'viewer@test.com',
    password: 'Test1234!',
    displayName: 'Test Viewer',
    role: 'viewer',
  },
];

async function seedTestData() {
  console.log('Seeding test data...\n');

  for (const testUser of TEST_USERS) {
    let uid: string;
    try {
      const existing = await auth.getUserByEmail(testUser.email);
      uid = existing.uid;
      console.log(`  User exists: ${testUser.email} (${uid})`);
    } catch {
      const user = await auth.createUser({
        email: testUser.email,
        password: testUser.password,
        displayName: testUser.displayName,
      });
      uid = user.uid;
      console.log(`  Created: ${testUser.email} (${uid})`);
    }

    await db.collection('users').doc(uid).set({
      email: testUser.email,
      displayName: testUser.displayName,
      role: testUser.role,
      status: 'active',
      timezone: 'UTC',
      settings: {
        reminderTimeUTC: 8,
        pushEnabled: true,
        emailNotifications: true,
        language: 'en',
      },
      fcmTokens: [],
      isVerifiedBreeder: testUser.role === 'breeder',
      createdAt: FieldValue.serverTimestamp(),
      updatedAt: FieldValue.serverTimestamp(),
    }, { merge: true });

    if (testUser.pets) {
      for (const pet of testUser.pets) {
        const petRef = db.collection('pets').doc();
        await petRef.set({
          ownerId: uid,
          name: pet.name,
          species: pet.species,
          breed: pet.breed,
          breedId: `${pet.species}_${pet.breed.toLowerCase().replace(/\s+/g, '_')}`,
          gender: Math.random() > 0.5 ? 'male' : 'female',
          dateOfBirth: '2022-06-15',
          weight: Math.floor(Math.random() * 30) + 5,
          weightUnit: 'kg',
          isNeutered: false,
          isAvailableForMating: testUser.role === 'breeder',
          photos: [],
          createdAt: FieldValue.serverTimestamp(),
          updatedAt: FieldValue.serverTimestamp(),
        });
        console.log(`    Pet: ${pet.name} (${pet.breed})`);
      }
    }
  }

  console.log('\nTest data seeded successfully!');
  console.log('\nTest accounts:');
  TEST_USERS.forEach((u) => {
    console.log(`  ${u.email} / ${u.password} — role: ${u.role}`);
  });
}

seedTestData().catch(console.error);
