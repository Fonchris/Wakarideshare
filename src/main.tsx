import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ClerkProvider } from '@clerk/react'
import './index.css'
import App from './App.tsx'

if (import.meta.env.PROD && 'serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').catch((error: unknown) => {
      console.error('Service worker registration failed:', error)
    })
  })
}

const publishableKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY
  ?.trim()
  .replace(/^(['"])(.*)\1$/, '$2')

const isValidPublishableKey = Boolean(
  publishableKey && /^pk_(test|live)_[A-Za-z0-9_-]+$/.test(publishableKey),
)

function ConfigurationError() {
  return (
    <main style={{ minHeight: '100vh', display: 'grid', placeItems: 'center', padding: '2rem', fontFamily: 'system-ui, sans-serif', color: '#171717' }}>
      <section style={{ maxWidth: '36rem' }}>
        <h1>Waka is not configured yet</h1>
        <p>
          Add the complete Clerk publishable key to Vercel as
          <code> VITE_CLERK_PUBLISHABLE_KEY </code>, then redeploy.
        </p>
        <p>
          The value must start with <code>pk_live_</code> or <code>pk_test_</code>.
          Do not include the variable name or an equals sign in the value.
        </p>
      </section>
    </main>
  )
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {isValidPublishableKey && publishableKey ? (
      <ClerkProvider publishableKey={publishableKey}>
        <App />
      </ClerkProvider>
    ) : (
      <ConfigurationError />
    )}
  </StrictMode>,
)
