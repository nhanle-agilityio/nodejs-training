import { SORTABLE_FIELDS } from '../constants/index.js';

export const buildOrderBy = (sortParam, allowedFields = SORTABLE_FIELDS, defaultSort = 'date DESC') => {
  const defaultSortQuery = `ORDER BY ${defaultSort}`;
  if (!sortParam) return defaultSortQuery;

  const parts = sortParam.split(',');
  const orders = [];

  for (const part of parts) {
    const [field, direction] = part.split(':');

    if (!allowedFields.includes(field?.trim())) continue;

    const dir = direction?.trim()?.toLowerCase() === 'asc' ? 'ASC' : 'DESC';

    orders.push(`${field?.trim()} ${dir}`);
  }

  if (orders.length === 0) return defaultSortQuery;

  return `ORDER BY ${orders.join(', ')}`;
};
