import { Link } from 'react-router-dom'
import CtaBand from '../components/CtaBand'
import HeroSlideshow from '../components/HeroSlideshow'
import Seo from '../components/Seo'
import TrackCard from '../components/TrackCard'
import Wave from '../components/Wave'
import { ArrowRight, InstagramIcon, SparkleIcon, SquiggleIcon } from '../components/icons'
import { heroSlides } from '../data/hero'
import { SITE } from '../data/site'
import { tracks } from '../data/tracks'
import { pick, useI18n } from '../i18n'

const PILLAR_TINTS = ['perk-yellow', 'perk-blue', 'perk-purple']

const [mottoLead, mottoTail] = SITE.tagline.split(', ')

export default function Home() {
  const { t, lang } = useI18n()

  return (
    <>
      <Seo page="home" path="/" />

      <section className="paper overflow-x-clip border-b-2 border-fg/10">
        <div className="shell pt-10 sm:pt-14">
          <p className="eyebrow">
            <span className="h-2.5 w-2.5 rounded-full bg-accent" aria-hidden="true" />
            {t.home.eyebrow}
          </p>

          <h1 className="display display-tight mt-8 text-[clamp(2.9rem,8.6vw,8.4rem)]">
            <span className="block">{t.home.titleLine1}</span>
            <span className="relative block text-accent">
              {t.home.titleLine2}
              <SquiggleIcon className="absolute -bottom-3 left-0 hidden h-3 w-40 text-accent-text sm:block" />
            </span>
          </h1>

          <div className="mt-9 grid gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
            <p className="max-w-xl text-[17px] leading-relaxed text-muted sm:text-lg">
              {t.home.lead}
            </p>
            <div className="flex flex-wrap gap-3 lg:justify-end">
              <Link to="/join" className="btn-primary">
                {t.common.joinCta}
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link to="/events" className="btn-outline">
                {t.common.seeEvents}
              </Link>
            </div>
          </div>

          <div className="relative mx-auto mt-10 max-w-5xl pb-10 sm:mt-14 sm:pb-14">
            <HeroSlideshow slides={heroSlides} lang={lang} school={t.common.school} />

            <figure className="photo-frame absolute -bottom-2 right-2 z-20 hidden w-[30%] rotate-[3deg] transition-transform duration-300 hover:rotate-0 md:block">
              <img
                src="/images/hero-2.webp"
                alt={t.home.heroSideAlt}
                width="1600"
                height="900"
                loading="lazy"
                decoding="async"
                className="aspect-[4/3] w-full rounded-[4px] object-cover"
              />
            </figure>

            <SparkleIcon
              className="absolute -left-4 -top-7 z-20 h-16 w-16 -rotate-12 text-accent drop-shadow-sm sm:-left-8 sm:h-24 sm:w-24"
              aria-hidden="true"
            />
            <span className="sticker absolute -right-2 -top-4 z-20 rotate-6 bg-sun px-3 py-1.5 text-[10.5px] font-extrabold uppercase tracking-[0.1em] sm:-right-4">
              EST Laâyoune
            </span>
          </div>

          <div className="grid grid-cols-3 gap-3 border-t-2 border-fg/10 pt-6">
            {t.home.stats.map((stat) => (
              <div key={stat.label}>
                <p className="display text-4xl leading-none sm:text-5xl">{stat.value}</p>
                <p className="meta mt-2">{stat.label}</p>
              </div>
            ))}
          </div>
          <p className="meta mt-4 pb-10">{t.home.statsLabel}</p>
        </div>
      </section>

      <Wave className="text-accent" />

      <section className="relative overflow-hidden border-y-2 border-fg bg-accent text-night">
        <SparkleIcon
          className="pointer-events-none absolute -right-10 -top-12 h-48 w-48 text-night/10"
          aria-hidden="true"
        />
        <div className="shell relative grid gap-6 py-9 sm:py-12 lg:grid-cols-[auto_1fr] lg:items-end lg:gap-12">
          <span className="sticker -rotate-3 justify-self-start bg-night px-3.5 py-1.5 text-[10px] font-extrabold uppercase tracking-[0.16em] text-accent">
            {t.home.mottoLabel}
          </span>
          <p className="display text-[clamp(2.2rem,6.4vw,5rem)] leading-[0.88]">
            {mottoLead},{' '}
            <span className="italic text-night/70">{mottoTail}</span>
          </p>
        </div>
      </section>

      <section className="shell py-16 sm:py-24">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-14">
          <div data-reveal>
            <p className="eyebrow">{t.home.whatEyebrow}</p>
            <h2 className="display mt-4 text-4xl sm:text-5xl lg:text-6xl">{t.home.whatTitle}</h2>
            <p className="mt-4 max-w-sm text-[15px] leading-relaxed text-muted">
              {t.home.tracksLead}
            </p>
            <Link
              to="/tracks"
              className="mt-5 inline-flex items-center gap-2 text-[12px] font-extrabold uppercase tracking-[0.14em] text-fg hover:text-accent-text"
            >
              {t.common.seeTracks}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            {t.home.pillars.map((pillar, index) => (
              <div
                key={pillar.title}
                data-reveal
                className={`perk flex flex-col p-5 sm:p-6 ${PILLAR_TINTS[index % PILLAR_TINTS.length]}`}
              >
                <span className="sticker h-10 w-10 bg-white/80 text-[12px] font-extrabold">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <h3 className="display mt-12 text-[1.7rem] leading-none">{pillar.title}</h3>
                <p className="mt-3 text-[13.5px] leading-relaxed text-night/70">{pillar.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y-2 border-fg/10 bg-raised">
        <div className="shell py-16 sm:py-24">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div className="max-w-2xl" data-reveal>
              <p className="eyebrow">{t.home.tracksEyebrow}</p>
              <h2 className="display mt-4 text-4xl sm:text-5xl">{t.home.tracksTitle}</h2>
              <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-muted">
                {t.home.tracksLead}
              </p>
            </div>
            <Link
              to="/tracks"
              className="hidden items-center gap-2 text-[12px] font-extrabold uppercase tracking-[0.14em] text-fg hover:text-accent-text sm:inline-flex"
            >
              {t.common.seeTracks}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {tracks.map((track, index) => (
              <TrackCard key={track.id} track={track} index={index} />
            ))}
            <div
              data-reveal
              className="relative flex flex-col justify-between overflow-hidden rounded-card border-2 border-fg/15 bg-night p-6 text-white sm:p-7"
            >
              <SparkleIcon
                className="pointer-events-none absolute -right-6 -top-6 h-32 w-32 text-white/10"
                aria-hidden="true"
              />
              <div className="relative">
                <p className="text-[11px] font-extrabold uppercase tracking-[0.16em] text-white/50">
                  {t.tracks.eyebrow}
                </p>
                <h3 className="display mt-12 text-[1.9rem] leading-none sm:mt-16 sm:text-3xl">
                  {t.tracks.ctaTitle}
                </h3>
                <p className="mt-3 text-[14px] leading-relaxed text-white/65">{t.tracks.ctaText}</p>
              </div>
              <Link to="/join" className="btn-invert mt-7 w-fit">
                {t.common.joinCta}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>

          <Link
            to="/tracks"
            className="mt-6 inline-flex items-center gap-2 text-[12px] font-extrabold uppercase tracking-[0.14em] text-fg sm:hidden"
          >
            {t.common.seeTracks}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      <section className="relative overflow-hidden border-y-2 border-fg/15 bg-night text-white">
        <SparkleIcon
          className="pointer-events-none absolute -left-10 top-8 h-44 w-44 text-accent/15"
          aria-hidden="true"
        />
        <SparkleIcon
          className="pointer-events-none absolute -bottom-12 right-6 h-56 w-56 text-white/5"
          aria-hidden="true"
        />
        <div className="shell relative grid gap-10 py-16 sm:py-24 lg:grid-cols-[1.5fr_0.5fr] lg:items-end">
          <div data-reveal>
            <p className="eyebrow text-white/55">
              <span className="h-2.5 w-2.5 rounded-full bg-accent" aria-hidden="true" />
              {t.home.nextEyebrow}
            </p>
            <h2 className="display mt-6 text-[clamp(3.4rem,11vw,9rem)] leading-[0.82] text-accent">
              {t.home.nextTitle}
            </h2>
            <p className="mt-6 max-w-xl text-[15px] leading-relaxed text-white/70 sm:text-base">
              {t.events.comingSoonText}
            </p>
          </div>
          <div data-reveal className="flex flex-wrap gap-3 lg:justify-end">
            <Link to="/events" className="btn-primary">
              {t.home.nextCta}
              <ArrowRight className="h-4 w-4" />
            </Link>
            <a
              href={SITE.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn border-2 border-white/40 px-6 py-3 text-white hover:bg-white/10"
            >
              <InstagramIcon className="h-4 w-4" />
              {SITE.instagramHandle}
            </a>
          </div>
        </div>
      </section>

      <section className="paper border-y-2 border-fg/10">
        <div className="shell grid gap-10 py-16 sm:py-24 lg:grid-cols-[0.95fr_1.05fr] lg:items-center lg:gap-16">
          <figure data-reveal className="photo-frame relative mx-auto w-full max-w-md rotate-[1.4deg]">
            <img
              src="/images/home-about.webp"
              alt={t.home.aboutImageAlt}
              width="1000"
              height="667"
              loading="lazy"
              decoding="async"
              className="aspect-[3/2] w-full rounded-[4px] object-cover"
            />
            <figcaption className="px-1 pb-1 pt-3 text-[11px] font-extrabold uppercase tracking-[0.12em] text-night">
              02 · {t.home.aboutImageCaption}
            </figcaption>
            <SparkleIcon
              className="absolute -right-5 -top-6 h-14 w-14 rotate-12 text-sun"
              aria-hidden="true"
            />
          </figure>

          <div data-reveal>
            <p className="eyebrow">{t.home.aboutEyebrow}</p>
            <h2 className="display mt-4 text-4xl sm:text-5xl lg:text-6xl">{t.home.aboutTitle}</h2>
            <p className="mt-5 max-w-lg text-[16px] leading-relaxed text-muted">{t.home.aboutText}</p>
            <Link to="/about" className="btn-outline mt-8">
              {t.home.aboutCta}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      <CtaBand
        eyebrow={t.home.ctaEyebrow}
        title={t.home.ctaTitle}
        text={t.home.ctaText}
      >
        <Link to="/join" className="btn-on-accent">
          {t.common.joinCta}
          <ArrowRight className="h-4 w-4" />
        </Link>
        <a
          href={SITE.instagramUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="btn border-2 border-night/40 px-6 py-3 text-night hover:bg-night/10"
        >
          <InstagramIcon className="h-4 w-4" />
          {SITE.instagramHandle}
        </a>
      </CtaBand>
    </>
  )
}
