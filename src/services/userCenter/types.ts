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
  ID: number
  sectionType: string
  sectionTitle: string
  classID: number
  chapterID: number
}

// 课程信息
export interface ICourseInfo {
  ID: number
  CreateAt: string
  UpdateAt: string
  chapterTitle: string
  chapterDiscription: string
  classID: number
  sections: ISection[]
}
//我的作品
interface IMYWork {
  id: number
  CreatedAt: string
  UpdatedAt: string
  projectName: string
}

// 获取课程信息响应
export type CoursesInfo = ICourseInfo[]
//获取课程信息请求
export interface CoursesInfoReq {
  classID: string
}

// 教师删除班级
export interface ITeacherDeleteClassReq {
  classID: number
}

// 教师获取班级列表
export interface ITeacherClassListResponse {
  classList: ITeacherClassList[]
}

// 教师新建班级
export interface ICreateClass {
  name: string
  invitePwd: string | undefined
  classBrief: string
  selfStudySubject?: string
}

// 批量添加学生
export interface IAddStudents {
  classID: number
  newStudentNum: number
  prefixName: string
}

// 获取班级成员响应
// export interface IGetClassMembersResponse {
//   classMembers: IClassMember[]
// }
export type IGetClassMembersResponse = IClassMember[]

// 撤销学生选课请求
export interface IDeleteStudent {
  className: string
  studentUserName: string
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
//学习内容
interface IStudentRes {
  ID: number
  CreatedAt: string
  UpdateAt: string
  sectionType: string
  sectionTitle: string
  sectionContent: string
  classID: number
  chapterID: number
}
export interface IStudentSectionRes {
  data: IStudentRes
}
export interface IStudentSectionReq {
  classID: number
  chapterID: number
  sectionID: number
}
//学生做题
export interface IStudentQuestionReq {
  classID: number
  chapterID: number
  sectionID: number
}
interface IStudentQuestin {
  sectionTitle: string
  exams: object
}
export interface IStudentQuestionRes {
  data: IStudentQuestin
}
// 添加章节请求
export interface IAddChapterRequest {
  chapterDiscription: string
  chapterTitle: string
  classID: number
}

// 编辑章节请求
export interface IUpdateChapterRequest {
  chapterDiscription: string
  chapterID: number
  chapterTitle: string
  classID: number
}

// 删除章节请求
export interface IDeleteChapterRequest {
  chapterID: number
  classID: number
}

// 添加课程小节请求
export interface IAddSectionRequest {
  classID: number
  chapterID: number
  sectionTitle: string
  sectionContent: string
  sectionType: string
}
