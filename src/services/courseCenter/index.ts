import apiHandle from '@/utils/request'

import {
  IcourseCenterRequest,
  IcourseCenterResponse,
  joinClassRequest,
  joinClassResponse
} from './types'

export default {
  getList: apiHandle<IcourseCenterRequest, IcourseCenterResponse>({
    method: 'GET',
    url: 'api2'
  }),
  joinClass: apiHandle<joinClassRequest, joinClassResponse>({
    method: 'GET',
    url: 'api'
  })
}
