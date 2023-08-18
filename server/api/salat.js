const { createProxyMiddleware } = require('http-proxy-middleware')

module.exports = createProxyMiddleware({
  target: 'https://api.aladhan.com/v1/timingsByCity',
  changeOrigin: true,
  pathRewrite: {
    '^/api/salat': '/'
  }
})
