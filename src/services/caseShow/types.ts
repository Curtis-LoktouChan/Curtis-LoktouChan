export interface ICaseShowSearchRequest {
  searchText?: string
  pageSize?: number
  pageNum?: number
}

export interface ICaseShowByIdRequest {
  case_id: string
}

//getmycase
export interface IGetMyCaseRequest {
  pageNum?: number
  pageSize?: number
  searchText?: string
  isMyCase?: boolean
  flag?: string
  caseClass?: string
}

interface IcaseList {
  ID: number
  caseTitle: string
  caseDiscription: string
  autor: string
  created_at: string
  case_class: string
}

export interface IGetMyCaseResponse {
  caseList: IcaseList[]
  total: number
}

//getmycasebysearch
export interface ICaseShowReByIdsponse {
  ID: string
  CreateAt: string
  UpdateAt: string
  caseTitle: string
  caseDiscription?: string
  caseContent: string
  fileName: string
  url: string
  author: string
  case_class: string
}

export interface IDownloadCaseRequest {
  url: string
}

export interface IDownloadCaseResponse {
  fileContent: string
}

interface ICaseShowData {
  ID: string
  caseTitle: string
  caseDiscription?: string
  author: string
  created_at: string
}

export interface ICaseShowResponse {
  caseList: ICaseShowData[]
  total: number
  hasmore: boolean
}

export interface IPublishRequest {
  file?: string
  caseClass: string
  caseTitle: string
  caseDiscription: string
  caseContent: string
}

export interface IDeleteRequest {
  caseID: number
}

export interface ICaseShowSearchByClassRequest {
  caseClass?: string
  pageSize?: number
  pageNum?: number
  searchText?: string
}

export interface ICaseShowByPageNumReq {
  pageNum?: number
  pageSize?: number
  searchText?: string
}

interface ICaseClassList {
  ID?: number
  created_at?: string
  UpdatedAt?: string
  caseClass?: string
}
export interface ICaseClassListRes {
  caseClassList: ICaseClassList[]
}
