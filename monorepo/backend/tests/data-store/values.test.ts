import { describe, it, expect } from 'vitest';
import {
  applyWrite,
  asTimestamp,
  canonical,
  FieldValue,
  fromStored,
  Timestamp,
  toQueryable,
  toStored,
} from '../../src/data-store/values';

const NOW = new Timestamp(1_700_000_000, 500_000_000);

describe('Timestamp', () => {
  it('serialises like a Firestore Timestamp, which the app and admin parse', () => {
    expect(JSON.parse(JSON.stringify({ at: Timestamp.fromMillis(1_700_000_000_250) }))).toEqual({
      at: { _seconds: 1_700_000_000, _nanoseconds: 250_000_000 },
    });
  });

  it('round-trips through milliseconds and Date', () => {
    const ts = Timestamp.fromDate(new Date('2026-01-02T03:04:05.678Z'));
    expect(ts.toDate().toISOString()).toBe('2026-01-02T03:04:05.678Z');
    expect(ts.toMillis()).toBe(Date.parse('2026-01-02T03:04:05.678Z'));
  });

  it('recognises firebase-admin timestamps by their seconds/nanoseconds/toDate shape', () => {
    const adminTs = { seconds: 10, nanoseconds: 5, toDate: () => new Date(10_000) };
    expect(asTimestamp(adminTs)).toEqual(new Timestamp(10, 5));
  });

  it('does not mistake an object that merely has a _seconds field for a timestamp', () => {
    expect(asTimestamp({ _seconds: 1, _nanoseconds: 2, label: 'x' })).toBeUndefined();
  });
});

describe('toStored', () => {
  it('turns Dates and timestamps into the stored shape and drops undefined fields', () => {
    expect(toStored({ a: new Date(1000), b: undefined, c: [1, undefined], d: { e: NOW } })).toEqual({
      a: { _seconds: 1, _nanoseconds: 0 },
      c: [1, null],
      d: { e: { _seconds: 1_700_000_000, _nanoseconds: 500_000_000 } },
    });
  });

  it('rejects types Cosmos cannot hold, naming the field', () => {
    class GeoPoint {
      latitude = 1;
    }
    expect(() => toStored({ place: { at: new GeoPoint() } })).toThrow(/place\.at.*GeoPoint/);
    expect(() => toStored({ n: Number.NaN })).toThrow(/n holds a non-finite number/);
  });

  it('rejects a sentinel outside a write', () => {
    expect(() => toStored({ a: FieldValue.serverTimestamp() })).toThrow(/serverTimestamp/);
  });
});

describe('fromStored / toQueryable', () => {
  const stored = { at: { _seconds: 2, _nanoseconds: 1_000_000 }, list: [{ _seconds: 3, _nanoseconds: 0 }], name: 'x' };

  it('gives callers Timestamp instances back', () => {
    const value = fromStored(stored) as any;
    expect(value.at).toBeInstanceOf(Timestamp);
    expect(value.at.toMillis()).toBe(2001);
    expect(value.list[0]).toBeInstanceOf(Timestamp);
  });

  it('makes timestamps comparable numbers for queries and leaves other values alone', () => {
    expect(toQueryable(stored)).toEqual({ at: 2001, list: [3000], name: 'x' });
  });
});

describe('applyWrite', () => {
  const existing = { name: 'Rex', n: 1, tags: ['a'], location: { city: 'Oslo', country: 'NO' } };

  it('set replaces the document', () => {
    expect(applyWrite(existing, { name: 'Max' }, 'set', NOW)).toEqual({ name: 'Max' });
  });

  it('update treats dotted keys as nested paths and keeps the rest', () => {
    expect(applyWrite(existing, { 'location.city': 'Bergen' }, 'update', NOW)).toEqual({
      ...existing,
      location: { city: 'Bergen', country: 'NO' },
    });
  });

  it('update replaces an object value instead of merging into it', () => {
    expect(applyWrite(existing, { location: { city: 'Bergen' } }, 'update', NOW).location).toEqual({ city: 'Bergen' });
  });

  it('merge merges nested objects recursively', () => {
    expect(applyWrite(existing, { location: { zip: '0150' } }, 'merge', NOW).location).toEqual({
      city: 'Oslo',
      country: 'NO',
      zip: '0150',
    });
  });

  it('resolves every FieldValue sentinel against the current document', () => {
    const result = applyWrite(
      existing,
      {
        n: FieldValue.increment(2),
        tags: FieldValue.arrayUnion('a', 'b'),
        name: FieldValue.delete(),
        updatedAt: FieldValue.serverTimestamp(),
      },
      'update',
      NOW,
    );
    expect(result).toEqual({
      n: 3,
      tags: ['a', 'b'],
      location: existing.location,
      updatedAt: { _seconds: 1_700_000_000, _nanoseconds: 500_000_000 },
    });
    expect(applyWrite(result, { tags: FieldValue.arrayRemove('a') }, 'update', NOW).tags).toEqual(['b']);
  });

  it('increments from zero when the field is missing, as Firestore does', () => {
    expect(applyWrite({}, { views: FieldValue.increment(1) }, 'update', NOW)).toEqual({ views: 1 });
  });

  it('resolves sentinels nested inside an object value', () => {
    expect(applyWrite({ stats: { views: 4 } }, { stats: { views: FieldValue.increment(1) } }, 'merge', NOW)).toEqual({
      stats: { views: 5 },
    });
  });

  it('does not modify the document it was given', () => {
    const copy = structuredClone(existing);
    applyWrite(existing, { 'location.city': 'X', tags: FieldValue.arrayUnion('z') }, 'update', NOW);
    expect(existing).toEqual(copy);
  });
});

describe('canonical', () => {
  it('ignores key order', () => {
    expect(JSON.stringify(canonical({ b: 1, a: { d: 2, c: 3 } }))).toBe(JSON.stringify(canonical({ a: { c: 3, d: 2 }, b: 1 })));
  });
});
