import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { useI18n } from '../i18n'
import BackToTop from './BackToTop'
import Footer from './Footer'
import Navbar from './Navbar'

export default function Layout() {
  const { t } = useI18n()
  const { pathname } = useLocation()

  useEffect(() => {
    const root = document.getElementById('main')
    if (!root) return undefined

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      root.querySelectorAll('[data-reveal]').forEach((el) => el.classList.add('is-visible'))
      return undefined
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.04 },
    )

    const scan = () => {
      root.querySelectorAll('[data-reveal]:not(.is-visible)').forEach((el) => observer.observe(el))
    }

    scan()
    const mutations = new MutationObserver(scan)
    mutations.observe(root, { childList: true, subtree: true })

    return () => {
      observer.disconnect()
      mutations.disconnect()
    }
  }, [pathname])

  return (
    <div className="flex min-h-screen flex-col">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-control focus:border-2 focus:border-night focus:bg-sun focus:px-5 focus:py-2 focus:text-sm focus:font-bold focus:text-night"
      >
        {t.common.skipToContent}
      </a>
      <Navbar />
      <main id="main" className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <BackToTop />
    </div>
  )
}
