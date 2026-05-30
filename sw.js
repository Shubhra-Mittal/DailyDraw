const CACHE = 'dailydraw-v1';
const ASSETS = [
  './index.html', './manifest.json', './icon.svg',
  './p_thumbs.png', './p_excited.png', './p_clock.png',
  './p_draw.png', './p_think.png', './p_magnify.png',
  './p_pencil.png', './p_shy.png', './p_wave.png',
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)));
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys =>
    Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
  ));
  self.clients.claim();
});

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(r => r || fetch(e.request).catch(() => caches.match('./index.html')))
  );
});
