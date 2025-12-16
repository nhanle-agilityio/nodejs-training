/**
 * Main entry point for the application
 */

const greet = (name) => {
  return `Hello, ${name}!`;
};

const main = () => {
  const message = greet('World');
  console.log(message);
};

// Run the main function if this file is executed directly
if (require.main === module) {
  main();
}

module.exports = { greet, main };
