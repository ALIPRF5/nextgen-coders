// Simple SQLite storage for /join submissions.
// Uses Node's built-in driver, so the site needs no database dependency.
import fs from 'node:fs'
import path from 'node:path'
import { DatabaseSync } from 'node:sqlite'
import { LEVELS, MESSAGE_MAX } from '../src/data/join-fields.js'
import { TRACK_IDS } from '../src/data/tracks.js'

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
const NAME_MAX = 120
const EMAIL_MAX = 254

// Where the database file lives. Override with JOIN_DB_PATH if needed.
export const DB_PATH = process.env.JOIN_DB_PATH
  ? path.resolve(process.env.JOIN_DB_PATH)
  : path.join(process.cwd(), 'data', 'nextgen.sqlite')

let database = null

export function getDatabase() {
  if (database) return database

  fs.mkdirSync(path.dirname(DB_PATH), { recursive: true })
  const db = new DatabaseSync(DB_PATH)
  db.exec('PRAGMA journal_mode = WAL')
  db.exec('PRAGMA busy_timeout = 5000')
  db.exec(`
    CREATE TABLE IF NOT EXISTS join_requests (
      id         INTEGER PRIMARY KEY AUTOINCREMENT,
      name       TEXT    NOT NULL,
      email      TEXT    NOT NULL,
      track      TEXT    NOT NULL,
      level      TEXT    NOT NULL,
      message    TEXT,
      created_at TEXT    NOT NULL
    );
    CREATE INDEX IF NOT EXISTS idx_join_requests_created_at
      ON join_requests (created_at DESC);
    CREATE INDEX IF NOT EXISTS idx_join_requests_email
      ON join_requests (email);
  `)

  database = db
  return database
}

// Trims and validates one submission. Returns { ok, value } or { ok, errors }.
export function validateJoinRequest(payload) {
  const errors = {}

  if (!payload || typeof payload !== 'object' || Array.isArray(payload)) {
    return { ok: false, errors: { body: 'A JSON object is required.' } }
  }

  const name =
    typeof payload.name === 'string' ? payload.name.trim().replace(/\s+/g, ' ') : ''
  const email = typeof payload.email === 'string' ? payload.email.trim().toLowerCase() : ''
  const track = typeof payload.track === 'string' ? payload.track.trim() : ''
  const level = typeof payload.level === 'string' ? payload.level.trim() : ''
  const message = typeof payload.message === 'string' ? payload.message.trim() : ''

  if (name.length < 2) errors.name = 'Name must be at least 2 characters.'
  else if (name.length > NAME_MAX) errors.name = `Name must be at most ${NAME_MAX} characters.`

  if (!EMAIL_PATTERN.test(email) || email.length > EMAIL_MAX) {
    errors.email = 'A valid email address is required.'
  }

  if (!TRACK_IDS.includes(track)) errors.track = `Track must be one of: ${TRACK_IDS.join(', ')}.`
  if (!LEVELS.includes(level)) errors.level = `Level must be one of: ${LEVELS.join(', ')}.`
  if (message.length > MESSAGE_MAX) {
    errors.message = `Message must be at most ${MESSAGE_MAX} characters.`
  }

  if (Object.keys(errors).length > 0) return { ok: false, errors }

  return {
    ok: true,
    value: { name, email, track, level, message: message || null },
  }
}

export function insertJoinRequest(request) {
  const createdAt = new Date().toISOString()
  const result = getDatabase()
    .prepare(
      `INSERT INTO join_requests (name, email, track, level, message, created_at)
       VALUES (?, ?, ?, ?, ?, ?)`,
    )
    .run(request.name, request.email, request.track, request.level, request.message, createdAt)

  return { id: Number(result.lastInsertRowid), ...request, created_at: createdAt }
}

export function listJoinRequests(limit = 500) {
  const safeLimit = Math.min(Math.max(Number(limit) || 500, 1), 5000)
  const rows = getDatabase()
    .prepare(
      `SELECT id, name, email, track, level, message, created_at
       FROM join_requests
       ORDER BY id DESC
       LIMIT ?`,
    )
    .all(safeLimit)

  return rows.map((row) => ({ ...row }))
}

export function countJoinRequests() {
  return Number(getDatabase().prepare('SELECT COUNT(*) AS total FROM join_requests').get().total)
}
