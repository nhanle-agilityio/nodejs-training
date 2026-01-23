import { AppDataSource } from '../../../config/data-source.js';
import { User } from '../../../entities/User.js';
import { RefreshToken } from '../../../entities/RefreshToken.js';
import { Event } from '../../../entities/Event.js';

/**
 * Initialize test database connection
 */
export const initializeTestDatabase = async () => {
  if (!AppDataSource.isInitialized) {
    await AppDataSource.initialize();
  }
};

/**
 * Reset database by clearing all tables
 */
export const resetDatabase = async () => {
  if (!AppDataSource.isInitialized) {
    await initializeTestDatabase();
  }

  // Get repositories
  const userRepository = AppDataSource.getRepository(User);
  const refreshTokenRepository = AppDataSource.getRepository(RefreshToken);
  const eventRepository = AppDataSource.getRepository(Event);

  // Delete all records
  await refreshTokenRepository.createQueryBuilder().delete().execute();

  await eventRepository.createQueryBuilder().delete().execute();

  await userRepository.createQueryBuilder().delete().execute();
};
