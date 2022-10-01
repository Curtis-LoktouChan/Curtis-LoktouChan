import apiHandle from '@/utils/request'
import { PREFIX_URL_V1 } from '@/constants'
import { ICourseListRes, ICourseListReq, IJoinClassReq, IJoinClassRes } from './types'

export default {
  //获取课程列表
  getCourseList: apiHandle<ICourseListReq, ICourseListRes>({
    method: 'GET',
    url: `${PREFIX_URL_V1}courseCenter/getCourseList`
  }),
  //加入班级
  joinClass: apiHandle<IJoinClassReq, IJoinClassRes>({
    method: 'POST',
    url: `${PREFIX_URL_V1}student/class`
  })
}
