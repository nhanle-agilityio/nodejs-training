#!/usr/bin/env node

/**
 * Main CLI entry point for Ticket Booking System
 */

const { parseArguments } = require('./utils/parser');
const { executeCommand } = require('./commands');

/**
 * Main CLI function
 * Parses arguments, routes to commands, handles errors
 */
const main = async () => {
  try {
    // Parse command line arguments
    const parsed = parseArguments(process.argv);

    // Default to help if no command provided
    const commandName = parsed.command || 'help';

    // Execute the command - let command handler handle all output
    await executeCommand(commandName, parsed.args);

    // If we reach here, command succeeded
    process.exit(0);
  } catch (error) {
    // Display user-friendly error message
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

// Run main function if this file is executed directly
if (require.main === module) {
  main();
}

module.exports = { main };
