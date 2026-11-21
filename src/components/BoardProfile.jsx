import BoardCard from './BoardCard'
import { MailIcon } from './icons'
import { SITE } from '../data/site'

export default function BoardProfile({
  number,
  cardLabel,
  eyebrow,
  name,
  display,
  role,
  text,
  cta,
  photo,
  photoAlt,
  headingLevel = 3,
}) {
  const Heading = `h${headingLevel}`

  return (
    <div className="grid gap-5 lg:grid-cols-[0.8fr_1.2fr]">
      <BoardCard
        number={number}
        label={cardLabel}
        display={display}
        name={name}
        photo={photo}
        photoAlt={photoAlt}
      />

      <div data-reveal className="card flex flex-col justify-between p-6 sm:p-9">
        <div>
          <p className="eyebrow">{eyebrow}</p>
          <Heading className="display mt-4 text-3xl sm:text-5xl">{name}</Heading>
          <p className="meta mt-3">{role}</p>
          <p className="mt-6 max-w-xl text-[16px] leading-relaxed text-fg/80">{text}</p>
        </div>

        <div className="mt-8 flex flex-wrap items-center gap-4 border-t-2 border-fg/10 pt-6">
          <a href={`mailto:${SITE.email}`} className="btn-outline btn-sm">
            <MailIcon className="h-4 w-4" />
            {cta}
          </a>
          <a
            href={SITE.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-semibold text-muted transition-colors hover:text-fg"
          >
            {SITE.instagramHandle}
          </a>
        </div>
      </div>
    </div>
  )
}
