/**
 * This example shows how to create a simple Writable stream.
 *
 * A Writable stream is a destination where you can write data.
 */

const { Writable } = require("stream");

// Create a writable stream that logs data to console
const logStream = new Writable({
  write(chunk, encoding, callback) {
    console.log("Writing:", chunk.toString().trim());
    callback(); // Signal that we're done processing this chunk
  },
});

console.log("--- Simple Writable Stream ---");

// Write data to the stream
logStream.write("First line\n");
logStream.write("Second line\n");
logStream.write("Third line\n");

// End the stream
logStream.end("Final line\n");

logStream.on("finish", () => {
  console.log("✅ All data written.");
});
