import { AppDataSource } from '../config/data-source.js';
import { Event } from '../entities/Event.js';
import { EventRepository } from '../repositories/eventRepository.js';

export const injectRepository = (req, res, next) => {
  try {
    const eventRepo = AppDataSource.getRepository(Event);
    const eventRepository = new EventRepository(eventRepo);

    req.eventRepository = eventRepository;
    next();
  } catch (error) {
    console.error('Error injecting repository:', error);
    next(error);
  }
};
