var merge = require('webpack-merge')
var prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  API_BASE_URL: '"http://localhost:3000/wechat"',
  wx: {
    appId: 'wx15b4165798ef239f',
    appSecret: 'e6f25f907790b77055c731eae3fdc36e',
  }
})

// 页面引用，如：const baseURL = process.env.API_BASE_URL
