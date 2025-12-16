# Testing in Node.js - Simple Guide

## What is Testing?

Testing is checking if your code works correctly. You write tests to:

- Make sure your functions return the right values
- Catch bugs before they cause problems
- Feel confident when making changes

## How to Run Tests

```bash
# Run a single test file
node --test tests/basic-tutorial.test.js

# Run all tests in the tests folder
node --test tests/

# Run with more details
node --test --watch tests/
```

## Test Files in This Folder

### 1. `basic-tutorial.test.js` ⭐ START HERE

Complete tutorial covering:

- Testing simple functions
- Testing objects and arrays
- Testing async functions
- All common assert methods

### 2. `greetings-simple.test.js`

Simple real example testing the greetings module.

## Basic Test Structure

```javascript
const { test, describe } = require("node:test");
const assert = require("node:assert");

// Group related tests
describe("My Feature", () => {
  // Individual test
  test("does something correctly", () => {
    // 1. ARRANGE: Set up test data
    const input = 5;

    // 2. ACT: Run the function
    const result = myFunction(input);

    // 3. ASSERT: Check the result
    assert.strictEqual(result, 10);
  });
});
```

## Most Common Assert Methods

```javascript
// Check if two values are equal
assert.strictEqual(actual, expected);

// Check if two objects/arrays are equal
assert.deepStrictEqual(actualArray, expectedArray);

// Check if value is truthy (true, not null, not undefined)
assert.ok(value);

// Check if values are NOT equal
assert.notStrictEqual(actual, unexpected);

// Check if function throws an error
assert.throws(() => myFunction());
```

## Tips for Beginners

1. **Start Simple**: Test one thing at a time
2. **Use Clear Names**: Test name should say what it checks
3. **Follow AAA Pattern**:
   - **Arrange**: Set up test data
   - **Act**: Call the function
   - **Assert**: Check the result
4. **Test the Happy Path First**: Test normal usage before edge cases

## Example: Testing a Calculator

```javascript
const { test } = require("node:test");
const assert = require("node:assert");

function add(a, b) {
  return a + b;
}

test("add two positive numbers", () => {
  const result = add(2, 3);
  assert.strictEqual(result, 5); // ✅ Pass
});

test("add negative numbers", () => {
  const result = add(-2, -3);
  assert.strictEqual(result, -5); // ✅ Pass
});
```

## Next Steps

1. Run the tutorial test: `node --test tests/basic-tutorial.test.js`
2. Read through the code and understand each test
3. Try modifying the tests to see what happens
4. Write tests for your own functions!

---

**Remember**: Testing is about confidence. Good tests help you sleep better at night! 😊
