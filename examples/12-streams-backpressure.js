/**
 * This example demonstrates Backpressure handling manually.
 * It simulates a fast producer (reader) and a slow consumer (writer).
 */

const { Readable, Writable } = require("stream");

// 1. Fast Producer
const fastReadable = new Readable({
  read() {
    // Pushes data continuously
    // In a real scenario, this would read from a source
  },
});

// Push data until buffer is full
let count = 0;
const pushData = setInterval(() => {
  const chunk = `Chunk ${count++}\n`;
  const canPush = fastReadable.push(chunk); // returns false if buffer is full

  console.log(`Pushed ${chunk.trim()}. Buffer OK? ${canPush}`);

  if (count > 20) {
    clearInterval(pushData);
    fastReadable.push(null); // End stream
  }
}, 10); // Very fast production (every 10ms)

// 2. Slow Consumer
const slowWritable = new Writable({
  highWaterMark: 16, // Very small buffer (16 bytes) to trigger backpressure quickly
  write(chunk, encoding, callback) {
    console.log(
      `   [Writable] Received: ${chunk.toString().trim()} (Processing...)`,
    );

    // Simulate slow processing (1 second per chunk)
    setTimeout(() => {
      console.log(
        `   [Writable] Finished processing: ${chunk.toString().trim()}`,
      );
      callback(); // Signal that we are ready for next chunk
    }, 500);
  },
});

// 3. Pipe them together
// Node.js 'pipe' automatically handles backpressure:
// It will PAUSE 'fastReadable' when 'slowWritable' buffer is full.
console.log("--- Starting Backpressure Demo ---");
fastReadable.pipe(slowWritable);

slowWritable.on("finish", () => {
  console.log(
    "\n✅ All data processed successfully with backpressure handling.",
  );
});
