if (workbox) {
  workbox.core.setLogLevel(workbox.core.LOG_LEVELS.debug)

  workbox.precaching.precacheAndRoute([])

  workbox.routing.registerNavigationRoute('/index.html')

  // Precache needs to be handled since workbox-precache plugin does caching
  // on precached asset with something similar to CacheFirst strategy, which
  // will cause the web app not updating should new changes are deployed.
  // See https://developers.google.com/web/tools/workbox/modules/workbox-precaching#serving_precached_responses
  workbox.routing.registerRoute(
    /\.(?:css|js|json|html)$/i,
    new workbox.strategies.StaleWhileRevalidate({
      cacheName: 'function-precaches',
      plugins: [
        new workbox.expiration.Plugin({
          maxAgeSeconds: 30 * 24 * 60 * 60
        })
      ]
    })
  )

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
