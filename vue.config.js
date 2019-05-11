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
            '@mock-api': path.resolve(__dirname,'src/api-mock')
          }
        },
        devServer: {
          hot: false,
          port: 10001
        }
      }
    }
  }
}
