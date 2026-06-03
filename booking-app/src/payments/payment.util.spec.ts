import { fromStripeCents, toStripeCents } from './payment.util';

describe('payment.util', () => {
  describe('toStripeCents', () => {
    it('converts a whole-dollar number to cents', () => {
      expect(toStripeCents(25)).toBe(2500);
    });

    it('converts a decimal dollar amount to cents', () => {
      expect(toStripeCents(25.5)).toBe(2550);
    });

    it('rounds correctly for common prices', () => {
      expect(toStripeCents(9.99)).toBe(999);
      expect(toStripeCents(0.01)).toBe(1);
      expect(toStripeCents(49.99)).toBe(4999);
    });

    it('parses a string dollar amount', () => {
      expect(toStripeCents('9.99')).toBe(999);
      expect(toStripeCents('25.00')).toBe(2500);
    });

    it('handles zero', () => {
      expect(toStripeCents(0)).toBe(0);
      expect(toStripeCents('0')).toBe(0);
    });

    it('uses Math.round so 0.5 rounds up', () => {
      // $0.005 = 0.5 cents → rounds to 1
      expect(toStripeCents(0.005)).toBe(1);
    });
  });

  describe('fromStripeCents', () => {
    it('converts a whole-cent amount back to dollars', () => {
      expect(fromStripeCents(2500)).toBe(25);
      expect(fromStripeCents(999)).toBe(9.99);
    });

    it('handles zero', () => {
      expect(fromStripeCents(0)).toBe(0);
    });
  });
});
