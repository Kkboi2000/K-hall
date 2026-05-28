// ─────────────────────────────────────────
//  K-Hall Service Worker
//  Cache-first for assets, network-first for nav
// ─────────────────────────────────────────

const CACHE_NAME = 'khall-v2';
const OFFLINE_URL = './index.html';

const PRECACHE = [
  './index.html',
  './manifest.json',
  './fonts/fonts.css',
  './icons/icon-192x192.png',
  './icons/icon-512x512.png',
  './icons/apple-touch-icon.png',
  'https://fonts.googleapis.com/css2?family=Syne:wght@400;700;800&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,700;1,9..40,300&display=swap'
];

// ── INSTALL: pre-cache shell ──
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      console.log('[SW] Pre-caching app shell');
      return cache.addAll(PRECACHE.filter(url => !url.startsWith('http')));
    }).then(() => self.skipWaiting())
  );
});

// ── ACTIVATE: clean old caches ──
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

// ── FETCH: strategy by request type ──
self.addEventListener('fetch', event => {
  const { request } = event;
  const url = new URL(request.url);

  // Google Fonts — cache-first (they're versioned / stable)
  if (url.hostname.includes('fonts.g') || url.hostname.includes('fonts.googleapis')) {
    event.respondWith(cacheFirst(request));
    return;
  }

  // Same-origin navigation — network-first, fallback to cache
  if (request.mode === 'navigate') {
    event.respondWith(networkFirst(request));
    return;
  }

  // Static assets — cache-first
  if (['style', 'script', 'image', 'font'].includes(request.destination)) {
    event.respondWith(cacheFirst(request));
    return;
  }

  // Everything else — network, no caching
  event.respondWith(fetch(request).catch(() => caches.match(OFFLINE_URL)));
});

// ── Strategies ──
async function cacheFirst(request) {
  const cached = await caches.match(request);
  if (cached) return cached;
  try {
    const response = await fetch(request);
    if (response.ok) {
      const cache = await caches.open(CACHE_NAME);
      cache.put(request, response.clone());
    }
    return response;
  } catch {
    return caches.match(OFFLINE_URL);
  }
}

async function networkFirst(request) {
  try {
    const response = await fetch(request);
    if (response.ok) {
      const cache = await caches.open(CACHE_NAME);
      cache.put(request, response.clone());
    }
    return response;
  } catch {
    return caches.match(request) || caches.match(OFFLINE_URL);
  }
}
