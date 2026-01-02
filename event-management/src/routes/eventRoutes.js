import express from 'express';
import {
  createEventHandler,
  updateEventHandler,
  deleteEventHandler,
  getEventHandler,
  getEventsHandler,
} from '../controllers/eventController.js';
import { validateEventFields, validateEventIdParam } from '../middleware/validation.js';

const router = express.Router();

router.post('/', validateEventFields, createEventHandler);
router.put('/:id', validateEventIdParam, validateEventFields, updateEventHandler);
router.delete('/:id', validateEventIdParam, deleteEventHandler);
router.get('/:id', validateEventIdParam, getEventHandler);
router.get('/', getEventsHandler);

export default router;
