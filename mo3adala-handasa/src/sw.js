// Service Worker for Performance Optimization
const CACHE_NAME = 'mo3adala-handasa-v2';
const urlsToCache = [
  '/',
  '/assets/logo2.png',
  '/assets/teacher.png',
  '/assets/teacher1.png',
  '/assets/teacher2.png',
  '/assets/teacher3.png',
  '/assets/teacher4.png',
  '/assets/student.png',
  '/assets/student1.png',
  '/assets/student2.png',
  '/assets/student3.png',
  '/assets/student4.png',
  '/assets/student5.png',
  '/assets/student6.png',
  'https://fonts.gstatic.com/s/cairo/v28/SLXGc1nY6HkvalI.woff2'
];

// Install event
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache);
      })
  );
});

// Fetch event
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Return cached version or fetch from network
        return response || fetch(event.request);
      })
  );
});

// Activate event
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});




