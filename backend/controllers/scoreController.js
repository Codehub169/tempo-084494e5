// backend/controllers/scoreController.js
const scoreModel = require('../models/scoreModel');

// Controller to get all scores (typically top scores for a leaderboard)
exports.getAllScores = async (req, res) => {
    try {
        // The limit can be passed as a query parameter, e.g., /api/scores?limit=20
        const limit = req.query.limit ? parseInt(req.query.limit, 10) : 10;
        if (isNaN(limit) || limit <= 0) {
            return res.status(400).json({ message: 'Invalid limit parameter. Must be a positive integer.' });
        }

        const scores = await scoreModel.getAllScores(limit);
        res.status(200).json(scores);
    } catch (error) {
        console.error('Error fetching scores in controller:', error);
        res.status(500).json({ message: 'Error fetching scores', error: error.message });
    }
};

// Controller to add a new score
exports.addScore = async (req, res) => {
    const { playerName, score } = req.body;

    if (score === undefined || score === null || typeof score !== 'number' || isNaN(score)) {
        return res.status(400).json({ message: 'Score is required and must be a valid number.' });
    }
    if (score < 0) {
         return res.status(400).json({ message: 'Score cannot be negative.' });
    }

    // Player name is optional; schema defaults to 'Player' if not provided or empty string.
    // Model will use the provided playerName or let the DB default it if playerName is null/undefined.
    // If an empty string is explicitly passed for playerName, it will be stored as such unless DB schema coerces it.
    // For consistency, we can ensure it defaults if empty string.
    const nameToStore = (typeof playerName === 'string' && playerName.trim() !== '') ? playerName.trim() : undefined;

    try {
        const newScoreEntry = await scoreModel.addScore(nameToStore, score);
        res.status(201).json({ message: 'Score added successfully', data: newScoreEntry });
    } catch (error) {
        console.error('Error adding score in controller:', error);
        res.status(500).json({ message: 'Error adding score', error: error.message });
    }
};
