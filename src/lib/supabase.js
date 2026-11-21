// Only the public anon key is used here. The service_role key never leaves Supabase.
const url = import.meta.env.VITE_SUPABASE_URL
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

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
