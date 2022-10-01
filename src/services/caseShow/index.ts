import apiHandle from '@/utils/request'
import { IBaseResp } from '@/utils/types'
import {
  ICaseShowSearchRequest,
  ICaseShowResponse,
  ICaseShowByIdRequest,
  IPublishRequest,
  ICaseShowReByIdsponse,
  IDownloadCaseRequest,
  IGetMyCaseRequest,
  IGetMyCaseResponse,
  IDeleteRequest,
  ICaseShowSearchByClassRequest,
  IDownloadCaseResponse,
  ICaseShowByPageNumReq,
  ICaseClassListRes
} from './types'
import { PREFIX_URL_V1 } from '@/constants'

//根据标题获取案例
export default {
  getCaseListBySearch: apiHandle<ICaseShowSearchRequest, ICaseShowResponse>({
    method: 'GET',
    url: `${PREFIX_URL_V1}caseShow/getCaseListBySearch`
  }),

  //通过页码获取案例
  getCaseListByPageNum: apiHandle<ICaseShowByPageNumReq, ICaseShowResponse>({
    method: 'GET',
    url: `${PREFIX_URL_V1}caseShow/getCaseListByPageNum`
  }),

  //根据分类获取案例
  getCaseListByCaseClass: apiHandle<ICaseShowSearchByClassRequest, ICaseShowResponse>({
    method: 'GET',
    url: `${PREFIX_URL_V1}caseShow/getCaseByClassPageNum`
  }),

  //获取类别列表
  getCaseClass: apiHandle<null, ICaseClassListRes>({
    method: 'GET',
    url: `${PREFIX_URL_V1}caseShow/getCaseCategoryList`
  }),

  //获取我的案例
  getMyCase: apiHandle<IGetMyCaseRequest, IGetMyCaseResponse>({
    method: 'GET',
    url: `${PREFIX_URL_V1}caseShow/getMyCase`
  }),

  //根据ID获取案例
  getListById: apiHandle<ICaseShowByIdRequest, ICaseShowReByIdsponse>({
    method: 'GET',
    url: `${PREFIX_URL_V1}caseShow/getCaseById`
  }),

  //发布案例
  publishCase: apiHandle<IPublishRequest, IBaseResp>({
    method: 'POST',
    url: `${PREFIX_URL_V1}caseShow/publishCase`
  }),

  //更新案例
  updateCase: apiHandle<IPublishRequest, IBaseResp>({
    method: 'PUT',
    url: `${PREFIX_URL_V1}caseShow/updateCase`
  }),

  //下载案例文件
  downloadCaseFile: apiHandle<IDownloadCaseRequest, IDownloadCaseResponse>({
    method: 'GET',
    url: `${PREFIX_URL_V1}caseShow/downloadCaseFile`
  }),

  //删除案例
  deleteCase: apiHandle<IDeleteRequest, IBaseResp>({
    method: 'DELETE',
    url: `${PREFIX_URL_V1}caseShow/deleteMyCase`
  })
}
