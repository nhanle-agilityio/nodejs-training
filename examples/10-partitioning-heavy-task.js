/**
 * This example demonstrates "Partitioning" to avoid blocking the Event Loop.
 *
 * We simulate a heavy calculation (summing 1 to 1 billion).
 *
 * 1. Blocking Version: Freezes everything until done.
 * 2. Non-Blocking Version: Uses setImmediate to break work into chunks.
 */

// --- BLOCKING APPROACH ---
function sumBlocking(n) {
  console.log("Blocking Sum started...");
  let sum = 0;
  const start = Date.now();
  for (let i = 0; i < n; i++) {
    sum += i;
  }
  console.log(`Blocking Sum finished: ${sum} (Time: ${Date.now() - start}ms)`);
}

// --- NON-BLOCKING (PARTITIONED) APPROACH ---
function sumPartitioned(n, callback) {
  console.log("Partitioned Sum started...");
  let sum = 0;
  let i = 0;
  const start = Date.now();

  function help() {
    // Process a chunk (e.g., 10 million items)
    const chunkEnd = Math.min(i + 10000000, n);
    for (; i < chunkEnd; i++) {
      sum += i;
    }

    if (i < n) {
      // Yield to Event Loop, then continue
      setImmediate(help);
    } else {
      // Done
      console.log(
        `Partitioned Sum finished: ${sum} (Time: ${Date.now() - start}ms)`,
      );
      callback();
    }
  }

  help();
}

// === RUNNING THE TEST ===

// 1. Run Blocking first
console.log("1. Running Blocking Task:");
sumBlocking(1000000000); // 1 Billion

// 2. Run Partitioned
console.log("\n2. Running Partitioned Task:");
sumPartitioned(1000000000, () => {
  console.log("All done.");
});

// While partitioned task is running, this interval proves the event loop is alive
let ticks = 0;
const interval = setInterval(() => {
  ticks++;
  console.log(`   (Event Loop is alive: Tick ${ticks})`);
  if (ticks >= 5) clearInterval(interval);
}, 50);

// Note: During the Blocking task, you won't see any "Tick" logs because the loop is frozen.
// During Partitioned task, you SHOULD see "Tick" logs interleaved with calculation.
