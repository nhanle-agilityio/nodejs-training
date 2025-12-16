/**
 * Parse command line arguments
 * @param {string[]} argv - Process arguments (process.argv)
 * @returns {Object} Parsed arguments object with command and args
 */
const parseArguments = (argv) => {
  // Remove first two elements (node executable and script path)
  const args = argv.slice(2);

  const parsed = {
    command: null,
    args: [],
  };

  if (args.length === 0) {
    return parsed;
  }

  // First argument is always the command
  parsed.command = args[0];

  // Remaining arguments are positional
  parsed.args = args.slice(1);

  return parsed;
};

module.exports = {
  parseArguments,
};
