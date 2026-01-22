import request from 'supertest';
import { createApp } from '../app.js';
import { AppDataSource } from '../config/data-source.js';

describe('Event Management API - Root Endpoint', () => {
  let app;

  // Initialize database and app before all tests
  beforeAll(async () => {
    // Create the app (this will initialize the database)
    app = await createApp();
  });

  // Close database connection after all tests
  afterAll(async () => {
    if (AppDataSource.isInitialized) {
      await AppDataSource.destroy();
    }
  });

  describe('GET /', () => {
    test('should return 200 and "Event Management API" message', async () => {
      const response = await request(app).get('/').expect(200);

      expect(response.text).toBe('Event Management API');
    });
  });

  describe('GET /nonexistent', () => {
    test('should return 404 for non-existent routes', async () => {
      const response = await request(app).get('/nonexistent').expect(404);

      expect(response.body).toHaveProperty('code');
      expect(response.body).toHaveProperty('message');
      expect(response.body.message).toContain('Resource not found');
    });
  });
});
