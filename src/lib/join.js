// Join requests go to Supabase when credentials exist, otherwise to the local
// SQLite database exposed by the Vite middleware at /api/join.
import { isSupabaseConfigured, submitJoinRequestToSupabase } from './supabase'

export const joinStorage = isSupabaseConfigured ? 'supabase' : 'local'

async function readJson(response) {
  try {
    return await response.json()
  } catch {
    return null
  }
}

// True only when the local API answers with its own JSON, so a static host that
// rewrites unknown paths to index.html is not mistaken for a working database.
export async function checkJoinApi() {
  try {
    const response = await fetch('/api/join', {
      headers: { Accept: 'application/json' },
    })
    if (!response.ok) return false
    const type = response.headers.get('content-type') ?? ''
    if (!type.includes('application/json')) return false
    const body = await readJson(response)
    return body?.ok === true
  } catch {
    return false
  }
}

async function submitJoinRequestToLocalApi(request) {
  try {
    const response = await fetch('/api/join', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(request),
    })
    const body = await readJson(response)

    if (!response.ok) {
      return {
        ok: false,
        reason: 'server',
        message: body?.error ?? `HTTP ${response.status}`,
      }
    }

    return { ok: true, id: body?.id }
  } catch (error) {
    return { ok: false, reason: 'network', message: error.message }
  }
}

export async function submitJoinRequest(request) {
  if (isSupabaseConfigured) return submitJoinRequestToSupabase(request)
  return submitJoinRequestToLocalApi(request)
}
