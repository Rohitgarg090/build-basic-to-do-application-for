# Data Model Documentation

## Overview

This is a single-user, local-only iOS to-do app. The entire data model consists of **one table** (`todos`) stored in an on-device SQLite database managed by `expo-sqlite`. There is no server, no cloud database, no authentication, and no network communication.

---

## ER Diagram

```
┌─────────────────────────────────────────────────┐
│                    todos                         │
├─────────────────────────────────────────────────┤
│  PK │ id          INTEGER  AUTOINCREMENT         │
│     │ title       TEXT     NOT NULL               │
│     │ completed   INTEGER  NOT NULL DEFAULT 0     │
│     │ created_at  TEXT     NOT NULL DEFAULT now()  │
├─────────────────────────────────────────────────┤
│  IDX: idx_todos_completed        (completed)      │
│  IDX: idx_todos_created_at       (created_at DESC)│
│  IDX: idx_todos_completed_created (completed,      │
│                                    created_at DESC)│
│  CHK: completed IN (0, 1)                         │
└─────────────────────────────────────────────────┘
```

Since there is only one table with no foreign keys, there are no relationships to diagram.

---

## Table: `todos`

### Purpose

Stores every to-do item the user creates. Each row is a single task.

### Columns

| Column | Type | Nullable | Default | Description |
|---|---|---|---|---|
| `id` | `INTEGER` | No | Auto-increment | Unique identifier for each to-do item |
| `title` | `TEXT` | No | — | The task description entered by the user |
| `completed` | `INTEGER` | No | `0` | Completion flag: `0` = not done, `1` = done |
| `created_at` | `TEXT` | No | `datetime('now','localtime')` | ISO 8601 timestamp of when the to-do was created, in device local time |

### Constraints

- **Primary Key**: `id` — auto-incrementing integer.
- **CHECK**: `completed IN (0, 1)` — SQLite has no native boolean, so we enforce 0/1.
- **NOT NULL**: All columns are required.

### Indexes

| Index Name | Columns | Purpose |
|---|---|---|
| `idx_todos_completed` | `completed` | Fast filtering by active/completed status |
| `idx_todos_created_at` | `created_at DESC` | Fast sorting by newest first (default list view) |
| `idx_todos_completed_created` | `completed, created_at DESC` | Optimized query for "show active todos sorted by newest" |

---

## CRUD Operations

### Create a to-do

```sql
INSERT INTO todos (title) VALUES (?);
```

`completed` defaults to `0` and `created_at` defaults to current local time.

### Read all to-dos

```sql
SELECT id, title, completed, created_at
FROM todos
ORDER BY created_at DESC;
```

### Read active to-dos only

```sql
SELECT id, title, completed, created_at
FROM todos
WHERE completed = 0
ORDER BY created_at DESC;
```

### Toggle completion

```sql
UPDATE todos
SET completed = CASE WHEN completed = 0 THEN 1 ELSE 0 END
WHERE id = ?;
```

### Delete a to-do

```sql
DELETE FROM todos WHERE id = ?;
```

### Count to-dos

```sql
SELECT
  COUNT(*) AS total,
  SUM(CASE WHEN completed = 0 THEN 1 ELSE 0 END) AS active,
  SUM(completed) AS done
FROM todos;
```

---

## TypeScript Interface

Used in the Expo app to type query results:

```typescript
export interface Todo {
  id: number;
  title: string;
  completed: number; // 0 or 1 (SQLite has no boolean)
  created_at: string; // ISO 8601 datetime string
}

// Helper for display logic
export function isCompleted(todo: Todo): boolean {
  return todo.completed === 1;
}
```

---

## Storage Details

| Property | Value |
|---|---|
| **Database engine** | SQLite (via `expo-sqlite`) |
| **File location** | App sandbox document directory on iOS |
| **File name** | `todos.db` |
| **Journal mode** | WAL (Write-Ahead Logging) |
| **Backup** | Included in iOS device backups and iCloud app data by default |
| **Max expected rows** | Hundreds to low thousands (personal use) |
| **Approximate size** | < 1 MB for typical usage |

---

## Migration Strategy

Since this is a local-only personal app, migrations are handled with SQLite's `PRAGMA user_version`:

```typescript
// In lib/db.ts at app startup
async function migrateDatabase(db: SQLiteDatabase): Promise<void> {
  const result = await db.getFirstAsync<{ user_version: number }>(
    'PRAGMA user_version'
  );
  const currentVersion = result?.user_version ?? 0;

  if (currentVersion < 1) {
    // Run 001_init.sql content
    await db.execAsync(`
      CREATE TABLE IF NOT EXISTS todos (
        id          INTEGER PRIMARY KEY AUTOINCREMENT,
        title       TEXT NOT NULL,
        completed   INTEGER NOT NULL DEFAULT 0 CHECK (completed IN (0, 1)),
        created_at  TEXT NOT NULL DEFAULT (datetime('now','localtime'))
      );
      CREATE INDEX IF NOT EXISTS idx_todos_completed ON todos (completed);
      CREATE INDEX IF NOT EXISTS idx_todos_created_at ON todos (created_at DESC);
      CREATE INDEX IF NOT EXISTS idx_todos_completed_created ON todos (completed, created_at DESC);
      PRAGMA user_version = 1;
    `);
  }

  // Future migrations would check for version < 2, < 3, etc.
}
```

---

## What Is NOT in This Data Model

| Excluded Concept | Reason |
|---|---|
| Users / accounts | Single personal user, no auth |
| Categories / tags | "No extra features" requirement |
| Due dates / reminders | "No extra features" requirement |
| Priority levels | "No extra features" requirement |
| Subtasks / nesting | "No extra features" requirement |
| Sync metadata | No cloud sync, local only |
| Soft deletes | Unnecessary complexity for personal use |
| Updated timestamp | Only created_at needed for sort order |

---

## File Reference

| File | Purpose |
|---|---|
| `database/schema.prisma` | Documentation-only Prisma schema (not executed at runtime) |
| `database/migrations/001_init.sql` | SQL executed on first app launch to create the table |
| `database/seed.ts` | Development helper to populate sample to-do items |
| `lib/db.ts` | App runtime database initialization and query functions |