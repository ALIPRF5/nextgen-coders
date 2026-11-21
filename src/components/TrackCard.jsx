import { Link } from 'react-router-dom'
import { useI18n, pick } from '../i18n'
import { ArrowUpRight, TrackIcon } from './icons'

const TINTS = ['perk-yellow', 'perk-blue', 'perk-purple', 'perk-mint', 'perk-pink']

export default function TrackCard({ track, index, detailed = false }) {
  const { t, lang } = useI18n()
  const number = String(index + 1).padStart(2, '0')
  const tint = TINTS[index % TINTS.length]

  if (detailed) {
    return (
      <article
        id={track.id}
        data-reveal
        className="scroll-mt-28 border-t-2 border-fg/10 py-10 first:border-t-0 sm:py-14"
      >
        <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:gap-14">
          <div>
            <div className="flex items-center gap-3">
              <span
                className={`sticker h-12 w-12 text-[13px] font-extrabold ${tint}`}
                aria-hidden="true"
              >
                {number}
              </span>
              <span className="meta">/ 05</span>
              <TrackIcon name={track.icon} className="h-5 w-5 text-accent-text" />
            </div>
            <h2 className="display mt-6 text-4xl sm:text-6xl">{pick(track.name, lang)}</h2>
            <p className="mt-4 max-w-lg text-[17px] leading-relaxed text-muted">
              {pick(track.tagline, lang)}
            </p>
            <p className="mt-8 max-w-lg border-l-4 border-fg/15 pl-4 text-sm leading-relaxed text-fg/80">
              <span className="meta mb-1 block">{t.tracks.forLabel}</span>
              {pick(track.forWho, lang)}
            </p>
          </div>

          <div className="card p-5 sm:p-7">
            <p className="meta">{t.tracks.learnLabel}</p>
            <ul className="mt-3">
              {pick(track.learn, lang).map((item) => (
                <li
                  key={item}
                  className="flex gap-3 border-t-2 border-fg/10 py-3 text-[15px] leading-snug text-fg/85 first:border-t-0"
                >
                  <span aria-hidden="true" className="font-bold text-accent-text">
                    →
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </article>
    )
  }

  return (
    <Link
      to="/tracks"
      data-reveal
      className={`perk group flex h-full flex-col justify-between p-6 transition-transform duration-200 hover:-translate-y-1.5 sm:p-7 ${tint}`}
    >
      <div className="flex items-start justify-between">
        <span className="text-[12px] font-extrabold uppercase tracking-[0.14em] text-night/55">
          {number} / 05
        </span>
        <span className="grid h-11 w-11 place-items-center rounded-full border-2 border-night/20 bg-white/70">
          <TrackIcon name={track.icon} className="h-5 w-5 text-night" />
        </span>
      </div>

      <div className="mt-16">
        <h3 className="display text-[1.9rem] leading-none sm:text-3xl">{pick(track.name, lang)}</h3>
        <p className="mt-3 text-[14.5px] leading-relaxed text-night/70">
          {pick(track.tagline, lang)}
        </p>
      </div>

      <span className="mt-7 inline-flex w-fit items-center gap-2 rounded-full border-2 border-night/80 bg-white/80 px-3.5 py-1.5 text-[11px] font-extrabold uppercase tracking-[0.1em] text-night transition-colors group-hover:bg-night group-hover:text-white">
        {t.nav.tracks}
        <ArrowUpRight className="h-3 w-3" />
      </span>
    </Link>
  )
}
