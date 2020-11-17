const cacheName = 'flicksbox-cache-v1';

const assets = global.serviceWorkerOption.assets.map(asset => '/static'.concat(asset));

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(cacheName).then((cache) => {
            cache.addAll(assets);
        }),
    );
});

self.addEventListener('activate', (event) => {
    event.waitUntil(caches.open(cacheName).then((cache) => {
        cache.keys().then((requests) => {
            return Promise.all(
                requests
                    .map((request) => {
                        if (!assets.includes(request)) {
                            cache.delete(request);
                        }
                    }),
            );
        });
    }));
});

self.addEventListener('fetch', (event) => {
    event.respondWith((async () => {
        const cachedResponse = await caches.match(event.request);
        const url = new URL(event.request.url);
        const isStatic = url.pathname.includes('/static/');

        if (cachedResponse && (!navigator.onLine || isStatic)) {
            return cachedResponse;
        }

        try {
            const response = await fetch(event.request);

            if (isStatic) {
                const cache = await caches.open(cacheName);
                await cache.put(event.request, response.clone());
            }

            return response;
        } catch (error) {
            if (event.request.mode === 'navigate') {
                return caches.match('/static/fallback.html');
            }
        }
    })());
});
