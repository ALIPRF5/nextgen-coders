import { Link } from 'react-router-dom'
import BoardProfile from '../components/BoardProfile'
import CtaBand from '../components/CtaBand'
import CountUp from '../components/CountUp'
import PageHeader from '../components/PageHeader'
import Seo from '../components/Seo'
import { ArrowRight } from '../components/icons'
import { boardMembers } from '../data/board'
import { gallery } from '../data/gallery'
import { pick, useI18n } from '../i18n'

const boardPhotos = ['/images/about-stage.webp', '/images/home-about.webp', '/images/event-n8n.webp']
  .map((src) => gallery.find((photo) => photo.src === src))
  .filter(Boolean)

const STAT_TINTS = ['perk-yellow', 'perk-blue', 'perk-purple', 'perk-mint']

export default function Board() {
  const { t, lang } = useI18n()

  return (
    <>
      <Seo page="board" path="/board" />

      <PageHeader
        eyebrow={t.board.eyebrow}
        title={t.board.title}
        lead={t.board.lead}
        meta={t.board.meta}
      />

      <section className="shell py-14 sm:py-20">
        <BoardProfile
          number="01"
          cardLabel={t.board.presidentLabel}
          eyebrow={t.board.presidentLabel}
          name={t.board.presidentName}
          display={t.board.presidentName.split(' ')[0]}
          role={t.board.presidentRole}
          text={t.board.presidentText}
          cta={t.board.presidentCta}
          photo="/images/board/ali-el-amrani.webp"
          photoAlt={`${t.board.photoAlt} ${t.board.presidentName}`}
          headingLevel={2}
        />
      </section>

      <section className="shell py-14 sm:py-20">
        <div data-reveal className="max-w-2xl">
          <p className="eyebrow">{t.board.teamEyebrow}</p>
          <h2 className="display mt-4 text-4xl sm:text-5xl">{t.board.teamTitle}</h2>
          <p className="mt-5 text-[16px] leading-relaxed text-fg/80">{t.board.teamText}</p>
        </div>

        <div className="mt-10 grid gap-6">
          {boardMembers.map((member, index) => (
            <BoardProfile
              key={member.id}
              number={String(index + 2).padStart(2, '0')}
              cardLabel={pick(member.role, lang)}
              eyebrow={t.board.teamEyebrow}
              name={member.name}
              display={member.name.split(' ')[0]}
              role={pick(member.role, lang)}
              text={t.board.memberText}
              cta={t.board.memberCta}
              photo={member.photo}
              photoAlt={`${t.board.photoAlt} ${member.name}`}
            />
          ))}
        </div>
      </section>

      <section className="border-y-2 border-fg/10 bg-raised">
        <div className="shell py-14 sm:py-20">
          <p className="eyebrow">{t.board.statsTitle}</p>
          <div className="mt-4 grid gap-4 sm:grid-cols-3">
            {t.board.stats.map((stat, index) => (
              <div
                key={stat.label}
                data-reveal
                className={`perk p-6 ${STAT_TINTS[index % STAT_TINTS.length]}`}
              >
                <p className="display text-5xl leading-none sm:text-6xl">
                  <CountUp value={stat.value} />
                </p>
                <p className="mt-4 text-[13.5px] font-semibold leading-snug text-night/70">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="shell overflow-x-clip py-14 sm:py-20">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <p className="eyebrow">{t.board.photosEyebrow}</p>
            <h2 className="display mt-4 text-4xl sm:text-5xl">{t.board.photosTitle}</h2>
            <p className="mt-3 text-[15px] leading-relaxed text-muted">{t.board.photosText}</p>
          </div>
          <Link to="/gallery" className="btn-outline shrink-0">
            {t.board.photosCta}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="mt-10 grid gap-8 sm:grid-cols-3">
          {boardPhotos.map((photo, index) => (
            <figure
              key={photo.src}
              data-reveal
              className={`photo-frame group ${index % 2 === 0 ? '-rotate-1' : 'rotate-1'}`}
            >
              <div className="relative aspect-[4/3] overflow-hidden rounded-[4px] bg-raised">
                <img
                  src={photo.src}
                  alt={pick(photo.alt, lang)}
                  width={photo.width}
                  height={photo.height}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                />
              </div>
              <figcaption className="flex items-start justify-between gap-3 px-1 pb-1 pt-3">
                <span className="text-[13px] font-bold leading-snug text-night">
                  {pick(photo.caption, lang)}
                </span>
                <span className="shrink-0 text-[10.5px] font-extrabold uppercase tracking-[0.12em] text-night/45">
                  {String(index + 1).padStart(2, '0')}
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      <CtaBand
        eyebrow={t.board.eyebrow}
        title={t.board.ctaTitle}
        text={t.board.ctaText}
      />
    </>
  )
}
