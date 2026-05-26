import type { PaginatedResponse, PaginationQuery } from '../types/common.js';

export function paginate<T>(
  data: T[],
  total: number,
  query: PaginationQuery
): PaginatedResponse<T> {
  const totalPages = Math.ceil(total / query.limit);
  return {
    data,
    pagination: {
      page: query.page,
      limit: query.limit,
      total,
      totalPages,
      hasNext: query.page < totalPages,
    },
  };
}

export function getOffset(query: PaginationQuery): number {
  return (query.page - 1) * query.limit;
}
