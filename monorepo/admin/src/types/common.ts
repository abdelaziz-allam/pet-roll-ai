export type AdminRole = 'super_admin' | 'admin' | 'moderator' | 'support' | 'viewer';

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
  };
}

export interface ApiError {
  message: string;
  statusCode: number;
}
