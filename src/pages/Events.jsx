import { Link } from 'react-router-dom'
import CtaBand from '../components/CtaBand'
import EventCard from '../components/EventCard'
import PageHeader from '../components/PageHeader'
import Seo from '../components/Seo'
import { ArrowRight, SparkleIcon } from '../components/icons'
import { useI18n } from '../i18n'
import { useEvents } from '../lib/EventsContext'

export default function Events() {
  const { t } = useI18n()
  const { events } = useEvents()
  const past = events.filter((event) => event.status === 'past')

  return (
    <>
      <Seo page="events" path="/events" />

      <PageHeader
        eyebrow={t.events.eyebrow}
        title={t.events.title}
        lead={t.events.lead}
        meta={`${past.length} ${t.events.unitEvents} · ${t.events.metaUpcoming}`}
      />

      <section className="shell py-14 sm:py-20">
        <div className="flex flex-wrap items-center gap-3">
          <h2 className="display text-3xl sm:text-4xl">{t.events.upcomingTitle}</h2>
          <span className="pill border-accent/30 bg-accent-soft py-1.5 text-accent-text">
            {t.events.comingSoon}
          </span>
        </div>

        <div
          data-reveal
          className="relative mt-7 overflow-hidden rounded-card border-2 border-fg/15 bg-accent p-7 text-night shadow-[0_18px_0_-10px_rgba(23,23,29,0.18)] sm:p-10 lg:p-12"
        >
          <SparkleIcon
            className="pointer-events-none absolute -right-10 -top-10 h-44 w-44 text-night/10"
            aria-hidden="true"
          />
          <SparkleIcon
            className="pointer-events-none absolute -bottom-12 left-1/3 h-40 w-40 text-night/5"
            aria-hidden="true"
          />
          <div className="relative grid gap-8 lg:grid-cols-[1.5fr_0.5fr] lg:items-end">
            <div>
              <p className="text-[11px] font-extrabold uppercase tracking-[0.2em] text-night/55">
                {t.events.next}
              </p>
              <p className="display mt-5 text-[clamp(3rem,9vw,7rem)] leading-[0.84]">
                {t.events.comingSoon}
              </p>
              <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-night/75">
                {t.events.comingSoonText}
              </p>
            </div>
            <Link to="/join" className="btn-on-accent justify-self-start lg:justify-self-end">
              {t.common.joinCta}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      <section className="border-y-2 border-fg/10 bg-raised">
        <div className="shell py-14 sm:py-20">
          <div className="max-w-xl">
            <h2 className="display text-3xl sm:text-4xl">{t.events.pastTitle}</h2>
            <p className="mt-2 text-[14.5px] leading-relaxed text-muted">{t.events.note}</p>
          </div>
          <div className="mt-8 grid gap-5 sm:grid-cols-2">
            {past.map((event, index) => (
              <EventCard key={event.id} event={event} index={index} />
            ))}
          </div>
        </div>
      </section>

      <CtaBand eyebrow={t.events.eyebrow} title={t.events.ctaTitle} text={t.events.ctaText} />
    </>
  )
}
