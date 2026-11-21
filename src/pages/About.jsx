import { Link } from 'react-router-dom'
import CtaBand from '../components/CtaBand'
import PageHeader from '../components/PageHeader'
import Seo from '../components/Seo'
import { ArrowRight, SparkleIcon } from '../components/icons'
import { timeline } from '../data/timeline'
import { pick, useI18n } from '../i18n'

const VALUE_TINTS = ['perk-yellow', 'perk-blue', 'perk-purple']

export default function About() {
  const { t, lang } = useI18n()

  return (
    <>
      <Seo page="about" path="/about" />

      <PageHeader
        eyebrow={t.about.eyebrow}
        title={t.about.title}
        lead={t.about.lead}
        meta={t.about.meta}
      />

      <section className="shell py-14 sm:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
          <div data-reveal className="space-y-6">
            {t.about.paragraphs.map((paragraph, index) => (
              <p
                key={paragraph}
                className={
                  index === 0
                    ? 'max-w-3xl text-xl leading-snug tracking-[-0.01em] text-fg sm:text-2xl'
                    : 'max-w-2xl text-[16px] leading-relaxed text-muted'
                }
              >
                {paragraph}
              </p>
            ))}
          </div>

          <aside data-reveal className="perk perk-yellow p-6 sm:p-7">
            <p className="text-[11px] font-extrabold uppercase tracking-[0.16em] text-night/55">
              {t.about.presidentTitle}
            </p>
            <div className="mt-6 flex items-center gap-4">
              <span className="display grid h-14 w-14 place-items-center rounded-full border-2 border-night/20 bg-white/80 text-xl">
                AE
              </span>
              <div>
                <p className="text-[16px] font-bold">{t.about.presidentName}</p>
                <p className="mt-1 text-[11px] font-extrabold uppercase tracking-[0.12em] text-night/55">
                  {t.about.presidentRole}
                </p>
              </div>
            </div>
            <p className="mt-5 text-[14px] leading-relaxed text-night/70">{t.about.presidentText}</p>

            <div className="mt-6 rounded-control border-2 border-night/10 bg-white/55 p-4">
              <p className="text-[11px] font-extrabold uppercase tracking-[0.14em] text-night/55">
                {t.about.seasonTitle}
              </p>
              <p className="mt-2 text-[13.5px] leading-relaxed text-night/75">{t.about.seasonText}</p>
            </div>
          </aside>
        </div>
      </section>

      <section className="shell pb-14 sm:pb-20">
        <div
          data-reveal
          className="perk perk-purple flex flex-col gap-6 p-6 sm:flex-row sm:items-center sm:justify-between sm:p-9"
        >
          <div className="max-w-xl">
            <p className="text-[11px] font-extrabold uppercase tracking-[0.16em] text-night/55">
              {t.about.galleryEyebrow}
            </p>
            <h2 className="display mt-3 text-3xl sm:text-5xl">{t.about.galleryTitle}</h2>
            <p className="mt-3 text-[14px] leading-relaxed text-night/70">
              {t.about.galleryTeaserText}
            </p>
          </div>
          <Link to="/gallery" className="btn-invert shrink-0">
            {t.about.galleryCta}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      <section className="border-y-2 border-fg/10 bg-raised">
        <div className="shell grid gap-10 py-14 sm:py-20 lg:grid-cols-[0.6fr_1.4fr] lg:gap-16">
          <div data-reveal className="lg:sticky lg:top-28 lg:self-start">
            <p className="eyebrow">{t.about.timelineEyebrow}</p>
            <h2 className="display mt-4 text-4xl sm:text-5xl">{t.about.timelineTitle}</h2>
            <SparkleIcon className="mt-8 h-14 w-14 rotate-12 text-accent" aria-hidden="true" />
          </div>

          <ol>
            {timeline.map((item, index) => (
              <li
                key={item.id}
                data-reveal
                className="grid gap-3 border-t-2 border-fg/10 py-6 sm:grid-cols-[0.3fr_0.7fr] sm:gap-6"
              >
                <div>
                  <span className="sticker h-9 w-9 bg-white text-[11px] font-extrabold">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <p className="mt-3 text-[11px] font-extrabold uppercase tracking-[0.12em] text-fg">
                    {pick(item.date, lang)}
                  </p>
                </div>
                <div>
                  <h3 className="display text-xl sm:text-2xl">{pick(item.title, lang)}</h3>
                  <p className="mt-2 max-w-xl text-[14.5px] leading-relaxed text-muted">
                    {pick(item.text, lang)}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="shell py-14 sm:py-20">
        <div data-reveal className="max-w-2xl">
          <p className="eyebrow">{t.about.valuesEyebrow}</p>
          <h2 className="display mt-4 text-4xl sm:text-5xl">{t.about.valuesTitle}</h2>
        </div>
        <div className="mt-10 grid gap-4 sm:grid-cols-3">
          {t.about.values.map((value, index) => (
            <div
              key={value.title}
              data-reveal
              className={`perk p-6 ${VALUE_TINTS[index % VALUE_TINTS.length]}`}
            >
              <span className="text-[12px] font-extrabold uppercase tracking-[0.14em] text-night/55">
                {String(index + 1).padStart(2, '0')}
              </span>
              <h3 className="display mt-10 text-[1.8rem] leading-none">{value.title}</h3>
              <p className="mt-3 text-[14px] leading-relaxed text-night/70">{value.text}</p>
            </div>
          ))}
        </div>
      </section>

      <CtaBand
        eyebrow={t.home.ctaEyebrow}
        title={t.about.ctaTitle}
        text={t.about.ctaText}
      />
    </>
  )
}
