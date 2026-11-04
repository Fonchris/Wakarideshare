import PerspectiveTunnelHero from './components/ui/perspective-tunnel-hero'
import Hero07 from './components/ui/hero-07'
import SiteNavbar, { type Language } from './components/site-navbar'
import { useEffect, useState } from 'react'
import AuthPage, { type AuthView } from './components/auth-page'
import { AtSign, BriefcaseBusiness, Code2, Mail, NotepadTextDashed } from 'lucide-react'
import { Footer } from './components/ui/modem-animated-footer'
import { FeatureSteps } from './components/ui/feature-section'
import RideBoard from './components/ride-board'

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
        <RideBoard
          language={language}
          authenticatedEmail={authenticatedEmail}
          onSignup={() => setAuthView('signup')}
        />
        <FeatureSteps
          title={language === 'fr' ? 'Votre parcours commence ici' : 'Your journey starts here'}
          autoPlayInterval={4000}
          imageHeight="h-[300px] lg:h-[500px]"
          features={[
            {
              step: language === 'fr' ? 'Étape 1' : 'Step 1',
              title: language === 'fr' ? 'Explorez les possibilités' : 'Explore the possibilities',
              content: language === 'fr'
                ? 'Découvrez une expérience pensée pour transformer vos idées en projets mémorables.'
                : 'Discover an experience designed to turn your ideas into memorable projects.',
              image: 'https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&w=1400&q=85',
            },
            {
              step: language === 'fr' ? 'Étape 2' : 'Step 2',
              title: language === 'fr' ? 'Donnez forme à vos idées' : 'Shape your ideas',
              content: language === 'fr'
                ? 'Utilisez des outils flexibles et une direction claire pour construire avec confiance.'
                : 'Use flexible tools and clear direction to build with confidence.',
              image: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=1400&q=85',
            },
            {
              step: language === 'fr' ? 'Étape 3' : 'Step 3',
              title: language === 'fr' ? 'Lancez-vous' : 'Bring it to life',
              content: language === 'fr'
                ? 'Passez de l’inspiration à l’action et partagez quelque chose qui vous ressemble.'
                : 'Move from inspiration to action and share something that feels like you.',
              image: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1400&q=85',
            },
          ]}
        />
      </main>
      <Footer
        brandName="Waka"
        brandDescription={
          language === 'fr'
            ? 'Trouvez votre trajet. Partagez la course. Rentrez plus sereinement.'
            : 'Find your route, share the ride, and get home with less stress.'
        }
        socialLinks={[
          { icon: <AtSign className="size-6" />, href: 'https://twitter.com', label: 'Twitter' },
          { icon: <BriefcaseBusiness className="size-6" />, href: 'https://linkedin.com', label: 'LinkedIn' },
          { icon: <Code2 className="size-6" />, href: 'https://github.com', label: 'GitHub' },
          { icon: <Mail className="size-6" />, href: 'mailto:contact@ether.example', label: 'Email' },
        ]}
        navLinks={[
          { label: language === 'fr' ? 'Trouver un trajet' : 'Find a ride', href: '#find-a-ride' },
          { label: language === 'fr' ? 'Accueil' : 'Home', href: '#top' },
        ]}
        brandIcon={<NotepadTextDashed className="size-10 text-white dark:text-neutral-950 md:size-14" />}
      />
    </>
  )
}

export default App
