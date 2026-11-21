export default function Wave({ className = 'text-accent', flip = false }) {
  return (
    <svg
      viewBox="0 0 1440 60"
      preserveAspectRatio="none"
      aria-hidden="true"
      className={`wave ${className} ${flip ? 'rotate-180' : ''}`}
    >
      <path
        fill="currentColor"
        d="M0 34c60-26 120-26 180 0s120 26 180 0 120-26 180 0 120 26 180 0 120-26 180 0 120 26 180 0 120-26 180 0 120 26 180 0v26H0V34Z"
      />
    </svg>
  )
}
