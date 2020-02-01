if (workbox) {
  workbox.core.setLogLevel(workbox.core.LOG_LEVELS.debug)

  workbox.precaching.precacheAndRoute(self.__precacheManifest || [])

  workbox.routing.registerNavigationRoute('/index.html')

  workbox.routing.registerRoute(
    /\.(?:png|gif|jpg|jpeg|webp|svg)$/i,
    new workbox.strategies.CacheFirst({
      cacheName: 'function-images',
      plugins: [
        new workbox.expiration.Plugin({
          maxAgeSeconds: 60 * 60
        })
      ]
    })
  )

  workbox.routing.registerRoute(
    /[\\/]api[\\/]*/i,
    new workbox.strategies.NetworkFirst({
      cacheName: 'function-apis',
      networkTimeoutSeconds: 5,
      plugins: [
        new workbox.expiration.Plugin({
          maxAgeSeconds: 24 * 60 * 60
        })
      ]
    })
  )
}
