# Event Management API

A RESTful API for managing local events built with Node.js, Express, and SQLite. This API provides full CRUD operations for events with advanced features like filtering, pagination, and partial updates.

## Goals

The goals of this project are to help you:

- Understand what the RESTful APIs are, including best practices and conventions
- Learn how to create a RESTful API
- Learn about common HTTP methods like GET, POST, PUT, PATCH, DELETE
- Learn about status codes and error handling in APIs
- Learn how to perform CRUD operations using an API
- Learn how to work with databases

## Requirements

You should create a RESTful API for managing local events. The API should allow users to perform the following operations:

- Create a new event (e.g., a workshop, concert, or meetup).
- Update event details (e.g., change the venue or time).
- Delete a cancelled event.
- Get details of a single event.
- List all events with filtering capabilities.

## Installation

1. Clone repository

```bash
git clone git@gitlab.asoft-python.com:nhan.le/nodejs-training.git
```

2. Go to the nodejs-training directory

```bash
cd nodejs-training
```

3. Checkout branch

```bash
git checkout feature/expressjs_practice
```

4. Navigate to the project directory:

```bash
cd event-management
```

5. Install dependencies:

```bash
npm install
```

## Configuration

Create a `.env` file in the `event-management` directory with the following variables:

```env
PORT=3000
DATABASE_PATH=../../data/events.db
```

## Running the Application

Start the server:

```bash
npm start
```

The API will be available at `http://localhost:3000` (or the port specified in your `.env` file).

You should see:

```
Database initialized successfully
Event Management API listening on port 3000
```

## API Documentation

Base URL: `http://localhost:3000`

All endpoints are prefixed with `/events`.

### Create Event

Create a new event.

**Endpoint:** `POST /events`

**Request Body:**

```json
{
  "name": "Tech Meetup 2026",
  "description": "A gathering for local developers.",
  "location": "Downtown Community Hall",
  "date": "2026-02-25T18:00:00Z",
  "ticketPrice": 15.0,
  "capacity": 100
}
```

**Response:** `201 Created`

```json
{
  "id": 1,
  "name": "Tech Meetup 2026",
  "description": "A gathering for local developers.",
  "location": "Downtown Community Hall",
  "date": "2026-02-25T18:00:00Z",
  "ticketPrice": 15,
  "capacity": 100,
  "createdAt": "2026-01-06T02:28:49.995Z",
  "updatedAt": "2026-01-06T02:28:49.995Z"
}
```

### Get All Events

Retrieve all events with optional filtering, pagination, and sorting.

**Endpoint:** `GET /events`

**Query Parameters:**

- `location` (string): Filter by location (partial match)
- `status` (string): Filter by status - `"upcoming"` or `"past"`
- `min_price` (number): Minimum ticket price
- `max_price` (number): Maximum ticket price
- `page` (number): Page number
- `limit` (number): Items per page
- `sort` (string): Sort field and direction, e.g., `"name:asc"`, `"date:desc"`. Sortable fields: `name`, `ticketPrice`, `location`, `capacity`, `date`, `createdAt`, `updatedAt`

**Example Requests:**

```bash
# Get all events
GET /events

# Filter by location
GET /events?location=Downtown

# Filter by status
GET /events?status=upcoming

# Filter by price range
GET /events?min_price=10&max_price=50

# Pagination
GET /events?page=1&limit=10

# Sorting
GET /events?sort=date:asc

# Combined filters
GET /events?status=upcoming&location=Downtown&min_price=10&page=1&limit=5&sort=date:asc
```

**Response:** `200 OK`

```json
{
  "data": [
    {
      "id": 1,
      "name": "Tech Meetup 2026",
      "description": "A gathering for local developers.",
      "location": "Downtown Community Hall",
      "date": "2026-02-25T18:00:00Z",
      "ticketPrice": 15,
      "capacity": 100,
      "createdAt": "2026-01-06T02:28:49.995Z",
      "updatedAt": "2026-01-06T02:28:49.995Z"
    }
  ],
  "meta": {
    "total": 1,
    "page": 1,
    "last_page": 1
  }
}
```

### Get Single Event

Retrieve a specific event by ID.

**Endpoint:** `GET /events/:id`

**Example:**

```bash
GET /events/1
```

**Response:** `200 OK`

```json
{
  "id": 1,
  "name": "Tech Meetup 2026",
  "description": "A gathering for local developers.",
  "location": "Downtown Community Hall",
  "date": "2026-02-25T18:00:00Z",
  "ticketPrice": 15,
  "capacity": 100,
  "createdAt": "2026-01-06T02:28:49.995Z",
  "updatedAt": "2026-01-06T02:28:49.995Z"
}
```

### Update Event

Update an entire event (all fields required).

**Endpoint:** `PUT /events/:id`

**Request Body:**

```json
{
  "name": "Tech Meetup 2026 (Rescheduled)",
  "description": "Updated description due to venue change.",
  "location": "City Library Conference Room",
  "date": "2026-02-25T18:00:00Z",
  "ticketPrice": 10.0,
  "capacity": 50
}
```

**Response:** `200 OK`

```json
{
  "id": 1,
  "name": "Tech Meetup 2026 (Rescheduled)",
  "description": "Updated description due to venue change.",
  "location": "City Library Conference Room",
  "date": "2026-02-25T18:00:00Z",
  "ticketPrice": 10,
  "capacity": 50,
  "createdAt": "2026-01-06T02:28:49.995Z",
  "updatedAt": "2026-01-06T02:38:52.135Z"
}
```

### Partial Update Event

Update specific fields of an event (only send fields you want to update).

**Endpoint:** `PATCH /events/:id`

**Request Body:**

```json
{
  "ticketPrice": 20.0,
  "capacity": 150
}
```

**Response:** `200 OK`

```json
{
  "id": 1,
  "name": "Tech Meetup 2026 (Rescheduled)",
  "description": "Updated description due to venue change.",
  "location": "City Library Conference Room",
  "date": "2026-02-25T18:00:00Z",
  "ticketPrice": 20,
  "capacity": 150,
  "createdAt": "2026-01-06T02:28:49.995Z",
  "updatedAt": "2026-01-06T02:40:41.418Z"
}
```

### Delete Event

Delete an event by ID.

**Endpoint:** `DELETE /events/:id`

**Example:**

```bash
DELETE /events/1
```

**Response:** `204 No Content` (no response body)

## Development

### Testing the API

**Example with curl:**

```bash
# Create an event
curl -X POST 'http://localhost:3000/events' \
  -H 'Content-Type: application/json' \
  -d '{
    "name": "Tech Meetup 2026",
    "description": "A gathering for local developers.",
    "location": "Downtown Community Hall",
    "date": "2026-02-25T18:00:00Z",
    "ticketPrice": 15.00,
    "capacity": 100
  }'

# Get all events
curl http://localhost:3000/events

# Get event by ID
curl http://localhost:3000/events/1

# Update event
curl -X PUT 'http://localhost:3000/events/1' \
  -H 'Content-Type: application/json' \
  -d '{
    "name": "Tech Meetup 2026 (Rescheduled)",
    "description": "Updated description due to venue change.",
    "location": "City Library Conference Room",
    "date": "2026-02-25T18:00:00Z",
    "ticketPrice": 10.00,
    "capacity": 50
  }'

# Partial update
curl -X PATCH 'http://localhost:3000/events/1' \
  -H 'Content-Type: application/json' \
  -d '{
    "ticketPrice": 20.00,
    "capacity": 150
  }'

# Delete event
curl -X DELETE http://localhost:3000/events/1
```
