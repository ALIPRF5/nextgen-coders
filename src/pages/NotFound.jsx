import { Link } from 'react-router-dom'
import Seo from '../components/Seo'
import { ArrowRight, SparkleIcon } from '../components/icons'
import { useI18n } from '../i18n'

export default function NotFound() {
  const { t } = useI18n()

  return (
    <>
      <Seo page="notFound" path="/404" />

      <section className="paper overflow-x-clip border-b-2 border-fg/10">
        <div className="shell py-16 sm:py-24">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <p className="eyebrow">
              <span className="h-2.5 w-2.5 rounded-full bg-accent" aria-hidden="true" />
              {t.notFound.eyebrow}
            </p>
            <p className="pill border-fg/15 bg-ink/80 text-muted">HTTP 404</p>
          </div>
          <div className="relative mt-4 w-fit">
            <p
              className="display display-tight select-none text-[clamp(7rem,26vw,22rem)] leading-none text-accent"
              aria-hidden="true"
            >
              404
            </p>
            <SparkleIcon
              className="absolute -right-6 -top-6 h-16 w-16 rotate-12 text-sun sm:h-24 sm:w-24"
              aria-hidden="true"
            />
          </div>
          <h1 className="display mt-2 text-4xl sm:text-6xl lg:text-7xl">{t.notFound.title}</h1>
          <p className="mt-5 max-w-md text-[16px] leading-relaxed text-muted sm:text-base">
            {t.notFound.text}
          </p>
          <Link to="/" className="btn-primary mt-8">
            {t.common.backHome}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </>
  )
}
