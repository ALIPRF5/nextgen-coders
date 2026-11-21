const base = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.7,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  'aria-hidden': true,
}

export function ArrowRight(props) {
  return (
    <svg viewBox="0 0 24 24" {...base} {...props}>
      <path d="M4 12h15M13 6l6 6-6 6" />
    </svg>
  )
}

export function ArrowUpRight(props) {
  return (
    <svg viewBox="0 0 24 24" {...base} {...props}>
      <path d="M7 17 17 7M8 7h9v9" />
    </svg>
  )
}

export function InstagramIcon(props) {
  return (
    <svg viewBox="0 0 24 24" {...base} {...props}>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.4" cy="6.6" r="1.1" fill="currentColor" stroke="none" />
    </svg>
  )
}

export function MailIcon(props) {
  return (
    <svg viewBox="0 0 24 24" {...base} {...props}>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m4 7 8 6 8-6" />
    </svg>
  )
}

export function SunIcon(props) {
  return (
    <svg viewBox="0 0 24 24" {...base} {...props}>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 3v2M12 19v2M3 12h2M19 12h2M5.6 5.6 7 7M17 17l1.4 1.4M18.4 5.6 17 7M7 17l-1.4 1.4" />
    </svg>
  )
}

export function MoonIcon(props) {
  return (
    <svg viewBox="0 0 24 24" {...base} {...props}>
      <path d="M20 14.5A8.5 8.5 0 0 1 9.5 4a8.5 8.5 0 1 0 10.5 10.5Z" />
    </svg>
  )
}

export function MapPinIcon(props) {
  return (
    <svg viewBox="0 0 24 24" {...base} {...props}>
      <path d="M12 21s7-5.5 7-11a7 7 0 1 0-14 0c0 5.5 7 11 7 11Z" />
      <circle cx="12" cy="10" r="2.6" />
    </svg>
  )
}

export function CheckIcon(props) {
  return (
    <svg viewBox="0 0 24 24" {...base} {...props}>
      <path d="m5 12.5 4.5 4.5L19 7.5" />
    </svg>
  )
}

export function MenuIcon(props) {
  return (
    <svg viewBox="0 0 24 24" {...base} {...props}>
      <path d="M4 7h16M4 12h16M4 17h16" />
    </svg>
  )
}

export function CloseIcon(props) {
  return (
    <svg viewBox="0 0 24 24" {...base} {...props}>
      <path d="M6 6l12 12M18 6 6 18" />
    </svg>
  )
}

export function SparkIcon(props) {
  return (
    <svg viewBox="0 0 24 24" {...base} {...props}>
      <path d="M12 3v4M12 17v4M3 12h4M17 12h4M5.6 5.6l2.8 2.8M15.6 15.6l2.8 2.8M18.4 5.6l-2.8 2.8M8.4 15.6l-2.8 2.8" />
    </svg>
  )
}

export function SparkleIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M12 1.8c.6 5.3 3.1 7.8 8.4 8.4-5.3.6-7.8 3.1-8.4 8.4-.6-5.3-3.1-7.8-8.4-8.4 5.3-.6 7.8-3.1 8.4-8.4Z" />
    </svg>
  )
}

export function BurstIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M12 1.5l1.9 6.1 5.6-3-3 5.6 6.1 1.9-6.1 1.9 3 5.6-5.6-3L12 22.5l-1.9-6.1-5.6 3 3-5.6L1.4 12l6.1-1.9-3-5.6 5.6 3L12 1.5Z" />
    </svg>
  )
}

export function SquiggleIcon(props) {
  return (
    <svg
      viewBox="0 0 120 18"
      fill="none"
      stroke="currentColor"
      strokeWidth={5}
      strokeLinecap="round"
      aria-hidden="true"
      {...props}
    >
      <path d="M4 12c9-12 17-12 26 0s17 12 26 0 17-12 26 0 17 12 26 0" />
    </svg>
  )
}

export function TrackIcon({ name, ...props }) {
  const shapes = {
    web: <path d="M8 8l-4 4 4 4M16 8l4 4-4 4M13.5 5l-3 14" />,
    ai: (
      <>
        <rect x="7" y="7" width="10" height="10" rx="2" />
        <path d="M12 3v4M12 17v4M3 12h4M17 12h4M5.5 5.5 7 7M17 17l1.5 1.5M18.5 5.5 17 7M7 17l-1.5 1.5" />
      </>
    ),
    cyber: (
      <>
        <path d="M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3Z" />
        <path d="m9 12 2 2 4-4" />
      </>
    ),
    systems: (
      <>
        <rect x="5" y="8" width="14" height="11" rx="2" />
        <path d="M12 8V5M9.5 13h.01M14.5 13h.01M9 19v2M15 19v2" />
        <circle cx="12" cy="4" r="1" />
      </>
    ),
    design: (
      <>
        <path d="M4 20l4.5-1.5L20 7a2.1 2.1 0 0 0-3-3L5.5 15.5 4 20Z" />
        <path d="m14 6 4 4" />
      </>
    ),
  }

  return (
    <svg viewBox="0 0 24 24" {...base} {...props}>
      {shapes[name] ?? shapes.web}
    </svg>
  )
}
