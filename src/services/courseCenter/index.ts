import apiHandle from '@/utils/request'
import { PREFIX_URL_V1 } from '@/constants'
import {
  IcourseCenterRequest,
  IcourseCenterResponse,
  joinClassRequest,
  joinClassResponse,
  IcourseCenterBySearchReq,
  IcourseCenterBySearchRes
} from './types'

export default {
  getListByPage: apiHandle<IcourseCenterRequest, IcourseCenterResponse>({
    method: 'GET',
    url: `${PREFIX_URL_V1}courseCenter/getCourseListByPageNum`
  }),
  joinClass: apiHandle<joinClassRequest, joinClassResponse>({
    method: 'POST',
    url: `${PREFIX_URL_V1}student/class`
  }),
  getListBySearch: apiHandle<IcourseCenterBySearchReq, IcourseCenterBySearchRes>({
    method: 'GET',
    url: `${PREFIX_URL_V1}courseCenter/getCourseListBySearch`
  })
}
