import { TestDataSource } from '../../../config/test-data-source.js';
import { User } from '../../../entities/User.js';

/**
 * Factory function to create test user data
 */
export const createTestUserData = () => {
  const timestamp = Date.now();
  return {
    name: `TestUser${timestamp}`,
    email: `test${timestamp}@example.com`,
    password: 'TestPassword123!',
  };
};

/**
 * Get a test user by email
 */
export const getTestUser = async (email) => {
  const userRepository = TestDataSource.getRepository(User);
  return await userRepository.findOne({ where: { email } });
};
