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
export interface IStudentClassInfo {
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
export interface ITeacherDeleteClassRes {
  code: number
}
// 教师获取班级列表
export interface ITeacherClassListResponse {
  classList: ITeacherClassList[]
}

// 教师新建班级
export interface ICreateClass {
  name: string
  invitePwd: string
  classBrief: string
  selfStudySubject?: string
  courseID: number
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
  studentUsername: string
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
//通过邀请码搜索的列表响应
export interface IGetStudentClassListBySearchResponse {
  classList: IStudentClassInfo[]
}
// 学生加入班级
export interface IStudentJoinClassReq {
  classID: number
  invitePwd: string
}
export interface IStudentJoinClassRes {
  code: number
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
  sectionType: string
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

// 教师删除章节信息
export interface IOperateSection {
  sectionID: number
  chapterID: number
  classID: number
}

// 学生和教师获取小节
export interface IGetSectionRequest {
  sectionID: number
  chapterID: number
  classID: number
  sectionType: string
}

// 编辑小节信息
export interface ISectionInformation {
  sectionContent: string
}

// 编辑小节请求
export interface IEditorSectionRequest {
  chapterID: number
  classID: number
  sectionContent: string
  sectionID: number
  sectionTitle: string
  sectionType: string
}
//学生通过邀请码获取班级请求
export interface IStudentClassListByinvitePwdReq {
  invitePwd?: string
}
//老师新建课程
export interface ITeacherCreateCourseReq {
  title: string
  introduction: string
  outline: string
  img: string
}
//老师获取课程列表
interface courseList {
  ID: number
  CreatedAt: string
  UpdatedAt: string
  title: string
  introduction: string
  outline: string
  img: string
  author: string
  classes: null
  courseType: string
}
export interface ITeacherCourseListRes {
  course_list: courseList[]
}
//老师删除课程
export interface ITeacherDeleteCourseReq {
  courseID: number
}
//老师获取课程班级
export interface ITeacherCourseClassReq {
  courseID: number
}
interface courseClass {
  id: number
  name: string
  nums: number
  author: string
  invitePwd: string
}
export interface ITeacherCourseClassRes {
  class_list: courseClass[]
}
//获取课程具体信息
export interface ITeacherGetCourseMsgReq {
  course_id: number
}
interface ITeacherGetCourseMsg {
  section_info: { content: { imgSrc: string; introduction: string; text: string }; title: string }
}
export interface ITeacherGetCourseMsgRes {
  course: ITeacherGetCourseMsg[]
}
//更新课程信息
export interface ITeacherUpdateCourseReq {
  courseID: number
  newTitle: string
  newIntroduction: string
  newImg: string
  newOutline: string
}
