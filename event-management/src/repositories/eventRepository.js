import {
  CREATE_EVENT,
  GET_EVENT_BY_ID,
  GET_ALL_EVENTS,
  UPDATE_EVENT,
  DELETE_EVENT,
  GET_EVENTS_COUNT,
  PARTIAL_UPDATE_EVENT,
} from './query-template/events.js';
import { PAGE_SIZE, PAGE_NUMBER, EVENT_STATUS } from '../constants/index.js';
import { buildOrderBy } from '../utils/queryBuilder.js';

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
            status: 404,
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
            status: 404,
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
    try {
      const event = await this.db.get(GET_EVENT_BY_ID, id);

      if (!event) {
        return {
          error: {
            status: 404,
            code: 'NOT_FOUND',
            message: `Event not found with id: ${id}`,
          },
        };
      }
      return event;
    } catch (error) {
      console.error('Error getting event by id:', error);
      throw error;
    }
  }

  async getAllEvents(paramsFilters) {
    try {
      const { location, status, min_price, max_price, page, limit, sort } = paramsFilters;
      const params = [];
      const pageSize = limit || PAGE_SIZE;
      const pageNumber = page || PAGE_NUMBER;
      let queryFilters = '';

      if (location) {
        queryFilters += ' AND location LIKE ?';
        params.push(`%${location}%`);
      }

      if (min_price) {
        queryFilters += ' AND ticketPrice >= ?';
        params.push(min_price);
      }

      if (max_price) {
        queryFilters += ' AND ticketPrice <= ?';
        params.push(max_price);
      }

      if (status) {
        const now = new Date().toISOString();
        if (status === EVENT_STATUS.UPCOMING) {
          queryFilters += ' AND date >= ?';
          params.push(now);
        } else if (status === EVENT_STATUS.PAST) {
          queryFilters += ' AND date <= ?';
          params.push(now);
        }
      }

      const orderByQuery = buildOrderBy(sort);
      const limitQuery = `LIMIT ${pageSize} OFFSET ${(pageNumber - 1) * pageSize}`;

      // Special case: Create an additional query to get total events (before pagination)
      const totalEventsCount = await this.db.get(`${GET_EVENTS_COUNT} ${queryFilters}`, params);

      // Get events with pagination and sorting
      const results = await this.db.all(`${GET_ALL_EVENTS} ${queryFilters} ${orderByQuery} ${limitQuery}`, params);

      return {
        data: results,
        meta: {
          total: totalEventsCount.total_events,
          page: pageNumber,
          last_page: Math.ceil(totalEventsCount.total_events / pageSize),
        },
      };
    } catch (error) {
      console.error('Error getting events:', error);
      throw error;
    }
  }

  async partialUpdateEvent(event, id) {
    try {
      const now = new Date().toISOString();
      const result = await this.db.run(PARTIAL_UPDATE_EVENT, [
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
            status: 404,
            code: 'NOT_FOUND',
            message: `Event not found with id: ${id}`,
          },
        };
      }
      return this.getEventById(id);
    } catch (error) {
      console.error('Error partial updating event:', error);
      throw error;
    }
  }
}
