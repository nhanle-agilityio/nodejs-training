#!/usr/bin/env node

/**
 * This script demonstrates how to create an executable Node.js script.
 *
 * 1. The first line (#!/usr/bin/env node) is called a "shebang".
 *    It tells the operating system to use the 'node' interpreter to run this file.
 *
 * 2. Access permission:
 *    chmod u+x executable-script.js
 *
 * 3. Then you can run it directly:
 *    ./executable-script.js
 *    or pass arguments to the script:
 *    ./executable-script.js --name="Node.js"
 */

console.log("Hello! I am running directly as an executable script.");
console.log(`My process ID is: ${process.pid}`);
console.log("Arguments passed to me:", process.argv.slice(2));
