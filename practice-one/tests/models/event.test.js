const { describe, test } = require('node:test');
const assert = require('node:assert');
const { createEvent } = require('../../src/models/event');

describe('createEvent function', () => {
  test('should create event with all required properties', () => {
    const eventMock = {
      id: 1,
      name: 'Tech Conference',
      totalSeats: 100,
    };
    const event = createEvent(eventMock.id, eventMock.name, eventMock.totalSeats);

    assert.strictEqual(event.id, eventMock.id);
    assert.strictEqual(event.name, eventMock.name);
    assert.strictEqual(event.totalSeats, eventMock.totalSeats);
    assert.strictEqual(event.availableSeats, eventMock.totalSeats);
    assert.deepStrictEqual(event.bookedBy, []);
    assert.strictEqual(event.createdAt, event.updatedAt);
  });

  test('should set availableSeats equal to totalSeats initially', () => {
    const event = createEvent(1, 'Event', 50);

    assert.strictEqual(event.availableSeats, event.totalSeats);
    assert.strictEqual(event.availableSeats, 50);
  });
});
