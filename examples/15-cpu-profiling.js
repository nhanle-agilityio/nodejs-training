/**
 * This example simulates a "Poor Performance" scenario (CPU Intensive).
 * It calculates Fibonacci numbers recursively (very inefficient).
 *
 * USE CASE: Diagnostics (Profiling)
 * You can use this to generate a CPU Profile or Flame Graph.
 *
 * Run: node --prof examples/15-cpu-profiling.js
 * Then process the log: node --prof-process isolate-0x....log > processed.txt
 */

function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

function heavyTask() {
  console.log("Starting heavy calculation...");
  const start = Date.now();

  // Calculating fib(40) takes a noticeable amount of time
  const result = fibonacci(40);

  const end = Date.now();
  console.log(`Result: ${result}`);
  console.log(`Time taken: ${end - start}ms`);
}

console.log("--- CPU Profiling Demo ---");
heavyTask();
