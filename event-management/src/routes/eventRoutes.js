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

router.use(injectRepository);
router.post('/', validateEventFields, createEventHandler);
router.put('/:id', validateEventIdParam, validateEventFields, updateEventHandler);
router.delete('/:id', validateEventIdParam, deleteEventHandler);
router.get('/:id', validateEventIdParam, getEventHandler);
router.get('/', validateParams, getEventsHandler);
router.patch('/:id', validateEventIdParam, validatePartialEventFields, partialUpdateEventHandler);

export default router;
