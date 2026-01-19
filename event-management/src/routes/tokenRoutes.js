import express from 'express';
import { generateTokenHandler } from '../controllers/tokenController.js';
import { injectUserRepository } from '../middleware/userRepository.js';
import { validateUserLoginFields } from '../middleware/userValidation.js';

const router = express.Router();

// Inject user repository into request object
router.use(injectUserRepository);

// Token generation endpoint
router.post('/', validateUserLoginFields, generateTokenHandler);

export default router;
