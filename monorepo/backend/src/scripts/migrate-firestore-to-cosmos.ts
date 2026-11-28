/**
 * Copies app data from Firestore into the Cosmos DB container, and checks the result.
 * Runs as the data-migration Container Apps job (azure-data-migrate workflow), inside the
 * environment's VNet, as the apps identity: Google through Workload Identity Federation, Cosmos
 * through Entra ID. It never writes to Firestore, and it logs counts and document ids, never contents.
 *
 *   copy                  write every Firestore document, subcollections included
 *   delta --since=<ISO>   after the API has switched to Cosmos: copy documents Firestore changed
 *                         since <ISO>, and drop copies whose source was deleted. Items the API has
 *                         written since the copy are left alone (an API write drops the copy marker).
 *   verify                compare every document; exits 1 on any difference
 *   selftest              exercise the Cosmos-backed Firestore API against the real container
 *                         in a scratch collection, then remove it
 */
import assert from 'node:assert/strict';
import type { Container } from '@azure/cosmos';
import { federatedFirebaseCredential, prepareWifCredentialFile } from '../config/gcp-wif';
import { openContainer } from '../data-store/cosmos-client';
import { assertValidId, CosmosFirestore, StoredItem, toItem } from '../data-store/cosmos-firestore';
import { canonical, FieldValue, Timestamp, toStored } from '../data-store/values';

type FsDoc = {
  id: string;
  ref: { listCollections(): Promise<Array<{ id: string; path: string; get(): Promise<{ docs: FsDoc[] }> }>> };
  data(): Record<string, unknown>;
  updateTime: { toMillis(): number };
};

function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) throw new Error(`${name} is not set`);
  return value;
}

function openFirestore() {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const admin = require('firebase-admin');
  const options: Record<string, unknown> = { projectId: requireEnv('FIREBASE_PROJECT_ID') };
  const wif = prepareWifCredentialFile();
  if (wif) {
    options.credential = federatedFirebaseCredential(() => admin.credential.applicationDefault(), wif);
    process.env.GOOGLE_APPLICATION_CREDENTIALS = wif;
  }
  admin.initializeApp(options);
  return admin.firestore();
}

/** Every collection path in Firestore with its documents, depth first. */
async function* walk(fs: any): AsyncGenerator<{ path: string; docs: FsDoc[] }> {
  const pending: Array<{ path: string; get(): Promise<{ docs: FsDoc[] }> }> = await fs.listCollections();
  while (pending.length > 0) {
    const collection = pending.shift()!;
    const { docs } = await collection.get();
    yield { path: collection.path, docs };
    for (const doc of docs) pending.push(...(await doc.ref.listCollections()));
  }
}

const storedOf = (doc: FsDoc) => toStored(doc.data(), `${doc.id}`) as Record<string, unknown>;

async function readItems(container: Container, path: string): Promise<Map<string, StoredItem>> {
  const { resources } = await container.items
    .query<StoredItem>({ query: 'SELECT * FROM c WHERE c.c = @c', parameters: [{ name: '@c', value: path }] }, { partitionKey: path })
    .fetchAll();
  return new Map(resources.map((r) => [r.id, r]));
}

async function copy(fs: any, container: Container): Promise<void> {
  const marker = `copy-${new Date().toISOString()}`;
  let total = 0;
  for await (const { path, docs } of walk(fs)) {
    for (const doc of docs) {
      assertValidId(doc.id);
      await container.items.upsert({ ...toItem(path, doc.id, storedOf(doc)), m: marker });
    }
    total += docs.length;
    console.log(JSON.stringify({ collection: path, copied: docs.length }));
  }
  console.log(JSON.stringify({ mode: 'copy', marker, total }));
}

async function delta(fs: any, container: Container, since: number): Promise<void> {
  const marker = `delta-${new Date().toISOString()}`;
  const totals = { copied: 0, removed: 0, keptNewer: [] as string[] };
  const seenCollections = new Set<string>();
  for await (const { path, docs } of walk(fs)) {
    seenCollections.add(path);
    const items = await readItems(container, path);
    const sourceIds = new Set(docs.map((d) => d.id));
    for (const doc of docs) {
      if (doc.updateTime.toMillis() <= since) continue;
      const existing = items.get(doc.id);
      if (existing && !existing.m) {
        totals.keptNewer.push(`${path}/${doc.id}`);
        continue;
      }
      await container.items.upsert({ ...toItem(path, doc.id, storedOf(doc)), m: marker });
      totals.copied++;
    }
    for (const [id, item] of items) {
      if (!sourceIds.has(id) && item.m) {
        await container.item(id, path).delete();
        totals.removed++;
      }
    }
  }
  console.log(JSON.stringify({ mode: 'delta', since: new Date(since).toISOString(), ...totals }));
}

async function verify(fs: any, container: Container): Promise<boolean> {
  let ok = true;
  let total = 0;
  for await (const { path, docs } of walk(fs)) {
    const items = await readItems(container, path);
    const missing: string[] = [];
    const different: string[] = [];
    for (const doc of docs) {
      const item = items.get(doc.id);
      if (!item) missing.push(doc.id);
      else if (JSON.stringify(canonical(item.d)) !== JSON.stringify(canonical(storedOf(doc)))) different.push(doc.id);
      items.delete(doc.id);
    }
    const extra = [...items.keys()];
    total += docs.length;
    const clean = missing.length === 0 && different.length === 0 && extra.length === 0;
    ok &&= clean;
    console.log(
      JSON.stringify({
        collection: path,
        firestore: docs.length,
        ...(clean ? { match: true } : { missing: missing.slice(0, 20), different: different.slice(0, 20), extra: extra.slice(0, 20) }),
      }),
    );
  }
  console.log(JSON.stringify({ mode: 'verify', total, ok }));
  return ok;
}

