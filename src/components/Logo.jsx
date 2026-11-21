export function LogoMark({ className = 'h-8 w-8' }) {
  return (
    <span
      className={`grid shrink-0 place-items-center rounded-full border-2 border-night/15 bg-white shadow-[0_3px_0_rgba(23,23,29,0.18)] ${className}`}
    >
      <img
        src="/images/logo-mark.png"
        alt=""
        width="32"
        height="32"
        className="h-[76%] w-[76%] object-contain"
        aria-hidden="true"
      />
    </span>
  )
}

export function Logo({ className = '', compactOnMobile = false }) {
  return (
    <span className={`flex items-center gap-2.5 ${className}`}>
      <LogoMark className="h-9 w-9" />
      <span
        className={`text-[15px] font-extrabold uppercase leading-none tracking-[-0.02em] sm:text-base ${
          compactOnMobile ? 'hidden sm:inline' : ''
        }`}
      >
        Nextgen Coders<span className="text-accent">.</span>
      </span>
    </span>
  )
}
