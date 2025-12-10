/**
 * This example demonstrates loading environment variables from a .env file.
 * 
 * To run this example:
 * node --env-file=.env 05-env-files.js
 * 
 * The --env-file flag tells Node.js to load the environment variables from the .env file.
 * The .env file is located in the same directory as the script.
 * 
 */

console.log('--- Environment Variables ---');
console.log(`MY_API_KEY: ${process.env.MY_API_KEY}`);
console.log(`PORT: ${process.env.PORT}`);

if (!process.env.MY_API_KEY) {
  console.log('\n❌ Oops! Variables are undefined.');
} else {
  console.log('\n✅ Success! Variables loaded from .env file.');
}

