import express from 'express';
import { createEventHandler, updateEventHandler, deleteEventHandler } from '../controllers/eventController.js';
import { validateCreateEvent, validateUpdateEvent, validateDeleteEvent } from '../middleware/validation.js';

const router = express.Router();

router.post('/', validateCreateEvent, createEventHandler);
router.put('/:id', validateUpdateEvent, updateEventHandler);
router.delete('/:id', validateDeleteEvent, deleteEventHandler);

export default router;
