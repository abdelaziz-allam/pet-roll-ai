import { db } from '../config/firebase.js';
import { readFileSync } from 'fs';
import { resolve } from 'path';

async function seedMilestones() {
  const dataPath = resolve(process.cwd(), '../shared/seed-data/pregnancy-milestones.json');
  const raw = readFileSync(dataPath, 'utf-8');
  const { milestones } = JSON.parse(raw);

  const batch = db.batch();
  let count = 0;

  for (const [species, data] of Object.entries(milestones)) {
    const ref = db.collection('pregnancy_milestones').doc(species);
    batch.set(ref, data as any);
    count++;
  }

  await batch.commit();
  console.log(`Seeded pregnancy milestones for ${count} species successfully.`);
}

seedMilestones().catch(console.error);
