import jwt from 'jwt-simple';
import { config } from '../config/config.js';
import { UserRepository } from '../repositories/userRepository.js';
import { ERROR_CODES } from '../constants/index.js';

/**
 * Generate access token with expiration
 */
const generateAccessToken = (userId) => {
  const now = Math.floor(Date.now() / 1000);
  const exp = now + config.accessTokenExpiresIn;
  const payload = {
    id: userId,
    iat: now,
    exp,
  };
  return {
    token: jwt.encode(payload, config.jwtSecret),
    expiresAt: exp * 1000,
  };
};

/**
 * Generate JWT token for authenticated user
 */
export const generateTokenHandler = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await req.userRepository.findUserByEmail(email);

    if (!user || !UserRepository.isPassword(user.password, password)) {
      return res.status(401).json({
        code: ERROR_CODES.UNAUTHORIZED,
        message: 'Invalid email or password',
      });
    }

    // Generate access token with expiration
    const { token: accessToken, expiresAt } = generateAccessToken(user.id);

    // Generate and store refresh token
    const refreshTokenData = await req.refreshTokenRepository.createRefreshToken(user.id);

    res.status(200).json({
      accessToken,
      refreshToken: refreshTokenData.token,
      expiresIn: config.accessTokenExpiresIn,
      expiresAt,
    });
  } catch (error) {
    console.error('Error generating token:', error);
    next(error);
  }
};

/**
 * Refresh access token using refresh token
 */
export const refreshTokenHandler = async (req, res, next) => {
  try {
    const { refreshToken } = req.body;

    // Find valid refresh token in database
    const storedToken = await req.refreshTokenRepository.findValidToken(refreshToken);

    if (!storedToken) {
      return res.status(401).json({
        code: ERROR_CODES.UNAUTHORIZED,
        message: 'Invalid or expired refresh token',
      });
    }

    // Mark old refresh token as used
    await req.refreshTokenRepository.markAsUsed(storedToken.id);

    // Generate new access token
    const { token: accessToken, expiresAt } = generateAccessToken(storedToken.userId);

    // Generate new refresh token
    const newRefreshTokenData = await req.refreshTokenRepository.createRefreshToken(storedToken.userId);

    res.status(200).json({
      accessToken,
      refreshToken: newRefreshTokenData.token,
      expiresIn: config.accessTokenExpiresIn,
      expiresAt,
    });
  } catch (error) {
    console.error('Error refreshing token:', error);
    next(error);
  }
};

/**
 * Logout user by invalidating refresh token
 */
export const logoutHandler = async (req, res, next) => {
  try {
    const { refreshToken } = req.body;
    const storedToken = await req.refreshTokenRepository.findValidToken(refreshToken);

    if (!storedToken) {
      return res.status(401).json({
        code: ERROR_CODES.UNAUTHORIZED,
        message: 'Invalid or expired refresh token',
      });
    }

    // Delete the refresh token from database
    await req.refreshTokenRepository.deleteToken(refreshToken);

    res.status(204).send();
  } catch (error) {
    console.error('Error during logout:', error);
    next(error);
  }
};
