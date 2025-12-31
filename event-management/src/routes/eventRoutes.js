import express from 'express';
import {
  createEventHandler,
  updateEventHandler,
  deleteEventHandler,
  getEventHandler,
} from '../controllers/eventController.js';
import { validateEventFields, validateEventIdParam } from '../middleware/validation.js';

const router = express.Router();

router.post('/', validateEventFields, createEventHandler);
router.put('/:id', validateEventIdParam, validateEventFields, updateEventHandler);
router.delete('/:id', validateEventIdParam, deleteEventHandler);
router.get('/:id', validateEventIdParam, getEventHandler);

export default router;
