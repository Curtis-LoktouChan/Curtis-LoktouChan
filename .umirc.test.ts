import { defineConfig } from 'umi'

export default defineConfig({
  define: {
    'process.env': {
      NODE_ENV: 'test',
      BASE_URL: 'http://42.192.82.19:50000/'
    }
  },
  proxy: {
    '/api': {
      target: 'http://42.192.82.19:50000/', // 服务端域名
      changeOrigin: true, // 允许域名进行转换
      pathRewrite: { '^/api': '/api' }
    }
  }
})
