import CtaBand from '../components/CtaBand'
import PageHeader from '../components/PageHeader'
import Seo from '../components/Seo'
import TrackCard from '../components/TrackCard'
import { tracks } from '../data/tracks'
import { pick, useI18n } from '../i18n'

export default function Tracks() {
  const { t, lang } = useI18n()

  return (
    <>
      <Seo page="tracks" path="/tracks" />

      <PageHeader
        eyebrow={t.tracks.eyebrow}
        title={t.tracks.title}
        lead={t.tracks.lead}
        meta={`${String(tracks.length).padStart(2, '0')} ${t.tracks.unitTracks} · ${t.tracks.metaLevel}`}
      >
        <nav aria-label={t.tracks.eyebrow} className="mt-8 flex flex-wrap gap-2">
          {tracks.map((track, index) => (
            <a
              key={track.id}
              href={`#${track.id}`}
              className="pill border-fg/15 bg-ink/80 py-2 text-muted backdrop-blur-sm transition-colors hover:border-accent hover:text-accent-text"
            >
              <span className="text-accent-text">{String(index + 1).padStart(2, '0')}</span>
              {pick(track.name, lang)}
            </a>
          ))}
        </nav>
      </PageHeader>

      <section className="shell">
        {tracks.map((track, index) => (
          <TrackCard key={track.id} track={track} index={index} detailed />
        ))}
      </section>

      <div className="h-12" aria-hidden="true" />

      <CtaBand eyebrow={t.tracks.eyebrow} title={t.tracks.ctaTitle} text={t.tracks.ctaText} />
    </>
  )
}
