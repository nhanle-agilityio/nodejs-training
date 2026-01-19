import express from 'express';
import { createUserHandler } from '../controllers/userController.js';
import { injectUserRepository } from '../middleware/userRepository.js';
import { validateUserRegistrationFields } from '../middleware/userValidation.js';

const router = express.Router();

// Inject user repository into request object
router.use(injectUserRepository);

// User registration (no authentication required)
router.post('/', validateUserRegistrationFields, createUserHandler);

export default router;
