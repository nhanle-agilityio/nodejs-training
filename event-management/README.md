# Event Management API

A RESTful API for managing local events built with Node.js, Express, TypeORM, and SQLite. This API provides full CRUD operations for events with advanced features like filtering, pagination, and partial updates. The API includes a complete authentication system with JWT tokens and refresh tokens.

## Goals

The goals of this project are to help you:

- Understand what the RESTful APIs are, including best practices and conventions
- Learn how to create a RESTful API
- Learn about common HTTP methods like GET, POST, PUT, PATCH, DELETE
- Learn about status codes and error handling in APIs
- Learn how to perform CRUD operations using an API
- Learn how to work with databases
- Learn about authentication and authorization in APIs
- Learn about JWT tokens and refresh tokens

## Features

- **Event Management**: Full CRUD operations for events
- **Authentication**: JWT-based authentication with access and refresh tokens
- **User Management**: User registration, login, profile management
- **Advanced Filtering**: Filter events by location, status, price range
- **Pagination**: Efficient pagination for large event lists
- **Sorting**: Sort events by multiple fields
- **Protected Routes**: Secure endpoints that require authentication

## Requirements

You should create a RESTful API for managing local events. The API should allow users to perform the following operations:

- Create a new event (e.g., a workshop, concert, or meetup).
- Update event details (e.g., change the venue or time).
- Delete a cancelled event.
- Get details of a single event.
- List all events with filtering capabilities.
- Register a new user account.
- Login and receive authentication tokens.
- Manage user profile (view, update, delete).

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
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
REFRESH_TOKEN_SECRET=your-super-secret-refresh-token-key-change-this-in-production
CLIENT_ORIGIN=http://localhost:5173
```

## Running the Application

Start the server:

```bash
npm start
```

The API will be available at `http://localhost:3000` (or the port specified in your `.env` file).

You should see:

```
TypeORM Database initialized successfully
Event Management API listening on port 3000
```

## API Documentation

Base URL: `http://localhost:3000`

### Authentication

Most endpoints require authentication. Include the access token in the Authorization header:

```
Authorization: Bearer <access_token>
```

Access tokens expire after 60 seconds. Use the refresh token endpoint to obtain a new access token.

### Public Endpoints (No Authentication Required)

#### Register User

Create a new user account.

**Endpoint:** `POST /users`

**Request Body:**

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securePassword123"
}
```

**Response:** `201 Created`

```json
{
  "id": 1,
  "name": "John Doe",
  "email": "john@example.com",
  "createdAt": "2026-01-06T02:28:49.995Z",
  "updatedAt": "2026-01-06T02:28:49.995Z"
}
```

#### Login / Generate Token

Authenticate and receive access and refresh tokens.

**Endpoint:** `POST /token`

**Request Body:**

```json
{
  "email": "john@example.com",
  "password": "securePassword123"
}
```

**Response:** `200 OK`

```json
{
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refreshToken": "abc123def456...",
  "expiresIn": 60,
  "expiresAt": 1704511729000
}
```

#### Refresh Token

Get a new access token using a refresh token.

**Endpoint:** `POST /token/refresh`

**Request Body:**

```json
{
  "refreshToken": "abc123def456..."
}
```

**Response:** `200 OK`

```json
{
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refreshToken": "xyz789uvw012...",
  "expiresIn": 60,
  "expiresAt": 1704511789000
}
```

#### Logout

Invalidate a refresh token (logout).

**Endpoint:** `POST /token/logout`

**Request Body:**

```json
{
  "refreshToken": "abc123def456..."
}
```

**Response:** `204 No Content` (no response body)

### Protected Endpoints (Authentication Required)

All protected endpoints require the `Authorization: Bearer <access_token>` header.

#### Get Current User

Get the authenticated user's profile.

**Endpoint:** `GET /user`

**Headers:**

```
Authorization: Bearer <access_token>
```

**Response:** `200 OK`

```json
{
  "id": 1,
  "name": "John Doe",
  "email": "john@example.com",
  "createdAt": "2026-01-06T02:28:49.995Z",
  "updatedAt": "2026-01-06T02:28:49.995Z"
}
```

#### Update Current User

Update the authenticated user's profile.

**Endpoint:** `PUT /user`

**Headers:**

```
Authorization: Bearer <access_token>
```

**Request Body:**

```json
{
  "name": "John Smith",
  "email": "johnsmith@example.com"
}
```

**Response:** `200 OK`

```json
{
  "id": 1,
  "name": "John Smith",
  "email": "johnsmith@example.com",
  "createdAt": "2026-01-06T02:28:49.995Z",
  "updatedAt": "2026-01-06T03:15:30.123Z"
}
```

#### Delete Current User

Delete the authenticated user's account.

**Endpoint:** `DELETE /user`

**Headers:**

```
Authorization: Bearer <access_token>
```

**Response:** `204 No Content` (no response body)

### Event Endpoints

All event endpoints require authentication. Include the `Authorization: Bearer <access_token>` header.

#### Create Event

Create a new event.

**Endpoint:** `POST /events`

**Headers:**

```
Authorization: Bearer <access_token>
Content-Type: application/json
```

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
  "userId": 1,
  "createdAt": "2026-01-06T02:28:49.995Z",
  "updatedAt": "2026-01-06T02:28:49.995Z"
}
```

