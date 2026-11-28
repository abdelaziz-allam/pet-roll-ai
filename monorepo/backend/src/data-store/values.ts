/**
 * Value handling shared by the Cosmos-backed Firestore API and the Firestore -> Cosmos migration.
 *
 * Clients parse dates in the shape Firestore's Timestamp serialises to, `{_seconds, _nanoseconds}`,
 * so stored documents keep exactly that shape. Each item stores the document twice:
 *
 *   d - the document as clients see it, timestamps as {_seconds, _nanoseconds}; not indexed.
 *   o - the same document with every timestamp turned into epoch milliseconds, so filters and
 *       ORDER BY compare plain numbers (Cosmos cannot order by an object).
 */

export class Timestamp {
  constructor(
    readonly _seconds: number,
    readonly _nanoseconds: number,
  ) {}

  static now(): Timestamp {
    return Timestamp.fromMillis(Date.now());
  }

  static fromDate(date: Date): Timestamp {
    return Timestamp.fromMillis(date.getTime());
  }

  static fromMillis(ms: number): Timestamp {
    const seconds = Math.floor(ms / 1000);
    return new Timestamp(seconds, Math.round((ms - seconds * 1000) * 1e6));
  }

  get seconds(): number {
    return this._seconds;
  }

  get nanoseconds(): number {
    return this._nanoseconds;
  }

  toMillis(): number {
    return this._seconds * 1000 + this._nanoseconds / 1e6;
  }

  toDate(): Date {
    return new Date(this.toMillis());
  }

  toJSON() {
    return { _seconds: this._seconds, _nanoseconds: this._nanoseconds };
  }
}

type Sentinel =
  | { kind: 'serverTimestamp' }
  | { kind: 'delete' }
  | { kind: 'increment'; by: number }
  | { kind: 'arrayUnion'; items: unknown[] }
  | { kind: 'arrayRemove'; items: unknown[] };

export class FieldValueSentinel {
  constructor(readonly op: Sentinel) {}
}

export const FieldValue = {
  serverTimestamp: () => new FieldValueSentinel({ kind: 'serverTimestamp' }),
  delete: () => new FieldValueSentinel({ kind: 'delete' }),
  increment: (by: number) => new FieldValueSentinel({ kind: 'increment', by }),
  arrayUnion: (...items: unknown[]) => new FieldValueSentinel({ kind: 'arrayUnion', items }),
  arrayRemove: (...items: unknown[]) => new FieldValueSentinel({ kind: 'arrayRemove', items }),
};

const isPlainObject = (v: unknown): v is Record<string, unknown> =>
  typeof v === 'object' && v !== null && !Array.isArray(v) && Object.getPrototypeOf(v) === Object.prototype;

/** A timestamp in any form this code meets: ours, Firestore's, or the stored JSON shape. */
export function asTimestamp(v: unknown): Timestamp | undefined {
  if (v instanceof Timestamp) return v;
  if (v instanceof Date) return Timestamp.fromDate(v);
  if (typeof v !== 'object' || v === null) return undefined;
  const o = v as Record<string, unknown>;
  // firebase-admin's Timestamp exposes seconds/nanoseconds getters and toDate().
  if (typeof o.toDate === 'function' && typeof o.seconds === 'number' && typeof o.nanoseconds === 'number') {
    return new Timestamp(o.seconds, o.nanoseconds);
  }
  const keys = Object.keys(o);
  if (keys.length === 2 && typeof o._seconds === 'number' && typeof o._nanoseconds === 'number') {
    return new Timestamp(o._seconds, o._nanoseconds);
  }
  return undefined;
}

/**
 * Converts a value about to be written into its stored form. Sentinels must already be resolved.
 * Undefined fields are dropped, as Firestore does with ignoreUndefinedProperties.
 */
export function toStored(value: unknown, path = ''): unknown {
  if (value === undefined) return undefined;
  if (value === null || typeof value === 'string' || typeof value === 'boolean') return value;
  if (typeof value === 'number') {
    if (!Number.isFinite(value)) throw new Error(`Field ${path || '(root)'} holds a non-finite number`);
    return value;
  }
  if (value instanceof FieldValueSentinel) {
    throw new Error(`Field ${path || '(root)'}: ${value.op.kind} is only valid at the top level of a write`);
  }
  const ts = asTimestamp(value);
  if (ts) return ts.toJSON();
  if (Array.isArray(value)) {
    return value.map((item, i) => {
      const stored = toStored(item, `${path}[${i}]`);
      return stored === undefined ? null : stored;
    });
  }
  if (isPlainObject(value)) {
    const out: Record<string, unknown> = {};
    for (const [k, v] of Object.entries(value)) {
      const stored = toStored(v, path ? `${path}.${k}` : k);
      if (stored !== undefined) out[k] = stored;
    }
    return out;
  }
  throw new Error(`Field ${path || '(root)'} holds an unsupported type (${(value as object).constructor?.name ?? typeof value})`);
}

