import jwt from 'jwt-simple';
import { config } from '../config/config.js';
import { UserRepository } from '../repositories/userRepository.js';

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
    // Validate email and password are provided
    if (!req.body.email || !req.body.password) {
      return res.sendStatus(401);
    }

    const { email, password } = req.body;
    const user = await req.userRepository.findUserByEmail(email);

    if (!user || !UserRepository.isPassword(user.password, password)) {
      return res.sendStatus(401);
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
    res.sendStatus(401);
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
      return res.status(401).json({ error: 'invalid_refresh_token' });
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
    res.status(401).json({ error: 'token_refresh_failed' });
  }
};

/**
 * Logout user by invalidating refresh token
 */
export const logoutHandler = async (req, res, next) => {
  try {
    const { refreshToken } = req.body;

    // Delete the refresh token from database
    const deleted = await req.refreshTokenRepository.deleteToken(refreshToken);

    if (!deleted) {
      return res.status(400).json({ error: 'invalid_refresh_token' });
    }

    res.status(204).send();
  } catch (error) {
    console.error('Error during logout:', error);
    res.status(500).json({ error: 'logout_failed' });
  }
};
