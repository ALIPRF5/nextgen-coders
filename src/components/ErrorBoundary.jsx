import { Component } from 'react'
import { SITE } from '../data/site'

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch(error, errorInfo) {
    console.error('[ErrorBoundary]', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-[60vh] items-center justify-center px-5">
          <div className="max-w-md text-center">
            <span className="grid mx-auto h-14 w-14 place-items-center rounded-full bg-fg text-2xl font-bold text-ink">
              !
            </span>
            <h1 className="display mt-6 text-3xl">Oops, quelque chose a cassé</h1>
            <p className="mt-4 text-sm leading-relaxed text-muted">
              Une erreur inattendue s'est produite. Essayez de recharger la page.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <button
                type="button"
                onClick={() => {
                  this.setState({ hasError: false })
                  window.location.href = '/'
                }}
                className="btn-primary"
              >
                Retour à l'accueil
              </button>
              <a href={`mailto:${SITE.email}`} className="btn-ghost">
                Signaler le problème
              </a>
            </div>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}
