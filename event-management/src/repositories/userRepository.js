import bcrypt from 'bcrypt';
import { NotFoundError, InternalServerError, CustomError } from '../utils/customErrors.js';

export class UserRepository {
  constructor(repository) {
    this.repository = repository;
  }

  async createUser(userData) {
    try {
      // Hash password before creating user
      if (userData.password && !userData.password.startsWith('$2')) {
        const salt = bcrypt.genSaltSync();
        userData.password = bcrypt.hashSync(userData.password, salt);
      }

      const newUser = this.repository.create(userData);
      const savedUser = await this.repository.save(newUser);
      // Remove password from returned user object
      const { password, ...userWithoutPassword } = savedUser;
      return userWithoutPassword;
    } catch (error) {
      console.error('Error creating user:', error);
      throw new InternalServerError('Failed to create user');
    }
  }

  async findUserById(id) {
    try {
      const user = await this.repository.findOne({ where: { id } });

      if (!user) {
        throw new NotFoundError(`User not found with id: ${id}`);
      }
      return user;
    } catch (error) {
      console.error('Error finding user by id:', error);
      if (error instanceof CustomError) {
        throw error;
      }
      throw new InternalServerError('Failed to find user by id');
    }
  }

  async findUserByEmail(email) {
    try {
      const user = await this.repository.findOne({ where: { email } });
      return user; // Return null if not found (for login purposes)
    } catch (error) {
      console.error('Error finding user by email:', error);
      throw new InternalServerError('Failed to find user by email');
    }
  }

  async updateUser(userData, id) {
    try {
      const existingUser = await this.repository.findOne({ where: { id } });

      if (!existingUser) {
        throw new NotFoundError(`User not found with id: ${id}`);
      }

      // Hash password if it's being updated and not already hashed
      if (userData.password && !userData.password.startsWith('$2')) {
        const salt = bcrypt.genSaltSync();
        userData.password = bcrypt.hashSync(userData.password, salt);
      }

      this.repository.merge(existingUser, userData);
      const updatedUser = await this.repository.save(existingUser);

      // Remove password from returned user object
      const { password, ...userWithoutPassword } = updatedUser;
      return userWithoutPassword;
    } catch (error) {
      console.error('Error updating user:', error);
      if (error instanceof CustomError) {
        throw error;
      }
      throw new InternalServerError('Failed to update user');
    }
  }

  async deleteUser(id) {
    try {
      const result = await this.repository.softDelete(id);

      if (result.affected === 0) {
        throw new NotFoundError(`User not found with id: ${id}`);
      }
    } catch (error) {
      console.error('Error deleting user:', error);
      if (error instanceof CustomError) {
        throw error;
      }
      throw new InternalServerError('Failed to delete user');
    }
  }

  /**
   * Compare a plain password with an encoded (hashed) password
   */
  static isPassword(encodedPassword, password) {
    try {
      return bcrypt.compareSync(password, encodedPassword);
    } catch (error) {
      console.error('Error comparing passwords:', error);
      return false;
    }
  }
}
