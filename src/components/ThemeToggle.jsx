import { useI18n } from '../i18n'
import { useTheme } from '../lib/theme'
import { MoonIcon, SunIcon } from './icons'

export default function ThemeToggle({ withLabel = false }) {
  const { theme, toggle } = useTheme()
  const { t } = useI18n()
  const isDark = theme === 'dark'
  const label = isDark ? t.common.switchToLight : t.common.switchToDark

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={label}
      title={label}
      className={`inline-flex items-center justify-center gap-2 rounded-full border-2 border-fg/15 text-fg transition-colors hover:border-fg/40 hover:bg-raised ${
        withLabel ? 'h-9 px-3' : 'h-9 w-9'
      }`}
    >
      {isDark ? <SunIcon className="h-4 w-4" /> : <MoonIcon className="h-4 w-4" />}
      {withLabel && (
        <span className="text-sm">{isDark ? t.common.lightMode : t.common.darkMode}</span>
      )}
    </button>
  )
}
