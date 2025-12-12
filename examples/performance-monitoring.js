/**
 * This example shows how to monitor basic performance metrics.
 * 
 * Useful for diagnosing performance issues.
 */

console.log('--- Performance Monitoring ---');

// 1. Measure execution time
console.log('1. Using console.time():');
console.time('operation_test');
let sum = 0;
for (let i = 0; i < 1000000; i++) {
  sum += i;
}
console.timeEnd('operation_test');

// 2. Using performance.now() for more precision
console.log('\n2. Using performance.now():');
const { performance } = require('perf_hooks');

const start = performance.now();
let product = 1;
for (let i = 1; i < 10000; i++) {
  product = (product * i) % 1000000;
}
const end = performance.now();
console.log(`Operation took ${(end - start).toFixed(3)}ms`);

// 3. Monitor memory usage
console.log('\n3. Memory Usage:');
const memUsage = process.memoryUsage();
console.log(`Heap Used: ${(memUsage.heapUsed / 1024 / 1024).toFixed(2)} MB`);
console.log(`Heap Total: ${(memUsage.heapTotal / 1024 / 1024).toFixed(2)} MB`);
console.log(`RSS: ${(memUsage.rss / 1024 / 1024).toFixed(2)} MB`);
console.log(`External: ${(memUsage.external / 1024 / 1024).toFixed(2)} MB`);

// 4. CPU usage (basic)
console.log('\n5. CPU Usage:');
const startCPU = process.cpuUsage();

// Do some CPU work
for (let i = 0; i < 1000000; i++) {
  Math.sqrt(i);
}

const endCPU = process.cpuUsage(startCPU);
console.log(`User CPU time: ${endCPU.user / 1000}ms`);
console.log(`System CPU time: ${endCPU.system / 1000}ms`);

// 5. Monitor event loop delay (simple version)
console.log('\n4. Event Loop Delay:');
let lastTime = Date.now();

setTimeout(() => {
  const now = Date.now();
  const delay = now - lastTime - 100; // Expected delay was 100ms
  console.log(`Expected: 100ms, Actual delay: ${delay}ms more than expected`);
}, 100);
