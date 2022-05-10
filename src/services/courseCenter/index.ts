import apiHandle from '@/utils/request'
import { PREFIX_URL_V1 } from '@/constants'
import {
  IcourseCenterRequest,
  IcourseCenterResponse,
  joinClassRequest,
  joinClassResponse
} from './types'

export default {
  getList: apiHandle<IcourseCenterRequest, IcourseCenterResponse>({
    method: 'GET',
    url: `${PREFIX_URL_V1}courseCenter/getCourseList`
  }),
  joinClass: apiHandle<joinClassRequest, joinClassResponse>({
    method: 'POST',
    url: `${PREFIX_URL_V1}student/class`
  })
}
