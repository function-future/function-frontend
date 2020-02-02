const webpack = require('webpack')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const helpers = require('./helpers')
const path = require('path')
const CompressionPlugin = require('compression-webpack-plugin')

module.exports = {
  productionSourceMap: false,
  chainWebpack: config => {
    config.plugins.delete('prefetch')
    config.plugin('CompressionPlugin').use(
      new CompressionPlugin({
        algorithm: 'gzip',
        test: /\.(js|css)$/
      })
    )
  },
  configureWebpack: config => {
    if (process.env.NODE_ENV === 'development') {
      return {
        mode: 'development',
        optimization: {
          runtimeChunk: 'single',
          splitChunks: {
            chunks: 'all'
          }
        },
        resolve: {
          alias: {
            '@mock-api': path.resolve(__dirname, 'src/api-mock')
          }
        },
        devServer: {
          hot: false,
          port: 10001
        }
      }
    } else if (process.env.NODE_ENV === 'dev-nomock') {
      return {
        mode: 'development',
        optimization: {
          runtimeChunk: 'single',
          splitChunks: {
            chunks: 'all'
          }
        },
        devServer: {
          hot: false,
          port: 10001,
          proxy: {
            '^/api': {
              target: 'http://localhost:8080',
              ws: true,
              changeOrigin: true
            },
            '^/ws': {
              target: 'http://localhost:8080',
              changeOrigin: true,
              ws: true
            }
          }
        }
      }
    }
    return {
      optimization: {
        runtimeChunk: 'single',
        splitChunks: {
          cacheGroups: {
            vendor: {
              test: /[\\/]node_modules[\\/](?!(buefy|@fortawesome|vee-validate|vue-moment|sockjs-client))(.[a-zA-Z0-9.\-_]+)[\\/]/,
              chunks: 'initial',
              name: 'vendors',
              enforce: true
            },
            buefy: {
              test: /[\\/]node_modules[\\/]buefy(.[a-zA-Z0-9.\-_]+)[\\/]/,
              chunks: 'initial',
              name: 'buefy',
              enforce: true
            },
            fortawesome: {
              test: /[\\/]node_modules[\\/]@fortawesome(.[a-zA-Z0-9.\-_]+)[\\/]/,
              chunks: 'initial',
              name: 'fortawesome',
              enforce: true
            },
            sockjs_client: {
              test: /[\\/]node_modules[\\/]sockjs-client(.[a-zA-Z0-9.\-_]+)[\\/]/,
              chunks: 'initial',
              name: 'sockjs-client',
              enforce: true
            },
            vee_validate: {
              test: /[\\/]node_modules[\\/]vee-validate(.[a-zA-Z0-9.\-_]+)[\\/]/,
              chunks: 'initial',
              name: 'vee-validate',
              enforce: true
            },
            vue_moment: {
              test: /[\\/]node_modules[\\/]vue-moment(.[a-zA-Z0-9.\-_]+)[\\/]/,
              chunks: 'initial',
              name: 'vue-moment',
              enforce: true
            }
          }
        }
      }
    }
  },
  pwa: {
    name: 'Function',
    themeColor: '#02AAF3',
    msTileColor: '#02AAF3',
    appleMobileWebAppCapable: 'yes',
    appleMobileWebAppStatusBarStyle: 'black-translucent',
    manifestOptions: {
      backgroundColor: '#02AAF3'
    },
    iconPaths: {
      favicon32: 'img/icons/favicon-32x32.png',
      favicon16: 'img/icons/favicon-16x16.png',
      appleTouchIcon: 'img/icons/apple-touch-icon.png',
      maskIcon: 'img/icons/safari-pinned-tab.svg',
      msTileImage: 'img/icons/mstile-150x150.png'
    },
    workboxPluginMode: 'InjectManifest',
    workboxOptions: {
      swSrc: 'src/service-worker.js',
      exclude: [/manifest\.json$/]
    }
  }
}
