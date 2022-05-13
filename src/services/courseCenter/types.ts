export interface IcourseCenterRequest {
  searchText?: string
  pageNum: number
  pageSize: number
}

interface IcourseCenterShowData {
  id: number
  username: string
  classBrief: string
  name: string
  created_at: string
}

export interface IourseCenterResponse {
  courseList: IcourseCenterShowData[]
  total: number
}
export interface joinClassRequest {
  classID: number
  invitePwd: string
}
export interface joinClassResponse {
  msg: string
}
