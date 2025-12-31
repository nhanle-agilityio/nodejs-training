import { CREATE_EVENT, GET_EVENT_BY_ID, GET_ALL_EVENTS, UPDATE_EVENT, DELETE_EVENT } from './query-template/events.js';

export class EventRepository {
  constructor(db) {
    this.db = db;
  }

  async createEvent(event) {
    try {
      const now = new Date().toISOString();
      const result = await this.db.run(CREATE_EVENT, [
        event.name,
        event.description,
        event.location,
        event.date,
        event.ticketPrice,
        event.capacity,
        now,
        now,
      ]);
      return this.getEventById(result.lastID);
    } catch (error) {
      console.error('Error creating event:', error);
      throw error;
    }
  }

  async updateEvent(event, id) {
    try {
      const now = new Date().toISOString();

      const result = await this.db.run(UPDATE_EVENT, [
        event.name,
        event.description,
        event.location,
        event.date,
        event.ticketPrice,
        event.capacity,
        now,
        id,
      ]);

      if (result.changes === 0) {
        return {
          error: {
            code: 'NOT_FOUND',
            message: `Event not found with id: ${id}`,
          },
        };
      }

      return this.getEventById(id);
    } catch (error) {
      console.error('Error updating event:', error);
      throw error;
    }
  }

  async deleteEvent(id) {
    try {
      const result = await this.db.run(DELETE_EVENT, id);
      if (result.changes === 0) {
        return {
          error: {
            code: 'NOT_FOUND',
            message: `Event not found with id: ${id}`,
          },
        };
      }

      return result;
    } catch (error) {
      console.error('Error deleting event:', error);
      throw error;
    }
  }

  async getEventById(id) {
    return this.db.get(GET_EVENT_BY_ID, id);
  }

  async getAllEvents() {
    return this.db.all(GET_ALL_EVENTS);
  }
}
