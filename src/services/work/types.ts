//分页查询
export interface IWorkListItemRes {
  id: number
  CreatedAt: string
  UpdatedAt: string
  projectName: string
}

export interface IWorkListItemByPageRequest {
  pageNum: number
  pageSize: number
  searchText: string
}

export interface IWorkListByPageResponse {
  workList: IWorkListItemRes[]
  total: number
}

//搜索查询
export interface IWorkListBySearchRequest {
  pageNum: number
  pageSize: number
  searchText: string
}

export interface IWorkListBySearchResponse {
  workList: IWorkListItemRes[]
  total: number
}
//下载作品请求
export interface downloadWorkReq {
  projectName: string
}
//下载作品
export interface downloadWorkRes extends Blob {
  fileText: Blob
}
//删除作品请求
export interface deleteWorkReq {
  projectName: string
}
//上传作品
export interface uploadWorkReq {
  file: string
}

//下载作品请求
export interface downloadWorkReq {
  projectName: string
}
//下载作品
export interface downloadWorkRes extends Blob {
  name?: string
  url?: string
}
//删除作品请求
export interface deleteWorkReq {
  projectName: string
}
