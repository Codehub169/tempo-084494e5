-- SQL schema for the Snake game scores database

-- Drop the table if it already exists to ensure a clean setup
DROP TABLE IF EXISTS scores;

-- Create the scores table
CREATE TABLE scores (
    id INTEGER PRIMARY KEY AUTOINCREMENT, -- Unique identifier for each score entry
    player_name TEXT NOT NULL DEFAULT 'Player',           -- Name of the player (defaults to 'Player' if not provided)
    score INTEGER NOT NULL,                   -- The score achieved by the player
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP -- Timestamp of when the score was recorded
);

-- Optional: Add an index on the score column for faster querying of high scores
CREATE INDEX IF NOT EXISTS idx_score ON scores (score DESC);

-- Optional: Add an index on created_at for time-based filtering
CREATE INDEX IF NOT EXISTS idx_created_at ON scores (created_at DESC);
