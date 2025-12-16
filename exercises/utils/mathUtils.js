/**
 * Math Utilities Module
 * Demonstrates exporting multiple functions
 */

function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  if (b === 0) {
    throw new Error("Division by zero is not allowed");
  }
  return a / b;
}

function power(base, exponent) {
  return Math.pow(base, exponent);
}

// Export multiple functions as an object
module.exports = {
  add,
  subtract,
  multiply,
  divide,
  power,
};

