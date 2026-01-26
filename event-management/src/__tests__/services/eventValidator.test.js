import { validateEvent, validatePartialUpdateEvent, validateQueryParams } from '../../services/eventValidator.js';
import { EVENT_STATUS, ERROR_CODES } from '../../constants/index.js';

describe('Event Validator', () => {
  describe('validateEvent', () => {
    test('should validate a valid event successfully', () => {
      const validEvent = {
        name: 'Summer Music Festival',
        description: 'A great music festival',
        location: 'Central Park',
        date: '2026-07-15T18:00:00Z',
        ticketPrice: 50,
        capacity: 1000,
      };
      const result = validateEvent(validEvent);

      expect(result.isValid).toBe(true);
      expect(result.data).toBeDefined();
      expect(result.data.name).toEqual(validEvent.name);
      expect(result.data.location).toEqual(validEvent.location);
      expect(result.data.ticketPrice).toEqual(validEvent.ticketPrice);
      expect(result.data.capacity).toEqual(validEvent.capacity);
    });

    test('should fail validation when name is missing', () => {
      const invalidEvent = {
        description: 'A great music festival',
        location: 'Central Park',
        date: '2026-07-15T18:00:00Z',
        ticketPrice: 50,
        capacity: 1000,
      };

      const result = validateEvent(invalidEvent);

      expect(result.isValid).toBe(false);
      expect(result.error).toBeDefined();
      expect(result.error.code).toEqual(ERROR_CODES.VALIDATION_ERROR);
      expect(result.error.details).toEqual(
        expect.arrayContaining([expect.objectContaining({ field: 'name', message: 'name is required' })]),
      );
    });

    test('should fail validation when name is empty string', () => {
      const invalidEvent = {
        name: '   ',
        location: 'Central Park',
        date: '2026-07-15T18:00:00Z',
        ticketPrice: 50,
        capacity: 1000,
      };

      const result = validateEvent(invalidEvent);

      expect(result.isValid).toBe(false);
      expect(result.error.details).toEqual(
        expect.arrayContaining([expect.objectContaining({ field: 'name', message: 'name is required' })]),
      );
    });

    test('should fail validation when name exceeds max length', () => {
      const invalidEvent = {
        name: 'A'.repeat(201), // max is 200
        location: 'Central Park',
        date: '2026-07-15T18:00:00Z',
        ticketPrice: 50,
        capacity: 1000,
      };

      const result = validateEvent(invalidEvent);

      expect(result.isValid).toBe(false);
      expect(result.error.details).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            field: 'name',
            message: 'name must not exceed 200 characters',
          }),
        ]),
      );
    });

    test('should fail validation when location is missing', () => {
      const invalidEvent = {
        name: 'Summer Music Festival',
        date: '2026-07-15T18:00:00Z',
        ticketPrice: 50,
        capacity: 1000,
      };

      const result = validateEvent(invalidEvent);

      expect(result.isValid).toBe(false);
      expect(result.error.details).toEqual(
        expect.arrayContaining([expect.objectContaining({ field: 'location', message: 'location is required' })]),
      );
    });

    test('should fail validation when date is in the past', () => {
      const invalidEvent = {
        name: 'Summer Music Festival',
        location: 'Central Park',
        date: '2020-01-01T18:00:00Z', // Past date
        ticketPrice: 50,
        capacity: 1000,
      };

      const result = validateEvent(invalidEvent);

      expect(result.isValid).toBe(false);
      expect(result.error.details).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            field: 'date',
            message: 'date cannot be in the past',
          }),
        ]),
      );
    });

    test('should fail validation when ticketPrice is negative', () => {
      const invalidEvent = {
        name: 'Summer Music Festival',
        location: 'Central Park',
        date: '2026-07-15T18:00:00Z',
        ticketPrice: -10,
        capacity: 1000,
      };

      const result = validateEvent(invalidEvent);

      expect(result.isValid).toBe(false);
      expect(result.error.details).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            field: 'ticketPrice',
            message: 'ticketPrice must be at least 0',
          }),
        ]),
      );
    });

    test('should fail validation when capacity is less than 1', () => {
      const invalidEvent = {
        name: 'Summer Music Festival',
        description: 'A great music festival',
        location: 'Central Park',
        date: '2026-07-15T18:00:00Z',
        ticketPrice: 50,
        capacity: 0.5,
      };

      const result = validateEvent(invalidEvent);

      expect(result.isValid).toBe(false);
      expect(result.error.details).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            field: 'capacity',
            message: expect.stringMatching(/capacity must be (at least 1|a valid number)/),
          }),
        ]),
      );
    });

    test('should fail validation when description exceeds max length', () => {
      const invalidEvent = {
        name: 'Summer Music Festival',
        description: 'A'.repeat(2001), // max is 2000
        location: 'Central Park',
        date: '2026-07-15T18:00:00Z',
        ticketPrice: 50,
        capacity: 1000,
      };

      const result = validateEvent(invalidEvent);

      expect(result.isValid).toBe(false);
      expect(result.error.details).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            field: 'description',
            message: 'description must not exceed 2000 characters',
          }),
        ]),
      );
    });

    test('should fail validation when multiple fields are invalid', () => {
      const invalidEvent = {
        name: '',
        location: '',
        date: '2020-01-01T18:00:00Z',
        ticketPrice: -10,
        capacity: 0,
      };

      const result = validateEvent(invalidEvent);

      expect(result.isValid).toBe(false);
      expect(result.error.details.length).toBeGreaterThan(1);
    });

    test('should fail validation when no data is provided', () => {
      const result = validateEvent(null);

      expect(result.isValid).toBe(false);
      expect(result.error.message).toBe('No data provided');
    });

    test('should fail validation when empty object is provided', () => {
      const result = validateEvent({});

      expect(result.isValid).toBe(false);
      expect(result.error.message).toBe('No data provided');
    });

    test('should trim whitespace from string fields', () => {
      const eventWithWhitespace = {
        name: '  Summer Music Festival  ',
        description: 'A great event',
        location: '  Central Park  ',
        date: '2027-12-31T18:00:00Z',
        ticketPrice: 50,
        capacity: 1000,
      };

      const result = validateEvent(eventWithWhitespace);

      expect(result.isValid).toBe(true);
      expect(result.data.name).toBe(eventWithWhitespace.name.trim());
      expect(result.data.location).toBe(eventWithWhitespace.location.trim());
    });
  });

  describe('validatePartialUpdateEvent', () => {
    test('should validate partial update with only provided fields', () => {
      const partialEvent = {
        name: 'Updated Event Name',
      };

      const result = validatePartialUpdateEvent(partialEvent);

      expect(result.isValid).toBe(true);
      expect(result.data.name).toBe(partialEvent.name);
      expect(result.data.location).toBeUndefined();
    });

    test('should allow updating only description', () => {
      const partialEvent = {
        description: 'New description',
      };

      const result = validatePartialUpdateEvent(partialEvent);

      expect(result.isValid).toBe(true);
      expect(result.data.description).toBe(partialEvent.description);
    });

    test('should fail if provided field is invalid', () => {
      const partialEvent = {
        name: '',
      };

      const result = validatePartialUpdateEvent(partialEvent);

      expect(result.isValid).toBe(false);
      expect(result.error.details).toEqual(
        expect.arrayContaining([expect.objectContaining({ field: 'name', message: 'name is required' })]),
      );
    });
  });

  describe('validateQueryParams', () => {
    test('should validate valid query parameters', () => {
      const queryParams = {
        location: 'New York',
        status: EVENT_STATUS.UPCOMING,
        min_price: 10,
        max_price: 100,
        page: 1,
        limit: 20,
      };

      const result = validateQueryParams(queryParams);

      expect(result.isValid).toBe(true);
      expect(result.data.location).toBe(queryParams.location);
      expect(result.data.status).toBe(queryParams.status);
      expect(result.data.min_price).toBe(queryParams.min_price);
      expect(result.data.max_price).toBe(queryParams.max_price);
    });

    test('should fail when min_price is greater than max_price', () => {
      const queryParams = {
        min_price: 100,
        max_price: 50,
      };

      const result = validateQueryParams(queryParams);

      expect(result.isValid).toBe(false);
      expect(result.error.message).toBe('min_price must be less than max_price');
    });

    test('should validate status enum correctly', () => {
      const queryParams = {
        status: EVENT_STATUS.UPCOMING,
      };

      const result = validateQueryParams(queryParams);

      expect(result.isValid).toBe(true);
      expect(result.data.status).toBe(queryParams.status);
    });

    test('should fail when status is invalid enum value', () => {
      const queryParams = {
        status: 'INVALID_STATUS',
      };

      const result = validateQueryParams(queryParams);

      expect(result.isValid).toBe(false);
      expect(result.error.details).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            field: 'status',
            message: expect.stringContaining('status must be one of'),
          }),
        ]),
      );
    });

    test('should fail when page is less than 1', () => {
      const queryParams = {
        page: -1,
      };

      const result = validateQueryParams(queryParams);

      expect(result.isValid).toBe(false);
      expect(result.error.details).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            field: 'page',
            message: 'page must be at least 1',
          }),
        ]),
      );
    });
  });
});
