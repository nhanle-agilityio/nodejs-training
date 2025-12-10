/**
 * This example demonstrates Unicode Normalization issues in filesystems.
 * Different operating systems might store special characters differently.
 */

const fs = require('fs');
const path = require('path');

// 'café' in NFC
const nfcName = 'café'; 
// 'café' in NFD
const nfdName = 'cafe\u0301';

console.log(`Name 1 (NFC): ${nfcName} (Length: ${nfcName.length})`);
console.log(`Name 2 (NFD): ${nfdName} (Length: ${nfdName.length})`);

console.log(`Are the strings equal? ${nfcName === nfdName}`); // false
console.log(`Are they equal when normalized? ${nfcName.normalize('NFC') === nfdName.normalize('NFC')}`); // true

// Create a file with NFC name
const fileName = `test-${nfcName}.txt`;
const filePath = path.join(__dirname, fileName);

fs.writeFileSync(filePath, 'Some content');
console.log(`\nCreated file: ${fileName}`);

// Read directory
const files = fs.readdirSync(__dirname);
const foundFile = files.find(f => f.startsWith('test-caf'));

if (foundFile) {
  console.log(`Found file in directory: ${foundFile}`);
  console.log(`Found file length: ${foundFile.length}`);
  
  if (foundFile === fileName) {
      console.log('Filesystem returned the name exactly as created (NFC).');
  } else {
      console.log('Filesystem normalized the filename (likely to NFD like on macOS).');
  }
}

// Clean up
try {
  fs.unlinkSync(filePath);
  console.log('Cleaned up file.');
} catch (e) {
  console.error('Error deleting file:', e);
}
