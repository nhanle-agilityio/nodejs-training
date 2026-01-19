import { AppDataSource } from '../config/data-source.js';
import { User } from '../entities/User.js';
import { UserRepository } from '../repositories/userRepository.js';

export const injectUserRepository = (req, res, next) => {
  try {
    const userRepo = AppDataSource.getRepository(User);
    const userRepository = new UserRepository(userRepo);

    req.userRepository = userRepository;
    next();
  } catch (error) {
    console.error('Error injecting user repository:', error);
    next(error);
  }
};
