import { TestDataSource } from '../../../config/test-data-source.js';
import { User } from '../../../entities/User.js';
import { RefreshToken } from '../../../entities/RefreshToken.js';
import { Event } from '../../../entities/Event.js';

/**
 * Initialize test database connection
 */
export const initializeTestDatabase = async () => {
  if (!TestDataSource.isInitialized) {
    await TestDataSource.initialize();
  }
};

/**
 * Reset database by clearing all tables
 */
export const resetDatabase = async () => {
  if (!TestDataSource.isInitialized) {
    await initializeTestDatabase();
  }

  // Get repositories
  const userRepository = TestDataSource.getRepository(User);
  const refreshTokenRepository = TestDataSource.getRepository(RefreshToken);
  const eventRepository = TestDataSource.getRepository(Event);

  // Delete all records
  await refreshTokenRepository.createQueryBuilder().delete().execute();

  await eventRepository.createQueryBuilder().delete().execute();

  await userRepository.createQueryBuilder().delete().execute();
};
