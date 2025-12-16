/**
 * This is a simple ES Module that exports math functions.
 */

export function add(a, b) {
  return a + b;
}

export function multiply(a, b) {
  return a * b;
}

// Export a constant
export const PI = 3.14159;

// Default export (you can have only one per module)
export default function subtract(a, b) {
  return a - b;
}
