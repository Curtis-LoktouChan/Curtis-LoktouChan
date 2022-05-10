// 测试题
export interface IExamList {
  id: number
  exam_discrition: string
  exam_type: string
  [propName: string]: string | number // 因为选项个数不确定那个
}

// 知识点
export interface IKnowledgeList {
  id: number
  name: string
}

// 答案
export interface ISubmitAnswer {
  exam_id: number
  my_answer: string
  self_study_class_id: number
}

// 开始学习请求
export interface IFirstTimeStudyRequest {
  login_token: string
}

// 开始学习响应
export interface IExamListResponse {
  isLearn: boolean
  exam_list: IExamList[]
  knowledge_list: IKnowledgeList[]
}

// 获取知识点请求
export interface IGetKnowledgeRequest {
  point_name: string
  start_time: string
}

// 获取知识点响应
export interface IGetKnowledgeResponse {
  knowledge: {
    id: number
    charter_id: number
    class_id: number
    exams: Object | null
    section_info: {
      content: string
      title: string
      type: string
    }
  }
}

// 小节测试响应
export interface IUnitTestResponse {
  exam_list: IExamList[]
}

// 提交请求
export interface ISubmitExam {
  time_used: number
  answer: ISubmitAnswer[]
}

// 提交响应
export interface ISubmitAnswerResponse {
  isFinish: boolean
  accuracy: number
  knowledge_list: IKnowledgeList[]
}
