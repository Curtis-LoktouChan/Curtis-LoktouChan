export const ACTIONS = {
  user: {
    login: 'user/loginEffect',
    loginWithToken: 'user/loginWithTokenEffect',
    logout: 'user/logoutEffect'
  },
  adaptiveLearning: {
    presentTime: 'adaptiveLearning/setPresentTimeEffect', // 设置当前时间戳以显示时间
    setTestingState: 'adaptiveLearning/setTestingStateEffect', // 设置是否正在进行小节检测
    setExamList: 'adaptiveLearning/setExamListEffect',
    setKnowledgeList: 'adaptiveLearning/setKnowledgeListEffect',
    setAnswerList: 'adaptiveLearning/setAnswerListEffect',
    setKnowledgeName: 'adaptiveLearning/setKnowledgeNameEffect',
    setStartTime: 'adaptiveLearning/setStartTimeEffect'
  },
  userCenter: {
    saveClassInfo: 'userCenter/saveClassInfoEffect' // 保存班级信息
  }
}
