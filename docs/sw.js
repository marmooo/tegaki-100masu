const CACHE_NAME="2024-05-20 01:29",urlsToCache=["/tegaki-100masu/","/tegaki-100masu/index.js","/tegaki-100masu/worker.js","/tegaki-100masu/model/model.json","/tegaki-100masu/model/group1-shard1of1.bin","/tegaki-100masu/mp3/incorrect1.mp3","/tegaki-100masu/mp3/end.mp3","/tegaki-100masu/mp3/correct3.mp3","/tegaki-100masu/favicon/favicon.svg","https://marmooo.github.io/fonts/textar-light.woff2","https://cdn.jsdelivr.net/npm/@tensorflow/tfjs@4.19.0/dist/tf.min.js"];self.addEventListener("install",e=>{e.waitUntil(caches.open(CACHE_NAME).then(e=>e.addAll(urlsToCache)))}),self.addEventListener("fetch",e=>{e.respondWith(caches.match(e.request).then(t=>t||fetch(e.request)))}),self.addEventListener("activate",e=>{e.waitUntil(caches.keys().then(e=>Promise.all(e.filter(e=>e!==CACHE_NAME).map(e=>caches.delete(e)))))})