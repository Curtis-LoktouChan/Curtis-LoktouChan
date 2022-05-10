import { defineConfig } from 'umi'

export default defineConfig({
  history: {
    type: 'hash'
  },
  base: './',
  publicPath: './',
  hash: true,
  nodeModulesTransform: {
    type: 'none'
  },
  routes: [
    { path: '/', component: '@/pages/home/index' },
    { path: '/home', component: '@/pages/home/index' },
    { path: '/softDownload', component: '@/pages/softDownload/index', exact: true },
    { path: '/login', component: '@/pages/login/index', exact: true },
    { path: '/register', component: '@/pages/register/index', exact: true },
    {
      path: '/registerSuccess',
      component: '@/pages/register/components/success/index',
      exact: true
    },
    {
      path: '/protocol',
      component: '@/pages/register/components/protocol/index',
      exact: true
    },
    { path: '/case', component: '@/pages/caseShow/caseIndex', exact: true },
    { path: '/publishCase', component: '@/pages/caseShow/publishCase', exact: true },
    { path: '/edictCase', component: '@/pages/caseShow/edictCase', exact: true },
    { path: '/viewCase', component: '@/pages/caseShow/viewCase', exact: true },
    { path: '/softDownload', component: '@/pages/softDownload/index', exact: true },
    { path: '/login', component: '@/pages/login/index', exact: true },
    { path: '/courseCenter', component: '@/pages/courseCenter/index', exact: true }
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
