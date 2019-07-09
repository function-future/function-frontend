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
    }
    else if (process.env.NODE_ENV === 'dev-nomock') {
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
            }
          }
        }
      }
    }
  }
}
