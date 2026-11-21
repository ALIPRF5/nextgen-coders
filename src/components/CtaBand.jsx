import { Link } from 'react-router-dom'
import { useI18n } from '../i18n'
import { ArrowRight, SparkleIcon } from './icons'

export default function CtaBand({ eyebrow, title, text, to = '/join', label, children }) {
  const { t } = useI18n()

  return (
    <section className="relative overflow-hidden border-y-2 border-fg bg-accent text-night">
      <SparkleIcon
        className="pointer-events-none absolute -left-6 top-6 h-28 w-28 text-night/10"
        aria-hidden="true"
      />
      <SparkleIcon
        className="pointer-events-none absolute -bottom-8 right-10 h-40 w-40 text-night/10"
        aria-hidden="true"
      />
      <div className="shell relative grid gap-8 py-14 sm:py-20 lg:grid-cols-[1.5fr_0.5fr] lg:items-end">
        <div>
          {eyebrow && (
            <p className="text-[11.5px] font-extrabold uppercase tracking-[0.2em] text-night/55">
              {eyebrow}
            </p>
          )}
          <h2 className="display mt-5 max-w-3xl text-[clamp(2.4rem,5.6vw,4.9rem)]">{title}</h2>
          {text && (
            <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-night/75 sm:text-base">
              {text}
            </p>
          )}
        </div>
        <div className="flex flex-wrap gap-3 lg:justify-end">
          {children ?? (
            <Link to={to} className="btn-on-accent">
              {label ?? t.common.joinCta}
              <ArrowRight className="h-4 w-4" />
            </Link>
          )}
        </div>
      </div>
    </section>
  )
}
