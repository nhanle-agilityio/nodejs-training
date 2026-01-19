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
    userId: {
      type: 'int',
      nullable: true,
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
  relations: {
    user: {
      type: 'many-to-one',
      target: 'User',
      inverseSide: 'events',
      joinColumn: {
        name: 'userId',
        referencedColumnName: 'id',
      },
      nullable: true,
    },
  },
});
