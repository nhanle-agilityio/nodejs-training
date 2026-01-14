import 'reflect-metadata';
import express from 'express';
import cors from 'cors';
import { ERROR_CODES } from './constants/index.js';
import { AppDataSource } from './config/data-source.js';
import eventRoutes from './routes/eventRoutes.js';

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

    // Routes
    app.get('/', (req, res) => {
      res.send('Event Management API');
    });

    app.use('/events', eventRoutes);

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
