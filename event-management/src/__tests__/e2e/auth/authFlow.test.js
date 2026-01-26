import request from 'supertest';
import { createApp } from '../../../app.js';
import { TestDataSource } from '../../../config/test-data-source.js';
import { createTestUserData, resetDatabase, getTestUser } from '../helpers/index.js';

describe('E2E: Authentication Flow', () => {
  let app;
  let userData;
  let accessToken;
  let refreshToken;

  beforeAll(async () => {
    app = await createApp(TestDataSource);
  });

  afterAll(async () => {
    if (TestDataSource.isInitialized) {
      await TestDataSource.destroy();
    }
  });

  beforeEach(async () => {
    await resetDatabase();
  });

  test('Complete authentication flow: Register -> Login -> Access Protected Route -> Refresh Token -> Logout', async () => {
    console.log('Step 1: Registering user...');
    userData = createTestUserData();

    const registerResponse = await request(app).post('/users').send(userData);

    expect(registerResponse.status).toBe(201);
    expect(registerResponse.body).toHaveProperty('id');
    expect(registerResponse.body.email).toBe(userData.email);

    const userInDb = await getTestUser(userData.email);

    expect(userInDb).toBeTruthy();
    expect(userInDb.id).toBe(registerResponse.body.id);
    console.log('✓ User registered successfully');

    console.log('Step 2: Logging in...');
    const loginResponse = await request(app).post('/token').send({
      email: userData.email,
      password: userData.password,
    });

    expect(loginResponse.status).toBe(200);
    expect(loginResponse.body).toHaveProperty('accessToken');
    expect(loginResponse.body).toHaveProperty('refreshToken');
    expect(loginResponse.body).toHaveProperty('expiresIn');
    expect(loginResponse.body).toHaveProperty('expiresAt');

    accessToken = loginResponse.body.accessToken;
    refreshToken = loginResponse.body.refreshToken;

    expect(typeof accessToken).toBe('string');
    expect(typeof refreshToken).toBe('string');
    expect(accessToken.length).toBeGreaterThan(0);
    expect(refreshToken.length).toBeGreaterThan(0);

    console.log('✓ Login successful, tokens received');

    console.log('Step 3: Accessing protected route...');
    const protectedResponse = await request(app).get('/user').set('Authorization', `Bearer ${accessToken}`);

    expect(protectedResponse.status).toBe(200);
    expect(protectedResponse.body).toHaveProperty('id');
    expect(protectedResponse.body).toHaveProperty('email', userData.email);
    expect(protectedResponse.body).toHaveProperty('name', userData.name);
    expect(protectedResponse.body).not.toHaveProperty('password'); // Password should not be returned

    console.log('✓ Protected route accessed successfully');

    console.log('Step 4: Refreshing access token...');
    const refreshResponse = await request(app).post('/token/refresh').send({ refreshToken });

    expect(refreshResponse.status).toBe(200);
    expect(refreshResponse.body).toHaveProperty('accessToken');
    expect(refreshResponse.body).toHaveProperty('refreshToken');

    const newAccessToken = refreshResponse.body.accessToken;
    const newRefreshToken = refreshResponse.body.refreshToken;

    // Verify new refresh token is different
    expect(newRefreshToken).not.toBe(refreshToken);

    expect(typeof newAccessToken).toBe('string');
    expect(typeof newRefreshToken).toBe('string');

    // Verify new access token works
    const protectedResponseAfterRefresh = await request(app)
      .get('/user')
      .set('Authorization', `Bearer ${newAccessToken}`);

    expect(protectedResponseAfterRefresh.status).toBe(200);
    expect(protectedResponseAfterRefresh.body.email).toBe(userData.email);

    console.log('✓ Token refreshed successfully');

    console.log('Step 5: Logging out...');
    const logoutResponse = await request(app).post('/token/logout').send({ refreshToken: newRefreshToken });

    // logout was successful
    expect(logoutResponse.status).toBe(204);

    console.log('✓ Logout successful');

    console.log('Step 6: Verifying refresh token is invalidated...');
    const refreshAfterLogoutResponse = await request(app)
      .post('/token/refresh')
      .send({ refreshToken: newRefreshToken });

    // Should return 401 Unauthorized
    expect(refreshAfterLogoutResponse.status).toBe(401);
    expect(refreshAfterLogoutResponse.body).toHaveProperty('code');
    expect(refreshAfterLogoutResponse.body).toHaveProperty('message');

    console.log('✓ Refresh token is invalidated (cannot be used after logout)');
  });

  test('Should not access protected route without token', async () => {
    // Try to access protected route without token
    const response = await request(app).get('/user');

    // Should return 401 Unauthorized
    expect(response.status).toBe(401);
  });

  test('Should not access protected route with invalid token', async () => {
    // Try to access protected route with invalid token
    const response = await request(app).get('/user').set('Authorization', 'Bearer invalid-token-here');

    // Should return 401 Unauthorized
    expect(response.status).toBe(401);
  });
});
