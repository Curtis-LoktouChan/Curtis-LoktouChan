import apiHandle from '@/utils/request'
import { IWorkListResponse } from './types'

export default {
  getWorks: apiHandle<null, IWorkListResponse>({
    method: 'GET', // TODO json-server mock
    url: 'api/v1/projectFilesList'
  })
}
