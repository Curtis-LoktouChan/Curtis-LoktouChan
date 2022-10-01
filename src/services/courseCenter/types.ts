//课程列表信息
export interface courseList {
  id: number
  created_at: string
  Title: string
  introduction: string
  Author: string
  outline: string
  courseType: string
  img: string
}
export interface ICourseListRes {
  courseList: courseList[]
  total: number
}
export interface ICourseListReq {
  pageNum: number
  pageSize: number
  searchText: string
  flag: string
}
//加入班级
export interface IJoinClassReq {
  classID: number
  invitePwd: string
}
export interface IJoinClassRes {
  code: number
  msg: string
}
