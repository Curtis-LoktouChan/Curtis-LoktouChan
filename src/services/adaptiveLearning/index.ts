import apiHandle from '@/utils/request'
import {
  ISubmitExam,
  IGetKnowledgeResponse,
  IExamListResponse,
  ISubmitAnswerResponse,
  IUnitTestResponse,
  IGetKnowledgeRequest
} from './types'
import { PREFIX_URL_V1 } from '@/constants'

export default {
  // 开始学习请求
  getExamList: apiHandle<string, IExamListResponse>({
    method: 'GET',
    url: `${PREFIX_URL_V1}selfAdapt/getExam`
  }),
  // 获取知识点进行学习
  getKnowledge: apiHandle<IGetKnowledgeRequest, IGetKnowledgeResponse>({
    method: 'POST',
    url: `${PREFIX_URL_V1}selfAdapt/getCourse`
  }),
  // 小节测试
  unitTest: apiHandle<IGetKnowledgeRequest, IUnitTestResponse>({
    method: 'POST',
    url: `${PREFIX_URL_V1}selfAdapt/getExamByKnowledge`
  }),
  // 提交答案
  submitAnswers: apiHandle<ISubmitExam, ISubmitAnswerResponse>({
    method: 'POST',
    url: `${PREFIX_URL_V1}selfAdapt/submitExam`
  })
}
