import { SparkleIcon } from './icons'

export default function BoardCard({ number, label, display, name, photo, photoAlt }) {
  return (
    <article
      data-reveal
      className="perk perk-yellow relative flex min-h-[320px] flex-col justify-between p-6 sm:min-h-[340px] sm:p-8"
    >
      <SparkleIcon
        className="pointer-events-none absolute -right-5 -top-5 h-32 w-32 text-night/10"
        aria-hidden="true"
      />
      <p className="relative text-[11px] font-extrabold uppercase tracking-[0.16em] text-night/55">
        {number} · {label}
      </p>

      <div className="relative mt-6 flex items-end justify-between gap-4">
        <div className="min-w-0 pb-1">
          <p className="display display-tight text-4xl leading-none sm:text-5xl">{display}</p>
          <p className="mt-4 text-[15px] font-bold">{name}</p>
        </div>

        <div className="w-[47%] max-w-[200px] shrink-0">
          <img
            src={photo}
            alt={photoAlt ?? name}
            width="660"
            height="860"
            loading="lazy"
            decoding="async"
            className="aspect-[3/4] w-full rounded-[14px] border-2 border-night/20 object-cover shadow-[0_14px_28px_-16px_rgba(23,23,29,0.85)]"
          />
        </div>
      </div>
    </article>
  )
}
