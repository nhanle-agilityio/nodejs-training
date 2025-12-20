const { describe, test, beforeEach, afterEach, after } = require('node:test');
const assert = require('node:assert');
const fs = require('fs');
const path = require('path');
const os = require('os');

// Create a temporary test directory
const TEST_DIR = path.join(os.tmpdir(), `storage-test-${process.pid}-${Date.now()}`);
const originalCwd = process.cwd();

// Create test directory
if (!fs.existsSync(TEST_DIR)) {
  fs.mkdirSync(TEST_DIR, { recursive: true });
}

describe('Storage Service', () => {
  let getDefaultData, storageExists, readData, writeData, readDataSync, writeDataSync;
  let testStorageFile;
  const defaultData = {
    events: [],
    nextId: 1,
  };

  beforeEach(() => {
    // Change to test directory
    process.chdir(TEST_DIR);

    // Clear module cache and re-require
    const storagePath = require.resolve('../../src/services/storage');
    delete require.cache[storagePath];

    const storage = require('../../src/services/storage');
    getDefaultData = storage.getDefaultData;
    storageExists = storage.storageExists;
    readData = storage.readData;
    writeData = storage.writeData;
    readDataSync = storage.readDataSync;
    writeDataSync = storage.writeDataSync;
    testStorageFile = storage.STORAGE_FILE;

    if (!testStorageFile.startsWith(TEST_DIR)) {
      throw new Error(`Storage file path ${testStorageFile} is not in test directory ${TEST_DIR}`);
    }

    // Clean up any existing test files
    if (fs.existsSync(testStorageFile)) {
      fs.unlinkSync(testStorageFile);
    }
  });

  afterEach(() => {
    // Restore original working directory
    process.chdir(originalCwd);

    // Clean up test storage file
    if (testStorageFile && testStorageFile.startsWith(TEST_DIR) && fs.existsSync(testStorageFile)) {
      fs.unlinkSync(testStorageFile);
    }
  });

  after(() => {
    try {
      if (fs.existsSync(TEST_DIR)) {
        fs.rmSync(TEST_DIR, { recursive: true, force: true });
      }
    } catch (error) {
      // Ignore cleanup errors
    }
    process.chdir(originalCwd);
  });

  describe('getDefaultData function', () => {
    test('should return default data structure', () => {
      const data = getDefaultData();

      assert.deepStrictEqual(data, defaultData);
    });
  });

  describe('storageExists function', () => {
    test('should return false when file does not exist', () => {
      assert.strictEqual(storageExists(), false);
    });

    test('should return true when file exists', () => {
      fs.writeFileSync(testStorageFile, JSON.stringify(defaultData));

      assert.strictEqual(storageExists(), true);
    });
  });

  describe('readDataSync function', () => {
    test('should return default data when file does not exist', () => {
      const data = readDataSync();

      assert.deepStrictEqual(data, defaultData);
    });

    test('should parse valid JSON file correctly', () => {
      const testData = {
        events: [{ id: 1, name: 'Test Event', totalSeats: 100 }],
        nextId: 2,
      };
      fs.writeFileSync(testStorageFile, JSON.stringify(testData));

      const data = readDataSync();

      assert.deepStrictEqual(data, testData);
    });
  });

  describe('writeDataSync function', () => {
    test('should write valid JSON to file', () => {
      const testData = {
        events: [{ id: 1, name: 'Test', totalSeats: 50 }],
        nextId: 2,
      };

      writeDataSync(testData);

      const content = fs.readFileSync(testStorageFile, 'utf8');
      const parsed = JSON.parse(content);
      assert.deepStrictEqual(parsed, testData);
    });

    test('should create file if it does not exist', () => {
      writeDataSync(defaultData);

      assert.ok(fs.existsSync(testStorageFile));
    });
  });

  describe('readData function (async)', () => {
    test('should return default data when file does not exist', async () => {
      const data = await readData();

      assert.deepStrictEqual(data, defaultData);
    });

    test('should parse valid JSON file correctly', async () => {
      const testData = {
        events: [{ id: 1, name: 'Test Event', totalSeats: 100 }],
        nextId: 2,
      };
      fs.writeFileSync(testStorageFile, JSON.stringify(testData));

      const data = await readData();

      assert.deepStrictEqual(data, testData);
    });
  });

  describe('writeData function (async)', () => {
    test('should write valid JSON to file', async () => {
      const testData = {
        events: [{ id: 1, name: 'Test', totalSeats: 50 }],
        nextId: 2,
      };

      await writeData(testData);

      const content = fs.readFileSync(testStorageFile, 'utf8');
      const parsed = JSON.parse(content);
      assert.deepStrictEqual(parsed, testData);
    });

    test('should create file if it does not exist', async () => {
      await writeData(defaultData);

      assert.ok(fs.existsSync(testStorageFile));
    });
  });
});
