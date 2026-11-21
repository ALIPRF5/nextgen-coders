import { Link } from 'react-router-dom'
import { SITE } from '../data/site'
import { useI18n } from '../i18n'
import { LogoMark } from './Logo'
import { ArrowUpRight, InstagramIcon, MailIcon, SparkleIcon } from './icons'

export default function Footer() {
  const { t } = useI18n()

  const links = [
    { to: '/about', label: t.nav.about },
    { to: '/tracks', label: t.nav.tracks },
    { to: '/events', label: t.nav.events },
    { to: '/gallery', label: t.nav.gallery },
    { to: '/board', label: t.nav.board },
    { to: '/join', label: t.nav.join },
    { to: '/contact', label: t.nav.contact },
  ]

  return (
    <footer className="relative overflow-hidden bg-night text-white">
      <div
        className="pointer-events-none absolute inset-0 opacity-70"
        style={{
          backgroundImage:
            'linear-gradient(to right, rgba(255,255,255,0.07) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.07) 1px, transparent 1px)',
          backgroundSize: '56px 56px',
        }}
        aria-hidden="true"
      />

      <div className="shell relative pt-14 sm:pt-16">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_0.8fr_0.9fr] lg:gap-16">
          <div>
            <Link to="/" className="group flex items-center gap-3" aria-label="NEXTGEN CODERS">
              <LogoMark className="h-12 w-12" />
              <span className="display text-3xl leading-none text-white">
                Nextgen Coders<span className="text-accent">.</span>
              </span>
            </Link>
            <p className="mt-5 max-w-xs text-[15px] leading-relaxed text-white/70">
              {t.footer.blurb}
            </p>
            <p className="mt-3 flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.16em] text-white/45">
              <SparkleIcon className="h-3 w-3 text-sun" />
              {SITE.tagline}
            </p>

            <div className="mt-7 flex items-center gap-3">
              <a
                href={SITE.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="grid h-11 w-11 place-items-center rounded-[10px] border-2 border-white/25 text-white transition-colors hover:border-white hover:bg-white hover:text-night"
                aria-label={SITE.instagramHandle}
              >
                <InstagramIcon className="h-5 w-5" />
              </a>
              <a
                href={`mailto:${SITE.email}`}
                className="grid h-11 w-11 place-items-center rounded-[10px] border-2 border-white/25 text-white transition-colors hover:border-white hover:bg-white hover:text-night"
                aria-label={SITE.email}
              >
                <MailIcon className="h-5 w-5" />
              </a>
            </div>
          </div>

          <nav aria-label={t.footer.navTitle}>
            <h2 className="text-[13px] font-extrabold uppercase tracking-[0.14em] text-white">
              {t.footer.navTitle}
            </h2>
            <ul className="mt-5 grid grid-cols-2 gap-x-6 gap-y-2.5">
              {links.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-[14px] text-white/70 transition-colors hover:text-white hover:underline hover:underline-offset-4"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="text-[13px] font-extrabold uppercase tracking-[0.14em] text-white">
              {t.footer.followTitle}
            </h2>
            <ul className="mt-5 space-y-3">
              <li>
                <a
                  href={SITE.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2.5 text-[14px] font-medium text-white/80 transition-colors hover:text-white"
                >
                  <InstagramIcon className="h-4 w-4" />
                  {SITE.instagramHandle}
                  <ArrowUpRight className="h-3.5 w-3.5 opacity-50 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${SITE.email}`}
                  className="inline-flex items-center gap-2.5 break-all text-[14px] text-white/80 transition-colors hover:text-white"
                >
                  <MailIcon className="h-4 w-4 shrink-0" />
                  {SITE.email}
                </a>
              </li>
            </ul>
            <p className="mt-4 max-w-[16rem] text-[12.5px] leading-relaxed text-white/45">
              {t.common.location}
            </p>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-white/15 py-6 text-[12px] text-white/50 sm:flex-row sm:items-center sm:justify-between">
          <p>{t.footer.rights}</p>
          <p className="font-bold uppercase tracking-[0.14em]">{t.common.school}</p>
        </div>
      </div>
      <div className="h-16" aria-hidden="true" />
    </footer>
  )
}
