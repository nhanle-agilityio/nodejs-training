#!/usr/bin/env node

/**
 * NPX Example: Simple CLI Tool
 *
 * This demonstrates how to create an npx-executable script.
 *
 * To run:
 *   chmod +x examples/npx-cli-demo.js
 *   npx ./examples/npx-cli-demo.js [name]
 */

// Get command line arguments (skip first 2: node path and script path)
const args = process.argv.slice(2);
const name = args[0] || "World";

console.log("╔══════════════════════════════════╗");
console.log("║   NPX CLI Demo Tool              ║");
console.log("╚══════════════════════════════════╝\n");

console.log(`👋 Hello, ${name}!`);
console.log(`📦 Running via: ${process.execPath}`);
console.log(`🚀 Script location: ${__filename}`);
console.log(`⏰ Current time: ${new Date().toLocaleString()}\n`);

// Show help if requested
if (args.includes("--help") || args.includes("-h")) {
  console.log("Usage: npx ./examples/npx-cli-demo.js [name] [options]\n");
  console.log("Options:");
  console.log("  --help, -h     Show this help message");
  console.log("  --version, -v  Show version\n");
  console.log("Examples:");
  console.log("  npx ./examples/npx-cli-demo.js");
  console.log("  npx ./examples/npx-cli-demo.js Alice");
  process.exit(0);
}

// Show version if requested
if (args.includes("--version") || args.includes("-v")) {
  console.log("Version: 1.0.0");
  process.exit(0);
}

// Show all arguments
if (args.length > 0) {
  console.log("📋 Arguments received:", args);
}

console.log("\n✨ Demo completed successfully!");

