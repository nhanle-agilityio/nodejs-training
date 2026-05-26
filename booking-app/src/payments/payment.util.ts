export const toStripeCents = (price: number | string): number => {
  const normalized = typeof price === 'string' ? parseFloat(price) : price;
  return Math.round(normalized * 100);
};

export const fromStripeCents = (amountCents: number): number => {
  return amountCents / 100;
};
