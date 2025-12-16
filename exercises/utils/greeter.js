/**
 * Greeter Module
 * Demonstrates exporting a single function
 */

function greet(name, timeOfDay = "morning") {
  const greetings = {
    morning: "Good morning",
    afternoon: "Good afternoon",
    evening: "Good evening",
    night: "Good night",
  };

  const greeting = greetings[timeOfDay] || "Hello";
  return `${greeting}, ${name}!`;
}

// Export a single function as the default export
module.exports = greet;

