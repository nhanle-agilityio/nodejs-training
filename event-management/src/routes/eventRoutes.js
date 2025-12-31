import express from 'express';
import { createEventHandler, updateEventHandler } from '../controllers/eventController.js';
import { validateCreateEvent, validateUpdateEvent } from '../middleware/validation.js';

const router = express.Router();

router.post('/', validateCreateEvent, createEventHandler);
router.put('/:id', validateUpdateEvent, updateEventHandler);

export default router;
