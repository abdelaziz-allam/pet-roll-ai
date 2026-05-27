import { db, FieldValue } from '../config/firebase';
import { adminAuthService } from '../modules/admin-auth/admin-auth.service';
import { adminService } from '../modules/admin/admin.service';

export async function seedInitialData() {
  const usersCheck = await adminService.getUsers(1, 1);
  if (usersCheck.total > 0) {
    return;
  }

  console.log('[SEED] Database empty — seeding initial data...');

  await adminAuthService.seedSuperAdmin();
  await seedUsers();
  await adminService.seedDefaultCategories();
  await adminService.seedLocations();
  await seedPets();
  await seedMatingData();
  await seedVerifications();
  await seedHealthRecords();
  await seedVaccinations();
  await seedSchedules();
  await seedNotifications();
  await seedPregnancies();
  await seedChatRooms();
  await seedHealthCertifications();

  console.log('[SEED] Initial data seeded successfully.');
}

// ─── Users ──────────────────────────────────────────────────────────────────

async function seedUsers() {
  const users = [
    { displayName: 'Ahmed Hassan', email: 'ahmed@example.com', phone: '+201001234567', timezone: 'Africa/Cairo' },
    { displayName: 'Sarah Miller', email: 'sarah@example.com', phone: '+14155551234', timezone: 'America/New_York' },
    { displayName: 'Mohammed Ali', email: 'mohammed@example.com', phone: '+966501234567', timezone: 'Asia/Riyadh' },
    { displayName: 'Emma Johnson', email: 'emma@example.com', phone: '+447700900123', timezone: 'Europe/London' },
    { displayName: 'Fatma El-Said', email: 'fatma@example.com', phone: '+201112345678', timezone: 'Africa/Cairo' },
    { displayName: 'James Wilson', email: 'james@example.com', phone: '+12025551234', timezone: 'America/Chicago' },
    { displayName: 'Yuki Tanaka', email: 'yuki@example.com', phone: '+81901234567', timezone: 'Asia/Tokyo' },
    { displayName: 'Hans Mueller', email: 'hans@example.com', phone: '+491761234567', timezone: 'Europe/Berlin' },
  ];
  for (const u of users) await adminService.createUser(u);
}

// ─── Pets ───────────────────────────────────────────────────────────────────

