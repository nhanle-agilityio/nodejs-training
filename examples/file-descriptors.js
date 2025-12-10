/**
 * This example demonstrates working with File Descriptors (fd).
 */

const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'test-fd.txt');

// 1. Create a file
fs.writeFileSync(filePath, 'Hello Node.js World!');

// 2. Open the file to get a File Descriptor
fs.open(filePath, 'r', (err, fd) => {
  if (err) {
    return console.error(err);
  }

  console.log(`File Descriptor (fd) acquired: ${fd}`);

  // 3. Read from the file using the fd
  const buffer = Buffer.alloc(13); // Allocate a buffer of 13 bytes
  
  // fs.read(fd, buffer, offset, length, position, callback)
  fs.read(fd, buffer, 0, 13, 0, (err, bytesRead, buffer) => {
    if (err) {
      return console.error(err);
    }

    console.log(`Read ${bytesRead} bytes from file.`);
    console.log(`Content: "${buffer.toString()}"`);

    // 4. Close the file descriptor (Important!)
    fs.close(fd, (err) => {
      if (err) {
        console.error(err);
      } else {
        console.log('File descriptor closed successfully.');
      }
      
      // Clean up
      fs.unlinkSync(filePath);
    });
  });
});
