import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import '@fontsource-variable/inter'
import App from './App'
import './index.css'
import ErrorBoundary from './components/ErrorBoundary'
import { LanguageProvider } from './i18n'
import { EventsProvider } from './lib/EventsContext'
import { ThemeProvider } from './lib/theme'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider>
      <LanguageProvider>
        <EventsProvider>
          <BrowserRouter>
            <ErrorBoundary>
              <App />
            </ErrorBoundary>
          </BrowserRouter>
        </EventsProvider>
      </LanguageProvider>
    </ThemeProvider>
  </StrictMode>,
)
