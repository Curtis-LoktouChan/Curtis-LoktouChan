import { defineConfig } from 'umi'

export default defineConfig({
  nodeModulesTransform: {
    type: 'none'
  },
  routes: [
    { path: '/', component: '@/pages/home/index' },
    { path: '/home', component: '@/pages/home/index' },
    { path: '/softDownload', component: '@/pages/softDownload/index', exact: true },
    { path: '/login', component: '@/pages/login/index', exact: true },
    { path: '/case', component: '@/pages/caseShow/caseIndex', exact: true },
    { path: '/publishCase', component: '@/pages/caseShow/publishCase', exact: true },
    { path: '/edictCase', component: '@/pages/caseShow/edictCase', exact: true },
    { path: '/viewCase', component: '@/pages/caseShow/viewCase', exact: true }
  ],
  fastRefresh: {},
  define: {
    'process.env': {
      NODE_ENV: 'development',
      BASE_URL: 'http://localhost:5222/'
    }
  },
  dva: {},
  antd: {},
  mfsu: {}
})
