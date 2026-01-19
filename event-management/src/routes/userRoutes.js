import express from 'express';
import { getCurrentUserHandler, updateUserHandler, deleteUserHandler } from '../controllers/userController.js';
import { injectUserRepository } from '../middleware/userRepository.js';
import { validateUserUpdateFields } from '../middleware/userValidation.js';

const router = express.Router();

// Inject user repository into request object
router.use(injectUserRepository);

// Protected routes (authentication required)
router.get('/', getCurrentUserHandler);
router.put('/', validateUserUpdateFields, updateUserHandler);
router.delete('/', deleteUserHandler);

export default router;
