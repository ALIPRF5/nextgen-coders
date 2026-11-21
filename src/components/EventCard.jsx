import { useI18n, pick } from '../i18n'

export default function EventCard({ event, highlight = false, priority = false }) {
  const { t, lang } = useI18n()
  const isPast = event.status === 'past'

  return (
    <article
      data-reveal
      className={`group card flex h-full flex-col overflow-hidden transition-all duration-200 hover:-translate-y-1 ${
        highlight ? 'border-fg/25 shadow-[6px_7px_0_rgba(23,23,29,0.14)]' : ''
      }`}
    >
      {event.image ? (
        <div className="relative aspect-[16/10] w-full overflow-hidden border-b-2 border-fg/10 bg-raised">
          <img
            src={event.image}
            alt={pick(event.imageAlt, lang)}
            width="1000"
            height="625"
            loading={priority ? 'eager' : 'lazy'}
            fetchPriority={priority ? 'high' : 'auto'}
            decoding="async"
            className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
          />
          <span
            className={`pill absolute left-3 top-3 border-2 border-night/15 ${
              isPast ? 'bg-white/90 text-night' : 'bg-accent text-night'
            }`}
          >
            {isPast ? t.events.past : t.events.upcoming}
          </span>
        </div>
      ) : (
        <div className="relative flex aspect-[16/10] w-full flex-col justify-between overflow-hidden border-b-2 border-fg/10 bg-raised p-5">
          <span
            className="pointer-events-none absolute -right-2 -top-4 select-none font-display text-[7rem] font-semibold leading-none tracking-[-0.06em] text-fg/[0.07]"
            aria-hidden="true"
          >
            {event.badge.bottom}
          </span>
          <span className="pill w-fit border-fg/30 text-fg">
            {isPast ? t.events.past : t.events.upcoming}
          </span>
          <div className="relative">
            <p className="display display-tight text-5xl uppercase sm:text-6xl">{event.badge.top}</p>
            <p className="meta mt-2">{pick(event.date, lang)}</p>
          </div>
        </div>
      )}

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <div className="flex items-center justify-between gap-3">
          <p className={`meta ${highlight ? '!text-accent-text' : ''}`}>
            {pick(event.date, lang)}
            {event.dateNote ? ` · ${pick(event.dateNote, lang)}` : ''}
          </p>
        </div>

        <h3 className="display mt-3 text-[1.7rem] leading-[1.05] sm:text-[2rem]">
          {pick(event.title, lang)}
        </h3>
        <p className="mt-3 flex-1 text-[14.5px] leading-relaxed text-muted">
          {pick(event.description, lang)}
        </p>

        {event.facts.length > 0 && (
          <div className="mt-6 flex flex-wrap gap-x-8 gap-y-3 border-t-2 border-fg/10 pt-4">
            {event.facts.map((fact) => (
              <div key={`${event.id}-${fact.value}`}>
                <p className="display text-2xl leading-none">{fact.value}</p>
                <p className="meta mt-1">{pick(fact.label, lang)}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </article>
  )
}
