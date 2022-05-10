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
    { path: '/waitToLogin', component: '@/pages/waitToLogin/index', exact: true },
    {
      path: '/userCenter',
      component: '@/pages/userCenter/index',
      routes: [
        { path: './myClassList', component: './userCenter/components/myClassList/index' }, // 我的班级
        { path: './createClass', component: './userCenter/components/createClass/index' }, // 创建班级
        {
          path: './enterClass',
          component: './userCenter/components/enterClass/index',
          routes: [
            // 班级成员
            {
              path: './classMenbers',
              component: './userCenter/components/enterClass/components/classMenbers/index'
            },
            // 课程目录
            {
              path: './courseCatalog',
              component: './userCenter/components/enterClass/components/courseCatalog/index'
            }
          ]
        }, // 进入班级首页
        // 学生个人中心
        {
          path: './student/classList',
          component: './userCenter/components/student/classList/index'
        },
        // 学生班级信息
        {
          path: './student/enterClass',
          component: './userCenter/components/student/enterClass/index'
        },
        // 自适应学习
        {
          path: './adaptiveLearning',
          component: './userCenter/components/adaptiveLearning/index',
          routes: [
            {
              path: './introduction',
              component:
                './userCenter/components/adaptiveLearning/components/introduction/index.tsx'
            }, // 自适应首页
            {
              path: './firstTimeStudy',
              component:
                './userCenter/components/adaptiveLearning/components/firstTimeStudy/index.tsx'
            }, // 首次学习
            {
              path: './scoreResult',
              component: './userCenter/components/adaptiveLearning/components/scoreResult/index.tsx'
            }, // 结果页
            {
              path: './unitStudy',
              component: './userCenter/components/adaptiveLearning/components/unitStudy/index.tsx'
            }, // 知识点学习
            {
              path: './unitTest',
              component: './userCenter/components/adaptiveLearning/components/unitTest/index.tsx'
            }, // 小节测试
            {
              path: './finishAll',
              component: './userCenter/components/adaptiveLearning/components/finishAll/index.tsx'
            } // 全部完成
          ]
        }
      ]
    },
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
  antd: {}
  // mfsu: {}
})
