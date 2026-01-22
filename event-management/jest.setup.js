// Set up test environment variables before any tests run
process.env.JWT_SECRET = 'test-jwt-secret-key-for-testing';
process.env.REFRESH_TOKEN_SECRET = 'test-refresh-token-secret-key-for-testing';
process.env.CLIENT_ORIGIN = 'http://localhost:3000';
