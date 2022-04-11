import { defineConfig } from 'umi';

export default defineConfig({
  define: {
    'process.env': {
      NODE_ENV: 'test',
    },
    baseUrl: 'http://localhost:8000/test',
  },
});
