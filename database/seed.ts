// =============================================================================
// Seed file for the local iOS to-do app
// This runs on-device via expo-sqlite — NOT on a server.
// Call seedDatabase() once during development/testing to populate sample data.
// In production, the database starts empty.
// =============================================================================

import * as SQLite from 'expo-sqlite';

interface SeedTodo {
  title: string;
  completed: number;
  created_at: string;
}

const SAMPLE_TODOS: SeedTodo[] = [
  {
    title: 'Buy groceries',
    completed: 0,
    created_at: '2025-01-15 09:00:00',
  },
  {
    title: 'Walk the dog',
    completed: 1,
    created_at: '2025-01-15 08:30:00',
  },
  {
    title: 'Read for 30 minutes',
    completed: 0,
    created_at: '2025-01-14 20:00:00',
  },
  {
    title: 'Reply to emails',
    completed: 1,
    created_at: '2025-01-14 10:15:00',
  },
  {
    title: 'Clean kitchen',
    completed: 0,
    created_at: '2025-01-13 17:45:00',
  },
];

export async function seedDatabase(db: SQLite.SQLiteDatabase): Promise<void> {
  // Check if data already exists to prevent duplicate seeding
  const existingCount = await db.getFirstAsync<{ count: number }>(
    'SELECT COUNT(*) as count FROM todos'
  );

  if (existingCount && existingCount.count > 0) {
    console.log(
      `[seed] Database already contains ${existingCount.count} todos. Skipping seed.`
    );
    return;
  }

  console.log('[seed] Seeding database with sample todos...');

  await db.withTransactionAsync(async () => {
    for (const todo of SAMPLE_TODOS) {
      await db.runAsync(
        'INSERT INTO todos (title, completed, created_at) VALUES (?, ?, ?)',
        [todo.title, todo.completed, todo.created_at]
      );
    }
  });

  console.log(`[seed] Inserted ${SAMPLE_TODOS.length} sample todos.`);
}

export async function clearDatabase(
  db: SQLite.SQLiteDatabase
): Promise<void> {
  await db.runAsync('DELETE FROM todos');
  console.log('[seed] All todos deleted.');
}

export async function resetDatabase(
  db: SQLite.SQLiteDatabase
): Promise<void> {
  await clearDatabase(db);
  await seedDatabase(db);
  console.log('[seed] Database reset and re-seeded.');
}