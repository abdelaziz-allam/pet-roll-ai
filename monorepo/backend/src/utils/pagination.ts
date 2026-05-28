import type { PaginatedResponse, PaginationQuery } from '../types/common.js';

export function paginate<T>(
  data: T[],
  total: number,
  query: PaginationQuery
): PaginatedResponse<T> {
  const page = query.page || 1;
  const limit = query.limit || 20;
  const totalPages = Math.ceil(total / limit);
  return {
    data,
    total,
    page,
    limit,
    totalPages,
  };
}

export function getOffset(query: PaginationQuery): number {
  return ((query.page || 1) - 1) * (query.limit || 20);
}
