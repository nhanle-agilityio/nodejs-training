import { SORTABLE_FIELDS } from '../constants/index.js';

export const buildOrderBy = (sortParam, allowedFields = SORTABLE_FIELDS, defaultSort = { date: 'DESC' }) => {
  if (!sortParam) return defaultSort;

  const parts = sortParam.split(',');
  const orders = {};

  for (const part of parts) {
    const [field, direction] = part.split(':');
    const trimmedField = field?.trim();

    if (!trimmedField || !allowedFields.includes(trimmedField)) {
      continue;
    }

    const dir = direction?.trim()?.toLowerCase() === 'asc' ? 'ASC' : 'DESC';
    orders[trimmedField] = dir;
  }

  return Object.keys(orders).length === 0 ? defaultSort : orders;
};
