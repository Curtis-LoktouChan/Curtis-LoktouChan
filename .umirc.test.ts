import { defineConfig } from 'umi'

export default defineConfig({
  define: {
    'process.env': {
      NODE_ENV: 'test',
      BASE_URL: 'http://localhost:5222/'
    }
  }
})
