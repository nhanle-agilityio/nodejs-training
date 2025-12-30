import express from 'express';
import { createEventHandler } from '../controllers/eventController.js';
import { validateCreateEvent } from '../middleware/validation.js';

const router = express.Router();

router.post('/', validateCreateEvent, createEventHandler);

export default router;
