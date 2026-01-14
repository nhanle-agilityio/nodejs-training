import 'reflect-metadata';
import { EntitySchema } from 'typeorm';

export const Event = new EntitySchema({
  name: 'Event',
  tableName: 'events',
  columns: {
    id: {
      type: 'int',
      primary: true,
      generated: true,
    },
    name: {
      type: 'varchar',
      length: 200,
      nullable: false,
    },
    description: {
      type: 'text',
      nullable: true,
    },
    location: {
      type: 'varchar',
      length: 200,
      nullable: false,
    },
    date: {
      type: 'datetime',
      nullable: false,
    },
    ticketPrice: {
      type: 'decimal',
      precision: 10,
      scale: 2,
      default: 0.0,
    },
    capacity: {
      type: 'int',
      nullable: false,
    },
    createdAt: {
      type: 'datetime',
      createDate: true,
    },
    updatedAt: {
      type: 'datetime',
      updateDate: true,
    },
    deletedAt: {
      type: 'datetime',
      deleteDate: true,
    },
  },
});
