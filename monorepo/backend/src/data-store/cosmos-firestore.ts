import { randomInt } from 'crypto';
import type { Container, ItemDefinition } from '@azure/cosmos';
import { buildQuery, QuerySpec, WhereOp } from './query-sql';
import { applyWrite, fromStored, Timestamp, toQueryable } from './values';

/**
 * The subset of the Firestore Admin API this backend uses, stored in one Cosmos DB container.
 * Services keep calling db.collection(...).where(...) unchanged; see values.ts for the item layout.
 *
 * Differences callers can observe: a batch is applied one write at a time rather than atomically
 * (every batch in this codebase is a retry-safe bulk update or delete), and there are no
 * transactions or realtime listeners, which the backend does not use.
 */

export interface StoredItem extends ItemDefinition {
  id: string;
  /** Collection path, e.g. "pets" or "chat_rooms/abc/messages". Also the partition key. */
  c: string;
  d: Record<string, unknown>;
  o: Record<string, unknown>;
  /** Set by the migration and dropped by any later app write, so a re-copy never overwrites newer data. */
  m?: string;
}

export class FirestoreCompatError extends Error {
  constructor(
    readonly code: number,
    message: string,
  ) {
    super(message);
  }
}

// gRPC status codes, which is what firebase-admin puts in error.code.
const NOT_FOUND = 5;
const ALREADY_EXISTS = 6;
const ABORTED = 10;

const AUTO_ID_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
const MAX_WRITE_ATTEMPTS = 5;

export function autoId(): string {
  let id = '';
  for (let i = 0; i < 20; i++) id += AUTO_ID_CHARS[randomInt(AUTO_ID_CHARS.length)];
  return id;
}

