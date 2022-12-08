
self.addEventListener('install', evento => {
    const cache = caches.open('cache-x').then(cache => {
        return cache.addAll([
            './',
            'app.js',
            'index.html',
            'styles.css',
            'icons/tacho.png',
            'sw.js'
        ])
    })

    evento.waitUntil(cache);
})

self.addEventListener('fetch', e => {
    const respondCache = caches.match(e.request).then(res => {
        if(res) {
            return res;
        } else {
            return fetch(e.request).then(respuesta => {
                return respuesta;
            })
        }
    })
   
    e.respondWith(respondCache);
})