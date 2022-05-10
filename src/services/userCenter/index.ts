import apiHandle from '@/utils/request'
import {
  ITeacherClassListResponse,
  ICreateClass,
  IAddStudents,
  IGetClassMenbersResponse,
  IDeleteStudent,
  IUpdateStudentInfo,
  IGetStudentClassListResponse,
  IStudentJoinClass,
  CoursesInfo
} from './types'
import { PREFIX_URL_V1 } from '@/constants'

export default {
  // 教师获取班级列表请求
  getTeacherClassList: apiHandle<null, ITeacherClassListResponse>({
    method: 'GET',
    url: `${PREFIX_URL_V1}teacher/class`
  }),
  // 教师删除班级
  deleteClass: apiHandle<string, null>({
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
  getClassMenbers: apiHandle<string, IGetClassMenbersResponse>({
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
  getCourseInfo: apiHandle<string, CoursesInfo>({
    method: 'PUT',
    url: `${PREFIX_URL_V1}teacher/studentList`
  }),
  // 学生获取班级列表
  getStudentClassList: apiHandle<null, IGetStudentClassListResponse>({
    method: 'GET',
    url: `${PREFIX_URL_V1}student/class`
  }),
  // 学生加入班级
  studentJoinClass: apiHandle<IStudentJoinClass, null>({
    method: 'POST',
    url: `${PREFIX_URL_V1}student/class`
  })
}
