/**
 * This example demonstrates basic Stream usage (Piping).
 * It copies a file to another location using streams.
 */

const fs = require("fs");
const path = require("path");

const inputFile = path.join(__dirname, "input.txt");
const outputFile = path.join(__dirname, "output.txt");

// Create a dummy input file if it doesn't exist
if (!fs.existsSync(inputFile)) {
  fs.writeFileSync(
    inputFile,
    "This is some data being streamed.\n".repeat(100),
  );
}

// 1. Create Readable Stream
const readStream = fs.createReadStream(inputFile);

// 2. Create Writable Stream
const writeStream = fs.createWriteStream(outputFile);

// 3. Pipe data from Read -> Write
console.log("Starting to pipe data...");
readStream.pipe(writeStream);

// Handle events
writeStream.on("finish", () => {
  console.log("✅ File copy completed successfully via streams.");
  // Clean up
  fs.unlinkSync(inputFile);
  fs.unlinkSync(outputFile);
});

readStream.on("error", (err) => {
  console.error("❌ Error reading file:", err);
});
