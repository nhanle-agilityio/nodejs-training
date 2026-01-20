import 'reflect-metadata';
import { EntitySchema } from 'typeorm';

export const RefreshToken = new EntitySchema({
  name: 'RefreshToken',
  tableName: 'refresh_tokens',
  columns: {
    id: {
      type: 'int',
      primary: true,
      generated: true,
    },
    token: {
      type: 'varchar',
      length: 255,
      nullable: false,
      unique: true,
    },
    userId: {
      type: 'int',
      nullable: false,
    },
    expiresAt: {
      type: 'datetime',
      nullable: false,
    },
    isUsed: {
      type: 'boolean',
      default: false,
    },
    createdAt: {
      type: 'datetime',
      createDate: true,
    },
  },
  relations: {
    user: {
      type: 'many-to-one',
      target: 'User',
      joinColumn: {
        name: 'userId',
      },
      onDelete: 'CASCADE',
    },
  },
});
