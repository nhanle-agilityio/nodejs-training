import { createEvent } from '../services/eventService.js';
import { EventRepository } from '../repositories/eventRepository.js';
import { getDatabase } from '../database/db.js';

/**
 * Create a new event
 */
export const createEventHandler = async (req, res, next) => {
  try {
    const db = getDatabase();
    const eventRepository = new EventRepository(db);
    const event = await createEvent(eventRepository, req.body);

    res.status(201).json(event);
  } catch (error) {
    next(error);
  }
};
