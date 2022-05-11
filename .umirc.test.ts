import { defineConfig } from 'umi'

export default defineConfig({
  define: {
    'process.env': {
      NODE_ENV: 'test',
      BASE_URL: 'http://42.192.82.19:50000/'
    }
  }
})
