/**
 * Tests for the main application using Node.js built-in test runner
 */

const { test, describe } = require('node:test');
const assert = require('node:assert');
const { greet } = require('../src/index');

describe('greet function', () => {
  test('should return a greeting message', () => {
    const result = greet('Node.js');
    assert.strictEqual(result, 'Hello, Node.js!');
  });

  test('should handle empty string', () => {
    const result = greet('');
    assert.strictEqual(result, 'Hello, !');
  });
});
