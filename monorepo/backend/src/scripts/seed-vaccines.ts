import { db } from '../config/firebase.js';
import { readFileSync } from 'fs';
import { resolve } from 'path';

async function seedVaccines() {
  const dataPath = resolve(process.cwd(), '../shared/seed-data/vaccine-templates.json');
  const raw = readFileSync(dataPath, 'utf-8');
  const { vaccines } = JSON.parse(raw);

  const batch = db.batch();
  let count = 0;

  for (const vaccine of vaccines) {
    const ref = db.collection('vaccine_templates').doc(vaccine.id);
    batch.set(ref, vaccine);
    count++;
  }

  await batch.commit();
  console.log(`Seeded ${count} vaccine templates successfully.`);
}

seedVaccines().catch(console.error);