async function selftest(container: Container): Promise<void> {
  const db = new CosmosFirestore(container);
  const path = `_selftest_${Date.now()}`;
  const col = db.collection(path);
  try {
    const before = Timestamp.now().toMillis();
    const a = await col.add({ name: 'a', n: 1, tags: ['x'], location: { city: 'Oslo' }, createdAt: FieldValue.serverTimestamp() });
    await col.doc('b').set({ name: 'b', n: 2, tags: ['y'], location: { city: 'Rome' }, createdAt: new Date(before + 60_000) });
    await col.doc('c').set({ name: 'c', n: 3, tags: ['x', 'y'], location: { city: 'Oslo' }, createdAt: new Date(before + 120_000), optional: true });

    const snapA = await a.get();
    assert.ok(snapA.exists);
    const json = JSON.parse(JSON.stringify(snapA.data()));
    assert.equal(typeof json.createdAt._seconds, 'number', 'timestamps serialise as {_seconds, _nanoseconds}');
    assert.equal(typeof json.createdAt._nanoseconds, 'number');

    const eq = await col.where('location.city', '==', 'Oslo').get();
    assert.deepEqual(eq.docs.map((d) => d.id).sort(), [a.id, 'c'].sort(), 'nested equality');

    const contains = await col.where('tags', 'array-contains', 'y').get();
    assert.deepEqual(contains.docs.map((d) => d.id).sort(), ['b', 'c'], 'array-contains');

    const ordered = await col.orderBy('createdAt', 'desc').get();
    assert.deepEqual(ordered.docs.map((d) => d.id), ['c', 'b', a.id], 'orderBy timestamp desc');

    const page = await col.orderBy('n', 'asc').offset(1).limit(1).get();
    assert.deepEqual(page.docs.map((d) => d.data()!.name), ['b'], 'offset/limit');

    const range = await col.where('createdAt', '>=', new Date(before + 60_000)).get();
    assert.deepEqual(range.docs.map((d) => d.id).sort(), ['b', 'c'], 'range on timestamp');

    const onlyDefined = await col.orderBy('optional').get();
    assert.deepEqual(onlyDefined.docs.map((d) => d.id), ['c'], 'orderBy skips documents without the field');

    assert.equal((await col.where('n', '>', 1).count().get()).data().count, 2, 'count');

    await col.doc('b').update({ n: FieldValue.increment(5), tags: FieldValue.arrayUnion('z'), 'location.city': 'Paris' });
    await col.doc('b').update({ tags: FieldValue.arrayRemove('y'), name: FieldValue.delete() });
    const b = (await col.doc('b').get()).data()!;
    assert.equal(b.n, 7, 'increment');
    assert.deepEqual(b.tags, ['z'], 'arrayUnion/arrayRemove');
    assert.equal(b.location.city, 'Paris', 'dotted update');
    assert.equal('name' in b, false, 'FieldValue.delete');

    await col.doc('b').set({ location: { country: 'FR' } }, { merge: true });
    const merged = (await col.doc('b').get()).data()!;
    assert.deepEqual(merged.location, { city: 'Paris', country: 'FR' }, 'merge keeps sibling fields');

    await assert.rejects(col.doc('missing').update({ n: 1 }), (err: any) => err.code === 5, 'update of a missing document');
    await assert.rejects(col.doc('c').create({ n: 1 }), (err: any) => err.code === 6, 'create of an existing document');

    const sub = col.doc('c').collection('messages');
    await sub.add({ text: 'hi', createdAt: FieldValue.serverTimestamp() });
    assert.equal((await sub.get()).size, 1, 'subcollection');

    const batch = db.batch();
    (await col.get()).docs.forEach((d) => batch.delete(d.ref));
    (await sub.get()).docs.forEach((d) => batch.delete(d.ref));
    await batch.commit();
    assert.equal((await col.get()).size, 0, 'batch delete');
    console.log(JSON.stringify({ mode: 'selftest', ok: true }));
  } finally {
    for (const p of [path, `${path}/c/messages`]) {
      const items = await readItems(container, p);
      for (const id of items.keys()) await container.item(id, p).delete();
    }
  }
}

async function main(): Promise<void> {
  const [mode, ...args] = process.argv.slice(2);
  const container = openContainer({
    endpoint: requireEnv('COSMOS_ENDPOINT'),
    database: process.env.COSMOS_DATABASE || 'petfolioo',
    container: process.env.COSMOS_CONTAINER || 'documents',
  });

  switch (mode) {
    case 'copy':
      return copy(openFirestore(), container);
    case 'delta': {
      const since = Date.parse(args.find((a) => a.startsWith('--since='))?.slice('--since='.length) ?? '');
      if (Number.isNaN(since)) throw new Error('delta needs --since=<ISO time the copy started>');
      return delta(openFirestore(), container, since);
    }
    case 'verify':
      if (!(await verify(openFirestore(), container))) process.exitCode = 1;
      return;
    case 'selftest':
      return selftest(container);
    default:
      throw new Error('mode must be copy, delta, verify or selftest');
  }
}

main().catch((err) => {
  console.error(JSON.stringify({ error: err instanceof Error ? err.message : String(err) }));
  process.exit(1);
});
