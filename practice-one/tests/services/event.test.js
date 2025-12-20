const { describe, test, beforeEach, afterEach, after } = require('node:test');
const assert = require('node:assert');
const fs = require('fs');
const path = require('path');
const os = require('os');

// Create a temporary test directory (created once)
const TEST_DIR = path.join(os.tmpdir(), `ticket-cli-test-${process.pid}-${Date.now()}`);
const originalCwd = process.cwd();

// Create test directory
if (!fs.existsSync(TEST_DIR)) {
  fs.mkdirSync(TEST_DIR, { recursive: true });
}

describe('Event Service', () => {
  let testStorageFile;
  let testLockFile;
  let createEvent, getAllEvents, getEventById, bookTicket, cancelTicket;

  beforeEach(() => {
    // Change to test directory FIRST (before requiring modules)
    process.chdir(TEST_DIR);

    // Clear module cache so storage.js recalculates paths based on new cwd
    const storagePath = require.resolve('../../src/services/storage');
    const eventPath = require.resolve('../../src/services/event');
    delete require.cache[storagePath];
    delete require.cache[eventPath];

    // Re-require modules (they will use new cwd for path calculation)
    const eventService = require('../../src/services/event');
    createEvent = eventService.createEvent;
    getAllEvents = eventService.getAllEvents;
    getEventById = eventService.getEventById;
    bookTicket = eventService.bookTicket;
    cancelTicket = eventService.cancelTicket;

    // Get storage file paths (now calculated with test directory as cwd)
    const { STORAGE_FILE, LOCK_FILE } = require('../../src/services/storage');
    testStorageFile = STORAGE_FILE;
    testLockFile = LOCK_FILE;

    // Verify we're using test directory
    if (!testStorageFile.startsWith(TEST_DIR)) {
      throw new Error(`Storage file path ${testStorageFile} is not in test directory ${TEST_DIR}`);
    }

    // Create fresh test data
    const testData = {
      events: [],
      nextId: 1,
    };
    fs.writeFileSync(testStorageFile, JSON.stringify(testData, null, 2));

    // Clean up test lock file if it exists
    if (fs.existsSync(testLockFile)) {
      fs.unlinkSync(testLockFile);
    }
  });

  afterEach(() => {
    // Restore original working directory
    process.chdir(originalCwd);

    // Safety check: Never delete production file
    const productionFile = path.join(originalCwd, 'events.json');

    // Clean up test storage file
    if (testStorageFile &&
        testStorageFile.startsWith(TEST_DIR) &&
        testStorageFile !== productionFile &&
        fs.existsSync(testStorageFile)) {
      fs.unlinkSync(testStorageFile);
    }
    // Clean up test lock file
    if (testLockFile &&
        testLockFile.startsWith(TEST_DIR) &&
        fs.existsSync(testLockFile)) {
      fs.unlinkSync(testLockFile);
    }
  });

  // Clean up test directory after all tests complete
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

  describe('createEvent function', () => {
    test('should create event with next ID', async () => {
      const event = await createEvent('Tech Conference', 100);

      assert.strictEqual(event.id, 1);
      assert.strictEqual(event.name, 'Tech Conference');
      assert.strictEqual(event.totalSeats, 100);
    });

    test('should save event to storage', async () => {
      await createEvent('Tech Conference', 100);
      const data = JSON.parse(fs.readFileSync(testStorageFile, 'utf8'));

      assert.strictEqual(data.events.length, 1);
      assert.strictEqual(data.events[0].name, 'Tech Conference');
    });

    test('should throw for invalid event name', async () => {
      await assert.rejects(
        () => createEvent('', 100),
        { message: 'Event name is required' }
      );
    });

    test('should throw for invalid seat count', async () => {
      await assert.rejects(
        () => createEvent('Event', -5),
        { message: 'Seat count must be a positive integer' }
      );
    });
  });

  describe('getAllEvents function', () => {
    test('should return empty array when no events', async () => {
      const events = await getAllEvents();

      assert.deepStrictEqual(events, []);
    });

    test('should return all events', async () => {
      await createEvent('Event 1', 50);
      await createEvent('Event 2', 100);
      const events = await getAllEvents();

      assert.strictEqual(events.length, 2);
      assert.strictEqual(events[0].name, 'Event 1');
      assert.strictEqual(events[1].name, 'Event 2');
    });
  });

  describe('getEventById function', () => {
    test('should return event by ID', async () => {
      await createEvent('Event 1', 50);
      const event = await getEventById(1);

      assert.ok(event);
      assert.strictEqual(event.id, 1);
      assert.strictEqual(event.name, 'Event 1');
      assert.strictEqual(event.totalSeats, 50);
    });

    test('should return null for non-existent ID', async () => {
      const event = await getEventById(999);

      assert.strictEqual(event, null);
    });
  });

  describe('bookTicket function', () => {
    beforeEach(async () => {
      await createEvent('Tech Conference', 10);
    });

    test('should book ticket successfully', () => {
      const result = bookTicket(1, 'John Doe', 'john@gmail.com');

      assert.ok(result.event);
      assert.ok(result.booking);
      assert.strictEqual(result.booking.customerName, 'John Doe');
      assert.strictEqual(result.booking.customerEmail, 'john@gmail.com');
      assert.strictEqual(result.booking.active, true);
    });

    test('should decrement availableSeats', () => {
      bookTicket(1, 'John Doe', 'john@gmail.com');
      const data = JSON.parse(fs.readFileSync(testStorageFile, 'utf8'));
      const event = data.events[0];

      assert.strictEqual(event.availableSeats, 9);
    });

    test('should add booking to bookedBy array', () => {
      bookTicket(1, 'John Doe', 'john@example.com');
      const data = JSON.parse(fs.readFileSync(testStorageFile, 'utf8'));
      const event = data.events[0];

      assert.strictEqual(event.bookedBy.length, 1);
      assert.strictEqual(event.bookedBy[0].customerEmail, 'john@example.com');
    });

    test('should throw for non-existent event', () => {
      assert.throws(
        () => bookTicket(999, 'John Doe', 'john@gmail.com'),
        { message: 'Event with ID 999 not found' }
      );
    });

    test('should throw for sold out event', () => {
      // Book all seats
      for (let i = 0; i < 10; i++) {
        bookTicket(1, `User ${i}`, `user${i}@gmail.com`);
      }

      assert.throws(
        () => bookTicket(1, 'User 10', 'user10@gmail.com'),
        { message: 'Event "Tech Conference" is sold out' }
      );
    });

    test('should throw for duplicate active email', () => {
      bookTicket(1, 'John Doe', 'john@gmail.com');

      assert.throws(
        () => bookTicket(1, 'Jane Doe', 'john@gmail.com'),
        { message: 'Email "john@gmail.com" already has an active booking for this event' }
      );
    });

    test('should allow re-booking after cancellation', () => {
      bookTicket(1, 'John Doe', 'john@gmail.com');
      cancelTicket(1, 'john@gmail.com');

      // Should be able to book again with same email
      const result = bookTicket(1, 'John Doe', 'john@gmail.com');
      assert.ok(result.booking);
    });
  });

  describe('cancelTicket function', () => {
    beforeEach(async () => {
      await createEvent('Tech Conference', 10);
      bookTicket(1, 'John Doe', 'john@gmail.com');
    });

    test('should cancel ticket successfully and increment available seats', () => {
      const result = cancelTicket(1, 'john@gmail.com');
      const data = JSON.parse(fs.readFileSync(testStorageFile, 'utf8'));
      const event = data.events[0];

      assert.ok(result.event);
      assert.ok(result.cancelledBooking);
      assert.strictEqual(result.cancelledBooking.active, false);
      assert.ok(result.cancelledBooking.cancelledAt);
      assert.strictEqual(event.availableSeats, 10);
    });

    test('should throw for non-existent event', () => {
      assert.throws(
        () => cancelTicket(999, 'john@gmail.com'),
        { message: 'Event with ID 999 not found' }
      );
    });

    test('should throw for no active booking', () => {
      assert.throws(
        () => cancelTicket(1, 'notfound@gmail.com'),
        { message: 'No active booking found for email "notfound@gmail.com" at this event' }
      );
    });
  });
});
