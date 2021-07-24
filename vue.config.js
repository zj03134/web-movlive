const path = require('path')
module.exports = {
  css: {
    loaderOptions: {
      less: {
        modifyVars: {
          // 直接覆盖变量
          // 'nav-bar-background-color': '#007bff',
          // 'nav-bar-title-text-color': 'white',
          // 或者可以通过 less 文件覆盖（文件路径为绝对路径）
          hack: `true; @import "${path.resolve(__dirname, 'src/assets/style/cover.less')}";`
          // hack: 'true; @import "your-less-file-path.less";'
        }
      }
    }
  }
}
