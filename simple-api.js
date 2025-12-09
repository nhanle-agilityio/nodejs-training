const express = require('express');

const app = express();
const PORT = process.env.PORT || 4000;

// JSON body parsing
app.use(express.json());

// Single demo endpoint
app.get('/api/hello', (req, res) => {
  res.json({
    message: 'Hello from the simple API for testing!',
    timestamp: new Date().toISOString(),
  });
});

// Fallback for unknown routes
app.use((req, res) => {
  res.status(404).json({ message: 'Not found' });
});

app.listen(PORT, () => {
  console.log(`Simple API listening on http://localhost:${PORT}/api/hello`);
});
