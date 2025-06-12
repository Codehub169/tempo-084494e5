const express = require('express');
const cors = require('cors');
const path = require('path');
const scoreRoutes = require('./routes/scoreRoutes');
require('./models/scoreModel'); // Ensures DB connection is initialized by loading the module

const app = express();
const PORT = process.env.PORT || 9000;

// Middleware
// Enable CORS for all routes/origins. For production, you might want to restrict this.
// e.g., app.use(cors({ origin: 'http://yourdomain.com' }));
// However, since the backend serves the frontend, this primarily helps if API is accessed from other tools/domains.
app.use(cors()); 
app.use(express.json()); // To parse JSON request bodies

// API routes
app.use('/api/scores', scoreRoutes);

// Serve static files from the React app build directory
const frontendBuildPath = path.resolve(__dirname, '../frontend/dist');
app.use(express.static(frontendBuildPath));

// The "catchall" handler: for any request that doesn't match one above,
// send back React's index.html file to support client-side routing.
app.get('*', (req, res) => {
  const indexPath = path.resolve(frontendBuildPath, 'index.html');
  res.sendFile(indexPath, (err) => {
    if (err) {
      // Log the error and send a 500 response if index.html can't be sent
      console.error('Error sending index.html:', err);
      res.status(500).send('Error serving the application.');
    }
  });
});

// Error handling middleware (optional, but good practice)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  console.log(`Serving frontend from ${frontendBuildPath}`);
  console.log('Ensure the database is initialized, e.g., by running: npm run init-db (from backend directory)');
});
