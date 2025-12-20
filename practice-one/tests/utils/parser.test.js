const { describe, test } = require('node:test');
const assert = require('node:assert');
const { parseArguments } = require('../../src/utils/parser');

describe('parseArguments function', () => {
  test('should return null command for empty args', () => {
    const argv = ['node', 'ticket-cli'];
    const result = parseArguments(argv);

    assert.strictEqual(result.command, null);
    assert.deepStrictEqual(result.args, []);
  });

  test('should parse command without args', () => {
    const argv = ['node', 'ticket-cli', 'help'];
    const result = parseArguments(argv);

    assert.strictEqual(result.command, 'help');
    assert.deepStrictEqual(result.args, []);
  });

  test('should parse command with single argument', () => {
    const argv = ['node', 'ticket-cli', 'view', '1'];
    const result = parseArguments(argv);

    assert.strictEqual(result.command, 'view');
    assert.deepStrictEqual(result.args, ['1']);
  });

  test('should parse command with multiple arguments', () => {
    const argv = ['node', 'ticket-cli', 'create', 'Tech Conference', '100'];
    const result = parseArguments(argv);

    assert.strictEqual(result.command, 'create');
    assert.deepStrictEqual(result.args, ['Tech Conference', '100']);
  });

  test('should parse command with quoted strings as separate args', () => {
    const argv = ['node', 'ticket-cli', 'book', '1', 'John Doe', 'john@gmail.com'];
    const result = parseArguments(argv);

    assert.strictEqual(result.command, 'book');
    assert.deepStrictEqual(result.args, ['1', 'John Doe', 'john@gmail.com']);
  });
});
