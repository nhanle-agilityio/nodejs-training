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

export const CREATE_EVENT = `
  INSERT INTO events (name, description, location, date, ticketPrice, capacity, createdAt, updatedAt)
  VALUES (?, ?, ?, ?, ?, ?, ?, ?)
`;

export const UPDATE_EVENT = `
  UPDATE events SET name = ?, description = ?, location = ?, date = ?, ticketPrice = ?, capacity = ?, updatedAt = ? WHERE id = ?
`;

export const GET_EVENT_BY_ID = `
  SELECT * FROM events WHERE id = ? AND deleteAt is NULL
`;

export const GET_ALL_EVENTS = `
  SELECT * FROM events WHERE deleteAt is NULL
`;
