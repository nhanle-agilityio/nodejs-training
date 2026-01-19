import 'reflect-metadata';
import bcrypt from 'bcrypt';
import { User } from '../entities/User.js';

/**
 * User Subscriber
 * Automatically hashes passwords before inserting or updating users
 */
export class UserSubscriber {
  // Specifies which entity this subscriber listens to?
  listenTo() {
    return User;
  }

  // Hash password before inserting a new user
  beforeInsert(event) {
    if (event.entity && event.entity.password) {
      // Only hash if password is not already hashed
      if (!event.entity.password.startsWith('$2')) {
        const salt = bcrypt.genSaltSync();
        event.entity.password = bcrypt.hashSync(event.entity.password, salt);
      }
    }
  }

  // Hash password before updating a user (only if password changed)
  beforeUpdate(event) {
    if (event.entity && event.entity.password) {
      // Check if password is in the updated fields
      const updatedColumns = event.updatedColumns || [];
      const passwordColumn = updatedColumns.find((column) => column.propertyName === 'password');

      if (passwordColumn) {
        // Only hash if password is not already hashed
        if (!event.entity.password.startsWith('$2')) {
          const salt = bcrypt.genSaltSync();
          event.entity.password = bcrypt.hashSync(event.entity.password, salt);
        }
      }
    }
  }
}
