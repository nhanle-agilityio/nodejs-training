/**
 * Handles reading and writing data to/from JSON file
 */

const path = require('path');
const { writeFile, readFile } = require('fs/promises');
const { existsSync, readFileSync, writeFileSync } = require('fs');

// Storage file path
const STORAGE_FILE = path.join(process.cwd(), 'events.json');

/**
 * Get default empty data structure
 * @returns {Object} Default data structure
 */
const getDefaultData = () => {
  return {
    events: [],
    nextId: 1,
  };
};

/**
 * Check if storage file exists
 * @returns {boolean} True if file exists
 */
const storageExists = () => {
  return existsSync(STORAGE_FILE);
};

/**
 * Read data from storage file
 * Creates file with default data if it doesn't exist
 *
 * @returns {Promise<Object>} Data object with events array
 */
const readData = async () => {
  try {
    const hasStorage = storageExists();
    if (!hasStorage) {
      return getDefaultData();
    }

    const content = await readFile(STORAGE_FILE, 'utf8');
    return JSON.parse(content);
  } catch (error) {
    if (error.code === 'ENOENT') {
      // File not found - return default data
      return getDefaultData();
    }

    throw error;
  }
};

/**
 * Write data to storage file
 *
 * @param {Object} data - Data object to write
 */
const writeData = async (data) => {
  const content = JSON.stringify(data, null, 2);
  await writeFile(STORAGE_FILE, content, 'utf8');
};

/**
 * Read data from storage file
 *
 * @returns {Object} Data object with events array
 */
const readDataSync = () => {
  try {
    const hasStorage = storageExists();
    if (!hasStorage) {
      // File doesn't exist - return default data
      return getDefaultData();
    }

    const content = readFileSync(STORAGE_FILE, 'utf8');
    return JSON.parse(content);
  } catch (error) {
    if (error.code === 'ENOENT') {
      // File not found - return default data
      return getDefaultData();
    }

    throw error;
  }
};

/**
 * Write data to storage file
 *
 * @param {Object} data - Data object to write
 */
const writeDataSync = (data) => {
  const content = JSON.stringify(data, null, 2);
  writeFileSync(STORAGE_FILE, content, 'utf8');
};

module.exports = {
  STORAGE_FILE,
  getDefaultData,
  storageExists,
  readData,
  writeData,
  readDataSync,
  writeDataSync,
};
