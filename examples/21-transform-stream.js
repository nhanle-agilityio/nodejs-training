/**
 * This example shows how to create a Transform stream.
 *
 * A Transform stream is both readable and writable - it transforms data as it passes through.
 */

const { Transform } = require("stream");

// Create a transform stream that converts text to uppercase
const upperCaseTransform = new Transform({
  transform(chunk, encoding, callback) {
    // Transform the data
    const upperCased = chunk.toString().toUpperCase();

    // Push the transformed data
    this.push(upperCased);

    callback();
  },
});

console.log("--- Simple Transform Stream ---");

// Write data to the transform stream
upperCaseTransform.write("hello world\n");
upperCaseTransform.write("this is a test\n");
upperCaseTransform.end("goodbye\n");

// Read the transformed data
upperCaseTransform.on("data", (chunk) => {
  console.log("Transformed:", chunk.toString().trim());
});

upperCaseTransform.on("end", () => {
  console.log("✅ Transformation complete.");
});
