import JoinForm from '../components/JoinForm'
import PageHeader from '../components/PageHeader'
import Seo from '../components/Seo'
import { InstagramIcon, MailIcon } from '../components/icons'
import { SITE } from '../data/site'
import { useI18n } from '../i18n'

export default function Join() {
  const { t } = useI18n()

  return (
    <>
      <Seo page="join" path="/join" />

      <PageHeader
        eyebrow={t.join.eyebrow}
        title={t.join.title}
        lead={t.join.lead}
        meta={t.join.meta}
      />

      <section className="shell py-12 sm:py-16">
        <div className="grid gap-8 lg:grid-cols-[1.25fr_0.75fr] lg:items-start">
          <div data-reveal>
            <JoinForm />
          </div>

          <aside className="space-y-6 lg:sticky lg:top-28">
            <div data-reveal className="card p-6">
              <h2 className="eyebrow">{t.join.afterTitle}</h2>
              <ol className="mt-4">
                {t.join.steps.map((step, index) => (
                  <li key={step} className="flex gap-4 border-t-2 border-fg/10 py-4 first:border-t-0">
                    <span className="sticker h-7 w-7 shrink-0 bg-accent text-[10px] font-extrabold text-night">
                      {index + 1}
                    </span>
                    <span className="text-[14px] leading-relaxed text-fg/80">{step}</span>
                  </li>
                ))}
              </ol>
            </div>

            <div data-reveal className="perk perk-purple p-6">
              <h2 className="text-[15px] font-bold">{t.join.asideTitle}</h2>
              <p className="mt-2 text-[13px] leading-relaxed text-night/70">{t.join.asideText}</p>
              <div className="mt-5 flex flex-col gap-2.5 border-t-2 border-night/15 pt-4">
                <a
                  href={SITE.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-[14px] font-semibold text-night transition-opacity hover:opacity-70"
                >
                  <InstagramIcon className="h-4 w-4 shrink-0" />
                  {SITE.instagramHandle}
                </a>
                <a
                  href={`mailto:${SITE.email}`}
                  className="inline-flex items-center gap-2 break-all text-[14px] font-semibold text-night transition-opacity hover:opacity-70"
                >
                  <MailIcon className="h-4 w-4 shrink-0" />
                  {SITE.email}
                </a>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </>
  )
}
