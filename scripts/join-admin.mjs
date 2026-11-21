// Read the join requests stored in the local SQLite database.
// Usage:
//   npm run join:list            (latest 50)
//   npm run join:list -- --limit 200
//   npm run join:export          (data/join-requests-YYYY-MM-DD.csv)
//   npm run join:export -- --out data/demandes.csv
import fs from 'node:fs'
import path from 'node:path'
import { tracks } from '../src/data/tracks.js'
import { DB_PATH, countJoinRequests, listJoinRequests } from '../server/join-store.js'

const args = process.argv.slice(2)
const command = args[0] ?? 'list'

const TRACK_LABEL = Object.fromEntries(tracks.map((track) => [track.id, track.name.fr]))
const LEVEL_LABEL = {
  beginner: 'Débutant',
  intermediate: 'Intermédiaire',
  advanced: 'Avancé',
}

function option(name, fallback) {
  const index = args.indexOf(`--${name}`)
  if (index === -1) return fallback
  return args[index + 1] ?? fallback
}

function shortMessage(message, max = 48) {
  if (!message) return ''
  const flat = message.replace(/\s+/g, ' ').trim()
  return flat.length > max ? `${flat.slice(0, max - 1)}…` : flat
}

function csvCell(value) {
  const text = value == null ? '' : String(value)
  return /[",\n\r]/.test(text) ? `"${text.replace(/"/g, '""')}"` : text
}

function printList() {
  const limit = Number(option('limit', 50))
  const rows = listJoinRequests(limit)

  console.log(`Base de données : ${DB_PATH}`)
  console.log(`${countJoinRequests()} demande(s) enregistrée(s) — ${rows.length} affichée(s)\n`)

  if (rows.length === 0) {
    console.log('Aucune demande pour le moment.')
    return
  }

  console.table(
    rows.map((row) => ({
      '#': row.id,
      date: new Date(row.created_at).toLocaleString('fr-FR'),
      nom: row.name,
      email: row.email,
      parcours: TRACK_LABEL[row.track] ?? row.track,
      niveau: LEVEL_LABEL[row.level] ?? row.level,
      message: shortMessage(row.message),
    })),
  )
}

function exportCsv() {
  const stamp = new Date().toISOString().slice(0, 10)
  const target = path.resolve(
    option('out', path.join('data', `join-requests-${stamp}.csv`)),
  )
  const rows = listJoinRequests(5000).reverse()

  if (rows.length === 0) {
    console.log(`Aucune demande à exporter. Base de données : ${DB_PATH}`)
    return
  }

  const header = ['id', 'created_at', 'name', 'email', 'track', 'level', 'message']
  const lines = [header.join(',')]

  for (const row of rows) {
    lines.push(
      [
        row.id,
        row.created_at,
        row.name,
        row.email,
        row.track,
        row.level,
        row.message ?? '',
      ]
        .map(csvCell)
        .join(','),
    )
  }

  fs.mkdirSync(path.dirname(target), { recursive: true })
  // The BOM keeps accents readable when the file is opened in Excel.
  fs.writeFileSync(target, `\uFEFF${lines.join('\r\n')}\r\n`, 'utf8')
  console.log(`${rows.length} demande(s) exportée(s) vers ${target}`)
}

if (command === 'list') {
  printList()
} else if (command === 'export') {
  exportCsv()
} else {
  console.log('Commandes : list [--limit 50] · export [--out chemin.csv]')
  process.exitCode = 1
}
