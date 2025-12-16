/**
 * Exercise 5: Async/Await and Promises
 *
 * Learn about:
 * - Callbacks
 * - Promises
 * - Async/await
 * - Error handling
 * - Working with asynchronous operations
 */

const fs = require("fs").promises;
const path = require("path");

console.log("⚡ Exercise 5: Async/Await and Promises\n");

// 1. Callback-based approach (older style)
console.log("--- Callback-based (fs.readFile) ---");
const fsCallback = require("fs");
fsCallback.readFile("package.json", "utf8", (err, data) => {
  if (err) {
    console.error("Error:", err.message);
    return;
  }
  console.log("✅ File read successfully using callback");
  console.log("File size:", data.length, "characters\n");
});

// 2. Promise-based approach
console.log("--- Promise-based (fs.promises) ---");
fs.readFile("package.json", "utf8")
  .then((data) => {
    console.log("✅ File read successfully using Promise");
    console.log("File size:", data.length, "characters\n");
    return data.length;
  })
  .then((size) => {
    console.log("Promise chain: File size is", size, "characters\n");
  })
  .catch((err) => {
    console.error("Error:", err.message);
  });

// 3. Async/await approach (modern, recommended)
async function readFileAsync() {
  try {
    const data = await fs.readFile("package.json", "utf8");
    console.log("--- Async/Await ---");
    console.log("✅ File read successfully using async/await");
    console.log("File size:", data.length, "characters\n");
    return data;
  } catch (err) {
    console.error("Error:", err.message);
    throw err;
  }
}

// 4. Creating custom promises
function delay(ms) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(`Resolved after ${ms}ms`);
    }, ms);
  });
}

async function demonstratePromises() {
  console.log("--- Custom Promises ---");
  console.log("Starting delay...");
  const result = await delay(1000);
  console.log("✅", result);
  console.log("");
}

// 5. Promise.all - running multiple async operations in parallel
async function demonstratePromiseAll() {
  console.log("--- Promise.all (Parallel Execution) ---");
  const startTime = Date.now();

  try {
    const [packageJson, readme] = await Promise.all([
      fs.readFile("package.json", "utf8"),
      fs.readFile("README.md", "utf8").catch(() => "README not found"),
    ]);

    const endTime = Date.now();
    console.log("✅ Both files read in parallel");
    console.log("package.json size:", packageJson.length, "characters");
    console.log("README.md size:", readme.length, "characters");
    console.log("Time taken:", endTime - startTime, "ms\n");
  } catch (err) {
    console.error("Error:", err.message);
  }
}

// 6. Error handling with async/await
async function demonstrateErrorHandling() {
  console.log("--- Error Handling ---");
  try {
    await fs.readFile("nonexistent-file.txt", "utf8");
  } catch (err) {
    console.log("✅ Error caught and handled:", err.message);
    console.log("");
  }
}

// 7. Sequential vs Parallel execution
async function sequentialExecution() {
  console.log("--- Sequential Execution ---");
  const startTime = Date.now();

  const file1 = await delay(500);
  const file2 = await delay(500);

  const endTime = Date.now();
  console.log("Sequential time:", endTime - startTime, "ms\n");
}

async function parallelExecution() {
  console.log("--- Parallel Execution ---");
  const startTime = Date.now();

  await Promise.all([delay(500), delay(500)]);

  const endTime = Date.now();
  console.log("Parallel time:", endTime - startTime, "ms\n");
}

// Run all demonstrations
(async () => {
  await readFileAsync();
  await demonstratePromises();
  await demonstratePromiseAll();
  await demonstrateErrorHandling();
  await sequentialExecution();
  await parallelExecution();

  console.log("✅ Exercise 5 completed!");
})();

