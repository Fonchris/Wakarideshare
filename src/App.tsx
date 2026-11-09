import PerspectiveTunnelHero from './components/ui/perspective-tunnel-hero'
import Hero07 from './components/ui/hero-07'
import SiteNavbar, { type Language } from './components/site-navbar'
import { useEffect, useState } from 'react'
import AuthPage, { type AuthView } from './components/auth-page'
import { useClerk, useUser } from '@clerk/react'
import { AtSign, BriefcaseBusiness, Code2, Mail } from 'lucide-react'
import { Footer } from './components/ui/modem-animated-footer'
import { FeatureSteps } from './components/ui/feature-section'
import RideBoard from './components/ride-board'
import { BrandLogo } from './components/brand-logo'
import TermsPage from './components/terms-page'
import FAQSection from './components/ui/faq-tabs'
import TestimonialsSection from './components/ui/testimonials-section'

function App() {
  const [language, setLanguage] = useState<Language>(() => {
    return (localStorage.getItem('language') as Language | null) ?? 'en'
  })
  const [darkMode, setDarkMode] = useState(() => {
    const stored = localStorage.getItem('theme')
    return stored ? stored === 'dark' : window.matchMedia('(prefers-color-scheme: dark)').matches
  })
  const [authView, setAuthView] = useState<AuthView | null>(null)
  const [showTerms, setShowTerms] = useState(false)
  const { user, isLoaded } = useUser()
  const { signOut } = useClerk()
  const authenticatedEmail = user?.primaryEmailAddress?.emailAddress ?? user?.username ?? user?.fullName ?? null

  useEffect(() => {
    const syncAuthView = () => {
      const hash = window.location.hash.replace('#', '')
      if (hash === 'login' || hash === 'signup') {
        setShowTerms(false)
        setAuthView(hash)
      }
    }

    syncAuthView()
    window.addEventListener('hashchange', syncAuthView)
    return () => window.removeEventListener('hashchange', syncAuthView)
  }, [])

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode)
    localStorage.setItem('theme', darkMode ? 'dark' : 'light')
  }, [darkMode])

  useEffect(() => {
    document.documentElement.lang = language
    localStorage.setItem('language', language)
  }, [language])

  const goHome = () => {
    setAuthView(null)
    setShowTerms(false)
    window.location.hash = 'top'
  }

  const openAuth = (view: AuthView) => {
    setShowTerms(false)
    setAuthView(view)
    window.location.hash = view
  }

  const footer = (
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
        { icon: <Mail className="size-6" />, href: 'mailto:hello@wakarideshare.example', label: 'Email' },
      ]}
      navLinks={[
        { label: language === 'fr' ? 'Trouver un trajet' : 'Find a ride', href: '#find-a-ride' },
        { label: language === 'fr' ? 'Questions fréquentes' : 'FAQ', href: '#faq' },
        { label: language === 'fr' ? 'Témoignages' : 'Testimonials', href: '#testimonials' },
        { label: language === 'fr' ? 'Accueil' : 'Home', href: '#top' },
      ]}
      brandIcon={<BrandLogo imageClassName="w-20 sm:w-28 md:w-40" />}
      onHome={goHome}
    />
  )

  const pageContent = showTerms && !user ? (
    <TermsPage
      language={language}
      onBack={() => {
        setShowTerms(false)
        openAuth('signup')
      }}
    />
  ) : authView && !user ? (
    <AuthPage
      language={language}
      view={authView}
      darkMode={darkMode}
      onOpenTerms={() => setShowTerms(true)}
      onSwitchView={openAuth}
    />
  ) : (
    <>
      <main id="top">
        <PerspectiveTunnelHero language={language} />
        <div id="explore">
          <Hero07 language={language} onGetStarted={() => openAuth('signup')} />
        </div>
        <RideBoard
          language={language}
          authenticatedEmail={isLoaded ? authenticatedEmail : null}
          onSignup={() => openAuth('signup')}
        />
        <FeatureSteps
          title={language === 'fr' ? 'Votre parcours commence ici' : 'Your journey starts here'}
          autoPlayInterval={4000}
          imageHeight="h-[300px] lg:h-[500px]"
          features={[
            {
              step: language === 'fr' ? 'Étape 1' : 'Step 1',
              title: language === 'fr' ? 'Trouvez votre corridor' : 'Find your corridor',
              content: language === 'fr'
                ? 'Découvrez une expérience pensée pour transformer vos idées en projets mémorables.'
                : 'Choose a destination corridor and see who is leaving around the same time.',
              image: '/chateau-ngoakelle.jpg',
            },
            {
              step: language === 'fr' ? 'Étape 2' : 'Step 2',
              title: language === 'fr' ? 'Organisez votre départ' : 'Organise your departure',
              content: language === 'fr'
                ? 'Utilisez des outils flexibles et une direction claire pour construire avec confiance.'
                : 'Join a small group, agree on destinations, and choose a public meeting point.',
              image: '/university-campus.png',
            },
            {
              step: language === 'fr' ? 'Étape 3' : 'Step 3',
              title: language === 'fr' ? 'Rentrez ensemble' : 'Get home together',
              content: language === 'fr'
                ? 'Passez de l’inspiration à l’action et partagez quelque chose qui vous ressemble.'
                : 'One person orders the ride, everyone contributes, and the group leaves together.',
              image: '/yango-taxi.png',
            },
          ]}
        />
        <FAQSection language={language} />
        <TestimonialsSection language={language} />
      </main>
    </>
  )

  return (
    <>
      <SiteNavbar
        language={language}
        darkMode={darkMode}
        onLanguageChange={() => setLanguage((current) => current === 'en' ? 'fr' : 'en')}
        onThemeChange={() => setDarkMode((current) => !current)}
        authenticatedEmail={authenticatedEmail}
        onLogin={() => {
          openAuth('login')
        }}
        onHome={goHome}
        onSignup={() => {
          openAuth('signup')
        }}
        onLogout={() => void signOut()}
      />
      {pageContent}
      {footer}
    </>
  )
}

export default App
