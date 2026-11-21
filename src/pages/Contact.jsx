import CtaBand from '../components/CtaBand'
import PageHeader from '../components/PageHeader'
import Seo from '../components/Seo'
import { ArrowUpRight, InstagramIcon, MailIcon, MapPinIcon } from '../components/icons'
import { SITE } from '../data/site'
import { useI18n } from '../i18n'

export default function Contact() {
  const { t } = useI18n()

  return (
    <>
      <Seo page="contact" path="/contact" />

      <PageHeader
        eyebrow={t.contact.eyebrow}
        title={t.contact.title}
        lead={t.contact.lead}
        meta={t.contact.meta}
      />

      <section className="shell py-14 sm:py-20">
        <div className="grid gap-5 md:grid-cols-3">
          <a
            href={SITE.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="perk perk-yellow group flex min-h-[300px] flex-col justify-between p-6 transition-transform duration-200 hover:-translate-y-1.5 sm:p-7"
          >
            <div>
              <span className="grid h-11 w-11 place-items-center rounded-full border-2 border-night/20 bg-white/75 text-night">
                <InstagramIcon className="h-5 w-5" />
              </span>
              <p className="mt-8 text-[11px] font-extrabold uppercase tracking-[0.14em] text-night/50">
                01
              </p>
              <h2 className="display mt-2 text-3xl leading-none">{t.contact.instagramTitle}</h2>
              <p className="mt-3 text-[14px] leading-relaxed text-night/70">
                {t.contact.instagramText}
              </p>
            </div>
            <span className="mt-8 inline-flex items-center gap-2 text-[13.5px] font-bold">
              {t.contact.instagramCta}
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </span>
          </a>

          <a
            href={`mailto:${SITE.email}`}
            className="perk perk-blue group flex min-h-[300px] flex-col justify-between p-6 transition-transform duration-200 hover:-translate-y-1.5 sm:p-7"
          >
            <div>
              <span className="grid h-11 w-11 place-items-center rounded-full border-2 border-night/20 bg-white/75 text-night">
                <MailIcon className="h-5 w-5" />
              </span>
              <p className="mt-8 text-[11px] font-extrabold uppercase tracking-[0.14em] text-night/50">
                02
              </p>
              <h2 className="display mt-2 text-3xl leading-none">{t.contact.emailTitle}</h2>
              <p className="mt-3 text-[14px] leading-relaxed text-night/70">
                {t.contact.emailText}
              </p>
            </div>
            <span className="mt-8 inline-flex items-center gap-2 break-all text-[13.5px] font-bold">
              {t.contact.emailCta}
              <ArrowUpRight className="h-4 w-4 shrink-0 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </span>
          </a>

          <div className="perk perk-purple flex min-h-[300px] flex-col justify-between p-6 sm:p-7">
            <div>
              <span className="grid h-11 w-11 place-items-center rounded-full border-2 border-night/20 bg-white/75 text-night">
                <MapPinIcon className="h-5 w-5" />
              </span>
              <p className="mt-8 text-[11px] font-extrabold uppercase tracking-[0.14em] text-night/50">
                03
              </p>
              <h2 className="display mt-2 text-3xl leading-none">{t.contact.locationTitle}</h2>
              <p className="mt-3 text-[14px] leading-relaxed text-night/70">
                {t.contact.locationText}
              </p>
            </div>
            <p className="mt-8 text-[11px] font-extrabold uppercase tracking-[0.12em] text-night/55">
              {t.common.location}
            </p>
          </div>
        </div>

        <div className="card mt-12 grid gap-6 p-6 sm:p-8 lg:grid-cols-[0.8fr_1.2fr]">
          <h2 className="display text-2xl sm:text-3xl">{t.contact.partnersTitle}</h2>
          <p className="max-w-2xl text-[15px] leading-relaxed text-muted">
            {t.contact.partnersText}{' '}
            <a href={`mailto:${SITE.email}`} className="link-underline font-semibold text-fg">
              {SITE.email}
            </a>
          </p>
        </div>
      </section>

      <CtaBand
        eyebrow={t.join.eyebrow}
        title={t.contact.joinTitle}
        text={t.contact.joinText}
      />
    </>
  )
}
