import { createClient } from '@libsql/client'

export const db = createClient({
  url: 'file:local.db',
})

export async function initDb() {
  await db.execute(`
    CREATE TABLE IF NOT EXISTS lego_sets (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      set_number TEXT NOT NULL,
      name TEXT NOT NULL,
      pieces INTEGER,
      year INTEGER,
      theme TEXT,
      added_date DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `)
}
