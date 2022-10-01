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
    { path: '/customWork', component: '@/pages/customWork/index', exact: true },
    {
      path: '/userCenter',
      component: '@/pages/userCenter/index',
      routes: [
        // {
        //   path: './myClassList',
        //   component: './userCenter/components/myClassList/index',
        //   exact: true
        // }, // 我的班级
        {
          path: './myCourseList',
          component: './userCenter/components/myCourseList/index',
          exact: true
        }, // 我的课程
        { path: './createCourse', component: './userCenter/components/createCourse/index' }, //创建课程
        { path: './edictCourseInfo', component: './userCenter/components/edictCourseInfo/index' }, // 修改课程信息
        {
          path: './enterCourse',
          component: './userCenter/components/enterCourse/index',
          routes: [
            // 班级成员
            {
              path: './classMembers',
              component: './userCenter/components/enterCourse/components/classMembers/index'
            },
            // 课程目录
            {
              path: './courseCatalog',
              component: './userCenter/components/enterCourse/components/courseCatalog/index'
            },
            // 添加课程小节
            {
              path: './addSection',
              component: './userCenter/components/enterCourse/components/addSection/index'
            },
            // 编辑课程小节
            {
              path: './editorSection',
              component: './userCenter/components/enterCourse/components/editSection/index'
            },
            // 预览课程小节
            {
              path: './viewSection',
              component: './userCenter/components/enterCourse/components/viewSection/index'
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
            }, // 全部完成
            {
              path: './mockOrFinalTest',
              component:
                './userCenter/components/adaptiveLearning/components/mockOrFinalTest/index.tsx'
            } // 模拟测试和期末测试
          ]
        },
        //非自适应学习
        //学生学习
        {
          path: './student/viewTextSection',
          component: './userCenter/components/student/viewTextSection/index.tsx'
        },
        //学生做题
        {
          path: './student/viewExam',
          component: './userCenter/components/student/viewExam/index.tsx'
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
    { path: '/softDownload', component: '@/pages/softDownload/index', exact: true },
    { path: '/courseShow', component: '@/pages/courseCenter/courseShow/index', exact: true },
    {
      path: '/courseIntroduce',
      component: '@/pages/courseCenter/courseIntroduce/index',
      exact: true
    },
    { path: '/comingSoon', component: '@/pages/developing/index', exact: true }, // 请期待页面
    { path: '/connectUs', component: '@/pages/connectUs/index', exact: true }, // 联系我们页面
    { path: '/case', component: '@/pages/caseShow/caseShowIndex/index', exact: true },
    { path: '/caseShow/publishCase', component: '@/pages/caseShow/publishCase', exact: true },
    { path: '/caseShow/editCase', component: '@/pages/caseShow/editCase', exact: true },
    { path: '/caseShow/viewCase', component: '@/pages/caseShow/viewCase', exact: true }
  ],
  fastRefresh: {},
  define: {
    'process.env': {
      NODE_ENV: 'development',
      BASE_URL: 'http://42.192.82.19:50000/'
      // BASE_URL: 'http://localhost:5222/'
    }
  },
  dva: {},
  antd: {},
  proxy: {
    '/api': {
      target: 'http://42.192.82.19:50000/', // 服务端域名
      changeOrigin: true, // 允许域名进行转换
      pathRewrite: { '^/api': '/api' }
    }
  }
  // mfsu: {}
})
