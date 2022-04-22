import { defineConfig } from 'umi'

export default defineConfig({
  define: {
    'process.env': {
      NODE_ENV: 'prod',
      BASE_URL: 'http://42.192.82.19/'
    }
  }
})
