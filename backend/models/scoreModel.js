// backend/models/scoreModel.js
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Determine the database path.
const dbPath = path.resolve(__dirname, '../db/database.sqlite');

// Connect to the SQLite database
// The database file will be created if it doesn't exist.
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Error connecting to the SQLite database:', err.message);
    } else {
        console.log('Connected to the SQLite database.');
        // Ensure table and indexes exist (idempotent)
        // This complements the schema.sql for robust initialization.
        db.exec(`
            CREATE TABLE IF NOT EXISTS scores (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                player_name TEXT NOT NULL DEFAULT 'Player',
                score INTEGER NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
            CREATE INDEX IF NOT EXISTS idx_score ON scores (score DESC);
            CREATE INDEX IF NOT EXISTS idx_created_at ON scores (created_at DESC);
        `, (execErr) => {
            if (execErr) {
                console.error("Error ensuring 'scores' table and indexes exist:", execErr.message);
            }
        });
    }
});

// Model function to get scores (e.g., top N scores)
// Returns a Promise
exports.getAllScores = (limit = 10) => {
    return new Promise((resolve, reject) => {
        const sql = `SELECT id, player_name, score, strftime('%Y-%m-%d %H:%M:%S', created_at) as created_at 
                     FROM scores 
                     ORDER BY score DESC, created_at DESC 
                     LIMIT ?`;
        db.all(sql, [limit], (err, rows) => {
            if (err) {
                console.error('Error in getAllScores model:', err.message);
                reject(err);
            } else {
                resolve(rows);
            }
        });
    });
};

// Model function to add a new score
// Returns a Promise
exports.addScore = (playerName, score) => {
    return new Promise((resolve, reject) => {
        const sql = `INSERT INTO scores (player_name, score) VALUES (?, ?)`;
        // .run() returns an object with lastID (the ID of the inserted row) and changes (number of rows affected)
        db.run(sql, [playerName, score], function(err) { // Use function keyword to access 'this'
            if (err) {
                console.error('Error in addScore model:', err.message);
                reject(err);
            } else {
                // Resolve with the ID and details of the newly inserted score
                resolve({ id: this.lastID, player_name: playerName, score: score });
            }
        });
    });
};

// Optional: Export db instance if needed for direct operations or testing, though usually models abstract it.
// module.exports.db = db;
