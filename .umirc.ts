import { defineConfig } from 'umi'

export default defineConfig({
  nodeModulesTransform: {
    type: 'none'
  },
  routes: [
    { path: '/', component: '@/pages/home/index' },
    { path: '/home', component: '@/pages/home/index' },
    { path: '/login', component: '@/pages/login/index', exact: true },
    { path: '/case/index', component: '@/pages/caseShow/caseIndex', exact: true }
  ],
  fastRefresh: {},
  define: {
    'process.env': {
      NODE_ENV: 'development',
      BASE_URL: 'http://localhost:5222/'
    }
  },
  dva: {},
  antd: {}
})
