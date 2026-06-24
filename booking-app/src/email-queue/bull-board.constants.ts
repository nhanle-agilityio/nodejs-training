export const BULL_BOARD_ROUTE = 'admin/queues';

export const BULL_BOARD_PREFIX_EXCLUSIONS: string[] = [
  BULL_BOARD_ROUTE,
  `${BULL_BOARD_ROUTE}/(.*)`,
];
