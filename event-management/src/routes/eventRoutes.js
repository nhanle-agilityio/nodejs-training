import express from 'express';
import {
  createEventHandler,
  updateEventHandler,
  deleteEventHandler,
  getEventHandler,
  getEventsHandler,
  partialUpdateEventHandler,
} from '../controllers/eventController.js';
import {
  validateEventFields,
  validateEventIdParam,
  validatePartialEventFields,
  validateParams,
} from '../middleware/validation.js';
import { injectRepository } from '../middleware/repository.js';
const router = express.Router();

// Inject the repository into the request object
router.use(injectRepository);

// Create a new event
router.post('/', validateEventFields, createEventHandler);

// Update an event
router.put('/:id', validateEventIdParam, validateEventFields, updateEventHandler);

// Delete an event
router.delete('/:id', validateEventIdParam, deleteEventHandler);

// Get an event by id
router.get('/:id', validateEventIdParam, getEventHandler);

// Get all events
router.get('/', validateParams, getEventsHandler);

// Partial update an event
router.patch('/:id', validateEventIdParam, validatePartialEventFields, partialUpdateEventHandler);

export default router;
