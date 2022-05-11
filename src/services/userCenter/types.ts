// 教师班级信息
interface ITeacherClassList {
  ID: number
  CreatedAt: string
  UpdateAt: string
  name: string
  uuid: string
  invitePwd: string
  users: null
  selfStudySubject: string | undefined
  classBrief: string
  own_id: number
}

// 一个班级成员的信息
interface IClassMember {
  uuid: string
  username: string
  nickName: string
  telephone: string
  email: string
  roleId: string
}

// 学生班级信息
interface IStudentClassInfo {
  ID: number
  CreatedAt: string
  UpdatedAt: string
  name: string
  uuid: string
  selfStudySubject: string
  classBrief: string
}

// 小节信息
interface ISection {
  sectionType: string
  sectionTitle: string
  classID: number
  chapterID: number
}

// 课程信息
interface ICourseInfo {
  ID: number
  CreateAt: string
  UpdateAt: string
  chapterTitle: string
  chapterDiscription: string
  classID: number
  Sections: ISection[]
}

// 获取课程信息响应
export type CoursesInfo = ICourseInfo[]

// 教师获取班级列表
export interface ITeacherClassListResponse {
  classList: ITeacherClassList[]
}

// 教师新建班级
export interface ICreateClass {
  name: string
  invitePwd: string | undefined
  classBrief: string
}

// 批量添加学生
export interface IAddStudents {
  className: string
  newStudentNum: number
}

// 获取班级成员响应
export interface IGetClassMembersResponse {
  classMembers: IClassMember[]
}

// 撤销学生选课请求
export interface IDeleteStudent {
  className: string
  StudentUserName: string
}

// 更新学生信息
export interface IUpdateStudentInfo {
  username: string
  telephone: string
  nickName: string
}

// 学生获取班级列表响应
export interface IGetStudentClassListResponse {
  allClassList: IStudentClassInfo[]
}

// 学生加入班级
export interface IStudentJoinClass {
  classID: number
  invitePwd: string
}
