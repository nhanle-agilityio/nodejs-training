/**
 * This example demonstrates the difference between blocking and non-blocking I/O.
 *
 * 1. Blocking: Reads a file synchronously, freezing the script.
 * 2. Non-blocking: Reads a file asynchronously, allowing other code to run.
 */

const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "dummy-file.txt");

// Create a dummy file
fs.writeFileSync(filePath, "Hello from Node.js! ".repeat(100000));

console.log("--- BLOCKING EXAMPLE ---");
const startSync = Date.now();
// This BLOCKS the execution. Nothing else can happen until reading is done.
const dataSync = fs.readFileSync(filePath, "utf8");
console.log(`Sync Read Time: ${Date.now() - startSync}ms`);
console.log("This log appears AFTER the file is read.\n");

console.log("--- NON-BLOCKING EXAMPLE ---");
const startAsync = Date.now();
// This does NOT block. The callback runs later.
fs.readFile(filePath, "utf8", (err, data) => {
  if (err) throw err;
  console.log(`Async Read Time: ${Date.now() - startAsync}ms`);
  console.log("File read complete (Callback executed).");

  // Clean up test file
  fs.unlinkSync(filePath);
});

console.log("This log appears BEFORE the file is finished reading!");
console.log("The event loop continues running...\n");
