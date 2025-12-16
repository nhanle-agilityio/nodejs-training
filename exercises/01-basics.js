/**
 * Exercise 1: Basic Node.js Concepts
 *
 * Learn about:
 * - Console output
 * - Variables and data types
 * - Functions
 * - Process object
 * - Global vs local scope
 */

console.log("📚 Exercise 1: Basic Node.js Concepts\n");

// 1. Console methods
console.log("Hello from console.log()");
console.error("This is an error message");
console.warn("This is a warning");
console.info("This is an info message");

// 2. Process information
console.log("\n--- Process Information ---");
console.log("Node.js version:", process.version);
console.log("Platform:", process.platform);
console.log("Current directory:", process.cwd());
console.log("Command line arguments:", process.argv);

// 3. Environment variables
console.log("\n--- Environment Variables ---");
console.log("NODE_ENV:", process.env.NODE_ENV || "not set");
console.log("USER:", process.env.USER || process.env.USERNAME || "not set");

// 4. Working with timers
console.log("\n--- Timers ---");
console.log("Starting timer...");

setTimeout(() => {
  console.log("This message appears after 1 second");
}, 1000);

setInterval(() => {
  console.log("This message appears every 2 seconds (press Ctrl+C to stop)");
}, 2000);

// Note: In a real application, you'd want to clear intervals
// For this exercise, we'll let it run to demonstrate the concept

