import { useEffect, useState } from 'react'
import { pick } from '../i18n'

const SLIDE_DURATION = 6500

export default function HeroSlideshow({ slides, lang, school }) {
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)

  useEffect(() => {
    if (paused || slides.length < 2) return undefined
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined

    const timer = window.setTimeout(() => {
      setIndex((current) => (current + 1) % slides.length)
    }, SLIDE_DURATION)

    return () => window.clearTimeout(timer)
  }, [index, paused, slides.length])

  const current = slides[index]

  return (
    <figure className="photo-frame relative z-10 -rotate-[0.6deg] sm:-rotate-[1.4deg]">
      <div
        className="relative aspect-[16/10] w-full overflow-hidden rounded-[4px] bg-night sm:aspect-[16/9]"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onFocusCapture={() => setPaused(true)}
        onBlurCapture={() => setPaused(false)}
      >
        {slides.map((slide, slideIndex) => {
          const active = slideIndex === index

          return (
            <img
              key={slide.src}
              src={slide.src}
              alt={active ? pick(slide.alt, lang) : ''}
              width={slide.width}
              height={slide.height}
              fetchPriority={slideIndex === 0 ? 'high' : 'low'}
              loading={slideIndex === 0 ? 'eager' : 'lazy'}
              decoding="async"
              aria-hidden={active ? undefined : 'true'}
              className={`absolute inset-0 h-full w-full object-cover transition-[opacity,transform] duration-[1600ms] ease-out motion-reduce:transition-none ${
                active ? 'scale-100 opacity-100' : 'scale-[1.04] opacity-0'
              }`}
            />
          )
        })}

        <div className="absolute bottom-3 right-3 z-10 flex items-center gap-1.5 rounded-full bg-night/45 px-2 py-1.5 backdrop-blur-sm">
          {slides.map((slide, slideIndex) => {
            const active = slideIndex === index

            return (
              <button
                key={slide.src}
                type="button"
                onClick={() => setIndex(slideIndex)}
                aria-label={`0${slideIndex + 1} · ${pick(slide.caption, lang)}`}
                aria-current={active ? 'true' : undefined}
                className="group grid h-6 w-6 place-items-center rounded-full"
              >
                <span
                  className={`block h-2.5 rounded-full border-2 transition-all duration-300 motion-reduce:transition-none ${
                    active
                      ? 'w-6 border-accent bg-accent'
                      : 'w-2.5 border-white/80 bg-white/35 group-hover:bg-white/70'
                  }`}
                />
              </button>
            )
          })}
        </div>
      </div>

      <figcaption className="flex flex-wrap items-center justify-between gap-2 px-1 pb-1 pt-3 text-[11px] font-extrabold uppercase tracking-[0.12em] text-night">
        <span>
          0{index + 1} · {pick(current.caption, lang)}
        </span>
        <span className="rounded-full bg-sun px-2.5 py-0.5">{school}</span>
      </figcaption>
    </figure>
  )
}
