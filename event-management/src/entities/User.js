import 'reflect-metadata';
import { EntitySchema } from 'typeorm';

export const User = new EntitySchema({
  name: 'User',
  tableName: 'users',
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
    email: {
      type: 'varchar',
      length: 255,
      nullable: false,
      unique: true,
    },
    password: {
      type: 'varchar',
      length: 255,
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