/** Stored form -> what callers get from data(): timestamps become Timestamp instances. */
export function fromStored(value: unknown): unknown {
  const ts = asTimestamp(value);
  if (ts) return ts;
  if (Array.isArray(value)) return value.map(fromStored);
  if (isPlainObject(value)) {
    const out: Record<string, unknown> = {};
    for (const [k, v] of Object.entries(value)) out[k] = fromStored(v);
    return out;
  }
  return value;
}

/** Stored form -> query form: timestamps become epoch milliseconds, everything else is unchanged. */
export function toQueryable(value: unknown): unknown {
  const ts = asTimestamp(value);
  if (ts) return ts.toMillis();
  if (Array.isArray(value)) return value.map(toQueryable);
  if (isPlainObject(value)) {
    const out: Record<string, unknown> = {};
    for (const [k, v] of Object.entries(value)) out[k] = toQueryable(v);
    return out;
  }
  return value;
}

function deepEqual(a: unknown, b: unknown): boolean {
  return JSON.stringify(canonical(a)) === JSON.stringify(canonical(b));
}

/** Key-order-independent form, for comparing documents. */
export function canonical(value: unknown): unknown {
  if (Array.isArray(value)) return value.map(canonical);
  if (isPlainObject(value)) {
    return Object.fromEntries(
      Object.keys(value)
        .sort()
        .map((k) => [k, canonical(value[k])]),
    );
  }
  return value;
}

function resolveSentinel(current: unknown, sentinel: FieldValueSentinel, now: Timestamp): unknown {
  const op = sentinel.op;
  switch (op.kind) {
    case 'serverTimestamp':
      return now.toJSON();
    case 'delete':
      return undefined;
    case 'increment':
      return (typeof current === 'number' ? current : 0) + op.by;
    case 'arrayUnion': {
      const base = Array.isArray(current) ? [...current] : [];
      for (const item of op.items.map((i) => toStored(i))) {
        if (!base.some((existing) => deepEqual(existing, item))) base.push(item);
      }
      return base;
    }
    case 'arrayRemove': {
      const remove = op.items.map((i) => toStored(i));
      return Array.isArray(current) ? current.filter((e) => !remove.some((r) => deepEqual(e, r))) : [];
    }
  }
}

function containsSentinel(value: unknown): boolean {
  if (value instanceof FieldValueSentinel) return true;
  if (Array.isArray(value)) return false;
  return isPlainObject(value) && Object.values(value).some(containsSentinel);
}

function setPath(target: Record<string, unknown>, segments: string[], value: unknown): void {
  let node = target;
  for (const seg of segments.slice(0, -1)) {
    if (!isPlainObject(node[seg])) node[seg] = {};
    node = node[seg] as Record<string, unknown>;
  }
  const last = segments[segments.length - 1];
  if (value === undefined) delete node[last];
  else node[last] = value;
}

function getPath(source: Record<string, unknown>, segments: string[]): unknown {
  let node: unknown = source;
  for (const seg of segments) {
    if (!isPlainObject(node)) return undefined;
    node = node[seg];
  }
  return node;
}

/**
 * Applies a Firestore-style write to a stored document and returns the new stored document.
 *
 *   update: keys are field paths ('a.b' sets a nested field); missing parents are created.
 *   merge:  set(..., {merge: true}); nested objects merge recursively instead of replacing.
 *   set:    replaces the document.
 */
export function applyWrite(
  existing: Record<string, unknown> | undefined,
  data: Record<string, unknown>,
  mode: 'set' | 'merge' | 'update',
  now: Timestamp,
): Record<string, unknown> {
  const result: Record<string, unknown> = mode === 'set' ? {} : structuredClone(existing ?? {});

  const merge = mode === 'merge';
  const writeField = (segments: string[], value: unknown, path: string) => {
    if (value instanceof FieldValueSentinel) {
      setPath(result, segments, resolveSentinel(getPath(result, segments), value, now));
      return;
    }
    // Walk into an object when merging, or when it holds sentinels that need the current values.
    if (isPlainObject(value) && !asTimestamp(value) && (merge || containsSentinel(value))) {
      if (!merge || !isPlainObject(getPath(result, segments))) setPath(result, segments, {});
      for (const [k, v] of Object.entries(value)) writeField([...segments, k], v, `${path}.${k}`);
      return;
    }
    const stored = toStored(value, path);
    if (stored !== undefined) setPath(result, segments, stored);
  };

  for (const [key, value] of Object.entries(data)) {
    const segments = mode === 'update' ? key.split('.') : [key];
    writeField(segments, value, key);
  }
  return result;
}
