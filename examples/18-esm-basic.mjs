/**
 * This example demonstrates ES Modules (ESM) - the modern JavaScript module system.
 *
 * Note: This file has .mjs extension, which tells Node.js to use ESM.
 * Alternatively, you can set "type": "module" in package.json.
 */

// 1. Import built-in modules (ESM style)
import fs from "fs";
import path from "path";

// 2. Import our custom ESM module
import { add, multiply, PI } from "./modules/math.mjs";

console.log("--- ES Module Demo ---");

// Use the imported functions
console.log(`add(5, 3) = ${add(5, 3)}`);
console.log(`multiply(4, 7) = ${multiply(4, 7)}`);
console.log(`PI constant = ${PI}`);

// ESM doesn't have __dirname, but you can get it using import.meta.url
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log("\nModule info:");
console.log("Current file:", __filename);
console.log("Current directory:", __dirname);
console.log("Module URL:", import.meta.url);
