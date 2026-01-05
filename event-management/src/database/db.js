import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import { CREATE_TABLE_EVENTS } from '../repositories/query-template/events.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

let db = null;

/**
 * Initialize database connection and create tables
 */
export const initDatabase = async () => {
  if (db) {
    return db;
  }

  try {
    const dbPath = join(__dirname, process.env.DATABASE_PATH);

    db = await open({
      filename: dbPath,
      driver: sqlite3.Database,
    });

    // Create events table
    await db.exec(CREATE_TABLE_EVENTS);

    console.log('Database initialized successfully');
    return db;
  } catch (error) {
    console.error('Error initializing database:', error);
    throw error;
  }
};

/**
 * Get database instance
 */
export const getDatabase = () => {
  if (!db) {
    throw new Error('Database not initialized. Call initDatabase() first.');
  }
  return db;
};
