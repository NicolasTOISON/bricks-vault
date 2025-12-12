import { createClient } from '@libsql/client'

export const db = createClient({
  url: 'file:local.db',
})

export async function initDb() {
  await db.execute(`
    CREATE TABLE IF NOT EXISTS lego_sets (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      set_number TEXT NOT NULL UNIQUE,
      name TEXT NOT NULL,
      pieces INTEGER,
      year INTEGER,
      theme TEXT,
      added_date DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `)
}

export async function addLegoSet(set: {
  set_number: string
  name: string
  pieces: number
  year: number
  theme: string
}) {
  return db.execute({
    sql: 'INSERT OR REPLACE INTO lego_sets (set_number, name, pieces, year, theme) VALUES (?, ?, ?, ?, ?)',
    args: [set.set_number, set.name, set.pieces, set.year, set.theme],
  })
}

export async function getLegoSets() {
  return db.execute('SELECT * FROM lego_sets ORDER BY added_date DESC')
}
