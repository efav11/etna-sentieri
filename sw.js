const CACHE = "etna-v1";
const FILES = ["./", "index.html", "leaflet.js", "manifest.webmanifest", "icon-180.png", "icon-192.png", "icon-512.png", "fonts/Barlow-400.woff2", "fonts/Barlow-500.woff2", "fonts/Barlow-600.woff2", "fonts/BarlowCondensed-600.woff2", "fonts/BarlowCondensed-700.woff2"];
self.addEventListener("install", (e) => e.waitUntil(caches.open(CACHE).then((c) => c.addAll(FILES)).then(() => self.skipWaiting())));
self.addEventListener("activate", (e) => e.waitUntil(caches.keys().then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)))).then(() => self.clients.claim())));
self.addEventListener("fetch", (e) => {
  if (e.request.method !== "GET" || new URL(e.request.url).origin !== location.origin) return;
  e.respondWith(caches.match(e.request, { ignoreSearch: true }).then((hit) => hit || fetch(e.request).catch(() => e.request.mode === "navigate" ? caches.match("index.html") : Response.error())));
});
