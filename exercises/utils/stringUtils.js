/**
 * String Utilities Module
 * Demonstrates exporting multiple functions
 */

function toUpperCase(str) {
  return str.toUpperCase();
}

function toLowerCase(str) {
  return str.toLowerCase();
}

function reverse(str) {
  return str.split("").reverse().join("");
}

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

module.exports = {
  toUpperCase,
  toLowerCase,
  reverse,
  capitalize,
};

