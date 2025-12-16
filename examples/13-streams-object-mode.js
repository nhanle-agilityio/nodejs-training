/**
 * This example demonstrates Streams in Object Mode.
 * Instead of buffers/strings, we pass JavaScript objects.
 */

const { Transform, Readable } = require("stream");

// 1. Create a Readable stream from an array of objects
const users = [
  { id: 1, name: "Alice", role: "admin" },
  { id: 2, name: "Bob", role: "user" },
  { id: 3, name: "Charlie", role: "user" },
];

const userStream = Readable.from(users); // Automatically creates an object-mode stream

// 2. Create a Transform stream (Object Mode)
const addTimestamp = new Transform({
  objectMode: true, // Crucial! Enables passing objects
  transform(user, encoding, callback) {
    // Add a timestamp to the user object
    user.processedAt = new Date();
    user.name = user.name.toUpperCase();

    // Push the modified object
    this.push(user);
    callback();
  },
});

// 3. Consume the stream (Async Iterator)
async function processUsers() {
  console.log("--- Stream Object Mode Processing ---");

  const processingStream = userStream.pipe(addTimestamp);

  for await (const processedUser of processingStream) {
    console.log("Processed User:", processedUser);
  }
  console.log("✅ Done.");
}

processUsers();
