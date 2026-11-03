import PerspectiveTunnelHero from './components/ui/perspective-tunnel-hero'
import Hero07 from './components/ui/hero-07'
import SiteNavbar, { type Language } from './components/site-navbar'
import { useEffect, useState } from 'react'
import AuthPage, { type AuthView } from './components/auth-page'

function App() {
  const [language, setLanguage] = useState<Language>(() => {
    return (localStorage.getItem('language') as Language | null) ?? 'en'
  })
  const [darkMode, setDarkMode] = useState(() => {
    const stored = localStorage.getItem('theme')
    return stored ? stored === 'dark' : window.matchMedia('(prefers-color-scheme: dark)').matches
  })
  const [authView, setAuthView] = useState<AuthView | null>(null)
  const [authenticatedEmail, setAuthenticatedEmail] = useState<string | null>(() => localStorage.getItem('authenticatedEmail'))

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode)
    localStorage.setItem('theme', darkMode ? 'dark' : 'light')
  }, [darkMode])

  useEffect(() => {
    document.documentElement.lang = language
    localStorage.setItem('language', language)
  }, [language])

  const handleAuthenticated = (email: string) => {
    setAuthenticatedEmail(email)
    localStorage.setItem('authenticatedEmail', email)
    setAuthView(null)
  }

  if (authView) {
    return (
      <AuthPage
        language={language}
        view={authView}
        onViewChange={setAuthView}
        onAuthenticated={handleAuthenticated}
        onBack={() => setAuthView(null)}
      />
    )
  }

  return (
    <>
      <SiteNavbar
        language={language}
        darkMode={darkMode}
        onLanguageChange={() => setLanguage((current) => current === 'en' ? 'fr' : 'en')}
        onThemeChange={() => setDarkMode((current) => !current)}
        authenticatedEmail={authenticatedEmail}
        onLogin={() => setAuthView('login')}
        onSignup={() => setAuthView('signup')}
        onLogout={() => {
          setAuthenticatedEmail(null)
          localStorage.removeItem('authenticatedEmail')
        }}
      />
      <main id="top">
        <PerspectiveTunnelHero language={language} />
        <div id="explore">
          <Hero07 language={language} onGetStarted={() => setAuthView('signup')} />
        </div>
      </main>
    </>
  )
}

export default App
