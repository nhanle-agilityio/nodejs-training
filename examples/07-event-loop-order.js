/**
 * This example demonstrates the Event Loop phases and execution order:
 * - Synchronous code
 * - process.nextTick()
 * - Promise (Microtask)
 * - setTimeout (Timer)
 * - setImmediate (Check phase)
 */

const fs = require("fs");

console.log("1. Start (Synchronous)");

// Timer Phase
setTimeout(() => {
  console.log("5. setTimeout (Macrotask)");
}, 0);

// Check Phase
setImmediate(() => {
  console.log("6. setImmediate (Macrotask)");
});

// Microtask Queue (Promises)
Promise.resolve().then(() => {
  console.log("4. Promise (Microtask)");
});

// process.nextTick Queue (Highest Priority Async)
process.nextTick(() => {
  console.log("3. process.nextTick (High Priority)");
});

console.log("2. End (Synchronous)");

/**
 * EXPECTED OUTPUT:
 * 1. Start
 * 2. End
 * 3. process.nextTick
 * 4. Promise
 * 5. setTimeout  <-- Order between these two can vary if not in I/O cycle
 * 6. setImmediate
 */
