import apiHandle from '@/utils/request'
import { IcourseCenterRequest, IcourseCenterResponse } from './types'

export default {
  getList: apiHandle<IcourseCenterRequest, IcourseCenterResponse>({
    method: 'GET',
    url: 'api2'
  })
}
