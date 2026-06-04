export interface PaginatedResult<T> {
  items: T[];
  total: number;
  page: number;
  limit: number;
}

export const mapPaginatedItems = <T, U>(
  result: PaginatedResult<T>,
  mapItem: (item: T) => U,
): PaginatedResult<U> => ({
  items: result.items.map(mapItem),
  total: result.total,
  page: result.page,
  limit: result.limit,
});
