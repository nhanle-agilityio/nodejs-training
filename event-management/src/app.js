import express from 'express';
import { initDatabase } from './database/db.js';
import eventRoutes from './routes/eventRoutes.js';
import { ERROR_CODES } from './constants/index.js';

const app = express();
const port = process.env.PORT;

// Middleware
app.use(express.json());

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

// Initialize database and start server
const startServer = async () => {
  try {
    await initDatabase();
    app.listen(port, () => {
      console.log(`Event Management API listening on port ${port}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();
