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

if (!publishableKey || !/^pk_(test|live)_[A-Za-z0-9_-]+$/.test(publishableKey)) {
  throw new Error(
    'Invalid VITE_CLERK_PUBLISHABLE_KEY. Use the complete Publishable key from Clerk Dashboard > API Keys, including the pk_test_ or pk_live_ prefix.',
  )
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ClerkProvider publishableKey={publishableKey}>
      <App />
    </ClerkProvider>
  </StrictMode>,
)
