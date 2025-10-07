// Service Worker with network-first strategy for navigations to avoid blank screen on mobile
const CACHE_VERSION = 'v3';
const STATIC_CACHE = `mo3adala-static-${CACHE_VERSION}`;
const RUNTIME_CACHE = `mo3adala-runtime-${CACHE_VERSION}`;

const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/assets/logo2.png',
  '/assets/logo.png',
];

self.addEventListener('install', (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(STATIC_CACHE).then((cache) => cache.addAll(STATIC_ASSETS)).catch(() => undefined)
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    (async () => {
      const keys = await caches.keys();
      await Promise.all(keys.map((key) => {
        if (key !== STATIC_CACHE && key !== RUNTIME_CACHE) {
          return caches.delete(key);
        }
      }));
      await self.clients.claim();
    })()
  );
});

function isNavigationRequest(request) {
  return request.mode === 'navigate' || (request.method === 'GET' && request.headers.get('accept')?.includes('text/html'));
}

// Network-first for navigations (serves latest index and routes) to prevent stale shell
// Stale-while-revalidate for static assets
self.addEventListener('fetch', (event) => {
  const { request } = event;

  if (isNavigationRequest(request)) {
    event.respondWith(
      (async () => {
        try {
          const networkResponse = await fetch(request);
          const cache = await caches.open(RUNTIME_CACHE);
          cache.put('/', networkResponse.clone()).catch(() => undefined);
          return networkResponse;
        } catch (err) {
          const cache = await caches.open(STATIC_CACHE);
          return (await cache.match('/index.html')) || (await cache.match('/')) || Response.error();
        }
      })()
    );
    return;
  }

  if (request.url.includes('/assets/')) {
    event.respondWith(
      (async () => {
        const cache = await caches.open(STATIC_CACHE);
        const cached = await cache.match(request);
        const networkPromise = fetch(request)
          .then((response) => {
            cache.put(request, response.clone()).catch(() => undefined);
            return response;
          })
          .catch(() => undefined);
        return cached || networkPromise || fetch(request);
      })()
    );
    return;
  }

  // Default: try cache, then network
  event.respondWith(
    caches.match(request).then((cached) => cached || fetch(request))
  );
});
