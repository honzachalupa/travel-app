/* globals __BASENAME__ */
/* eslint-disable no-restricted-globals */

const cacheFilesObject = {
    _root: [
        '',
        '?pwa=true',
        'index.html',
        'index.html?pwa=true',
        'bundle.js'
    ],
    images: {
        _root: [
            'icon.png',
            'sample.png'
        ],
        icons: [
            'sample.svg'
        ],
        favicons: [
            'manifest.json',
            'browserconfig.xml',
            'favicon.ico',
            'favicon-16x16.png',
            'favicon-32x32.png',
            'android-chrome-36x36.png',
            'android-chrome-48x48.png',
            'android-chrome-72x72.png',
            'android-chrome-96x96.png',
            'android-chrome-144x144.png',
            'android-chrome-192x192.png',
            'android-chrome-256x256.png',
            'android-chrome-384x384.png',
            'android-chrome-512x512.png',
            'apple-touch-icon.png',
            'apple-touch-icon-precomposed.png',
            'apple-touch-icon-57x57.png',
            'apple-touch-icon-60x60.png',
            'apple-touch-icon-72x72.png',
            'apple-touch-icon-76x76.png',
            'apple-touch-icon-114x114.png',
            'apple-touch-icon-120x120.png',
            'apple-touch-icon-144x144.png',
            'apple-touch-icon-152x152.png',
            'apple-touch-icon-167x167.png',
            'apple-touch-icon-180x180.png',
            'apple-touch-startup-image-320x460.png',
            'apple-touch-startup-image-640x920.png',
            'apple-touch-startup-image-640x1096.png',
            'apple-touch-startup-image-748x1024.png',
            'apple-touch-startup-image-750x1294.png',
            'apple-touch-startup-image-768x1004.png',
            'apple-touch-startup-image-1182x2208.png',
            'apple-touch-startup-image-1242x2148.png',
            'apple-touch-startup-image-1496x2048.png',
            'apple-touch-startup-image-1536x2008.png',
            'firefox_app_60x60.png',
            'firefox_app_128x128.png',
            'firefox_app_512x512.png',
            'mstile-70x70.png',
            'mstile-144x144.png',
            'mstile-150x150.png',
            'mstile-310x150.png',
            'mstile-310x310.png'
        ]
    }
};

const cacheName = 'dev-stack-cache';
const path = __BASENAME__.substring(0, __BASENAME__.length - 1) || '';
const cacheFiles = objectToArray(cacheFilesObject).map(url => { return path + url; });

self.addEventListener('install', event => {
    console.log('[ServiceWorker] Installed');

    // e.waitUntil Delays the event until the Promise is resolved
    event.waitUntil(
        caches.open(cacheName).then(cache => {
            // Add all the default files to the cache
            console.log('[ServiceWorker] Caching files');

            return cache.addAll(cacheFiles);
        })
    );
});

self.addEventListener('activate', event => {
    console.log('[ServiceWorker] Activated');

    event.waitUntil(
        // Get all the cache keys (cacheName)
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.filter(prevCacheName => {
                    // If a cached item is saved under a previous cacheName
                    return prevCacheName !== cacheName;
                }).map(prevCacheName => {
                    // Delete that cached file
                    console.log('[ServiceWorker] Removing cached files from cache - ', prevCacheName);

                    return caches.delete(cacheName);
                })
            );
        })
    );
});

self.addEventListener('fetch', event => {
    console.log('[ServiceWorker] Fetch', event.request.url);

    event.respondWith(
        caches.match(event.request).then(response => {
            return response || fetch(event.request);
        })
    );
});

function objectToArray(inputObject, groupName = '') {
    let outputArray = [];

    Object.keys(inputObject).forEach(subGroupName => {
        const node = inputObject[subGroupName];

        if (typeof node === 'object') {
            outputArray = outputArray.concat(objectToArray(node, `${groupName}/${subGroupName}`));
        } else {
            const path = `${groupName.replace('/_root', '')}/`;

            outputArray.push(path + node);
        }
    });

    return outputArray;
}

/* eslint-enable */
