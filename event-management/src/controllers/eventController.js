/**
 * Create a new event
 */
export const createEventHandler = async (req, res, next) => {
  try {
    const event = await req.eventRepository.createEvent(req.body, req.user.id);

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
    const result = await req.eventRepository.updateEvent(req.body, req.params.id, req.user.id);

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
    await req.eventRepository.deleteEvent(req.params.id, req.user.id);

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
    const event = await req.eventRepository.getEventById(req.params.id, req.user.id);

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
    const results = await req.eventRepository.getAllEvents(req.query, req.user.id);

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
    const result = await req.eventRepository.partialUpdateEvent(req.body, req.params.id, req.user.id);

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};
