// backend/routes/scoreRoutes.js
const express = require('express');
const router = express.Router();
const scoreController = require('../controllers/scoreController');

// Route to get all scores (e.g., for a leaderboard)
// GET /api/scores
// Supports query parameter: ?limit=N (e.g., /api/scores?limit=5)
router.get('/', scoreController.getAllScores);

// Route to add a new score
// POST /api/scores
// Expects JSON body: { "playerName": "OptionalName", "score": 100 }
router.post('/', scoreController.addScore);

module.exports = router;
