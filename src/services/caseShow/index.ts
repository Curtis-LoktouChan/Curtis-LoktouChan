import apiHandle from '@/utils/request'
import { ICaseShowRequest, ICaseShowResponse } from './types'

export default {
  getList: apiHandle<ICaseShowRequest, ICaseShowResponse>({
    method: 'GET',
    url: 'api1'
  })
}
