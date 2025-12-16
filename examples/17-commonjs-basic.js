/**
 * This example demonstrates the most basic CommonJS module usage.
 *
 * CommonJS is the traditional Node.js module system using require().
 */

// 1. Import built-in modules
const fs = require("fs");
const path = require("path");

// 2. Import our custom module
const greetings = require("./modules/greetings");

console.log("--- CommonJS Module Demo ---");

// Use the imported module
console.log(greetings.sayHello("Alice"));
console.log(greetings.sayGoodbye("Bob"));

// Access module metadata
console.log("\nModule info:");
console.log("Current file:", __filename);
console.log("Current directory:", __dirname);
console.log("Module loaded from:", require.resolve("./modules/greetings"));
