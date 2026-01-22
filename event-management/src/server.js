import { createApp } from './app.js';

const startServer = async () => {
  try {
    const app = await createApp();
    const port = process.env.PORT || 3000;

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
