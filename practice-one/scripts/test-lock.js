#!/usr/bin/env node

/**
 * File Locking Test Script
 *
 * How it works:
 * 1. Try to create a lock file atomically
 * 2. If lock exists (another process has it), retry with delay
 * 3. Hold the lock for 3 seconds (simulating work)
 * 4. Release the lock
 *
 * How to run script:
 * 1. Open 2 terminals
 * 2. Run this script in both: node scripts/test-lock.js
 * 3. Observe: Second terminal waits until first releases lock
 */

const fs = require('fs');
const path = require('path');
const { setTimeout: sleep } = require('timers/promises');

const LOCK_FILE = path.join(__dirname, '..', 'test.lock');
const MAX_RETRIES = 20;
const RETRY_DELAY = 100; // 100ms delay between retries
const WORK_DURATION = 3000; // 3 seconds to hold the lock

/**
 * Attempt to acquire lock file atomically
 * @returns {boolean} true if lock acquired, false if already held
 */
const tryAcquireLock = () => {
  try {
    // 'w' = write mode, 'x' = exclusive (fails if file exists)
    const fd = fs.openSync(LOCK_FILE, 'wx');

    const lockInfo = {
      pid: process.pid,
      timestamp: new Date().toISOString(),
    };
    fs.writeSync(fd, JSON.stringify(lockInfo, null, 2));
    fs.closeSync(fd);

    console.log(`✅ [Process ${process.pid}] Lock ACQUIRED`);
    return true;
  } catch (error) {
    if (error.code === 'EEXIST') {
      // Lock file exists - another process has the lock
      return false;
    }
    throw error;
  }
}

/**
 * Release the lock by deleting the lock file
 */
const releaseLock = () => {
  try {
    fs.unlinkSync(LOCK_FILE);
    console.log(`🔓 [Process ${process.pid}] Lock RELEASED`);
  } catch (error) {
    if (error.code === 'ENOENT') {
      // Lock file doesn't exist - already released
      console.log(`⚠️  [Process ${process.pid}] Lock file already gone`);
    } else {
      throw error;
    }
  }
}

/**
 * Acquire lock with retry logic
 * @returns {Promise<void>}
 */
const acquireLockWithRetry = async () => {
  let attempts = 0;

  while (attempts < MAX_RETRIES) {
    attempts++;

    const acquired = tryAcquireLock();

    if (acquired) {
      return;
    }

    // Lock is held by another process - wait and retry
    console.log(`⏳ [Process ${process.pid}] Lock held by another process, retrying... (attempt ${attempts}/${MAX_RETRIES})`);

    // Wait for the retry delay
    await sleep(RETRY_DELAY);
  }

  // Failed to acquire lock after all retries
  throw new Error(`Failed to acquire lock after ${MAX_RETRIES} attempts`);
}

/**
 * Simulate doing work while holding the lock
 */
const doWork = async () => {
  console.log(`🔨 [Process ${process.pid}] Doing work (holding lock for ${WORK_DURATION}ms)...`);
  await sleep(WORK_DURATION);
  console.log(`✅ [Process ${process.pid}] Work complete!`);
}

const main = async () => {
  console.log(`\n🚀 [Process ${process.pid}] Starting lock test...\n`);

  try {
    // Step 1: Acquire lock (with retry)
    await acquireLockWithRetry();

    // Step 2: Do work while holding lock
    await doWork();

    // Step 3: Release lock (in finally block to ensure it always happens)
  } catch (error) {
    console.error(`❌ [Process ${process.pid}] Error:`, error.message);
    process.exit(1);
  } finally {
    releaseLock();
  }

  console.log(`\n✅ [Process ${process.pid}] Test complete!\n`);
}

main();
