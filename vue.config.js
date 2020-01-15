const webpack = require('webpack')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const helpers = require('./helpers')
const path = require('path')

module.exports = {
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
              test: /[\\/]node_modules[\\/](?!(@fortawesome|mavon-editor|v-calendar|vee-validate|vue-moment|vue-toasted))(.[a-zA-Z0-9.\-_]+)[\\/]/,
              chunks: 'initial',
              name: 'vendors',
              enforce: true
            },
            fortawesome: {
              test: /[\\/]node_modules[\\/]@fortawesome(.[a-zA-Z0-9.\-_]+)[\\/]/,
              chunks: 'initial',
              name: 'fortawesome',
              enforce: true
            },
            mavon_editor: {
              test: /[\\/]node_modules[\\/]mavon-editor(.[a-zA-Z0-9.\-_]+)[\\/]/,
              chunks: 'initial',
              name: 'mavon-editor',
              enforce: true
            },
            v_calendar: {
              test: /[\\/]node_modules[\\/]v-calendar(.[a-zA-Z0-9.\-_]+)[\\/]/,
              chunks: 'initial',
              name: 'v-calendar',
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
            },
            vue_toasted: {
              test: /[\\/]node_modules[\\/]vue-toasted(.[a-zA-Z0-9.\-_]+)[\\/]/,
              chunks: 'initial',
              name: 'vue-toasted',
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
    workboxPluginMode: 'InjectManifest',
    workboxOptions: {
      swSrc: 'src/service-worker.js',
      exclude: [/manifest\.json$/]
    }
  }
}
