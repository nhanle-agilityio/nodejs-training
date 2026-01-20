import crypto from 'crypto';
import { InternalServerError } from '../utils/customErrors.js';
import { config } from '../config/config.js';

export class RefreshTokenRepository {
  constructor(repository) {
    this.repository = repository;
  }

  // Create and store a new refresh token for a user
  async createRefreshToken(userId) {
    try {
      const tokenString = crypto.randomUUID();
      const expiresAt = new Date(Date.now() + config.refreshTokenExpiresIn * 1000);

      const refreshToken = this.repository.create({
        token: tokenString,
        userId,
        expiresAt,
        isUsed: false,
      });

      await this.repository.save(refreshToken);

      return {
        token: tokenString,
        expiresAt,
      };
    } catch (error) {
      console.error('Error creating refresh token:', error);
      throw new InternalServerError('Failed to create refresh token');
    }
  }

  // Find a valid refresh token
  async findValidToken(tokenString) {
    try {
      const token = await this.repository.findOne({
        where: {
          token: tokenString,
          isUsed: false,
        },
      });

      if (!token) {
        return null;
      }

      // Check if token is expired
      if (new Date(token.expiresAt) < new Date()) {
        return null;
      }

      return token;
    } catch (error) {
      console.error('Error finding refresh token:', error);
      throw new InternalServerError('Failed to find refresh token');
    }
  }

  // Mark a refresh token as used (for token rotation)
  async markAsUsed(tokenId) {
    try {
      await this.repository.update(tokenId, { isUsed: true });
    } catch (error) {
      console.error('Error marking token as used:', error);
      throw new InternalServerError('Failed to update refresh token');
    }
  }

  // Delete a refresh token
  async deleteToken(tokenString) {
    try {
      const result = await this.repository.delete({ token: tokenString });
      return result.affected > 0;
    } catch (error) {
      console.error('Error deleting refresh token:', error);
      throw new InternalServerError('Failed to delete refresh token');
    }
  }
}
