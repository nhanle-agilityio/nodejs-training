export const toStripeCents = (price: number): number => {
  return Math.round(price * 100);
};

export const fromStripeCents = (amountCents: number): number => {
  return amountCents / 100;
};
