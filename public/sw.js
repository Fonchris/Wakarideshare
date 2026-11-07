const CACHE_NAME = 'waka-rideshare-v2'
const APP_SHELL = [
  '/',
  '/index.html',
  '/manifest.json',
  '/icons/icon-192.png',
  '/icons/icon-512.png',
]

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(APP_SHELL))
      .then(() => self.skipWaiting()),
  )
})

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => Promise.all(
        cacheNames
          .filter((cacheName) => cacheName !== CACHE_NAME)
          .map((cacheName) => caches.delete(cacheName)),
      ))
      .then(() => self.clients.claim()),
  )
})

self.addEventListener('fetch', (event) => {
  const requestUrl = new URL(event.request.url)
  const isSameOrigin = requestUrl.origin === self.location.origin
  const isGetRequest = event.request.method === 'GET'

  if (!isGetRequest || !isSameOrigin) {
    return
  }

  event.respondWith(
    fetch(event.request)
      .then((response) => {
        const contentType = response.headers.get('content-type') ?? ''
        const isDocument = event.request.mode === 'navigate'
        const isHtmlResponse = contentType.includes('text/html')

        if (response.ok && (isDocument || !isHtmlResponse)) {
          const responseToCache = response.clone()
          caches.open(CACHE_NAME).then((cache) => cache.put(event.request, responseToCache))
        }
        return response
      })
      .catch(() => caches.match(event.request).then((cachedResponse) => {
        if (cachedResponse) {
          return cachedResponse
        }
        if (event.request.mode === 'navigate') {
          return caches.match('/index.html')
        }
        return Response.error()
      })),
  )
})
