import { getDatabase } from '../database/db.js';
import { EventRepository } from '../repositories/eventRepository.js';

export const injectRepository = (req, res, next) => {
  try {
    const db = getDatabase();
    const eventRepository = new EventRepository(db);

    req.eventRepository = eventRepository;
    next();
  } catch (error) {
    console.error('Error injecting repository:', error);
    next(error);
  }
};
