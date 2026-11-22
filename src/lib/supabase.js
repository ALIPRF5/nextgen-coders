// Only the public anon key is used here. The service_role key never leaves Supabase.
// The publishable key is safe to ship in the browser: Row Level Security on
// join_requests allows anonymous inserts (nothing else), so it cannot be used to
// read or change other people's data.
//
// Vercel has repeatedly rebuilt this project without the VITE_* variables, which
// silently disconnected the form. These production-only fallbacks keep the site
// connected even when the project has no environment variables set. Locally,
// `npm run dev` still falls back to the SQLite database when no .env is present.
const FALLBACK_URL = import.meta.env.PROD ? 'https://gjkubpotihnrkjyoeupw.supabase.co' : ''
const FALLBACK_ANON_KEY = import.meta.env.PROD
  ? 'sb_publishable_xpvRQgmE44pB9-XvlXm7qQ_kRV98chU'
  : ''

const url = import.meta.env.VITE_SUPABASE_URL || FALLBACK_URL
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || FALLBACK_ANON_KEY

export const isSupabaseConfigured = Boolean(url && anonKey)

// Load the Supabase client only when someone actually submits the form,
// so the first page load stays light.
let clientPromise = null

function getClient() {
  if (!isSupabaseConfigured) return Promise.resolve(null)
  if (!clientPromise) {
    clientPromise = import('@supabase/supabase-js').then(({ createClient }) =>
      createClient(url, anonKey, { auth: { persistSession: false } }),
    )
  }
  return clientPromise
}

// Shared loader for read-only data (events). Loaded on demand.
export { getClient as getSupabase }

/**
 * Insert one join request into Supabase. RLS on join_requests allows inserts
 * for everyone and reads only for authenticated admins, so this cannot leak
 * other rows.
 */
export async function submitJoinRequestToSupabase(request) {
  const client = await getClient()
  if (!client) return { ok: false, reason: 'not-configured' }

  try {
    const { error } = await client.from('join_requests').insert(request)
    if (error) return { ok: false, reason: 'server', message: error.message }
    return { ok: true }
  } catch (error) {
    return { ok: false, reason: 'network', message: error.message }
  }
}
