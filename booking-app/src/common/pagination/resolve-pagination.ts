import { DEFAULT_LIMIT, DEFAULT_PAGE } from './pagination.constants';

export interface PaginationParams {
  page?: number;
  limit?: number;
}

export interface ResolvedPagination {
  page: number;
  limit: number;
  skip: number;
  take: number;
}

export const resolvePagination = (
  params: PaginationParams,
): ResolvedPagination => {
  const page = params.page ?? DEFAULT_PAGE;
  const limit = params.limit ?? DEFAULT_LIMIT;
  return {
    page,
    limit,
    skip: (page - 1) * limit,
    take: limit,
  };
};
