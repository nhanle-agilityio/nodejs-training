const { describe, test, beforeEach, afterEach, after } = require('node:test');
const assert = require('node:assert');
const fs = require('fs');
const path = require('path');
const os = require('os');

// Create a temporary test directory
const TEST_DIR = path.join(os.tmpdir(), `lock-test-${process.pid}-${Date.now()}`);
const originalCwd = process.cwd();

// Create test directory
if (!fs.existsSync(TEST_DIR)) {
  fs.mkdirSync(TEST_DIR, { recursive: true });
}

describe('Lock Service', () => {
  let withLock;
  let testLockFile;

  beforeEach(() => {
    // Change to test directory
    process.chdir(TEST_DIR);

    // Clear module cache and re-require
    const lockPath = require.resolve('../../src/services/lock');
    delete require.cache[lockPath];

    const lock = require('../../src/services/lock');
    withLock = lock.withLock;

    // Get lock file path (will be in test directory)
    const { LOCK_FILE } = require('../../src/services/storage');
    testLockFile = LOCK_FILE;

    // Verify we're using test directory
    if (!testLockFile.startsWith(TEST_DIR)) {
      throw new Error(`Lock file path ${testLockFile} is not in test directory ${TEST_DIR}`);
    }

    // Clean up any existing lock files
    if (fs.existsSync(testLockFile)) {
      fs.unlinkSync(testLockFile);
    }
  });

  afterEach(() => {
    // Restore original working directory
    process.chdir(originalCwd);

    // Clean up test lock file
    if (testLockFile && testLockFile.startsWith(TEST_DIR) && fs.existsSync(testLockFile)) {
      fs.unlinkSync(testLockFile);
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

  describe('withLock function', () => {
    test('should execute callback with lock held', async () => {
      let lockHeld = false;

      await withLock(testLockFile, () => {
        lockHeld = fs.existsSync(testLockFile);
      });

      assert.strictEqual(lockHeld, true);
    });

    test('should release lock after successful execution', async () => {
      await withLock(testLockFile, () => {
        return 'test_result';
      });

      assert.strictEqual(fs.existsSync(testLockFile), false);
    });

    test('should release lock after error', async () => {
      try {
        await withLock(testLockFile, async () => {
          throw new Error('Test error');
        });
      } catch (error) {
        assert.strictEqual(error.message, 'Test error');
      }

      assert.strictEqual(fs.existsSync(testLockFile), false);
    });

    test('should return callback result', async () => {
      const result = await withLock(testLockFile, () => {
        return 'test_result';
      });

      assert.strictEqual(result, 'test_result');
    });

    test('should rethrow callback errors', async () => {
      await assert.rejects(
        async () => {
          await withLock(testLockFile, () => {
            throw new Error('test_error');
          });
        },
        { message: 'test_error' }
      );
    });

    test('should remove stale lock and acquire', async () => {
      // Create a stale lock (older than 5 seconds)
      const staleLockInfo = {
        pid: 9999,
        timestamp: Date.now() - 6000, // 6 seconds ago
        createdAt: new Date(Date.now() - 6000).toISOString(),
      };
      fs.writeFileSync(testLockFile, JSON.stringify(staleLockInfo));

      assert.strictEqual(fs.existsSync(testLockFile), true);

      // Should acquire lock after removing stale one
      await withLock(testLockFile, () => {
        assert.ok(fs.existsSync(testLockFile));
      });

      assert.strictEqual(fs.existsSync(testLockFile), false);
    });
  });
});
