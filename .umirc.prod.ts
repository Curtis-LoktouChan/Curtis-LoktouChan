import { defineConfig } from 'umi'

export default defineConfig({
  define: {
    'process.env': {
      NODE_ENV: 'prod',
      BASE_URL: 'http://localhost:8000/'
    }
  }
})
