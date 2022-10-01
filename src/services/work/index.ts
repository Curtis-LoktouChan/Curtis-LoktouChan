import apiHandle from '@/utils/request'
import { IBaseResp } from '@/utils/types'
import {
  IWorkListByPageResponse,
  IWorkListItemByPageRequest,
  deleteWorkReq,
  downloadWorkRes,
  downloadWorkReq,
  IWorkListBySearchRequest,
  IWorkListBySearchResponse,
  uploadWorkReq
} from './types'
import { PREFIX_URL_V1 } from '@/constants'

export default {
  //通过分页查询
  getWorksByPage: apiHandle<IWorkListItemByPageRequest, IWorkListByPageResponse>({
    method: 'GET',
    url: `${PREFIX_URL_V1}getProjectFilesListByPageNum`
  }),
  //通过搜索查询
  getWorksBySearch: apiHandle<IWorkListBySearchRequest, IWorkListBySearchResponse>({
    method: 'GET',
    url: `${PREFIX_URL_V1}getProjectFilesListBySearch`
  }),
  //下载作品
  downloadWork: apiHandle<downloadWorkReq, downloadWorkRes>({
    method: 'GET',
    url: `${PREFIX_URL_V1}projectFiles`
  }),
  //删除作品
  deleteWork: apiHandle<deleteWorkReq, IBaseResp>({
    method: 'DELETE',
    url: `${PREFIX_URL_V1}projectFiles`
  }),
  //上传作品
  uploadWork: apiHandle<uploadWorkReq, null>({
    method: 'POST',
    url: `${PREFIX_URL_V1}projectFiles`
  })
}