async function seedPets() {
  const usersRes = await adminService.getUsers(1, 100);
  const userIds = usersRes.data.map((u: any) => u.id);
  const now = new Date();

  const samplePhotos: Record<string, Array<{ url: string; path: string; uploadedAt: string }>> = {
    dog: [
      { url: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400&h=400&fit=crop', path: 'pets/sample/dog1.jpg', uploadedAt: now.toISOString() },
      { url: 'https://images.unsplash.com/photo-1561037404-61cd46aa615b?w=400&h=400&fit=crop', path: 'pets/sample/dog2.jpg', uploadedAt: now.toISOString() },
      { url: 'https://images.unsplash.com/photo-1517849845537-4d257902454a?w=400&h=400&fit=crop', path: 'pets/sample/dog3.jpg', uploadedAt: now.toISOString() },
      { url: 'https://images.unsplash.com/photo-1544568100-847a948585b9?w=400&h=400&fit=crop', path: 'pets/sample/dog4.jpg', uploadedAt: now.toISOString() },
    ],
    cat: [
      { url: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=400&h=400&fit=crop', path: 'pets/sample/cat1.jpg', uploadedAt: now.toISOString() },
      { url: 'https://images.unsplash.com/photo-1573865526739-10659fec78a5?w=400&h=400&fit=crop', path: 'pets/sample/cat2.jpg', uploadedAt: now.toISOString() },
      { url: 'https://images.unsplash.com/photo-1495360010541-f48722b34f7d?w=400&h=400&fit=crop', path: 'pets/sample/cat3.jpg', uploadedAt: now.toISOString() },
    ],
    bird: [
      { url: 'https://images.unsplash.com/photo-1552728089-57bdde30beb3?w=400&h=400&fit=crop', path: 'pets/sample/bird1.jpg', uploadedAt: now.toISOString() },
      { url: 'https://images.unsplash.com/photo-1444464666168-49d633b86797?w=400&h=400&fit=crop', path: 'pets/sample/bird2.jpg', uploadedAt: now.toISOString() },
    ],
    horse: [
      { url: 'https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?w=400&h=400&fit=crop', path: 'pets/sample/horse1.jpg', uploadedAt: now.toISOString() },
      { url: 'https://images.unsplash.com/photo-1534773728080-33d4b294e561?w=400&h=400&fit=crop', path: 'pets/sample/horse2.jpg', uploadedAt: now.toISOString() },
      { url: 'https://images.unsplash.com/photo-1598974357801-cbca100e65d3?w=400&h=400&fit=crop', path: 'pets/sample/horse3.jpg', uploadedAt: now.toISOString() },
    ],
    rabbit: [
      { url: 'https://images.unsplash.com/photo-1585110396000-c9ffd4e4b308?w=400&h=400&fit=crop', path: 'pets/sample/rabbit1.jpg', uploadedAt: now.toISOString() },
      { url: 'https://images.unsplash.com/photo-1452857297128-d9c29adba80b?w=400&h=400&fit=crop', path: 'pets/sample/rabbit2.jpg', uploadedAt: now.toISOString() },
    ],
    fish: [
      { url: 'https://images.unsplash.com/photo-1522069169874-c58ec4b76be5?w=400&h=400&fit=crop', path: 'pets/sample/fish1.jpg', uploadedAt: now.toISOString() },
    ],
    reptile: [
      { url: 'https://images.unsplash.com/photo-1504450874802-0ba2bcd659e0?w=400&h=400&fit=crop', path: 'pets/sample/reptile1.jpg', uploadedAt: now.toISOString() },
      { url: 'https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?w=400&h=400&fit=crop', path: 'pets/sample/reptile2.jpg', uploadedAt: now.toISOString() },
    ],
    hamster: [
      { url: 'https://images.unsplash.com/photo-1425082661507-d6d2f1f31fc1?w=400&h=400&fit=crop', path: 'pets/sample/hamster1.jpg', uploadedAt: now.toISOString() },
    ],
  };

  const pets = [
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
  for (let i = 0; i < pets.length; i++) {
    const pet = pets[i];
    const ownerId = userIds[i % userIds.length];
    await petsRef.add({
      ...pet,
      ownerId,
      location: { country: pet.country, city: pet.city },
      isNeutered: i % 3 === 0,
      isAvailableForMating: i % 2 === 0,
      status: i === 4 ? 'banned' : 'active',
      banReason: i === 4 ? 'Inappropriate profile images detected' : null,
      bannedAt: i === 4 ? now.toISOString() : null,
      photos: samplePhotos[pet.species] || [],
      createdAt: new Date(now.getTime() - (pets.length - i) * 3 * 24 * 60 * 60 * 1000).toISOString(),
    });
  }
}

// ─── Mating ─────────────────────────────────────────────────────────────────

async function seedMatingData() {
  const usersRes = await adminService.getUsers(1, 100);
  const allUsers = usersRes.data as any[];
  const now = new Date();

  const breeders = allUsers.slice(0, 3);
  for (const b of breeders) {
    await db.collection('users').doc(b.id).update({ isVerifiedBreeder: true });
  }

  const petsRef = db.collection('pets');
  const listingsRef = db.collection('mating_listings');
  const requestsRef = db.collection('mating_requests');

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
  for (let i = 0; i < sampleListings.length; i++) {
    const breeder = breeders[i % breeders.length];
    const listing = sampleListings[i];
    const createdAt = new Date(now.getTime() - (sampleListings.length - i) * 2 * 24 * 60 * 60 * 1000).toISOString();

    const petRef = await petsRef.add({
      name: listing.petName, species: listing.species, breed: listing.breed,
      gender: listing.gender, age: listing.age, color: listing.color,
      ownerId: breeder.id, photos: [{ url: listing.photo }], status: 'active', createdAt,
    });

    const ref = await listingsRef.add({
      petId: petRef.id, petName: listing.petName, species: listing.species,
      breed: listing.breed, gender: listing.gender, age: listing.age,
      description: listing.description, status: listing.status, viewCount: listing.viewCount,
      price: listing.price, healthCertified: listing.healthCertified, location: listing.location,
      ownerId: breeder.id, createdAt, updatedAt: createdAt,
    });
    createdListingIds.push(ref.id);
  }

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

  const nonBreeders = allUsers.filter((u: any) => !breeders.find((b: any) => b.id === u.id));
  const requesters = nonBreeders.length > 0 ? nonBreeders : allUsers;

  const requesterPetIds: string[] = [];
  for (let i = 0; i < requesterPets.length; i++) {
    const owner = requesters[i % requesters.length] as any;
    const pet = requesterPets[i];
    const ref = await petsRef.add({
      ...pet, ownerId: owner.id, photos: [{ url: pet.photo }],
      status: 'active', createdAt: now.toISOString(),
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
    const listingOwner = breeders[req.listingIndex % breeders.length] as any;
    const requester = requesters[i % requesters.length] as any;
    const createdAt = new Date(now.getTime() - (sampleRequests.length - i) * 12 * 60 * 60 * 1000).toISOString();

    await requestsRef.add({
      listingId: createdListingIds[req.listingIndex],
      senderId: requester.id, receiverId: listingOwner.id,
      petId: requesterPetIds[req.petIdx], message: req.message, status: req.status,
      createdAt,
      respondedAt: req.status !== 'pending' ? new Date(now.getTime() - (sampleRequests.length - i - 1) * 12 * 60 * 60 * 1000).toISOString() : null,
      updatedAt: req.status !== 'pending' ? new Date(now.getTime() - (sampleRequests.length - i - 1) * 12 * 60 * 60 * 1000).toISOString() : createdAt,
    });
  }

  // Seed requests received by Ahmed so he can test accept/decline
  const ahmedSnap = await db.collection('users').where('email', '==', 'ahmed@example.com').get();
  const ahmed = ahmedSnap.empty ? allUsers[0] as any : { id: ahmedSnap.docs[0].id, ...ahmedSnap.docs[0].data() };
  const ahmedPetsSnap = await db.collection('pets').where('ownerId', '==', ahmed.id).get();
  const ahmedPetIds = ahmedPetsSnap.docs.map((d: any) => d.id);

  if (ahmedPetIds.length > 0 && createdListingIds.length > 0) {
    // Create a listing owned by Ahmed for others to request
    const ahmedPetDoc = ahmedPetsSnap.docs[0];
    const ahmedPetData = ahmedPetDoc.data();
    const ahmedListingRef = await listingsRef.add({
      petId: ahmedPetDoc.id, petName: ahmedPetData.name, species: ahmedPetData.species,
      breed: ahmedPetData.breed, gender: ahmedPetData.gender, age: 3,
      description: `${ahmedPetData.name} is available for mating. Healthy and well-tempered.`,
      status: 'active', viewCount: 12, price: 0, healthCertified: true,
      location: ahmedPetData.location || { city: 'Cairo', country: 'Egypt' },
      ownerId: ahmed.id, photos: ahmedPetData.photos || [],
      createdAt: new Date(now.getTime() - 5 * 24 * 60 * 60 * 1000).toISOString(),
      updatedAt: new Date(now.getTime() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    });

    const incomingRequests = [
      { senderIdx: 3, petIdx: 0, message: 'Would love to pair my dog with yours! Great bloodline.', status: 'pending' },
      { senderIdx: 4, petIdx: 1, message: 'My pet has all health certificates. Interested in mating.', status: 'pending' },
      { senderIdx: 5, petIdx: 4, message: 'Beautiful pet! I think our pets would make amazing puppies together.', status: 'pending' },
    ];

    for (let i = 0; i < incomingRequests.length; i++) {
      const req = incomingRequests[i];
      const sender = allUsers[req.senderIdx] as any;
      const createdAt = new Date(now.getTime() - (3 - i) * 24 * 60 * 60 * 1000).toISOString();

      await requestsRef.add({
        listingId: ahmedListingRef.id,
        senderId: sender.id, receiverId: ahmed.id,
        petId: requesterPetIds[req.petIdx] || ahmedPetIds[0],
        message: req.message, status: req.status,
        createdAt,
        respondedAt: req.status !== 'pending' ? new Date(now.getTime() - (2 - i) * 24 * 60 * 60 * 1000).toISOString() : null,
        updatedAt: req.status !== 'pending' ? new Date(now.getTime() - (2 - i) * 24 * 60 * 60 * 1000).toISOString() : createdAt,
      });
    }
  }
}

// ─── Verifications ──────────────────────────────────────────────────────────

async function seedVerifications() {
  const usersRes = await adminService.getUsers(1, 100);
  const users = usersRes.data as any[];
  const now = new Date();
  const verificationRef = db.collection('verification_requests');

  const sampleDocuments = [
    { url: 'https://images.unsplash.com/photo-1586953208270-767889db8547?w=600&fit=crop', path: 'verifications/license1.jpg', name: 'breeding_license.jpg', type: 'image/jpeg' },
    { url: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=600&fit=crop', path: 'verifications/cert1.jpg', name: 'certificate.jpg', type: 'image/jpeg' },
    { url: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=600&fit=crop', path: 'verifications/kennel1.jpg', name: 'kennel_photo.jpg', type: 'image/jpeg' },
    { url: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=600&fit=crop', path: 'verifications/kennel2.jpg', name: 'kennel_exterior.jpg', type: 'image/jpeg' },
    { url: 'https://images.unsplash.com/photo-1601758174114-e711c0cbaa69?w=600&fit=crop', path: 'verifications/vet_cert.jpg', name: 'vet_certification.jpg', type: 'image/jpeg' },
  ];

  await verificationRef.add({
    userId: users[0].id, userName: users[0].displayName, userEmail: users[0].email,
    kennelName: 'Golden Hearts Kennel', breedExperience: '3 years breeding Golden Retrievers',
    documents: [{ ...sampleDocuments[0], uploadedAt: new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000).toISOString() }],
    status: 'rejected', submissionNumber: 1,
    rejectionReason: 'License document is expired. Please submit a valid breeding license that is current and not expired.',
    processedBy: 'admin', processedAt: new Date(now.getTime() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    createdAt: new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000).toISOString(),
  });

  await verificationRef.add({
    userId: users[0].id, userName: users[0].displayName, userEmail: users[0].email,
    kennelName: 'Golden Hearts Kennel', breedExperience: '3 years breeding Golden Retrievers. Updated with new valid license.',
    documents: [
      { ...sampleDocuments[0], uploadedAt: new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000).toISOString() },
      { ...sampleDocuments[1], uploadedAt: new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000).toISOString() },
      { ...sampleDocuments[2], uploadedAt: new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000).toISOString() },
    ],
    status: 'pending', submissionNumber: 2, rejectionReason: null, processedBy: null, processedAt: null,
    createdAt: new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000).toISOString(),
  });

  await verificationRef.add({
    userId: users[1].id, userName: users[1].displayName, userEmail: users[1].email,
    kennelName: 'Royal Paws Cattery', breedExperience: '5 years breeding Persian and Siamese cats. Member of National Cat Breeders Association.',
    documents: [
      { ...sampleDocuments[1], uploadedAt: new Date(now.getTime() - 1 * 24 * 60 * 60 * 1000).toISOString() },
      { ...sampleDocuments[3], uploadedAt: new Date(now.getTime() - 1 * 24 * 60 * 60 * 1000).toISOString() },
      { ...sampleDocuments[4], uploadedAt: new Date(now.getTime() - 1 * 24 * 60 * 60 * 1000).toISOString() },
    ],
    status: 'pending', submissionNumber: 1, rejectionReason: null, processedBy: null, processedAt: null,
    createdAt: new Date(now.getTime() - 1 * 24 * 60 * 60 * 1000).toISOString(),
  });

  if (users.length >= 3) {
    await verificationRef.add({
      userId: users[2].id, userName: users[2].displayName, userEmail: users[2].email,
      kennelName: 'Hardy K9 Champions', breedExperience: '8 years breeding German Shepherds and Rottweilers. AKC registered breeder.',
      documents: [
        { ...sampleDocuments[0], uploadedAt: new Date(now.getTime() - 14 * 24 * 60 * 60 * 1000).toISOString() },
        { ...sampleDocuments[1], uploadedAt: new Date(now.getTime() - 14 * 24 * 60 * 60 * 1000).toISOString() },
        { ...sampleDocuments[4], uploadedAt: new Date(now.getTime() - 14 * 24 * 60 * 60 * 1000).toISOString() },
      ],
      status: 'approved', submissionNumber: 1, rejectionReason: null,
      processedBy: 'admin', processedAt: new Date(now.getTime() - 10 * 24 * 60 * 60 * 1000).toISOString(),
      createdAt: new Date(now.getTime() - 14 * 24 * 60 * 60 * 1000).toISOString(),
    });
    await db.collection('users').doc(users[2].id).update({ isVerifiedBreeder: true });
  }
}

// ─── Health Records ─────────────────────────────────────────────────────────

async function seedHealthRecords() {
  const petsSnap = await db.collection('pets').where('status', '==', 'active').limit(10).get();
  const pets = petsSnap.docs.map(d => ({ id: d.id, ...d.data() })) as any[];
  const now = new Date();
  const healthRef = db.collection('health_records');

  const records = [
    { type: 'checkup', title: 'Annual checkup', description: 'Regular annual wellness exam. All vitals normal.', vetName: 'Dr. Smith', vetClinic: 'PetCare Clinic', cost: 75, daysAgo: 30 },
    { type: 'illness', title: 'Upset stomach', description: 'Vomiting and diarrhea for 2 days. Prescribed anti-nausea medication.', vetName: 'Dr. Johnson', vetClinic: 'Animal Hospital', cost: 120, daysAgo: 15 },
    { type: 'dental', title: 'Teeth cleaning', description: 'Professional dental cleaning under anesthesia. Two minor extractions.', vetName: 'Dr. Patel', vetClinic: 'Dental Vet Specialists', cost: 350, daysAgo: 60 },
    { type: 'injury', title: 'Paw cut', description: 'Cut on front right paw from broken glass. Cleaned and bandaged.', vetName: 'Dr. Lee', vetClinic: 'Emergency Pet ER', cost: 95, daysAgo: 7 },
    { type: 'checkup', title: '6-month wellness check', description: 'Semi-annual checkup. Weight stable, heart and lungs clear.', vetName: 'Dr. Smith', vetClinic: 'PetCare Clinic', cost: 60, daysAgo: 180 },
    { type: 'surgery', title: 'Lump removal', description: 'Lipoma removed from left flank. Biopsy confirmed benign.', vetName: 'Dr. Martinez', vetClinic: 'Surgical Vet Center', cost: 800, daysAgo: 90 },
    { type: 'checkup', title: 'New pet examination', description: 'First vet visit for new puppy. Healthy, started vaccination schedule.', vetName: 'Dr. Brown', vetClinic: 'Happy Paws Vet', cost: 55, daysAgo: 120 },
    { type: 'illness', title: 'Ear infection', description: 'Left ear infection diagnosed. Prescribed ear drops for 10 days.', vetName: 'Dr. Johnson', vetClinic: 'Animal Hospital', cost: 85, daysAgo: 45 },
  ];

  for (let i = 0; i < records.length; i++) {
    const pet = pets[i % pets.length];
    const rec = records[i];
    await healthRef.add({
      petId: pet.id, ownerId: pet.ownerId, type: rec.type,
      title: rec.title, description: rec.description, vetName: rec.vetName,
      vetClinic: rec.vetClinic, cost: rec.cost,
      date: new Date(now.getTime() - rec.daysAgo * 24 * 60 * 60 * 1000).toISOString(),
      createdAt: new Date(now.getTime() - rec.daysAgo * 24 * 60 * 60 * 1000).toISOString(),
    });
  }
}

// ─── Vaccinations ───────────────────────────────────────────────────────────

async function seedVaccinations() {
  const petsSnap = await db.collection('pets').where('status', '==', 'active').limit(20).get();
  const pets = petsSnap.docs.map(d => ({ id: d.id, ...d.data() })) as any[];
  const now = new Date();
  const vacRef = db.collection('vaccinations');

  const dogVaccines = [
    { name: 'Rabies', manufacturer: 'Zoetis', nextDueDays: 365 },
    { name: 'DHPP (Distemper)', manufacturer: 'Merck', nextDueDays: 365 },
    { name: 'Bordetella', manufacturer: 'Elanco', nextDueDays: 180 },
    { name: 'Leptospirosis', manufacturer: 'Zoetis', nextDueDays: 365 },
    { name: 'Canine Influenza', manufacturer: 'Zoetis', nextDueDays: 365 },
    { name: 'Lyme Disease', manufacturer: 'Merck', nextDueDays: 365 },
    { name: 'Parvovirus Booster', manufacturer: 'Zoetis', nextDueDays: 365 },
    { name: 'Canine Coronavirus', manufacturer: 'Elanco', nextDueDays: 365 },
  ];

  const catVaccines = [
    { name: 'FVRCP (Feline Distemper)', manufacturer: 'Boehringer', nextDueDays: 365 },
    { name: 'FeLV (Feline Leukemia)', manufacturer: 'Merck', nextDueDays: 365 },
    { name: 'Rabies', manufacturer: 'Merial', nextDueDays: 365 },
    { name: 'Feline Chlamydia', manufacturer: 'Zoetis', nextDueDays: 365 },
    { name: 'FIV (Feline Immunodeficiency)', manufacturer: 'Boehringer', nextDueDays: 365 },
  ];

  const horseVaccines = [
    { name: 'Equine Influenza', manufacturer: 'Zoetis', nextDueDays: 180 },
    { name: 'Tetanus Toxoid', manufacturer: 'Merck', nextDueDays: 365 },
    { name: 'West Nile Virus', manufacturer: 'Zoetis', nextDueDays: 365 },
    { name: 'EHV (Equine Herpesvirus)', manufacturer: 'Boehringer', nextDueDays: 180 },
    { name: 'Strangles', manufacturer: 'Intervet', nextDueDays: 365 },
  ];

  const birdVaccines = [
    { name: 'Polyomavirus', manufacturer: 'Biomune', nextDueDays: 365 },
    { name: 'Pacheco Disease', manufacturer: 'Biomune', nextDueDays: 365 },
  ];

  const rabbitVaccines = [
    { name: 'Myxomatosis', manufacturer: 'Filavac', nextDueDays: 365 },
    { name: 'RHDV (Rabbit Hemorrhagic Disease)', manufacturer: 'Filavac', nextDueDays: 365 },
  ];

  const vaccinesBySpecies: Record<string, any[]> = {
    dog: dogVaccines,
    cat: catVaccines,
    horse: horseVaccines,
    bird: birdVaccines,
    rabbit: rabbitVaccines,
  };

  const manufacturers = ['Zoetis', 'Merck', 'Elanco', 'Boehringer', 'Merial', 'Intervet', 'Biomune', 'Filavac'];
  const vetNames = ['Dr. Smith', 'Dr. Johnson', 'Dr. Patel', 'Dr. Lee', 'Dr. Martinez', 'Dr. Brown', 'Dr. Thompson'];
  const vetClinics = ['PetCare Clinic', 'Animal Hospital', 'Happy Paws Vet', 'City Vet Center', 'Emergency Pet ER'];

  const timePeriods = [
    7, 14, 21, 28, 35, 45, 60, 75, 90, 100,
    120, 150, 180, 200, 240, 270, 300, 330, 365, 400, 450, 500,
  ];

  let batchIdx = 0;
  for (const pet of pets) {
    const species = pet.species || 'dog';
    const availableVaccines = vaccinesBySpecies[species] || dogVaccines;

    const numVaccines = Math.min(availableVaccines.length, 2 + Math.floor(Math.random() * 4));
    const shuffled = [...availableVaccines].sort(() => Math.random() - 0.5);
    const selected = shuffled.slice(0, numVaccines);

    for (const vac of selected) {
      const daysAgo = timePeriods[batchIdx % timePeriods.length];
      const batchNumber = `${vac.name.substring(0, 3).toUpperCase()}-2024-${String(batchIdx + 1).padStart(3, '0')}`;

      await vacRef.add({
        petId: pet.id,
        ownerId: pet.ownerId,
        name: vac.name,
        manufacturer: vac.manufacturer,
        batchNumber,
        administeredDate: new Date(now.getTime() - daysAgo * 24 * 60 * 60 * 1000).toISOString(),
        nextDueDate: new Date(now.getTime() - daysAgo * 24 * 60 * 60 * 1000 + vac.nextDueDays * 24 * 60 * 60 * 1000).toISOString(),
        vetName: vetNames[batchIdx % vetNames.length],
        vetClinic: vetClinics[batchIdx % vetClinics.length],
        status: 'completed',
        createdAt: new Date(now.getTime() - daysAgo * 24 * 60 * 60 * 1000).toISOString(),
      });
      batchIdx++;
    }
  }
}

// ─── Schedules ──────────────────────────────────────────────────────────────

async function seedSchedules() {
  const petsSnap = await db.collection('pets').where('status', '==', 'active').limit(10).get();
  const pets = petsSnap.docs.map(d => ({ id: d.id, ...d.data() })) as any[];
  const now = new Date();
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

  for (let i = 0; i < schedules.length; i++) {
    const pet = pets[i % pets.length];
    const sched = schedules[i];
    await schedRef.add({
      petId: pet.id, ownerId: pet.ownerId, type: sched.type,
      title: sched.title, frequency: sched.frequency, time: sched.time,
      notes: sched.notes, isActive: true,
      lastCompleted: new Date(now.getTime() - 24 * 60 * 60 * 1000).toISOString(),
      nextDue: new Date(now.getTime() + 12 * 60 * 60 * 1000).toISOString(),
      createdAt: new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000).toISOString(),
    });
  }
}

// ─── Notifications ──────────────────────────────────────────────────────────

async function seedNotifications() {
  const usersRes = await adminService.getUsers(1, 100);
  const users = usersRes.data as any[];
  const now = new Date();
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

  for (let i = 0; i < notifications.length; i++) {
    const user = users[i % users.length];
    const notif = notifications[i];
    await notifRef.add({
      userId: user.id, title: notif.title, body: notif.body, type: notif.type,
      read: i > 6,
      readAt: i > 6 ? new Date(now.getTime() - notif.daysAgo * 24 * 60 * 60 * 1000 + 3600000).toISOString() : null,
      createdAt: new Date(now.getTime() - notif.daysAgo * 24 * 60 * 60 * 1000).toISOString(),
    });
  }
}

// ─── Pregnancies ────────────────────────────────────────────────────────────

async function seedPregnancies() {
  const petsSnap = await db.collection('pets').where('gender', '==', 'female').where('status', '==', 'active').limit(5).get();
  const femalePets = petsSnap.docs.map(d => ({ id: d.id, ...d.data() })) as any[];
  if (femalePets.length < 2) return;

  const now = new Date();
  const pregRef = db.collection('pregnancies');

  await pregRef.add({
    petId: femalePets[0].id, ownerId: femalePets[0].ownerId, status: 'active',
    startDate: new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000).toISOString(),
    expectedDueDate: new Date(now.getTime() + 33 * 24 * 60 * 60 * 1000).toISOString(),
    notes: 'First pregnancy, ultrasound confirmed 4 puppies', litterSize: null,
    createdAt: new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000).toISOString(),
  });

  await pregRef.add({
    petId: femalePets[1].id, ownerId: femalePets[1].ownerId, status: 'completed',
    startDate: new Date(now.getTime() - 90 * 24 * 60 * 60 * 1000).toISOString(),
    expectedDueDate: new Date(now.getTime() - 27 * 24 * 60 * 60 * 1000).toISOString(),
    notes: 'Delivered 3 healthy kittens on expected date', litterSize: 3,
    createdAt: new Date(now.getTime() - 90 * 24 * 60 * 60 * 1000).toISOString(),
  });
}

// ─── Chat Rooms ─────────────────────────────────────────────────────────────

async function seedChatRooms() {
  const usersRes = await adminService.getUsers(1, 100);
  const users = usersRes.data as any[];
  if (users.length < 2) return;

  const now = new Date();
  const chatRef = db.collection('chat_rooms');
  const chatMsgRef = db.collection('chat_messages');

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
      roomId: room1.id, senderId: msg.senderId, text: msg.text,
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
        roomId: room2.id, senderId: msg.senderId, text: msg.text,
        createdAt: new Date(now.getTime() - msg.daysAgo * 24 * 60 * 60 * 1000).toISOString(),
      });
    }
  }
}

