/**
 * Command registry - maps command names to handlers
 * Manages all available CLI commands
 */

const createEventCmd = require('./create');
const listEventsCmd = require('./list');

/**
 * Command registry object
 * Each command has: handler, description, usage, example
 */
const commands = {
  help: {
    handler: () => displayHelp(),
    description: 'Display help information',
    usage: 'ticket-cli help',
    example: 'ticket-cli help',
  },
  create: createEventCmd,
  list: listEventsCmd,
};

/**
 * Get command handler by name
 * @param {string} commandName - Name of the command
 * @returns {Object|null} Command object or null if not found
 */
const getCommand = (commandName) => {
  return commands[commandName] || null;
};

/**
 * Get all available commands
 * @returns {Object} All commands
 */
const getAllCommands = () => {
  return commands;
};

/**
 * Execute a command
 * @param {string} commandName - Name of the command to execute
 * @param {Array} args - Command arguments
 * @returns {Promise<void>} Completes when command finishes
 * @throws {Error} If command not found or command execution fails
 */
const executeCommand = async (commandName, args) => {
  const command = getCommand(commandName);

  if (!command) {
    throw new Error(`Unknown command: ${commandName}\nUse 'ticket-cli help' for usage information.`);
  }

  // Execute the command
  await command.handler(args);
};

/**
 * Display help information
 */
const displayHelp = () => {
  console.log('Ticket Booking CLI - Event Management System\n');
  console.log('Usage: ticket-cli <command> [arguments]\n');
  console.log('Commands:\n');

  Object.keys(commands).forEach((name) => {
    const cmd = commands[name];
    console.log(`  ${name}`);
    console.log(`    ${cmd.description}`);
    console.log(`    Usage: ${cmd.usage}`);
    console.log(`    Example: ${cmd.example}`);
    console.log('');
  });

  // TODO: Add more commands as the project develops.
  console.log('Note: More commands will be available as the project develops.');
};

module.exports = {
  getCommand,
  getAllCommands,
  executeCommand,
};
