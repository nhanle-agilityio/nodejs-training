import express from 'express';
import {
  createEventHandler,
  updateEventHandler,
  deleteEventHandler,
  getEventHandler,
  getEventsHandler,
  partialUpdateEventHandler,
} from '../controllers/eventController.js';
import { validateEventFields, validateEventIdParam } from '../middleware/validation.js';

const router = express.Router();

router.post('/', validateEventFields, createEventHandler);
router.put('/:id', validateEventIdParam, validateEventFields, updateEventHandler);
router.delete('/:id', validateEventIdParam, deleteEventHandler);
router.get('/:id', validateEventIdParam, getEventHandler);
router.get('/', getEventsHandler);
router.patch('/:id', validateEventIdParam, partialUpdateEventHandler);

export default router;
