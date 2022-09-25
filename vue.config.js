const { defineConfig } = require('@vue/cli-service')
const path = require('path')
const NodePolyfillPlugin = require('node-polyfill-webpack-plugin')

function resolve(dir) {
  return path.join(__dirname, dir)
}

module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack: {
    devServer: {
      proxy: {
        '/api': {
          target: 'https://api.imooc-admin.lgdsunday.club',
          changeOrigin: true
        }
      }
    },
    plugins: [new NodePolyfillPlugin()]
  },
  chainWebpack(config) {
    // 设置svg-sprite-loader
    config.module
      .rule('svg')
      .exclude.add(resolve('src/components/SvgIcons/svg'))
      .end()
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/components/SvgIcons/svg'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
      .end()
  }
})
