import { createContext, useContext, useEffect, useState } from 'react'
import { events as fallbackEvents } from '../data/events'
import { getSupabase, isSupabaseConfigured } from './supabase'

const EventsContext = createContext({
  events: fallbackEvents,
  nextEvent: fallbackEvents.find((event) => event.status === 'upcoming') ?? null,
})

function pickText(fr, en, fallback = '') {
  return { fr: fr || fallback, en: en || fr || fallback }
}

// Supabase uses UUID ids, while the bundled photos are keyed by the local
// slugs. Match on the id first, then on the event's date and title, so the
// photos survive regardless of which id format the database returns.
function findLocalEvent(row) {
  return (
    fallbackEvents.find((event) => event.id === row.id) ??
    fallbackEvents.find((event) => event.date.en === row.date_label_en) ??
    fallbackEvents.find((event) => event.title.en === row.title_en)
  )
}

// Supabase rows use bilingual columns; convert them to the same shape as src/data/events.js.
function mapRow(row) {
  const facts = Array.isArray(row.facts) ? row.facts : []
  // Keep the local photography even when the text comes from Supabase.
  const local = findLocalEvent(row)

  return {
    id: row.id,
    status: row.status === 'upcoming' ? 'upcoming' : 'past',
    title: pickText(row.title_fr, row.title_en),
    date: pickText(row.date_label_fr, row.date_label_en),
    dateNote: row.date_note_fr ? pickText(row.date_note_fr, row.date_note_en) : undefined,
    badge: { top: row.badge_top ?? '', bottom: row.badge_bottom ?? '' },
    description: pickText(row.description_fr, row.description_en),
    image: local?.image,
    imageAlt: local?.imageAlt,
    facts: facts.map((fact) => ({
      value: String(fact.value ?? ''),
      label: pickText(fact.label_fr, fact.label_en),
    })),
  }
}

export function EventsProvider({ children }) {
  const [events, setEvents] = useState(fallbackEvents)

  useEffect(() => {
    if (!isSupabaseConfigured) return undefined
    let active = true

    getSupabase()
      .then(async (client) => {
        if (!client) return
        const { data, error } = await client
          .from('events')
          .select('*')
          .order('sort_order', { ascending: false })
        if (!active || error || !data?.length) return
        setEvents(data.map(mapRow))
      })
      .catch(() => {
        // Keep the local events if the network or the table is unavailable.
      })

    return () => {
      active = false
    }
  }, [])

  const nextEvent = events.find((event) => event.status === 'upcoming') ?? null

  return (
    <EventsContext.Provider value={{ events, nextEvent }}>{children}</EventsContext.Provider>
  )
}

export function useEvents() {
  return useContext(EventsContext)
}
