import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { useI18n } from '../i18n'
import { Logo } from './Logo'
import LanguageToggle from './LanguageToggle'
import ThemeToggle from './ThemeToggle'
import { ArrowRight, CloseIcon, MenuIcon, SparkleIcon } from './icons'

export default function Navbar() {
  const { t } = useI18n()
  const { pathname } = useLocation()
  const [open, setOpen] = useState(false)

  useEffect(() => {
    setOpen(false)
  }, [pathname])

  useEffect(() => {
    if (!open) return undefined
    function handleKey(event) {
      if (event.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [open])

  const links = [
    { to: '/', label: t.nav.home },
    { to: '/about', label: t.nav.about },
    { to: '/tracks', label: t.nav.tracks },
    { to: '/events', label: t.nav.events },
    { to: '/gallery', label: t.nav.gallery },
    { to: '/board', label: t.nav.board },
    { to: '/join', label: t.nav.join },
    { to: '/contact', label: t.nav.contact },
  ]

  const desktopLink = ({ isActive }) =>
    `relative whitespace-nowrap rounded-full px-2.5 py-1.5 text-[13px] font-bold transition-colors ${
      isActive ? 'text-accent-text' : 'text-muted hover:bg-raised hover:text-fg'
    }`

  return (
    <>
      <header className="sticky top-0 z-50 border-b-2 border-fg/10 bg-ink/95 backdrop-blur-md">
        <div className="shell flex h-[72px] items-center justify-between gap-4">
          <Link to="/" aria-label={`NEXTGEN CODERS — ${t.nav.home}`} className="shrink-0">
            <Logo compactOnMobile />
          </Link>

          <nav aria-label={t.common.mainNav} className="hidden items-center gap-1 lg:flex">
            {links.map((link) => (
              <NavLink key={link.to} to={link.to} end={link.to === '/'} className={desktopLink}>
                {link.label}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <LanguageToggle />
            <ThemeToggle />
            <Link to="/join" className="btn-primary btn-sm hidden xl:inline-flex">
              {t.common.joinCta}
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
            <button
              type="button"
              onClick={() => setOpen((value) => !value)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? t.common.closeMenu : t.common.menu}
              className="grid h-9 w-9 place-items-center rounded-control border-2 border-fg/20 text-fg transition-colors hover:border-fg lg:hidden"
            >
              {open ? <CloseIcon className="h-5 w-5" /> : <MenuIcon className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </header>

      {open && (
        <div
          id="mobile-menu"
          className="paper fixed inset-x-0 bottom-0 top-[72px] z-40 overflow-y-auto border-t-2 border-fg/10 bg-ink lg:hidden"
        >
          <nav aria-label={t.common.mobileNav} className="shell flex min-h-full flex-col py-6">
            <div className="flex-1">
              {links.map((link, index) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  end={link.to === '/'}
                  className={({ isActive }) =>
                    `flex items-baseline justify-between gap-4 border-b-2 border-fg/10 py-3 ${
                      isActive ? 'text-accent-text' : 'text-fg'
                    }`
                  }
                >
                  <span className="display text-[2rem] leading-none sm:text-4xl">{link.label}</span>
                  <span className="meta">{String(index + 1).padStart(2, '0')}</span>
                </NavLink>
              ))}
            </div>
            <Link to="/join" className="btn-primary mt-6 w-full">
              {t.common.joinCta}
              <ArrowRight className="h-4 w-4" />
            </Link>
            <p className="mt-4 flex items-center justify-center gap-2 text-[11px] font-bold uppercase tracking-[0.16em] text-muted">
              <SparkleIcon className="h-3 w-3 text-accent" />
              EST Laâyoune
            </p>
          </nav>
        </div>
      )}
    </>
  )
}
