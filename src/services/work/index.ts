import apiHandle from '@/utils/request'
import { IWorkListResponse } from './types'
import { PREFIX_URL_V1 } from '@/constants'

export default {
  getWorks: apiHandle<null, IWorkListResponse>({
    method: 'GET',
    url: `${PREFIX_URL_V1}projectFilesList`
  })
}
