import { useCallback, useEffect } from 'react'
import { pick, useI18n } from '../i18n'

export default function Lightbox({ photo, onClose, onPrev, onNext }) {
  const { lang } = useI18n()

  const handleKey = useCallback(
    (event) => {
      if (event.key === 'Escape') onClose()
      if (event.key === 'ArrowLeft' && onPrev) onPrev()
      if (event.key === 'ArrowRight' && onNext) onNext()
    },
    [onClose, onPrev, onNext],
  )

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', handleKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handleKey)
    }
  }, [handleKey])

  if (!photo) return null

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-night/90 backdrop-blur-sm"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={pick(photo.alt, lang)}
    >
      <button
        type="button"
        onClick={onClose}
        aria-label="Fermer"
        className="absolute right-4 top-4 z-10 grid h-11 w-11 place-items-center rounded-full border-2 border-white/30 text-white transition-colors hover:border-white hover:bg-white hover:text-night"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-5 w-5"
          aria-hidden="true"
        >
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </button>

      {onPrev && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation()
            onPrev()
          }}
          aria-label="Photo précédente"
          className="absolute left-4 top-1/2 z-10 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full border-2 border-white/30 text-white transition-colors hover:border-white hover:bg-white hover:text-night"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-5 w-5"
            aria-hidden="true"
          >
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>
      )}

      {onNext && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation()
            onNext()
          }}
          aria-label="Photo suivante"
          className="absolute right-4 top-1/2 z-10 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full border-2 border-white/30 text-white transition-colors hover:border-white hover:bg-white hover:text-night"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-5 w-5"
            aria-hidden="true"
          >
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>
      )}

      <figure
        className="max-h-[90vh] max-w-[90vw]"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={photo.src}
          alt={pick(photo.alt, lang)}
          className="max-h-[82vh] max-w-full rounded-[10px] border-4 border-white object-contain"
        />
        <figcaption className="mt-3 text-center text-sm font-semibold text-white/85">
          {pick(photo.caption, lang)}
        </figcaption>
      </figure>
    </div>
  )
}
