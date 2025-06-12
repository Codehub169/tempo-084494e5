#!/bin/bash

# Exit immediately if a command exits with a non-zero status.
set -e

echo "Starting Serpent Dash application..."

# Navigate to the frontend directory, install dependencies, and build the project
if [ -d "frontend" ]; then
  echo "Setting up frontend..."
  cd frontend
  npm install
  npm run build
  echo "Frontend setup complete."
  cd .. # Go back to the root directory
else
  echo "Error: Frontend directory not found."
  exit 1
fi

# Navigate to the backend directory, install dependencies
if [ -d "backend" ]; then
  echo "Setting up backend..."
  cd backend
  npm install
  # The server.js will be started and will listen on port 9000
  echo "Starting backend server on port 9000..."
  # Consider using a process manager like pm2 for production
  node server.js
else
  echo "Error: Backend directory not found."
  exit 1
fi

echo "Application startup script finished."
