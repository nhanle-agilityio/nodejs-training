/**
 * This example simulates a "Memory Leak" scenario.
 * It continuously adds objects to a global array without removing them.
 *
 * USE CASE: Diagnostics (Heap Snapshot)
 * You can use this script to practice taking Heap Snapshots using Chrome DevTools or 'node --inspect'.
 *
 * Run: node --inspect examples/14-memory-leak.js
 * Open Chrome -> chrome://inspect -> Configure -> Add localhost:9229
 */

const leaks = [];

function createLeak() {
  const data = {
    id: Date.now(),
    text: "x".repeat(100000), // ~100KB string
    timestamp: new Date(),
  };

  leaks.push(data); // Stored in global array, never freed!

  // Log memory usage every 100 iterations
  if (leaks.length % 100 === 0) {
    const used = process.memoryUsage().heapUsed / 1024 / 1024;
    console.log(
      `Leaked objects: ${leaks.length}, Heap Used: ${Math.round(used * 100) / 100} MB`,
    );
  }
}

console.log("--- Memory Leak Simulator ---");
console.log("Connect debugger/inspector to investigate.");
console.log("Press Ctrl+C to stop.");

setInterval(createLeak, 50); // Add object every 50ms
