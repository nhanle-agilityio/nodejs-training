export const CREATE_TABLE_EVENTS = `
  CREATE TABLE IF NOT EXISTS events (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    description TEXT,
    location TEXT NOT NULL,
    date TEXT NOT NULL,
    ticketPrice REAL NOT NULL DEFAULT 0 CHECK(ticketPrice >= 0),
    capacity INTEGER NOT NULL CHECK(capacity > 0),
    createdAt TEXT NOT NULL DEFAULT (datetime('now')),
    updatedAt TEXT NOT NULL DEFAULT (datetime('now')),
    deleteAt TEXT NULL
  );
`;

export const EVENT_SELECT_COLUMNS =
  'id, name, description, location, date, ticketPrice, capacity, createdAt, updatedAt';

export const CREATE_EVENT = `
  INSERT INTO events (name, description, location, date, ticketPrice, capacity, createdAt, updatedAt)
  VALUES (?, ?, ?, ?, ?, ?, ?, ?)
`;

export const UPDATE_EVENT = `
  UPDATE events SET name = ?, description = ?, location = ?, date = ?, ticketPrice = ?, capacity = ?, updatedAt = ? WHERE id = ?
`;

export const DELETE_EVENT = `
  UPDATE events SET deleteAt = datetime('now') WHERE id = ? AND deleteAt is NULL
`;

export const GET_EVENT_BY_ID = `
  SELECT ${EVENT_SELECT_COLUMNS} FROM events WHERE id = ? AND deleteAt is NULL
`;

export const GET_ALL_EVENTS = `
  SELECT ${EVENT_SELECT_COLUMNS} FROM events WHERE deleteAt is NULL
`;

export const GET_EVENTS_COUNT = `
  SELECT COUNT(*) AS total_events FROM events WHERE deleteAt is NULL
`;

export const PARTIAL_UPDATE_EVENT = `
  UPDATE events SET name = COALESCE(?, name), description = COALESCE(?, description), location = COALESCE(?, location), date = COALESCE(?, date), ticketPrice = COALESCE(?, ticketPrice), capacity = COALESCE(?, capacity), updatedAt = ? WHERE id = ?
`;
