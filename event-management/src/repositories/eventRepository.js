import { LessThanOrEqual, MoreThanOrEqual, Like, Between } from 'typeorm';
import { PAGE_SIZE, PAGE_NUMBER, EVENT_STATUS } from '../constants/index.js';
import { buildOrderBy } from '../utils/queryBuilder.js';
import { NotFoundError, InternalServerError, CustomError } from '../utils/customErrors.js';

export class EventRepository {
  constructor(repository) {
    this.repository = repository;
  }

  async createEvent(eventData, userId) {
    try {
      const eventWithUserId = { ...eventData, userId };
      const newEvent = await this.repository.create(eventWithUserId);
      const savedEvent = await this.repository.save(newEvent);
      return savedEvent;
    } catch (error) {
      console.error('Error creating event:', error);
      throw new InternalServerError('Failed to create event');
    }
  }

  async updateEvent(event, id, userId) {
    try {
      const existingEvent = await this.repository.findOne({
        where: { id, userId },
      });

      if (!existingEvent) {
        throw new NotFoundError(`Event not found with id: ${id}`);
      }

      this.repository.merge(existingEvent, event);
      return this.repository.save(existingEvent);
    } catch (error) {
      console.error('Error updating event:', error);
      if (error instanceof CustomError) {
        throw error;
      }
      throw new InternalServerError('Failed to update event');
    }
  }

  async deleteEvent(id, userId) {
    try {
      const existingEvent = await this.repository.findOne({
        where: { id, userId },
      });

      if (!existingEvent) {
        throw new NotFoundError(`Event not found with id: ${id}`);
      }

      const result = await this.repository.softDelete(id);

      if (result.affected === 0) {
        throw new NotFoundError(`Event not found with id: ${id}`);
      }
    } catch (error) {
      console.error('Error deleting event:', error);
      if (error instanceof CustomError) {
        throw error;
      }
      throw new InternalServerError('Failed to delete event');
    }
  }

  async getEventById(id, userId) {
    try {
      const event = await this.repository.findOne({
        where: { id, userId },
      });

      if (!event) {
        throw new NotFoundError(`Event not found with id: ${id}`);
      }
      return event;
    } catch (error) {
      console.error('Error getting event by id:', error);
      if (error instanceof CustomError) {
        throw error;
      }
      throw new InternalServerError('Failed to get event by id');
    }
  }

  async getAllEvents(paramsFilters, userId) {
    try {
      const { location, status, min_price, max_price, page, limit, sort } = paramsFilters;
      const pageSize = Number(limit) || PAGE_SIZE;
      const pageNumber = Number(page) || PAGE_NUMBER;

      const where = { userId };

      if (location) {
        where.location = Like(`%${location}%`);
      }

      if (min_price && max_price) {
        where.ticketPrice = Between(min_price, max_price);
      } else if (min_price) {
        where.ticketPrice = MoreThanOrEqual(min_price);
      } else if (max_price) {
        where.ticketPrice = LessThanOrEqual(max_price);
      }

      if (status) {
        const now = new Date();
        if (status === EVENT_STATUS.UPCOMING) {
          where.date = MoreThanOrEqual(now);
        } else if (status === EVENT_STATUS.PAST) {
          where.date = LessThanOrEqual(now);
        }
      }

      const order = buildOrderBy(sort);

      // Get events with pagination, sorting, and total count
      const [results, total] = await this.repository.findAndCount({
        where,
        order,
        skip: (pageNumber - 1) * pageSize,
        take: pageSize,
      });

      return {
        data: results,
        meta: {
          total,
          page: pageNumber,
          last_page: Math.ceil(total / pageSize),
        },
      };
    } catch (error) {
      console.error('Error getting events:', error);
      throw new InternalServerError('Failed to get events');
    }
  }

  async partialUpdateEvent(event, id, userId) {
    try {
      const existingEvent = await this.repository.findOne({
        where: { id, userId },
      });

      if (!existingEvent) {
        throw new NotFoundError(`Event not found with id: ${id}`);
      }

      // Merge only provided fields
      this.repository.merge(existingEvent, event);
      const updatedEvent = await this.repository.save(existingEvent);

      return updatedEvent;
    } catch (error) {
      console.error('Error partial updating event:', error);
      if (error instanceof CustomError) {
        throw error;
      }
      throw new InternalServerError('Failed to partial update event');
    }
  }
}
