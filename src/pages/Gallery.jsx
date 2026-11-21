import { useCallback, useState } from 'react'
import CtaBand from '../components/CtaBand'
import Lightbox from '../components/Lightbox'
import PageHeader from '../components/PageHeader'
import Seo from '../components/Seo'
import { GALLERY_CATEGORIES, gallery } from '../data/gallery'
import { pick, useI18n } from '../i18n'

const TILTS = [
  '-rotate-1',
  'rotate-1',
  '-rotate-[0.5deg]',
  'rotate-[0.8deg]',
  'rotate-0',
  '-rotate-[1.2deg]',
]

export default function Gallery() {
  const { t, lang } = useI18n()
  const [active, setActive] = useState('all')
  const [lightboxIndex, setLightboxIndex] = useState(null)

  const photos = active === 'all' ? gallery : gallery.filter((photo) => photo.category === active)
  const countLabel = `${photos.length} photo${photos.length === 1 ? '' : 's'}`

  const openLightbox = useCallback((index) => setLightboxIndex(index), [])
  const closeLightbox = useCallback(() => setLightboxIndex(null), [])
  const prevPhoto = useCallback(
    () => setLightboxIndex((i) => (i > 0 ? i - 1 : null)),
    [],
  )
  const nextPhoto = useCallback(
    () => setLightboxIndex((i) => (i < photos.length - 1 ? i + 1 : null)),
    [photos.length],
  )

  return (
    <>
      <Seo page="gallery" path="/gallery" />

      <PageHeader
        eyebrow={t.gallery.eyebrow}
        title={t.gallery.title}
        lead={t.gallery.lead}
        meta={`${gallery.length} ${t.gallery.unitPhotos} · 2026`}
      />

      <section className="shell overflow-x-clip py-10 sm:py-14">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div role="group" aria-label={t.gallery.filterLabel} className="flex flex-wrap gap-2">
            {GALLERY_CATEGORIES.map((category) => {
              const label = category === 'all' ? t.gallery.all : t.gallery.categories[category]
              const isActive = active === category
              return (
                <button
                  key={category}
                  type="button"
                  aria-pressed={isActive}
                  onClick={() => setActive(category)}
                  className={`rounded-full border-2 px-4 py-2 text-[11px] font-extrabold uppercase tracking-[0.1em] transition-all ${
                    isActive
                      ? 'border-fg bg-accent text-night shadow-[2px_3px_0_rgba(23,23,29,0.25)]'
                      : 'border-fg/15 bg-surface text-muted hover:border-fg/40 hover:text-fg'
                  }`}
                >
                  {label}
                </button>
              )
            })}
          </div>

          <p role="status" className="meta">
            {countLabel}
          </p>
        </div>

        {photos.length === 0 ? (
          <p className="mt-10 text-sm text-muted">{t.gallery.empty}</p>
        ) : (
          <div className="mt-10 grid gap-x-5 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
            {photos.map((photo, index) => (
              <figure
                key={photo.src}
                data-reveal
                className={`photo-frame group cursor-pointer transition-transform duration-300 hover:z-10 hover:rotate-0 hover:scale-[1.02] ${TILTS[index % TILTS.length]}`}
                onClick={() => openLightbox(index)}
                role="button"
                tabIndex={0}
                aria-label={pick(photo.caption, lang)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault()
                    openLightbox(index)
                  }
                }}
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
                  <span className="pill absolute left-2.5 top-2.5 border-2 border-night/15 bg-white/90 py-1 text-night backdrop-blur-sm">
                    {t.gallery.categories[photo.category]}
                  </span>
                  <span
                    className="absolute right-2.5 top-2.5 grid h-8 w-8 place-items-center rounded-full border-2 border-night/15 bg-white/90 text-night opacity-0 transition-opacity duration-200 group-hover:opacity-100"
                    aria-hidden="true"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                      <circle cx="11" cy="11" r="8" />
                      <line x1="21" y1="21" x2="16.65" y2="16.65" />
                      <line x1="11" y1="8" x2="11" y2="14" />
                      <line x1="8" y1="11" x2="14" y2="11" />
                    </svg>
                  </span>
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
        )}
      </section>

      {lightboxIndex !== null && photos[lightboxIndex] && (
        <Lightbox
          photo={photos[lightboxIndex]}
          onClose={closeLightbox}
          onPrev={lightboxIndex > 0 ? prevPhoto : null}
          onNext={lightboxIndex < photos.length - 1 ? nextPhoto : null}
        />
      )}

      <CtaBand
        eyebrow={t.gallery.eyebrow}
        title={t.gallery.ctaTitle}
        text={t.gallery.ctaText}
      />
    </>
  )
}
