# Diagnostics Examples

Examples demonstrating how to diagnose common Node.js issues.

## How to run

Run each script using `node` from the root directory.

### 22. Sync vs Async (Simple)

Shows the difference between blocking (sync) and non-blocking (async) operations.

```bash
node examples/22-sync-vs-async-simple.js
```

### 23. Error Handling

Demonstrates different error handling patterns in Node.js (try-catch, callbacks, promises, async/await).

```bash
node examples/23-error-handling.js
```

### 24. Performance Monitoring

Shows how to measure execution time, memory usage, and CPU usage.

```bash
node examples/24-performance-monitoring.js
```

### 14. Memory Leak Simulator

Simulates a memory leak by filling a global array. Use Chrome DevTools (Memory tab) to take heap snapshots and find the leak.

```bash
node --inspect examples/14-memory-leak.js
```

### 15. CPU Profiling (Poor Performance)

Runs an inefficient recursive Fibonacci calculation. Use this to practice generating CPU profiles or Flame Graphs.

```bash
# 1. Run with profiler
node --prof examples/15-cpu-profiling.js

# 2. Process the log (replace log filename)
node --prof-process isolate-0xnnnnnnnn-v8.log > profile.txt
```

### 16. Live Debugging

A simple server with a `debugger` statement. Connect Chrome DevTools to pause execution and inspect variables.

```bash
node --inspect examples/16-live-debugging.js
```
