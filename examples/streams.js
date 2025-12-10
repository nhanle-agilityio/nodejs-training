/**
 * This example demonstrates using Streams to read and write files.
 * Streams are efficient for large files because they process data in chunks
 * rather than loading the whole file into memory.
 */

const fs = require('fs');
const path = require('path');

// Create a large dummy file first to demonstrate reading
const filePath = path.join(__dirname, 'large-file.txt');

console.log('1. Creating a large file...');
const writeStream = fs.createWriteStream(filePath);

for (let i = 0; i < 10000; i++) {
  writeStream.write(`Line ${i}: This is some text content to fill up the file.\n`);
}
writeStream.end();

writeStream.on('finish', () => {
  console.log(`   File created at: ${filePath}`);
  
  // Now read it using a stream
  console.log('\n2. Reading file with stream...');
  const readStream = fs.createReadStream(filePath, { encoding: 'utf8', highWaterMark: 1024 }); // 1KB chunks
  let chunkCount = 0;

  readStream.on('data', (chunk) => {
    chunkCount++;
  });

  readStream.on('end', () => {
    console.log(`\nFinished reading. Total chunks: ${chunkCount}`);
    
    // Clean up
    fs.unlinkSync(filePath);
    console.log('\n3. Cleaned up large-file.txt file.');
  });
});
