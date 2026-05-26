import { db } from '../config/firebase.js';
import { readFileSync } from 'fs';
import { resolve } from 'path';

async function seedBreeds() {
  const dataPath = resolve(process.cwd(), '../shared/seed-data/breeds.json');
  const raw = readFileSync(dataPath, 'utf-8');
  const { breeds } = JSON.parse(raw);

  const batch = db.batch();
  let count = 0;

  for (const breed of breeds) {
    const ref = db.collection('breeds').doc(breed.id);
    batch.set(ref, breed);
    count++;

    if (count % 400 === 0) {
      await batch.commit();
      console.log(`  Committed ${count} breeds...`);
    }
  }

  await batch.commit();
  console.log(`Seeded ${count} breeds successfully.`);
}

seedBreeds().catch(console.error);
