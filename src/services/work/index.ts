import apiHandle from '@/utils/request'
import { IBaseResp } from '@/utils/types'
import { IWorkResponse } from './types'

export default {
  getWorks: apiHandle<null, IBaseResp<IWorkResponse>>({
    method: 'GET', // TODO json-server mock
    url: 'getWorks'
  })
}
