/**
 * This example shows how to create a simple Readable stream.
 *
 * A Readable stream is a source of data that you can read from.
 */

const { Readable } = require("stream");

// Create a simple readable stream that emits numbers
const numberStream = new Readable({
  read() {
    // This method is called when the consumer is ready for more data
  },
});

console.log("--- Simple Readable Stream ---");

// Push data into the stream
for (let i = 1; i <= 5; i++) {
  numberStream.push(`Number: ${i}\n`);
}

// Signal the end of the stream
numberStream.push(null);

// Consume the stream
numberStream.on("data", (chunk) => {
  console.log("Received:", chunk.toString().trim());
});

numberStream.on("end", () => {
  console.log("✅ Stream ended.");
});
