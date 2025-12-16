/**
 * This example demonstrates basic error handling in Node.js.
 *
 * Proper error handling helps diagnose and fix issues.
 */

const fs = require("fs");

console.log("--- Error Handling Demo ---\n");

// 1. Try-Catch for synchronous code
console.log("1. Synchronous Error Handling:");
try {
  const data = fs.readFileSync("non-existent-file.txt", "utf8");
  console.log(data);
} catch (error) {
  console.log("   ❌ Caught error:", error.message);
}

// 2. Error-first callback for asynchronous code
console.log("\n2. Asynchronous Error Handling:");
fs.readFile("another-missing-file.txt", "utf8", (err, data) => {
  if (err) {
    console.log("   ❌ Caught error:", err.message);
    return;
  }
  console.log(data);
});

// 3. Promise-based error handling
console.log("\n3. Promise-based Error Handling:");
const fsPromises = require("fs").promises;

fsPromises
  .readFile("yet-another-missing-file.txt", "utf8")
  .then((data) => {
    console.log(data);
  })
  .catch((error) => {
    console.log("   ❌ Caught error:", error.message);
  });

// 4. Async/Await error handling
async function readFileAsync() {
  console.log("\n4. Async/Await Error Handling:");
  try {
    const data = await fsPromises.readFile("missing-async-file.txt", "utf8");
    console.log(data);
  } catch (error) {
    console.log("   ❌ Caught error:", error.message);
  }
}

readFileAsync();

// 5. Uncaught exception handler (last resort)
process.on("uncaughtException", (error) => {
  console.error("\n⚠️  UNCAUGHT EXCEPTION:", error.message);
  console.error(
    "This is a last-resort handler. You should handle errors properly!",
  );
});
