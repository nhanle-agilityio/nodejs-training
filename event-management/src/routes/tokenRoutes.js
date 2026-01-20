import express from 'express';
import { generateTokenHandler, refreshTokenHandler, logoutHandler } from '../controllers/tokenController.js';
import { injectUserRepository } from '../middleware/userRepository.js';
import { injectRefreshTokenRepository } from '../middleware/refreshTokenRepository.js';
import { validateUserLoginFields } from '../middleware/userValidation.js';
import { validateRefreshTokenFields } from '../middleware/tokenValidation.js';

const router = express.Router();

// Inject repositories into request object
router.use(injectUserRepository);
router.use(injectRefreshTokenRepository);

// Token generation endpoint
router.post('/', validateUserLoginFields, generateTokenHandler);

// Refresh token endpoint
router.post('/refresh', validateRefreshTokenFields, refreshTokenHandler);

// Logout endpoint
router.post('/logout', validateRefreshTokenFields, logoutHandler);

export default router;
