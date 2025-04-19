const CACHE_NAME = 'memory-game-v1';
const urlsToCache = [
    '/week2/',
    '/week2/index.html',
    '/week2/manifest.json',
    'https://i.ibb.co/m5nYFQZZ/maskable-icon-x192.png',
    'https://i.ibb.co/xStRBhfN/maskable-icon-x512.png'
];

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => cache.addAll(urlsToCache))
    );
});

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                return response || fetch(event.request);
            })
            .catch(() => {
                return new Response('오프라인 상태입니다.');
            })
    );
});