// ─── Health Certifications ─────────────────────────────────────────────────

async function seedHealthCertifications() {
  const petsSnap = await db.collection('pets').where('status', '==', 'active').limit(6).get();
  const pets = petsSnap.docs.map(d => ({ id: d.id, ...d.data() })) as any[];
  if (pets.length < 3) return;

  const now = new Date();
  const certRef = db.collection('health_certifications');

  const sampleDocs = [
    { url: 'https://images.unsplash.com/photo-1601758174114-e711c0cbaa69?w=600&fit=crop', name: 'vet_certificate.jpg' },
    { url: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=600&fit=crop', name: 'health_report.jpg' },
    { url: 'https://images.unsplash.com/photo-1586953208270-767889db8547?w=600&fit=crop', name: 'vaccination_record.jpg' },
  ];

  // Pending certification (for admin to review)
  await certRef.add({
    petId: pets[0].id,
    ownerId: pets[0].ownerId,
    petName: pets[0].name,
    species: pets[0].species,
    breed: pets[0].breed,
    vetName: 'Dr. Sarah Thompson',
    vetClinic: 'Happy Paws Veterinary Clinic',
    certDate: new Date(now.getTime() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    expiryDate: new Date(now.getTime() + 360 * 24 * 60 * 60 * 1000).toISOString(),
    notes: 'Complete health checkup including blood work and X-rays. All results normal.',
    documents: [sampleDocs[0], sampleDocs[1]],
    status: 'pending',
    rejectionReason: null,
    processedBy: null,
    processedAt: null,
    createdAt: new Date(now.getTime() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(now.getTime() - 3 * 24 * 60 * 60 * 1000).toISOString(),
  });

  // Another pending one
  await certRef.add({
    petId: pets[1].id,
    ownerId: pets[1].ownerId,
    petName: pets[1].name,
    species: pets[1].species,
    breed: pets[1].breed,
    vetName: 'Dr. Michael Chen',
    vetClinic: 'City Animal Hospital',
    certDate: new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    expiryDate: new Date(now.getTime() + 350 * 24 * 60 * 60 * 1000).toISOString(),
    notes: 'Annual wellness exam. Pet is in excellent health.',
    documents: [sampleDocs[0], sampleDocs[2]],
    status: 'pending',
    rejectionReason: null,
    processedBy: null,
    processedAt: null,
    createdAt: new Date(now.getTime() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(now.getTime() - 1 * 24 * 60 * 60 * 1000).toISOString(),
  });

  // Approved certification
  await certRef.add({
    petId: pets[2].id,
    ownerId: pets[2].ownerId,
    petName: pets[2].name,
    species: pets[2].species,
    breed: pets[2].breed,
    vetName: 'Dr. Emily Watson',
    vetClinic: 'PetCare Specialists',
    certDate: new Date(now.getTime() - 20 * 24 * 60 * 60 * 1000).toISOString(),
    expiryDate: new Date(now.getTime() + 345 * 24 * 60 * 60 * 1000).toISOString(),
    notes: 'Comprehensive health exam including hip evaluation and heart check.',
    documents: [sampleDocs[0], sampleDocs[1], sampleDocs[2]],
    status: 'approved',
    rejectionReason: null,
    processedBy: 'admin',
    processedAt: new Date(now.getTime() - 18 * 24 * 60 * 60 * 1000).toISOString(),
    createdAt: new Date(now.getTime() - 20 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(now.getTime() - 18 * 24 * 60 * 60 * 1000).toISOString(),
  });

  // Mark the approved pet as health certified
  await db.collection('pets').doc(pets[2].id).update({
    healthCertified: true,
    healthCertifiedAt: new Date(now.getTime() - 18 * 24 * 60 * 60 * 1000).toISOString(),
  });

  // Rejected certification
  if (pets.length >= 4) {
    await certRef.add({
      petId: pets[3].id,
      ownerId: pets[3].ownerId,
      petName: pets[3].name,
      species: pets[3].species,
      breed: pets[3].breed,
      vetName: 'Dr. James Brown',
      vetClinic: 'QuickVet Clinic',
      certDate: new Date(now.getTime() - 15 * 24 * 60 * 60 * 1000).toISOString(),
      expiryDate: null,
      notes: null,
      documents: [sampleDocs[0]],
      status: 'rejected',
      rejectionReason: 'Document is not legible. Please resubmit with a clearer image of the health certificate.',
      processedBy: 'admin',
      processedAt: new Date(now.getTime() - 13 * 24 * 60 * 60 * 1000).toISOString(),
      createdAt: new Date(now.getTime() - 15 * 24 * 60 * 60 * 1000).toISOString(),
      updatedAt: new Date(now.getTime() - 13 * 24 * 60 * 60 * 1000).toISOString(),
    });
  }
}
