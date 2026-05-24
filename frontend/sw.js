// Service Worker — Serenità Staff
// CSS y fuentes en caché; HTML siempre desde red (sesión actualizada)
const CACHE_NAME = 'staff-v1'
const STATIC_ASSETS = [
  '/css/staff.css',
]

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then(c => c.addAll(STATIC_ASSETS)).then(() => self.skipWaiting())
  )
})

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    ).then(() => self.clients.claim())
  )
})

self.addEventListener('fetch', (e) => {
  const url = new URL(e.request.url)

  // HTML siempre desde red
  if (e.request.mode === 'navigate' || url.pathname.endsWith('.html') || url.pathname === '/') {
    e.respondWith(fetch(e.request).catch(() => caches.match(e.request)))
    return
  }

  // Supabase y CDN siempre desde red
  if (url.hostname.includes('supabase') || url.hostname.includes('googleapis') || url.hostname.includes('gstatic') || url.hostname.includes('jsdelivr')) {
    e.respondWith(fetch(e.request))
    return
  }

  // CSS/JS: cache-first
  e.respondWith(
    caches.match(e.request).then(cached => {
      if (cached) return cached
      return fetch(e.request).then(resp => {
        if (resp.ok) {
          const clone = resp.clone()
          caches.open(CACHE_NAME).then(c => c.put(e.request, clone))
        }
        return resp
      })
    })
  )
})