#### Get All Events

Retrieve all events with optional filtering, pagination, and sorting.

**Endpoint:** `GET /events`

**Headers:**

```
Authorization: Bearer <access_token>
```

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
      "userId": 1,
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

#### Get Single Event

Retrieve a specific event by ID.

**Endpoint:** `GET /events/:id`

**Headers:**

```
Authorization: Bearer <access_token>
```

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
  "userId": 1,
  "createdAt": "2026-01-06T02:28:49.995Z",
  "updatedAt": "2026-01-06T02:28:49.995Z"
}
```

#### Update Event

Update an entire event (all fields required).

**Endpoint:** `PUT /events/:id`

**Headers:**

```
Authorization: Bearer <access_token>
Content-Type: application/json
```

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
  "userId": 1,
  "createdAt": "2026-01-06T02:28:49.995Z",
  "updatedAt": "2026-01-06T02:38:52.135Z"
}
```

#### Partial Update Event

Update specific fields of an event (only send fields you want to update).

**Endpoint:** `PATCH /events/:id`

**Headers:**

```
Authorization: Bearer <access_token>
Content-Type: application/json
```

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
  "userId": 1,
  "createdAt": "2026-01-06T02:28:49.995Z",
  "updatedAt": "2026-01-06T02:40:41.418Z"
}
```

#### Delete Event

Delete an event by ID.

**Endpoint:** `DELETE /events/:id`

**Headers:**

```
Authorization: Bearer <access_token>
```

**Example:**

```bash
DELETE /events/1
```

**Response:** `204 No Content` (no response body)

## Development

### Testing the API

**Example with curl:**

```bash
# Register a new user
curl -X POST 'http://localhost:3000/users' \
  -H 'Content-Type: application/json' \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "securePassword123"
  }'

# Login and get tokens
curl -X POST 'http://localhost:3000/token' \
  -H 'Content-Type: application/json' \
  -d '{
    "email": "john@example.com",
    "password": "securePassword123"
  }'

# Store the accessToken from the response above
ACCESS_TOKEN="your_access_token_here"

# Get current user profile
curl -X GET 'http://localhost:3000/user' \
  -H "Authorization: Bearer $ACCESS_TOKEN"

# Create an event
curl -X POST 'http://localhost:3000/events' \
  -H "Authorization: Bearer $ACCESS_TOKEN" \
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
curl -X GET 'http://localhost:3000/events' \
  -H "Authorization: Bearer $ACCESS_TOKEN"

# Get event by ID
curl -X GET 'http://localhost:3000/events/1' \
  -H "Authorization: Bearer $ACCESS_TOKEN"

# Update event
curl -X PUT 'http://localhost:3000/events/1' \
  -H "Authorization: Bearer $ACCESS_TOKEN" \
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
  -H "Authorization: Bearer $ACCESS_TOKEN" \
  -H 'Content-Type: application/json' \
  -d '{
    "ticketPrice": 20.00,
    "capacity": 150
  }'

# Delete event
curl -X DELETE 'http://localhost:3000/events/1' \
  -H "Authorization: Bearer $ACCESS_TOKEN"

# Refresh token
REFRESH_TOKEN="your_refresh_token_here"
curl -X POST 'http://localhost:3000/token/refresh' \
  -H 'Content-Type: application/json' \
  -d "{
    \"refreshToken\": \"$REFRESH_TOKEN\"
  }"

# Logout
curl -X POST 'http://localhost:3000/token/logout' \
  -H 'Content-Type: application/json' \
  -d "{
    \"refreshToken\": \"$REFRESH_TOKEN\"
  }"
```