/** Cosmos forbids these in an item id; Firestore ids may contain all but '/'. */
export function assertValidId(id: string): void {
  if (!id || /[/\\?#]/.test(id) || id.length > 255) throw new Error(`Document id "${id}" cannot be stored`);
}

const statusOf = (err: unknown) => (err as { code?: number; statusCode?: number })?.code ?? (err as { statusCode?: number })?.statusCode;

export function toItem(collection: string, id: string, stored: Record<string, unknown>): StoredItem {
  return { id, c: collection, d: stored, o: toQueryable(stored) as Record<string, unknown> };
}

export class CosmosFirestore {
  constructor(readonly container: Container) {}

  collection(path: string): CollectionReference {
    const segments = path.split('/');
    if (segments.length % 2 === 0) throw new Error(`"${path}" is a document path, not a collection`);
    return new CollectionReference(this, path);
  }

  doc(path: string): DocumentReference {
    const at = path.lastIndexOf('/');
    if (at <= 0) throw new Error(`"${path}" is not a document path`);
    return this.collection(path.slice(0, at)).doc(path.slice(at + 1));
  }

  batch(): WriteBatch {
    return new WriteBatch();
  }

  /** Accepted for parity with Firestore's settings({ ignoreUndefinedProperties }); undefined is always dropped. */
  settings(): void {}
}

export class Query {
  constructor(
    readonly store: CosmosFirestore,
    readonly path: string,
    protected readonly spec: Omit<QuerySpec, 'collection'> = { filters: [], orders: [] },
  ) {}

  where(field: string, op: WhereOp, value: unknown): Query {
    return new Query(this.store, this.path, { ...this.spec, filters: [...this.spec.filters, { field, op, value }] });
  }

  orderBy(field: string, direction: 'asc' | 'desc' = 'asc'): Query {
    return new Query(this.store, this.path, { ...this.spec, orders: [...this.spec.orders, { field, direction }] });
  }

  offset(n: number): Query {
    return new Query(this.store, this.path, { ...this.spec, offset: n });
  }

  limit(n: number): Query {
    return new Query(this.store, this.path, { ...this.spec, limit: n });
  }

  async get(): Promise<QuerySnapshot> {
    const sql = buildQuery({ ...this.spec, collection: this.path }, 'docs');
    const { resources } = await this.store.container.items
      .query<{ id: string; d: Record<string, unknown> }>(sql, { partitionKey: this.path })
      .fetchAll();
    const collection = new CollectionReference(this.store, this.path);
    return new QuerySnapshot(resources.map((r) => new DocumentSnapshot(collection.doc(r.id), r.d)));
  }

  count() {
    return {
      get: async () => {
        const sql = buildQuery({ ...this.spec, collection: this.path, offset: undefined, limit: undefined }, 'count');
        const { resources } = await this.store.container.items.query<number>(sql, { partitionKey: this.path }).fetchAll();
        let count = resources[0] ?? 0;
        if (this.spec.offset) count = Math.max(0, count - this.spec.offset);
        if (this.spec.limit !== undefined) count = Math.min(count, this.spec.limit);
        return { data: () => ({ count }) };
      },
    };
  }
}

export class CollectionReference extends Query {
  get id(): string {
    return this.path.slice(this.path.lastIndexOf('/') + 1);
  }

  doc(id: string = autoId()): DocumentReference {
    assertValidId(id);
    return new DocumentReference(this.store, this, id);
  }

  async add(data: Record<string, unknown>): Promise<DocumentReference> {
    const ref = this.doc();
    await ref.create(data);
    return ref;
  }
}

export class DocumentReference {
  constructor(
    readonly store: CosmosFirestore,
    readonly parent: CollectionReference,
    readonly id: string,
  ) {}

  get path(): string {
    return `${this.parent.path}/${this.id}`;
  }

  collection(name: string): CollectionReference {
    return this.store.collection(`${this.path}/${name}`);
  }

  private get item() {
    return this.store.container.item(this.id, this.parent.path);
  }

  private async read(): Promise<StoredItem | undefined> {
    try {
      const { resource } = await this.item.read<StoredItem>();
      return resource;
    } catch (err) {
      if (statusOf(err) === 404) return undefined;
      throw err;
    }
  }

  async get(): Promise<DocumentSnapshot> {
    const item = await this.read();
    return new DocumentSnapshot(this, item?.d);
  }

  async create(data: Record<string, unknown>): Promise<void> {
    const stored = applyWrite(undefined, data, 'set', Timestamp.now());
    try {
      await this.store.container.items.create(toItem(this.parent.path, this.id, stored));
    } catch (err) {
      if (statusOf(err) === 409) throw new FirestoreCompatError(ALREADY_EXISTS, `Document ${this.path} already exists`);
      throw err;
    }
  }

  async set(data: Record<string, unknown>, options?: { merge?: boolean }): Promise<void> {
    if (!options?.merge) {
      const stored = applyWrite(undefined, data, 'set', Timestamp.now());
      await this.store.container.items.upsert(toItem(this.parent.path, this.id, stored));
      return;
    }
    await this.readModifyWrite((existing) => applyWrite(existing, data, 'merge', Timestamp.now()), true);
  }

  async update(data: Record<string, unknown>): Promise<void> {
    await this.readModifyWrite((existing) => applyWrite(existing, data, 'update', Timestamp.now()), false);
  }

  async delete(): Promise<void> {
    try {
      await this.item.delete();
    } catch (err) {
      if (statusOf(err) !== 404) throw err;
    }
  }

  /** Optimistic concurrency: replace only if nobody wrote since the read, else read again. */
  private async readModifyWrite(
    change: (existing: Record<string, unknown> | undefined) => Record<string, unknown>,
    createIfMissing: boolean,
  ): Promise<void> {
    for (let attempt = 0; attempt < MAX_WRITE_ATTEMPTS; attempt++) {
      const current = await this.read();
      if (!current && !createIfMissing) throw new FirestoreCompatError(NOT_FOUND, `No document to update: ${this.path}`);
      const next = toItem(this.parent.path, this.id, change(current?.d));
      try {
        if (current) await this.item.replace(next, { accessCondition: { type: 'IfMatch', condition: current._etag! } });
        else await this.store.container.items.create(next);
        return;
      } catch (err) {
        const status = statusOf(err);
        if (status !== 412 && status !== 409) throw err;
      }
    }
    throw new FirestoreCompatError(ABORTED, `Too much contention on ${this.path}`);
  }
}

export class DocumentSnapshot {
  constructor(
    readonly ref: DocumentReference,
    private readonly stored: Record<string, unknown> | undefined,
  ) {}

  get id(): string {
    return this.ref.id;
  }

  get exists(): boolean {
    return this.stored !== undefined;
  }

  data(): Record<string, any> | undefined {
    return this.stored === undefined ? undefined : (fromStored(this.stored) as Record<string, any>);
  }

  get(field: string): unknown {
    return field.split('.').reduce<any>((node, key) => node?.[key], this.data());
  }
}

export class QuerySnapshot {
  constructor(readonly docs: DocumentSnapshot[]) {}

  get empty(): boolean {
    return this.docs.length === 0;
  }

  get size(): number {
    return this.docs.length;
  }

  forEach(fn: (doc: DocumentSnapshot) => void): void {
    this.docs.forEach(fn);
  }
}

type BatchOp = () => Promise<void>;

export class WriteBatch {
  private readonly ops: BatchOp[] = [];

  set(ref: DocumentReference, data: Record<string, unknown>, options?: { merge?: boolean }): WriteBatch {
    this.ops.push(() => ref.set(data, options));
    return this;
  }

  update(ref: DocumentReference, data: Record<string, unknown>): WriteBatch {
    this.ops.push(() => ref.update(data));
    return this;
  }

  delete(ref: DocumentReference): WriteBatch {
    this.ops.push(() => ref.delete());
    return this;
  }

  create(ref: DocumentReference, data: Record<string, unknown>): WriteBatch {
    this.ops.push(() => ref.create(data));
    return this;
  }

  async commit(): Promise<void> {
    for (const op of this.ops) await op();
  }
}
