import {
  createEvent,
  updateEvent,
  deleteEvent,
  getEventById,
  getEvents,
  partialUpdateEvent,
} from '../services/eventService.js';

/**
 * Create a new event
 */
export const createEventHandler = async (req, res, next) => {
  try {
    const event = await createEvent(req.eventRepository, req.body);

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
    const result = await updateEvent(req.eventRepository, req.body, req.params.id);

    if (result.error) {
      const { status, ...errorBody } = result.error;
      return res.status(status).json(errorBody);
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
    const result = await deleteEvent(req.eventRepository, req.params.id);

    if (result.error) {
      const { status, ...errorBody } = result.error;
      return res.status(status).json(errorBody);
    }

    res.status(204).send();
  } catch (error) {
    next(error);
  }
};

/**
 * Get an event by id
 */
export const getEventHandler = async (req, res, next) => {
  try {
    const event = await getEventById(req.eventRepository, req.params.id);

    if (event.error) {
      const { status, ...errorBody } = event.error;
      return res.status(status).json(errorBody);
    }

    res.status(200).json(event);
  } catch (error) {
    next(error);
  }
};

/**
 * Get all events with query params
 */
export const getEventsHandler = async (req, res, next) => {
  try {
    const results = await getEvents(req.eventRepository, req.query);

    if (results.error) {
      const { status, ...errorBody } = results.error;
      return res.status(status).json(errorBody);
    }

    res.status(200).json(results);
  } catch (error) {
    next(error);
  }
};

/**
 * Partial update an event
 */
export const partialUpdateEventHandler = async (req, res, next) => {
  try {
    const result = await partialUpdateEvent(req.eventRepository, req.body, req.params.id);

    if (result.error) {
      const { status, ...errorBody } = result.error;
      return res.status(status).json(errorBody);
    }

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};
