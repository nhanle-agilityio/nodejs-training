/**
 * This is a simple CommonJS module that exports greeting functions.
 */

function sayHello(name) {
  return `Hello, ${name}!`;
}

function sayGoodbye(name) {
  return `Goodbye, ${name}!`;
}

// Export functions so other files can use them
module.exports = {
  sayHello,
  sayGoodbye,
};

// You can also check if this module is being run directly
if (require.main === module) {
  console.log("This module is being run directly!");
  console.log(sayHello("World"));
}
