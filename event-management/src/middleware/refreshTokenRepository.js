import { AppDataSource } from '../config/data-source.js';
import { RefreshToken } from '../entities/RefreshToken.js';
import { RefreshTokenRepository } from '../repositories/refreshTokenRepository.js';

export const injectRefreshTokenRepository = (req, res, next) => {
  try {
    const refreshTokenRepo = AppDataSource.getRepository(RefreshToken);
    const refreshTokenRepository = new RefreshTokenRepository(refreshTokenRepo);

    req.refreshTokenRepository = refreshTokenRepository;
    next();
  } catch (error) {
    console.error('Error injecting refresh token repository:', error);
    next(error);
  }
};
