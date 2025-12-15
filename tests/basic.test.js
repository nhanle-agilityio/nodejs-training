/**
 * BASIC TESTING
 * 
 * You can run the test by running the command:
 * node --test tests/basic.test.js
 */

const { test, describe } = require('node:test');
const assert = require('node:assert');

// ========================================
// PART 1: Testing Simple Functions
// ========================================

function add(a, b) {
  return a + b;
}

function multiply(a, b) {
  return a * b;
}

describe('Basic Math Functions', () => {
  
  test('add function adds two numbers', () => {
    // Arrange: Set up test data
    const num1 = 5;
    const num2 = 3;
    
    // Act: Call the function
    const result = add(num1, num2);
    
    // Assert: Check if result is correct
    assert.strictEqual(result, 8);
  });
  
  test('multiply function multiplies two numbers', () => {
    const result = multiply(4, 3);
    assert.strictEqual(result, 12);
  });
  
  test('add works with negative numbers', () => {
    const result = add(-5, 3);
    assert.strictEqual(result, -2);
  });
});

// ========================================
// PART 2: Testing Objects and Arrays
// ========================================

describe('Testing Objects and Arrays', () => {
  
  test('comparing arrays with deepStrictEqual', () => {
    const myArray = [1, 2, 3];
    const expectedArray = [1, 2, 3];
    
    // Use deepStrictEqual for objects and arrays
    assert.deepStrictEqual(myArray, expectedArray);
  });
  
  test('comparing objects with deepStrictEqual', () => {
    const user = {
      name: 'Alice',
      age: 25
    };
    
    assert.deepStrictEqual(user, {
      name: 'Alice',
      age: 25
    });
  });
  
  test('checking if array contains an item', () => {
    const fruits = ['apple', 'banana', 'orange'];
    
    assert.ok(fruits.includes('banana'));
  });
});

// ========================================
// PART 3: Testing with Boolean Checks
// ========================================

describe('Boolean and Truthy Tests', () => {
  
  test('assert.ok checks if value is truthy', () => {
    assert.ok(true);
    assert.ok(1);
    assert.ok('hello');
    assert.ok([1, 2, 3]);
  });
  
  test('checking if a value exists', () => {
    const name = 'John';
    assert.ok(name);
  });
  
  test('checking types with typeof', () => {
    const age = 25;
    assert.strictEqual(typeof age, 'number');
    
    const name = 'Alice';
    assert.strictEqual(typeof name, 'string');
  });
});

// ========================================
// PART 4: Testing Asynchronous Code
// ========================================

// Simulated async function
const fetchUser = async (id) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ id: id, name: 'Alice' });
    }, 100);
  });
};

describe('Async Functions', () => {
  
  test('testing async function with await', async () => {
    // Use async/await for testing promises
    const user = await fetchUser(1);
    
    assert.strictEqual(user.id, 1);
    assert.strictEqual(user.name, 'Alice');
  });
  
  test('testing multiple async operations', async () => {
    const user1 = await fetchUser(1);
    const user2 = await fetchUser(2);
    
    assert.strictEqual(user1.id, 1);
    assert.strictEqual(user2.id, 2);
  });
});

// ========================================
// PART 5: Common Assert Methods
// ========================================

describe('Common Assert Methods', () => {
  
  test('strictEqual - checks if two values are exactly equal', () => {
    assert.strictEqual(5, 5);
    assert.strictEqual('hello', 'hello');
  });
  
  test('notStrictEqual - checks if two values are different', () => {
    assert.notStrictEqual(5, 6);
    assert.notStrictEqual('hello', 'world');
  });
  
  test('deepStrictEqual - checks if objects/arrays are equal', () => {
    assert.deepStrictEqual([1, 2], [1, 2]);
    assert.deepStrictEqual({ a: 1 }, { a: 1 });
  });
  
  test('ok - checks if value is truthy', () => {
    assert.ok(true);
    assert.ok(1);
    assert.ok('text');
  });
  
  test('throws - checks if function throws an error', () => {
    function throwError() {
      throw new Error('Something went wrong');
    }
    
    assert.throws(() => throwError());
  });
});
