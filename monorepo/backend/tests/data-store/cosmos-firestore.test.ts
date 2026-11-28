import { describe, it, expect, beforeEach } from 'vitest';
import type { Container } from '@azure/cosmos';
import { CosmosFirestore } from '../../src/data-store/cosmos-firestore';
import { FieldValue, Timestamp } from '../../src/data-store/values';

const cosmosError = (code: number) => Object.assign(new Error(`status ${code}`), { code });

/** Point operations behave like Cosmos (ETags, 404/409/412); queries return what the test queues. */
function fakeContainer() {
  const items = new Map<string, any>();
  const queries: Array<{ sql: any; options: any }> = [];
  const queryResults: any[][] = [];
  let etag = 0;
  let failNextReplaceWith412 = 0;
  const key = (id: string, pk: string) => `${pk}|${id}`;

  const container = {
    item: (id: string, pk: string) => ({
      read: async () => {
        const found = items.get(key(id, pk));
        if (!found) throw cosmosError(404);
        return { resource: structuredClone(found) };
      },
      replace: async (doc: any, options: any) => {
        const current = items.get(key(id, pk));
        if (!current) throw cosmosError(404);
        if (failNextReplaceWith412 > 0) {
          failNextReplaceWith412--;
          throw cosmosError(412);
        }
        if (options?.accessCondition?.condition !== current._etag) throw cosmosError(412);
        items.set(key(id, pk), { ...structuredClone(doc), _etag: `e${++etag}` });
        return {};
      },
      delete: async () => {
        if (!items.delete(key(id, pk))) throw cosmosError(404);
        return {};
      },
    }),
    items: {
      create: async (doc: any) => {
        if (items.has(key(doc.id, doc.c))) throw cosmosError(409);
        items.set(key(doc.id, doc.c), { ...structuredClone(doc), _etag: `e${++etag}` });
        return {};
      },
      upsert: async (doc: any) => {
        items.set(key(doc.id, doc.c), { ...structuredClone(doc), _etag: `e${++etag}` });
        return {};
      },
      query: (sql: any, options: any) => {
        queries.push({ sql, options });
        return { fetchAll: async () => ({ resources: queryResults.shift() ?? [] }) };
      },
    },
  };

  return {
    container: container as unknown as Container,
    items,
    queries,
    queueQueryResult: (r: any[]) => queryResults.push(r),
    failReplaces: (n: number) => (failNextReplaceWith412 = n),
  };
}

