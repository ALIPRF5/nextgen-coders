// POST /api/join — stores one join request in the local SQLite database.
// Mounted on the Vite dev server and on `vite preview`.
import { insertJoinRequest, validateJoinRequest } from './join-store.js'

const MAX_BODY_BYTES = 16 * 1024
const WINDOW_MS = 10 * 60 * 1000
const MAX_PER_WINDOW = 30
const attempts = new Map()

function clientKey(req) {
  const forwarded = req.headers['x-forwarded-for']
  if (typeof forwarded === 'string' && forwarded.length > 0) {
    return forwarded.split(',')[0].trim()
  }
  return req.socket?.remoteAddress ?? 'unknown'
}

function isRateLimited(req) {
  const key = clientKey(req)
  const now = Date.now()
  const recent = (attempts.get(key) ?? []).filter((time) => now - time < WINDOW_MS)

  if (recent.length >= MAX_PER_WINDOW) {
    attempts.set(key, recent)
    return true
  }

  recent.push(now)
  attempts.set(key, recent)
  return false
}

function sendJson(res, status, body) {
  res.statusCode = status
  res.setHeader('Content-Type', 'application/json; charset=utf-8')
  res.setHeader('Cache-Control', 'no-store')
  res.end(JSON.stringify(body))
}

function readBody(req) {
  return new Promise((resolve, reject) => {
    let size = 0
    const chunks = []

    req.on('data', (chunk) => {
      size += chunk.length
      if (size > MAX_BODY_BYTES) {
        const error = new Error('Request body is too large.')
        error.code = 'too-large'
        reject(error)
        req.destroy()
        return
      }
      chunks.push(chunk)
    })
    req.on('end', () => resolve(Buffer.concat(chunks).toString('utf8')))
    req.on('error', reject)
  })
}

async function handleJoinRequest(req, res) {
  // Health probe: the form uses it to know whether storage is reachable.
  if (req.method === 'GET' || req.method === 'HEAD') {
    return sendJson(res, 200, { ok: true, storage: 'sqlite' })
  }

  if (req.method !== 'POST') {
    res.setHeader('Allow', 'GET, POST')
    return sendJson(res, 405, { ok: false, error: 'method-not-allowed' })
  }

  if (isRateLimited(req)) {
    return sendJson(res, 429, { ok: false, error: 'too-many-requests' })
  }

  let raw
  try {
    raw = await readBody(req)
  } catch (error) {
    return sendJson(res, error.code === 'too-large' ? 413 : 400, {
      ok: false,
      error: error.code ?? 'bad-request',
    })
  }

  let payload
  try {
    payload = JSON.parse(raw || '{}')
  } catch {
    return sendJson(res, 400, { ok: false, error: 'invalid-json' })
  }

  const result = validateJoinRequest(payload)
  if (!result.ok) {
    return sendJson(res, 422, { ok: false, error: 'invalid', fields: result.errors })
  }

  try {
    const saved = insertJoinRequest(result.value)
    console.log(
      `[join] saved #${saved.id} · ${saved.name} · ${saved.email} · ${saved.track}/${saved.level}`,
    )
    return sendJson(res, 201, { ok: true, id: saved.id })
  } catch (error) {
    console.error('[join] could not save the request:', error)
    return sendJson(res, 500, { ok: false, error: 'storage-error' })
  }
}

export function joinApiPlugin() {
  const middleware = (req, res) => {
    handleJoinRequest(req, res).catch((error) => {
      console.error('[join] unexpected error:', error)
      if (res.headersSent) res.end()
      else sendJson(res, 500, { ok: false, error: 'server-error' })
    })
  }

  return {
    name: 'nextgen-join-api',
    configureServer(server) {
      server.middlewares.use('/api/join', middleware)
    },
    configurePreviewServer(server) {
      server.middlewares.use('/api/join', middleware)
    },
  }
}
