import { useI18n } from '../i18n'

export default function LanguageToggle() {
  const { lang, setLang, t } = useI18n()

  return (
    <div
      className="flex items-center rounded-full border-2 border-fg/15 p-0.5"
      role="group"
      aria-label={t.common.language}
    >
      {[
        ['fr', 'FR'],
        ['en', 'EN'],
      ].map(([code, label]) => (
        <button
          key={code}
          type="button"
          onClick={() => setLang(code)}
          aria-pressed={lang === code}
          aria-label={code === 'fr' ? 'Français' : 'English'}
          className={`rounded-full px-2.5 py-1 text-[10.5px] font-extrabold tracking-[0.08em] transition-colors ${
            lang === code ? 'bg-fg text-ink' : 'text-muted hover:text-fg'
          }`}
        >
          {label}
        </button>
      ))}
    </div>
  )
}
