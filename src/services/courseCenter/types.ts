export interface IcourseCenterRequest {
  searchCourse?: string
  page?: number
  token?: string | null
}

interface IcourseCenterShowData {
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
export interface joinClassRequest {
  classID: number
  invitePwd: string
}
export interface joinClassResponse {
  msg: string
}
