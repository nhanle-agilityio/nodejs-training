import express from 'express';
import { initDatabase } from './database/db.js';
import eventRoutes from './routes/eventRoutes.js';

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
    error: {
      code: 'NOT_FOUND',
      message: `Resource not found for URL: ${req.originalUrl}`,
    },
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
