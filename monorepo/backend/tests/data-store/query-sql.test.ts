import { describe, it, expect } from 'vitest';
import { buildQuery, fieldRef } from '../../src/data-store/query-sql';

const base = { collection: 'pets', filters: [], orders: [] };
const params = (q: ReturnType<typeof buildQuery>) => Object.fromEntries(q.parameters.map((p) => [p.name, p.value]));

describe('fieldRef', () => {
  it('brackets every segment so field names cannot be read as SQL', () => {
    expect(fieldRef('location.city')).toBe('c.o["location"]["city"]');
    expect(fieldRef('value')).toBe('c.o["value"]');
  });

  it('rejects empty segments', () => {
    expect(() => fieldRef('a..b')).toThrow();
  });
});

describe('buildQuery', () => {
  it('scopes every query to its collection and defaults to document-id order', () => {
    const q = buildQuery(base, 'docs');
    expect(q.query).toBe('SELECT c.id, c.d FROM c WHERE c.c = @c ORDER BY c.id ASC');
    expect(params(q)).toEqual({ '@c': 'pets' });
  });

  it('passes values as parameters and converts dates to the queryable number', () => {
    const q = buildQuery(
      { ...base, filters: [{ field: 'ownerId', op: '==', value: 'u1' }, { field: 'createdAt', op: '>=', value: new Date(5000) }] },
      'docs',
    );
    expect(q.query).toContain('c.o["ownerId"] = @p1');
    expect(q.query).toContain('c.o["createdAt"] >= @p2');
    expect(params(q)).toMatchObject({ '@p1': 'u1', '@p2': 5000 });
  });

  it('orders by the inequality field when no orderBy is given, as Firestore does', () => {
    const q = buildQuery({ ...base, filters: [{ field: 'date', op: '<', value: '2026-01-01' }] }, 'docs');
    expect(q.query).toMatch(/ORDER BY c\.o\["date"\] ASC$/);
  });

  it('skips documents without the orderBy field', () => {
    const q = buildQuery({ ...base, orders: [{ field: 'createdAt', direction: 'desc' }] }, 'docs');
    expect(q.query).toContain('IS_DEFINED(c.o["createdAt"])');
    expect(q.query).toMatch(/ORDER BY c\.o\["createdAt"\] DESC$/);
  });

  it('pages with OFFSET and LIMIT together, as Cosmos requires', () => {
    expect(params(buildQuery({ ...base, offset: 20, limit: 10 }, 'docs'))).toMatchObject({ '@p1': 20, '@p2': 10 });
    const onlyLimit = buildQuery({ ...base, limit: 5 }, 'docs');
    expect(onlyLimit.query).toMatch(/OFFSET @p1 LIMIT @p2$/);
    expect(params(onlyLimit)).toMatchObject({ '@p1': 0, '@p2': 5 });
  });

  it('maps array and membership operators', () => {
    const q = buildQuery(
      {
        ...base,
        filters: [
          { field: 'participants', op: 'array-contains', value: 'u1' },
          { field: 'status', op: 'in', value: ['a', 'b'] },
          { field: 'tags', op: 'array-contains-any', value: ['x'] },
        ],
      },
      'docs',
    );
    expect(q.query).toContain('ARRAY_CONTAINS(c.o["participants"], @p1)');
    expect(q.query).toContain('ARRAY_CONTAINS(@p2, c.o["status"])');
    expect(q.query).toContain('EXISTS(SELECT VALUE x FROM x IN c.o["tags"] WHERE ARRAY_CONTAINS(@p3, x))');
  });

  it('matches null with IS_NULL and requires the field for !=', () => {
    expect(buildQuery({ ...base, filters: [{ field: 'deletedAt', op: '==', value: null }] }, 'docs').query).toContain(
      'IS_NULL(c.o["deletedAt"])',
    );
    const ne = buildQuery({ ...base, filters: [{ field: 'status', op: '!=', value: 'x' }] }, 'docs');
    expect(ne.query).toContain('IS_DEFINED(c.o["status"]) AND c.o["status"] != @p1');
  });

  it('counts without ordering or paging', () => {
    const q = buildQuery({ ...base, filters: [{ field: 'ownerId', op: '==', value: 'u1' }] }, 'count');
    expect(q.query).toBe('SELECT VALUE COUNT(1) FROM c WHERE c.c = @c AND c.o["ownerId"] = @p1');
  });

  it('rejects in without an array', () => {
    expect(() => buildQuery({ ...base, filters: [{ field: 'a', op: 'in', value: 'x' }] }, 'docs')).toThrow(/needs an array/);
  });
});
