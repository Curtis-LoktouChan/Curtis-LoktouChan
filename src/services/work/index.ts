import apiHandle from '@/utils/request'
import { IWorkListResponse, deleteWorkReq, downloadWorkRes, downloadWorkReq } from './types'
import { PREFIX_URL_V1 } from '@/constants'

export default {
  getWorks: apiHandle<null, IWorkListResponse>({
    method: 'GET',
    url: `${PREFIX_URL_V1}projectFilesList`
  }),
  //下载作品
  downloadWork: apiHandle<downloadWorkReq, downloadWorkRes>({
    method: 'GET',
    url: `${PREFIX_URL_V1}projectFiles`
  }),
  //删除作品
  deleteWork: apiHandle<deleteWorkReq, null>({
    method: 'DELETE',
    url: `${PREFIX_URL_V1}projectFiles`
  })
}
