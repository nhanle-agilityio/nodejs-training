const fs = require('fs');
const { setTimeout: sleep } = require('timers/promises');

const MAX_RETRIES = 20;
const RETRY_DELAY = 50; // 50 ms
const STALE_LOCK_THRESHOLD = 5000; // 5 seconds

/**
 * Attempt to acquire lock file
 * @param {string} lockPath - Path to lock file
 * @returns {boolean} true if lock acquired, false if already held
 */
const tryAcquireLock = (lockPath) => {
  try {
    // Try to create lock file with 'wx' flag (write-exclusive)
    const fd = fs.openSync(lockPath, 'wx');

    // Write lock metadata for debugging and stale lock detection
    const lockInfo = {
      pid: process.pid,
      timestamp: Date.now(),
      createdAt: new Date().toISOString(),
    };

    fs.writeSync(fd, JSON.stringify(lockInfo, null, 2));
    fs.closeSync(fd);

    return true;
  } catch (error) {
    if (error.code === 'EEXIST') {
      // Another process holds the lock
      return false;
    }
    throw error;
  }
};

/**
 * Check if lock file is stale
 * @param {string} lockPath - Path to lock file
 * @returns {boolean} true if lock is stale and should be removed
 */
const isLockStale = (lockPath) => {
  try {
    const lockContent = fs.readFileSync(lockPath, 'utf8');
    const lockInfo = JSON.parse(lockContent);

    const lockAge = Date.now() - lockInfo.timestamp;

    return lockAge > STALE_LOCK_THRESHOLD;
  } catch (error) {
    return true;
  }
};

/**
 * Acquire lock with retry logic
 * @param {string} lockPath - Path to lock file
 * @returns {Promise<void>}
 * @throws {Error} If lock cannot be acquired after max retries
 */
const acquireLock = async (lockPath) => {
  let attempts = 0;

  while (attempts < MAX_RETRIES) {
    attempts++;

    // Try to acquire lock
    const acquired = tryAcquireLock(lockPath);

    if (acquired) {
      return;
    }

    // Lock is held - check if it's stale
    if (isLockStale(lockPath)) {
      // Lock is stale - force remove
      fs.unlinkSync(lockPath);
      continue;
    }

    // Lock is active - wait and retry
    await sleep(RETRY_DELAY);
  }

  // Failed to acquire lock after all retries
  throw new Error(`Failed to acquire lock after ${MAX_RETRIES} attempts.`);
};

/**
 * Release lock by removing lock file
 * @param {string} lockPath - Path to lock file
 */
const releaseLock = (lockPath) => {
  try {
    fs.unlinkSync(lockPath);
  } catch (error) {
    if (error.code === 'ENOENT') {
      // Lock file doesn't exist - already released
      return;
    }
    throw error;
  }
};

/**
 * Execute an operation with automatic lock management
 * Acquires lock before operation, releases after
 *
 * @param {string} lockPath - Path to lock file
 * @param {Function} onHandleWork - Async function to execute while holding lock
 * @returns {Promise<any>} Result of the operation
 */
const withLock = async (lockPath, onHandleWork) => {
  // Acquire lock with retry
  await acquireLock(lockPath);

  try {
    // Execute operation while holding lock
    return await onHandleWork();
  } finally {
    releaseLock(lockPath);
  }
};

module.exports = {
  withLock,
};
