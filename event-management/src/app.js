import 'reflect-metadata';
import express from 'express';
import cors from 'cors';
import { ERROR_CODES } from './constants/index.js';
import { AppDataSource } from './config/data-source.js';
import { setupAuthMiddleware } from './middleware/auth.js';
import eventRoutes from './routes/eventRoutes.js';
import userRoutes from './routes/userRoutes.js';
import userRegistrationRoutes from './routes/userRegistrationRoutes.js';
import tokenRoutes from './routes/tokenRoutes.js';

const app = express();
const port = process.env.PORT;

// Middleware
app.use(
  cors({
    origin: process.env.CLIENT_ORIGIN,
  }),
);

app.use(express.json());

// Initialize database and start server
const startServer = async () => {
  try {
    // Initialize the TypeORM data source
    await AppDataSource.initialize();
    console.log('TypeORM Database initialized successfully');

    // Setup authentication
    setupAuthMiddleware(app);

    // Initialize Passport middleware
    app.use(app.auth.initialize());

    // Routes
    app.get('/', (req, res) => {
      res.send('Event Management API');
    });

    // Public routes (no authentication required)
    app.use('/users', userRegistrationRoutes);
    app.use('/token', tokenRoutes);

    // Protected routes (authentication required)
    app.use('/user', app.auth.authenticate(), userRoutes);
    app.use('/events', app.auth.authenticate(), eventRoutes);

    // 404 handler
    app.use((req, res, next) => {
      res.status(404).json({
        code: ERROR_CODES.NOT_FOUND,
        message: `Resource not found for URL: ${req.originalUrl}`,
      });
    });

    // Error handler
    app.use((err, req, res, next) => {
      console.error('Error:', err);
      res.status(err.status || 500).json({
        code: err.code || ERROR_CODES.INTERNAL_SERVER_ERROR,
        message: err.message || 'An unexpected error occurred',
        details: err.details || undefined,
      });
    });

    // Start server
    app.listen(port, () => {
      console.log(`Event Management API listening on port ${port}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();
