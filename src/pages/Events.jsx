import CtaBand from '../components/CtaBand'
import EventCard from '../components/EventCard'
import PageHeader from '../components/PageHeader'
import Seo from '../components/Seo'
import { InstagramIcon, MapPinIcon, SparkleIcon } from '../components/icons'
import { SITE } from '../data/site'
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
        meta={`${past.length} ${t.events.unitEvents} · ${t.announcement.dateLabel}`}
      />

      <section className="shell py-14 sm:py-20">
        <div className="flex flex-wrap items-center gap-3">
          <h2 className="display text-3xl sm:text-4xl">{t.events.upcomingTitle}</h2>
          <span className="pill border-accent/30 bg-accent-soft py-1.5 text-accent-text">
            {t.announcement.dateLabel}
          </span>
        </div>

        <div
          data-reveal
          className="relative mt-7 overflow-hidden rounded-card border-2 border-fg/15 bg-accent p-6 text-night shadow-[0_18px_0_-10px_rgba(23,23,29,0.18)] sm:p-9 lg:p-12"
        >
          <SparkleIcon
            className="pointer-events-none absolute -right-10 -top-10 h-44 w-44 text-night/10"
            aria-hidden="true"
          />
          <SparkleIcon
            className="pointer-events-none absolute -bottom-12 left-1/3 h-40 w-40 text-night/5"
            aria-hidden="true"
          />
          <div className="relative grid gap-10 lg:grid-cols-[1fr_260px] lg:items-center lg:gap-12">
            <div>
              <p className="text-[11px] font-extrabold uppercase tracking-[0.2em] text-night/55">
                {t.events.next}
              </p>
              <p className="display mt-4 text-[clamp(3rem,9vw,6.5rem)] leading-[0.84]">
                {t.announcement.badge}
              </p>
              <p className="display mt-3 max-w-2xl text-[clamp(1.2rem,2.4vw,1.7rem)] leading-[1.12]">
                {t.announcement.title}{' '}
                <span className="text-night/65">{t.announcement.titleLead}</span>
              </p>

              <div className="mt-5 flex flex-wrap gap-2">
                <span className="pill border-night/25 bg-night/10">
                  {t.announcement.dateLabel} · {t.announcement.dateNote}
                </span>
                <span className="pill border-night/25 bg-night/10">
                  <MapPinIcon className="h-3.5 w-3.5" aria-hidden="true" />
                  {t.announcement.location}
                </span>
              </div>

              <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-night/75">
                {t.announcement.intro}
              </p>

              <ul className="mt-5 flex flex-wrap gap-2">
                {t.announcement.programme.map((item) => (
                  <li
                    key={item.title}
                    className="pill border-night/20 bg-white/45 normal-case tracking-normal"
                  >
                    <span className="text-[13px] leading-none" aria-hidden="true">
                      {item.emoji}
                    </span>
                    {item.title}
                  </li>
                ))}
              </ul>

              <p className="mt-5 max-w-xl text-[12.5px] leading-relaxed text-night/60">
                {t.announcement.partnersText}
              </p>

              <div className="mt-6 flex flex-wrap items-center gap-3">
                <p className="pill border-night bg-night text-accent">
                  <SparkleIcon className="h-3.5 w-3.5" aria-hidden="true" />
                  {t.announcement.soonLabel}
                </p>
                <a
                  href={SITE.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn border-2 border-night/40 px-5 py-2.5 text-night hover:bg-night/10"
                >
                  <InstagramIcon className="h-4 w-4" />
                  {SITE.instagramHandle}
                </a>
              </div>
            </div>

            <figure className="photo-frame mx-auto w-full max-w-[260px] rotate-[1.6deg] transition-transform duration-300 hover:rotate-0">
              <img
                src="/images/announcement-autumn-school.webp"
                alt={t.announcement.posterAlt}
                width="760"
                height="1051"
                loading="lazy"
                decoding="async"
                className="w-full rounded-[4px]"
              />
              <figcaption className="px-1 pb-1 pt-3 text-[10px] font-extrabold uppercase tracking-[0.12em] text-night">
                {t.announcement.dateLabel}
              </figcaption>
            </figure>
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
