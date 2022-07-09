//分页
export interface IcourseCenterRequest {
  searchText?: string
  pageNum: number
  pageSize: number
}

export interface IcourseCenterShowData {
  id: number
  username: string
  classBrief: string
  name: string
  created_at: string
}

export interface IcourseCenterResponse {
  courseList: IcourseCenterShowData[]
  total: number
}
//加入班级
export interface joinClassRequest {
  classID: number
  invitePwd: string
}
export interface joinClassResponse {
  msg: string
}
//搜索
export interface IcourseCenterBySearchReq {
  pageNum: number
  pageSize: number
  searchText: string
}
export interface IcourseCenterBySearchRes {
  courseList: IcourseCenterShowData[]
  total: number
}
