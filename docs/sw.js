var CACHE_NAME="2022-09-25 10:38",urlsToCache=["/tegaki-100masu/","/tegaki-100masu/index.js","/tegaki-100masu/worker.js","/tegaki-100masu/model/model.json","/tegaki-100masu/model/group1-shard1of1.bin","/tegaki-100masu/mp3/incorrect1.mp3","/tegaki-100masu/mp3/end.mp3","/tegaki-100masu/mp3/correct3.mp3","/tegaki-100masu/favicon/favicon.svg","https://marmooo.github.io/fonts/textar-light.woff2","https://cdn.jsdelivr.net/npm/bootstrap@5.2.1/dist/css/bootstrap.min.css","https://cdn.jsdelivr.net/npm/signature_pad@4.0.9/dist/signature_pad.umd.min.js","https://cdn.jsdelivr.net/npm/@tensorflow/tfjs@3.20.0/dist/tf.min.js"];self.addEventListener("install",function(a){a.waitUntil(caches.open(CACHE_NAME).then(function(a){return a.addAll(urlsToCache)}))}),self.addEventListener("fetch",function(a){a.respondWith(caches.match(a.request).then(function(b){return b||fetch(a.request)}))}),self.addEventListener("activate",function(a){var b=[CACHE_NAME];a.waitUntil(caches.keys().then(function(a){return Promise.all(a.map(function(a){if(b.indexOf(a)===-1)return caches.delete(a)}))}))})