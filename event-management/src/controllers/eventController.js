import { createEvent, updateEvent, deleteEvent, getEventById } from '../services/eventService.js';
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

/**
 * Update an event
 */
export const updateEventHandler = async (req, res, next) => {
  try {
    const db = getDatabase();
    const eventRepository = new EventRepository(db);
    const result = await updateEvent(eventRepository, req.body, req.params.id);

    if (result.error) {
      return res.status(404).json(result.error);
    }

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

/**
 * Delete an event
 */
export const deleteEventHandler = async (req, res, next) => {
  try {
    const db = getDatabase();
    const eventRepository = new EventRepository(db);
    const result = await deleteEvent(eventRepository, req.params.id);
    if (result.error) {
      return res.status(404).json(result.error);
    }
    res.status(204).json({});
  } catch (error) {
    next(error);
  }
};

/**
 * Get an event by id
 */
export const getEventHandler = async (req, res, next) => {
  try {
    const db = getDatabase();
    const eventRepository = new EventRepository(db);
    const event = await getEventById(eventRepository, req.params.id);

    if (event.error) {
      return res.status(404).json(event.error);
    }

    res.status(200).json(event);
  } catch (error) {
    next(error);
  }
};
