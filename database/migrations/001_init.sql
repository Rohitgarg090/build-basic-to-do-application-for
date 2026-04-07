-- =============================================================================
-- Migration 001: Initialize todos table
-- Target: expo-sqlite (on-device SQLite, iOS only)
-- Executed at app first launch via lib/db.ts initDatabase()
-- =============================================================================

-- Enable WAL mode for better read/write concurrency on device
PRAGMA journal_mode = WAL;

-- Schema versioning: simple user_version pragma to track migrations
PRAGMA user_version = 1;

-- =============================================================================
-- Table: todos
-- The one and only table in the entire application.
-- =============================================================================
CREATE TABLE IF NOT EXISTS todos (
  id          INTEGER PRIMARY KEY AUTOINCREMENT,
  title       TEXT NOT NULL,
  completed   INTEGER NOT NULL DEFAULT 0 CHECK (completed IN (0, 1)),
  created_at  TEXT NOT NULL DEFAULT (datetime('now','localtime'))
);

-- Index: filter by completion status (show active vs done)
CREATE INDEX IF NOT EXISTS idx_todos_completed ON todos (completed);

-- Index: sort by newest first (default list ordering)
CREATE INDEX IF NOT EXISTS idx_todos_created_at ON todos (created_at DESC);

-- Compound index: completed status + creation order for filtered + sorted queries
CREATE INDEX IF NOT EXISTS idx_todos_completed_created ON todos (completed, created_at DESC);