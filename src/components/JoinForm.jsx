import { useEffect, useRef, useState } from 'react'
import { MESSAGE_MAX } from '../data/join-fields'
import { LEVELS, SITE } from '../data/site'
import { TRACK_IDS, tracks } from '../data/tracks'
import { pick, useI18n } from '../i18n'
import { checkJoinApi, joinStorage, submitJoinRequest } from '../lib/join'
import { CheckIcon, SparkleIcon } from './icons'

const EMPTY = { name: '', email: '', track: '', level: '', message: '' }
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

function validate(values, messages) {
  const errors = {}

  if (values.name.trim().length < 2) errors.name = messages.name
  if (!EMAIL_PATTERN.test(values.email.trim())) errors.email = messages.email
  if (!TRACK_IDS.includes(values.track)) errors.track = messages.track
  if (!LEVELS.includes(values.level)) errors.level = messages.level
  if (values.message.trim().length > MESSAGE_MAX) errors.message = messages.message

  return errors
}

function FieldError({ id, message }) {
  if (!message) return null
  return (
    <p id={id} className="mt-2 text-sm font-semibold text-accent-text">
      {message}
    </p>
  )
}

export default function JoinForm() {
  const { t, lang } = useI18n()
  const [values, setValues] = useState(EMPTY)
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle')
  const [serverError, setServerError] = useState('')
  const [apiOnline, setApiOnline] = useState(joinStorage === 'local' ? null : true)
  const successRef = useRef(null)

  useEffect(() => {
    if (status === 'success') successRef.current?.focus()
  }, [status])

  // Only the local storage mode needs the API; check it so the form can warn
  // instead of claiming data is saved when the server is not running.
  useEffect(() => {
    if (joinStorage !== 'local') return undefined
    let cancelled = false

    checkJoinApi().then((online) => {
      if (!cancelled) setApiOnline(online)
    })

    return () => {
      cancelled = true
    }
  }, [])

  function handleChange(field) {
    return (event) => {
      const { value } = event.target
      setValues((current) => ({ ...current, [field]: value }))
      if (errors[field]) {
        setErrors((current) => ({ ...current, [field]: undefined }))
      }
    }
  }

  async function handleSubmit(event) {
    event.preventDefault()
    if (status === 'sending') return

    const nextErrors = validate(values, t.join.errors)
    setErrors(nextErrors)

    const firstInvalid = ['name', 'email', 'track', 'level', 'message'].find(
      (key) => nextErrors[key],
    )
    if (firstInvalid) {
      const focusTarget =
        firstInvalid === 'track'
          ? 'join-track-web'
          : firstInvalid === 'level'
            ? 'join-level-beginner'
            : `join-${firstInvalid}`
      document.getElementById(focusTarget)?.focus()
      return
    }

    setStatus('sending')
    setServerError('')

    const result = await submitJoinRequest({
      name: values.name.trim(),
      email: values.email.trim().toLowerCase(),
      track: values.track,
      level: values.level,
      message: values.message.trim() || null,
    })

    if (result.ok) {
      setValues(EMPTY)
      setStatus('success')
      return
    }

    setServerError(result.message ?? '')
    setStatus('error')
  }

  function handleReset() {
    setValues(EMPTY)
    setErrors({})
    setServerError('')
    setStatus('idle')
    document.getElementById('join-name')?.focus()
  }

  if (status === 'success') {
    return (
      <div className="perk perk-mint p-6 sm:p-9">
        <span className="sticker h-12 w-12 bg-white text-night">
          <CheckIcon className="h-6 w-6" />
        </span>
        <h2 ref={successRef} tabIndex={-1} className="display mt-5 text-4xl outline-none">
          {t.join.successTitle}
        </h2>
        <p className="mt-3 max-w-md text-[15px] leading-relaxed text-night/75">
          {t.join.successText}
        </p>
        <button type="button" onClick={handleReset} className="btn-outline mt-7">
          {t.join.again}
        </button>
      </div>
    )
  }

  return (
    <form
      noValidate
      onSubmit={handleSubmit}
      data-storage={joinStorage}
      className="card space-y-7 p-6 sm:p-8"
    >
      <div className="flex flex-wrap items-baseline justify-between gap-2 border-b-2 border-fg/10 pb-4">
        <h2 className="display text-3xl">{t.join.formTitle}</h2>
        <p className="meta">{t.join.requiredNote}</p>
      </div>

      {joinStorage === 'local' && apiOnline !== false && (
        <p className="flex items-start gap-2.5 rounded-[10px] border-2 border-night/15 bg-sun px-4 py-3 text-[12.5px] font-semibold leading-relaxed text-night">
          <SparkleIcon className="mt-0.5 h-4 w-4 shrink-0" />
          {t.join.localBanner}
        </p>
      )}

      {joinStorage === 'local' && apiOnline === false && (
        <p
          role="status"
          className="flex items-start gap-2.5 rounded-[10px] border-2 border-night/15 bg-accent-soft px-4 py-3 text-[12.5px] font-semibold leading-relaxed text-accent-text"
        >
          <SparkleIcon className="mt-0.5 h-4 w-4 shrink-0" />
          {t.join.offlineBanner}
        </p>
      )}

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="join-name" className="text-[13.5px] font-bold">
            {t.join.name} <span className="text-accent-text">*</span>
          </label>
          <input
            id="join-name"
            name="name"
            type="text"
            autoComplete="name"
            value={values.name}
            onChange={handleChange('name')}
            placeholder={t.join.namePlaceholder}
            aria-required="true"
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? 'join-name-error' : undefined}
            className={`input mt-2 ${errors.name ? 'input-error' : ''}`}
          />
          <FieldError id="join-name-error" message={errors.name} />
        </div>

        <div>
          <label htmlFor="join-email" className="text-[13.5px] font-bold">
            {t.join.email} <span className="text-accent-text">*</span>
          </label>
          <input
            id="join-email"
            name="email"
            type="email"
            autoComplete="email"
            value={values.email}
            onChange={handleChange('email')}
            placeholder={t.join.emailPlaceholder}
            aria-required="true"
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? 'join-email-error' : undefined}
            className={`input mt-2 ${errors.email ? 'input-error' : ''}`}
          />
          <FieldError id="join-email-error" message={errors.email} />
        </div>
      </div>

      <fieldset>
        <legend className="text-[13.5px] font-bold">
          {t.join.track} <span className="text-accent-text">*</span>
        </legend>
        <p className="mt-1 text-xs text-muted">{t.join.trackHint}</p>
        <div className="mt-3 grid gap-2 sm:grid-cols-2">
          {tracks.map((track) => (
            <label key={track.id} className="block cursor-pointer">
              <input
                id={`join-track-${track.id}`}
                type="radio"
                name="track"
                value={track.id}
                checked={values.track === track.id}
                onChange={handleChange('track')}
                className="peer sr-only"
                aria-invalid={Boolean(errors.track)}
                aria-describedby={errors.track ? 'join-track-error' : undefined}
              />
              <span className="flex h-full items-center rounded-control border-2 border-fg/15 px-3.5 py-3 text-sm font-semibold text-muted transition peer-checked:border-night peer-checked:bg-sun peer-checked:text-night peer-focus-visible:ring-2 peer-focus-visible:ring-accent peer-focus-visible:ring-offset-2 peer-focus-visible:ring-offset-ink">
                {pick(track.name, lang)}
              </span>
            </label>
          ))}
        </div>
        <FieldError id="join-track-error" message={errors.track} />
      </fieldset>

      <fieldset>
        <legend className="text-[13.5px] font-bold">
          {t.join.level} <span className="text-accent-text">*</span>
        </legend>
        <p className="mt-1 text-xs text-muted">{t.join.levelHint}</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {LEVELS.map((level) => (
            <label key={level} className="cursor-pointer">
              <input
                id={`join-level-${level}`}
                type="radio"
                name="level"
                value={level}
                checked={values.level === level}
                onChange={handleChange('level')}
                className="peer sr-only"
                aria-invalid={Boolean(errors.level)}
                aria-describedby={errors.level ? 'join-level-error' : undefined}
              />
              <span className="inline-flex rounded-full border-2 border-fg/15 px-4 py-2.5 text-sm font-semibold text-muted transition peer-checked:border-fg peer-checked:bg-fg peer-checked:text-ink peer-focus-visible:ring-2 peer-focus-visible:ring-accent peer-focus-visible:ring-offset-2 peer-focus-visible:ring-offset-ink">
                {t.join.levels[level]}
              </span>
            </label>
          ))}
        </div>
        <FieldError id="join-level-error" message={errors.level} />
      </fieldset>

      <div>
        <div className="flex items-baseline justify-between gap-3">
          <label htmlFor="join-message" className="text-[13.5px] font-bold">
            {t.join.message}{' '}
            <span className="font-normal text-muted">({t.join.messageOptional})</span>
          </label>
          <span className="text-[10.5px] font-bold tabular-nums text-muted">
            {values.message.length} / {MESSAGE_MAX}
          </span>
        </div>
        <textarea
          id="join-message"
          name="message"
          rows={4}
          value={values.message}
          onChange={handleChange('message')}
          placeholder={t.join.messagePlaceholder}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? 'join-message-error' : undefined}
          className={`input mt-2 resize-y ${errors.message ? 'input-error' : ''}`}
        />
        <FieldError id="join-message-error" message={errors.message} />
      </div>

      {status === 'error' && (
        <div role="alert" className="rounded-control border-2 border-red-500/50 bg-accent-soft p-4">
          <p className="text-sm font-bold text-accent-text">{t.join.errorTitle}</p>
          <p className="mt-1 text-sm leading-relaxed text-muted">
            {t.join.errorText}
            {serverError ? ` (${serverError})` : ''}
          </p>
          <a href={`mailto:${SITE.email}`} className="link-underline mt-2 inline-block text-sm">
            {SITE.email}
          </a>
        </div>
      )}

      <div className="flex flex-col gap-4 border-t-2 border-fg/10 pt-5 sm:flex-row sm:items-center sm:justify-between">
        <p className="max-w-xs text-[12px] leading-relaxed text-muted">{t.join.privacy}</p>
        <button
          type="submit"
          disabled={status === 'sending'}
          aria-busy={status === 'sending'}
          className="btn-primary w-full shrink-0 sm:w-auto"
        >
          {status === 'sending' ? t.join.sending : t.join.submit}
        </button>
      </div>
    </form>
  )
}
