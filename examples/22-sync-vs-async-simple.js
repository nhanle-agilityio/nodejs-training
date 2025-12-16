/**
 * This example shows the difference between synchronous and asynchronous operations.
 *
 * This helps diagnose blocking issues in your code.
 */

const fs = require("fs");
const path = require("path");

console.log("--- Sync vs Async Demo ---\n");

// Create a test file
const testFile = path.join(__dirname, "test-sync.txt");
fs.writeFileSync(testFile, "Hello from sync file!");

// 1. SYNCHRONOUS (Blocking)
console.log("1. Starting SYNCHRONOUS read...");
const startSync = Date.now();

const dataSync = fs.readFileSync(testFile, "utf8");
console.log(`   Read: "${dataSync}"`);

const endSync = Date.now();
console.log(`   Completed in ${endSync - startSync}ms`);
console.log("   (This blocks the entire program until done)\n");

// 2. ASYNCHRONOUS (Non-blocking)
console.log("2. Starting ASYNCHRONOUS read...");
const startAsync = Date.now();

fs.readFile(testFile, "utf8", (err, data) => {
  if (err) throw err;
  const endAsync = Date.now();
  console.log(`   Read: "${data}"`);
  console.log(`   Completed in ${endAsync - startAsync}ms`);
  console.log("   (This doesn't block - other code can run meanwhile)");

  // Clean up
  fs.unlinkSync(testFile);
});

console.log("3. This line runs IMMEDIATELY (before async read finishes)");
console.log("   See? Async doesn't block!\n");
