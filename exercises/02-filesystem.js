/**
 * Exercise 2: File System Operations
 *
 * Learn about:
 * - Reading files (sync and async)
 * - Writing files
 * - Working with directories
 * - File paths
 */

const fs = require("fs");
const path = require("path");

console.log("📁 Exercise 2: File System Operations\n");

// 1. Working with paths
console.log("--- Path Operations ---");
const currentDir = __dirname;
const currentFile = __filename;
console.log("Current directory:", currentDir);
console.log("Current file:", currentFile);
console.log("Directory name:", path.dirname(currentFile));
console.log("File name:", path.basename(currentFile));
console.log("File extension:", path.extname(currentFile));

// 2. Reading files synchronously (blocking)
console.log("\n--- Reading Files (Sync) ---");
try {
  const packageJson = fs.readFileSync("package.json", "utf8");
  console.log("package.json content:");
  console.log(packageJson.substring(0, 200) + "...\n");
} catch (error) {
  console.error("Error reading file:", error.message);
}

// 3. Reading files asynchronously (non-blocking)
console.log("--- Reading Files (Async) ---");
fs.readFile("package.json", "utf8", (err, data) => {
  if (err) {
    console.error("Error:", err.message);
    return;
  }
  console.log("Successfully read package.json asynchronously");
  console.log("File size:", data.length, "characters\n");
});

// 4. Writing files
console.log("--- Writing Files ---");
const dataDir = path.join(__dirname, "..", "data");
const outputFile = path.join(dataDir, "output.txt");

// Create data directory if it doesn't exist
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
  console.log("Created data directory");
}

// Write file synchronously
const content = `Hello from Node.js!
Current time: ${new Date().toISOString()}
This file was created by Exercise 2.`;

fs.writeFileSync(outputFile, content, "utf8");
console.log("File written:", outputFile);

// Write file asynchronously
const asyncFile = path.join(dataDir, "async-output.txt");
fs.writeFile(asyncFile, "This was written asynchronously!", "utf8", (err) => {
  if (err) {
    console.error("Error writing file:", err.message);
    return;
  }
  console.log("Async file written:", asyncFile);
});

// 5. Checking if file exists
console.log("\n--- File Existence ---");
console.log("package.json exists:", fs.existsSync("package.json"));
console.log("nonexistent.txt exists:", fs.existsSync("nonexistent.txt"));

// 6. Reading directory contents
console.log("\n--- Directory Contents ---");
fs.readdir(__dirname, (err, files) => {
  if (err) {
    console.error("Error reading directory:", err.message);
    return;
  }
  console.log("Files in exercises directory:");
  files.forEach((file) => {
    const filePath = path.join(__dirname, file);
    const stats = fs.statSync(filePath);
    const type = stats.isDirectory() ? "📁" : "📄";
    console.log(`  ${type} ${file}`);
  });
});

console.log(
  "\n✅ Exercise 2 completed! Check the data/ directory for output files.",
);

