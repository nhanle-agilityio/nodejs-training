import { CREATE_EVENT, GET_EVENT_BY_ID, GET_ALL_EVENTS } from './query-template/events.js';

export class EventRepository {
  constructor(db) {
    this.db = db;
  }

  async createEvent(event) {
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
  }

  async getEventById(id) {
    return this.db.get(GET_EVENT_BY_ID, id);
  }

  async getAllEvents() {
    return this.db.all(GET_ALL_EVENTS);
  }
}
