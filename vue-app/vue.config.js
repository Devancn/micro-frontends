module.exports = {
  configureWebpack: {
    devServer: {
      port: 30002,
      headers: {
        'Access-Control-Allow-Origin': '*'
      }
    },
    output: {
      library: 'vue',
      libraryTarget: 'umd'
    }
  }
}