describe('CosmosFirestore', () => {
  let fake: ReturnType<typeof fakeContainer>;
  let db: CosmosFirestore;

  beforeEach(() => {
    fake = fakeContainer();
    db = new CosmosFirestore(fake.container);
  });

  it('stores the client shape in d and the queryable shape in o, partitioned by collection', async () => {
    await db.collection('pets').doc('p1').set({ name: 'Rex', createdAt: new Date(2000) });
    const item = fake.items.get('pets|p1');
    expect(item).toMatchObject({
      id: 'p1',
      c: 'pets',
      d: { name: 'Rex', createdAt: { _seconds: 2, _nanoseconds: 0 } },
      o: { name: 'Rex', createdAt: 2000 },
    });
  });

  it('reads back with exists, id, data() and Timestamp values', async () => {
    await db.collection('pets').doc('p1').set({ createdAt: FieldValue.serverTimestamp() });
    const snap = await db.collection('pets').doc('p1').get();
    expect(snap.exists).toBe(true);
    expect(snap.id).toBe('p1');
    expect(snap.data()!.createdAt).toBeInstanceOf(Timestamp);
    expect((await db.collection('pets').doc('nope').get()).exists).toBe(false);
  });

  it('add() creates a document with a 20-character auto id', async () => {
    const ref = await db.collection('notifications').add({ read: false });
    expect(ref.id).toMatch(/^[A-Za-z0-9]{20}$/);
    expect(fake.items.has(`notifications|${ref.id}`)).toBe(true);
  });

  it('update() fails with NOT_FOUND (code 5) when the document is missing', async () => {
    await expect(db.collection('pets').doc('missing').update({ a: 1 })).rejects.toMatchObject({ code: 5 });
  });

  it('create() fails with ALREADY_EXISTS (code 6) when the document exists', async () => {
    await db.collection('pets').doc('p1').set({ a: 1 });
    await expect(db.collection('pets').doc('p1').create({ a: 2 })).rejects.toMatchObject({ code: 6 });
  });

  it('update() retries when another writer changed the document between read and replace', async () => {
    await db.collection('blog_posts').doc('b1').set({ viewCount: 1 });
    fake.failReplaces(2);
    await db.collection('blog_posts').doc('b1').update({ viewCount: FieldValue.increment(1) });
    expect(fake.items.get('blog_posts|b1').d.viewCount).toBe(2);
  });

  it('a later app write drops the migration marker, so a re-copy leaves it alone', async () => {
    fake.items.set('pets|p1', { id: 'p1', c: 'pets', d: { a: 1 }, o: { a: 1 }, m: 'copy-x', _etag: 'e0' });
    await db.collection('pets').doc('p1').update({ a: 2 });
    expect(fake.items.get('pets|p1').m).toBeUndefined();
  });

  it('set with merge creates the document when it is missing', async () => {
    await db.collection('admin_users').doc('a1').set({ email: 'x@y.z' }, { merge: true });
    expect(fake.items.get('admin_users|a1').d).toEqual({ email: 'x@y.z' });
  });

  it('delete() is idempotent', async () => {
    await db.collection('pets').doc('p1').delete();
    await db.collection('pets').doc('p1').set({ a: 1 });
    await db.collection('pets').doc('p1').delete();
    expect(fake.items.size).toBe(0);
  });

  it('queries run in the collection partition and wrap results as snapshots with refs', async () => {
    fake.queueQueryResult([{ id: 'p1', d: { ownerId: 'u1', createdAt: { _seconds: 1, _nanoseconds: 0 } } }]);
    const snap = await db.collection('pets').where('ownerId', '==', 'u1').orderBy('createdAt', 'desc').limit(10).get();
    expect(fake.queries[0].options).toEqual({ partitionKey: 'pets' });
    expect(fake.queries[0].sql.query).toContain('ORDER BY c.o["createdAt"] DESC');
    expect(snap.size).toBe(1);
    expect(snap.empty).toBe(false);
    expect(snap.docs[0].ref.path).toBe('pets/p1');
    expect(JSON.parse(JSON.stringify(snap.docs[0].data()))).toEqual({ ownerId: 'u1', createdAt: { _seconds: 1, _nanoseconds: 0 } });
  });

  it('count() applies offset and limit to the total the way Firestore aggregation does', async () => {
    fake.queueQueryResult([42]);
    const res = await db.collection('pets').offset(40).limit(10).count().get();
    expect(res.data().count).toBe(2);
    expect(fake.queries[0].sql.query).toMatch(/^SELECT VALUE COUNT\(1\)/);
  });

  it('subcollections partition by their full path', async () => {
    const ref = await db.collection('chat_rooms').doc('r1').collection('messages').add({ text: 'hi' });
    expect(fake.items.has(`chat_rooms/r1/messages|${ref.id}`)).toBe(true);
    expect(db.doc(`chat_rooms/r1/messages/${ref.id}`).path).toBe(`chat_rooms/r1/messages/${ref.id}`);
  });

  it('batch applies every write on commit', async () => {
    await db.collection('n').doc('a').set({ read: false });
    await db.collection('n').doc('b').set({ read: false });
    const batch = db.batch();
    batch.update(db.collection('n').doc('a'), { read: true });
    batch.delete(db.collection('n').doc('b'));
    expect(fake.items.get('n|a').d.read).toBe(false);
    await batch.commit();
    expect(fake.items.get('n|a').d.read).toBe(true);
    expect(fake.items.has('n|b')).toBe(false);
  });

  it('refuses ids Cosmos cannot store', () => {
    expect(() => db.collection('pets').doc('a#b')).toThrow(/cannot be stored/);
  });
});
