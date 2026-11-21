export default function PageHeader({ eyebrow, title, lead, meta, children }) {
  return (
    <section className="paper border-b-2 border-fg/10">
      <div className="shell pb-10 pt-12 sm:pb-16 sm:pt-16">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="eyebrow">
            <span className="h-2.5 w-2.5 rounded-full bg-accent" aria-hidden="true" />
            {eyebrow}
          </p>
          {meta && (
            <p className="pill border-fg/15 bg-ink/80 text-muted backdrop-blur-sm">{meta}</p>
          )}
        </div>
        <h1 className="display mt-7 max-w-5xl text-[clamp(2.85rem,7.2vw,6.4rem)]">{title}</h1>
        {lead && (
          <p className="mt-6 max-w-2xl text-[17px] leading-relaxed text-muted sm:text-lg">{lead}</p>
        )}
        {children}
      </div>
    </section>
  )
}
