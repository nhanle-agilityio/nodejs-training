const { describe, test } = require('node:test');
const assert = require('node:assert');
const {
  required,
  isPositiveInteger,
  validateEventId,
  validateEventName,
  validateCustomerName,
  validateCustomerEmail,
  validateSeatCount,
} = require('../../src/services/validator');

describe('required function', () => {
  test('should not throw for valid string', () => {
    assert.doesNotThrow(() => required('value', 'Field Name'));
  });

  test('should throw for null value', () => {
    assert.throws(
      () => required(null, 'Field Name'),
      { message: 'Field Name is required' }
    );
  });

  test('should throw for undefined value', () => {
    assert.throws(
      () => required(undefined, 'Field Name'),
      { message: 'Field Name is required' }
    );
  });

  test('should throw for empty string', () => {
    assert.throws(
      () => required('', 'Field Name'),
      { message: 'Field Name is required' }
    );
  });

  test('should throw for zero value', () => {
    assert.throws(
      () => required(0, 'Field Name'),
      { message: 'Field Name is required' }
    );
  });
});

describe('isPositiveInteger function', () => {
  test('should not throw for valid positive integer', () => {
    assert.doesNotThrow(() => isPositiveInteger(1, 'Field Number'));
  });

  test('should throw for zero', () => {
    assert.throws(
      () => isPositiveInteger(0, 'Field Number'),
      { message: 'Field Number must be a positive integer' }
    );
  });

  test('should throw for negative number', () => {
    assert.throws(
      () => isPositiveInteger(-5, 'Field Number'),
      { message: 'Field Number must be a positive integer' }
    );
  });

  test('should throw for decimal number', () => {
    assert.throws(
      () => isPositiveInteger(5.5, 'Field Number'),
      { message: 'Field Number must be a positive integer' }
    );
  });

  test('should throw for non-numeric string', () => {
    assert.throws(
      () => isPositiveInteger('abc', 'Field Number'),
      { message: 'Field Number must be a positive integer' }
    );
  });
});

describe('validateEventId function', () => {
  test('should not throw for valid positive integer', () => {
    assert.doesNotThrow(() => validateEventId(1));
    assert.doesNotThrow(() => validateEventId('1'));
  });

  test('should throw for zero', () => {
    assert.throws(
      () => validateEventId(0),
      { message: 'Event ID is required' }
    );
  });

  test('should throw for negative number', () => {
    assert.throws(
      () => validateEventId(-1),
      { message: 'Event ID must be a positive integer' }
    );
  });

  test('should throw for non-integer', () => {
    assert.throws(
      () => validateEventId(1.5),
      { message: 'Event ID must be a positive integer' }
    );
  });

  test('should throw for empty/null/undefined', () => {
    assert.throws(
      () => validateEventId(null),
      { message: 'Event ID is required' }
    );
    assert.throws(
      () => validateEventId(undefined),
      { message: 'Event ID is required' }
    );
    assert.throws(
      () => validateEventId(''),
      { message: 'Event ID is required' }
    );
  });
});

describe('validateEventName function', () => {
  test('should not throw for valid name', () => {
    assert.doesNotThrow(() => validateEventName('Tech Conference'));
  });

  test('should throw for empty string', () => {
    assert.throws(
      () => validateEventName(''),
      { message: 'Event name is required' }
    );
  });

  test('should throw for too short (after trim)', () => {
    assert.throws(
      () => validateEventName('   '),
      { message: 'Event name must be at least 1 characters' }
    );
  });

  test('should throw for too long (> 200 chars)', () => {
    assert.throws(
      () => validateEventName('A'.repeat(201)),
      { message: 'Event name must be at most 200 characters' }
    );
  });
});

describe('validateCustomerName function', () => {
  test('should not throw for valid name', () => {
    assert.doesNotThrow(() => validateCustomerName('John Doe'));
  });

  test('should throw for empty string', () => {
    assert.throws(
      () => validateCustomerName(''),
      { message: 'Customer name is required' }
    );
  });

  test('should throw for too short', () => {
    assert.throws(
      () => validateCustomerName('   '),
      { message: 'Customer name must be at least 1 characters' }
    );
  });

  test('should throw for too long', () => {
    assert.throws(
      () => validateCustomerName('A'.repeat(201)),
      { message: 'Customer name must be at most 200 characters' }
    );
  });
});

describe('validateCustomerEmail function', () => {
  test('should not throw for valid email', () => {
    assert.doesNotThrow(() => validateCustomerEmail('user@example.com'));
  });

  test('should throw for empty string', () => {
    assert.throws(
      () => validateCustomerEmail(''),
      { message: 'Customer email is required' }
    );
  });

  test('should throw for missing @', () => {
    assert.throws(
      () => validateCustomerEmail('userexample.com'),
      { message: 'Customer email must be a valid email address' }
    );
  });

  test('should throw for missing domain', () => {
    assert.throws(
      () => validateCustomerEmail('user@'),
      { message: 'Customer email must be a valid email address' }
    );
  });

  test('should throw for no last domain', () => {
    assert.throws(
      () => validateCustomerEmail('user@example'),
      { message: 'Customer email must be a valid email address' }
    );
  });
});

describe('validateSeatCount function', () => {
  test('should not throw for valid seat count', () => {
    assert.doesNotThrow(() => validateSeatCount(100));
    assert.doesNotThrow(() => validateSeatCount('100'));
  });

  test('should throw for zero', () => {
    assert.throws(
      () => validateSeatCount(0),
      { message: 'Seat count is required' }
    );
  });

  test('should throw for negative number', () => {
    assert.throws(
      () => validateSeatCount(-5),
      { message: 'Seat count must be a positive integer' }
    );
  });

  test('should throw for over limit (> 1000)', () => {
    assert.throws(
      () => validateSeatCount(1001),
      { message: 'Seat count cannot exceed 1000' }
    );
  });

  test('should throw for decimal', () => {
    assert.throws(
      () => validateSeatCount(5.5),
      { message: 'Seat count must be a positive integer' }
    );
  });

  test('should throw for empty/null/undefined', () => {
    assert.throws(
      () => validateSeatCount(null),
      { message: 'Seat count is required' }
    );
    assert.throws(
      () => validateSeatCount(undefined),
      { message: 'Seat count is required' }
    );
    assert.throws(
      () => validateSeatCount(''),
      { message: 'Seat count is required' }
    );
  });
});
