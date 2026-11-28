import { toQueryable, toStored } from './values';

export type WhereOp = '==' | '!=' | '<' | '<=' | '>' | '>=' | 'array-contains' | 'array-contains-any' | 'in' | 'not-in';

export interface QuerySpec {
  collection: string;
  filters: Array<{ field: string; op: WhereOp; value: unknown }>;
  orders: Array<{ field: string; direction: 'asc' | 'desc' }>;
  offset?: number;
  limit?: number;
}

export interface SqlQuery {
  query: string;
  parameters: Array<{ name: string; value: any }>;
}

const INEQUALITIES = new Set<WhereOp>(['<', '<=', '>', '>=', '!=', 'not-in']);
// Cosmos takes OFFSET only together with LIMIT.
const NO_LIMIT = 1_000_000;

/** c.o["a"]["b"] for field path 'a.b'. Brackets avoid clashes with SQL keywords in field names. */
export function fieldRef(field: string): string {
  if (!field || field.split('.').some((s) => s === '')) throw new Error(`Invalid field path "${field}"`);
  return 'c.o' + field.split('.').map((s) => `[${JSON.stringify(s)}]`).join('');
}

const queryValue = (v: unknown) => toQueryable(toStored(v));

/**
 * Builds the Cosmos SQL for a Firestore-style query. Mirrors Firestore where callers can tell:
 *
 * - orderBy and inequality filters skip documents that lack the field.
 * - without orderBy, results come in document-id order, or by the inequality field if there is one.
 * - comparisons only match values of the same type (Cosmos returns undefined across types).
 */
export function buildQuery(spec: QuerySpec, mode: 'docs' | 'count'): SqlQuery {
  const parameters: SqlQuery['parameters'] = [{ name: '@c', value: spec.collection }];
  const where: string[] = ['c.c = @c'];
  const param = (value: unknown) => {
    const name = `@p${parameters.length}`;
    parameters.push({ name, value });
    return name;
  };

  for (const { field, op, value } of spec.filters) {
    const f = fieldRef(field);
    switch (op) {
      case '==':
        where.push(value === null ? `IS_NULL(${f})` : `${f} = ${param(queryValue(value))}`);
        break;
      case '!=':
        where.push(`IS_DEFINED(${f})`, value === null ? `NOT IS_NULL(${f})` : `${f} != ${param(queryValue(value))}`);
        break;
      case '<':
      case '<=':
      case '>':
      case '>=':
        where.push(`${f} ${op} ${param(queryValue(value))}`);
        break;
      case 'array-contains':
        where.push(`ARRAY_CONTAINS(${f}, ${param(queryValue(value))})`);
        break;
      case 'array-contains-any':
        where.push(`EXISTS(SELECT VALUE x FROM x IN ${f} WHERE ARRAY_CONTAINS(${param(queryValue(asList(op, value)))}, x))`);
        break;
      case 'in':
        where.push(`ARRAY_CONTAINS(${param(queryValue(asList(op, value)))}, ${f})`);
        break;
      case 'not-in':
        where.push(`IS_DEFINED(${f})`, `NOT ARRAY_CONTAINS(${param(queryValue(asList(op, value)))}, ${f})`);
        break;
      default:
        throw new Error(`Unsupported where operator "${op as string}"`);
    }
  }

  let orders = spec.orders;
  if (orders.length === 0) {
    const inequality = spec.filters.find((flt) => INEQUALITIES.has(flt.op));
    orders = inequality ? [{ field: inequality.field, direction: 'asc' }] : [];
  }
  for (const o of orders) where.push(`IS_DEFINED(${fieldRef(o.field)})`);

  const whereSql = ` WHERE ${[...new Set(where)].join(' AND ')}`;

  if (mode === 'count') {
    return { query: `SELECT VALUE COUNT(1) FROM c${whereSql}`, parameters };
  }

  const orderSql =
    orders.length > 0
      ? ` ORDER BY ${orders.map((o) => `${fieldRef(o.field)} ${o.direction === 'desc' ? 'DESC' : 'ASC'}`).join(', ')}`
      : ' ORDER BY c.id ASC';

  let pageSql = '';
  if (spec.offset !== undefined || spec.limit !== undefined) {
    pageSql = ` OFFSET ${param(spec.offset ?? 0)} LIMIT ${param(spec.limit ?? NO_LIMIT)}`;
  }

  return { query: `SELECT c.id, c.d FROM c${whereSql}${orderSql}${pageSql}`, parameters };
}

function asList(op: WhereOp, value: unknown): unknown[] {
  if (!Array.isArray(value)) throw new Error(`where(..., '${op}', ...) needs an array`);
  return value;
}
