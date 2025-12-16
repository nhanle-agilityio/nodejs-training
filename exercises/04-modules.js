/**
 * Exercise 4: Modules and Exports
 *
 * Learn about:
 * - Creating custom modules
 * - Exporting functions and objects
 * - Requiring modules
 * - CommonJS vs ES6 modules
 */

console.log("📦 Exercise 4: Modules and Exports\n");

// 1. Using built-in modules
const os = require("os");
const crypto = require("crypto");

console.log("--- Built-in Modules ---");
console.log("OS Platform:", os.platform());
console.log("OS Type:", os.type());
console.log(
  "Total Memory:",
  (os.totalmem() / 1024 / 1024 / 1024).toFixed(2),
  "GB",
);
console.log(
  "Free Memory:",
  (os.freemem() / 1024 / 1024 / 1024).toFixed(2),
  "GB",
);
console.log("CPU Cores:", os.cpus().length);

// 2. Create and use a custom module
const mathUtils = require("./utils/mathUtils");
const stringUtils = require("./utils/stringUtils");

console.log("\n--- Custom Modules ---");
console.log("Add 5 + 3 =", mathUtils.add(5, 3));
console.log("Multiply 4 * 7 =", mathUtils.multiply(4, 7));
console.log("Power 2^8 =", mathUtils.power(2, 8));
console.log('Uppercase "hello" =', stringUtils.toUpperCase("hello"));
console.log('Reverse "Node.js" =', stringUtils.reverse("Node.js"));

// 3. Using a module that exports a single function
const greet = require("./utils/greeter");
console.log("\n--- Single Export Module ---");
console.log(greet("Alice"));
console.log(greet("Bob", "evening"));

// 4. Using a module with a class
const Calculator = require("./utils/Calculator");
const calc = new Calculator();
console.log("\n--- Class-based Module ---");
console.log("10 + 5 =", calc.add(10, 5));
console.log("10 - 5 =", calc.subtract(10, 5));
console.log("10 * 5 =", calc.multiply(10, 5));
console.log("10 / 5 =", calc.divide(10, 5));
console.log("History:", calc.getHistory());

console.log("\n✅ Exercise 4 completed!");

