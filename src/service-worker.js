if (workbox) {
  workbox.core.setLogLevel(workbox.core.LOG_LEVELS.debug)

  workbox.precaching.precacheAndRoute(self.__precacheManifest || [])

  workbox.routing.registerNavigationRoute('/index.html')

  workbox.routing.registerRoute(
    new RegExp('/api'),
    new workbox.strategies.NetworkOnly()
  )
}
