import apiHandle from '@/utils/request'
import {
  ITeacherClassListResponse,
  ICreateClass,
  IAddStudents,
  IGetClassMembersResponse,
  IDeleteStudent,
  IUpdateStudentInfo,
  IGetStudentClassListResponse,
  IStudentJoinClass,
  CoursesInfo,
  CoursesInfoReq,
  ITeacherDeleteClassReq
} from './types'
import { PREFIX_URL_V1 } from '@/constants'

export default {
  // 教师获取班级列表请求
  getTeacherClassList: apiHandle<null, ITeacherClassListResponse>({
    method: 'GET',
    url: `${PREFIX_URL_V1}teacher/class`
  }),
  // 教师删除班级
  deleteClass: apiHandle<ITeacherDeleteClassReq, null>({
    method: 'DELETE',
    url: `${PREFIX_URL_V1}teacher/class`
  }),
  // 教师新建班级
  createClass: apiHandle<ICreateClass, null>({
    method: 'POST',
    url: `${PREFIX_URL_V1}teacher/class`
  }),
  // 教师批量添加学生
  addStudents: apiHandle<IAddStudents, null>({
    method: 'GET',
    url: `${PREFIX_URL_V1}teacher/addStudentBatch`
  }),
  // 教师获取班级成员
  getClassMembers: apiHandle<CoursesInfoReq, IGetClassMembersResponse>({
    method: 'GET',
    url: `${PREFIX_URL_V1}teacher/studentList`
  }),
  // 教师撤销学生选课
  deleteStudent: apiHandle<IDeleteStudent, null>({
    method: 'DELETE',
    url: `${PREFIX_URL_V1}teacher/studentList`
  }),
  // 教师更新班级学生信息
  updateStudentInfo: apiHandle<IUpdateStudentInfo, null>({
    method: 'PUT',
    url: `${PREFIX_URL_V1}teacher/studentList`
  }),
  // 获取课程信息
  getCourseInfo: apiHandle<CoursesInfoReq, CoursesInfo>({
    method: 'GET',
    url: `${PREFIX_URL_V1}teacher/getCourseMenu`
  }),
  // 学生获取班级列表
  getStudentClassList: apiHandle<null, IGetStudentClassListResponse>({
    method: 'GET',
    url: `${PREFIX_URL_V1}student/class`
  }),
  // 学生获取课程信息
  getStudentCourseInfo: apiHandle<CoursesInfoReq, CoursesInfo>({
    method: 'GET',
    url: `${PREFIX_URL_V1}student/getCourseMenu`
  }),
  // 学生加入班级
  studentJoinClass: apiHandle<IStudentJoinClass, null>({
    method: 'POST',
    url: `${PREFIX_URL_V1}student/class`
  })
}
