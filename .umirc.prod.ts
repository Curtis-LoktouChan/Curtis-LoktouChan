import { defineConfig } from 'umi';

export default defineConfig({
  define: {
    'process.env': {
      NODE_ENV: 'prod',
    },
    baseUrl: 'http://localhost:8000/prod',
  },
});
