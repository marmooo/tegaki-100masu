var CACHE_NAME = '2021-09-12 08:36';
var urlsToCache = [
  "/tegaki-100masu/",
  "/tegaki-100masu/index.js",
  "/tegaki-100masu/model/model.json",
  "/tegaki-100masu/model/group1-shard1of2.bin",
  "/tegaki-100masu/model/group1-shard2of2.bin",
  "/tegaki-100masu/mp3/incorrect1.mp3",
  "/tegaki-100masu/mp3/end.mp3",
  "/tegaki-100masu/mp3/correct3.mp3",
  "/tegaki-100masu/favicon/original.svg",
  "/tegaki-100masu/signature_pad.umd.min.js",
  "https://marmooo.github.io/fonts/textar-light.woff2",
  "https://cdn.jsdelivr.net/npm/bootstrap@5.1.1/dist/css/bootstrap.min.css",
  "https://cdn.jsdelivr.net/npm/@tensorflow/tfjs/dist/tf.min.js",
];

self.addEventListener("install", function (event) {
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then(function (cache) {
        return cache.addAll(urlsToCache);
      }),
  );
});

self.addEventListener("fetch", function (event) {
  event.respondWith(
    caches.match(event.request)
      .then(function (response) {
        if (response) {
          return response;
        }
        return fetch(event.request);
      }),
  );
});

self.addEventListener("activate", function (event) {
  var cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(function (cacheNames) {
      return Promise.all(
        cacheNames.map(function (cacheName) {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        }),
      );
    }),
  );
});
