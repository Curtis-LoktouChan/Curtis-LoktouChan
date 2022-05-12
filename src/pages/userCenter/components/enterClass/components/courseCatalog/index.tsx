import { FC, useEffect } from 'react'
import { Collapse } from 'antd'
import { useSelector } from 'dva'
import { useRequest } from 'ahooks'

import styles from './index.less'
import { UserCenterServices } from '@/services'

const ClassMembers: FC = () => {
  const userCenter = useSelector((state: any) => state.userCenter)
  // 获取班级成员列表数据
  const { data: courses, run: runGetCourses } = useRequest(UserCenterServices.getCourseInfo, {
    manual: true,
    onSuccess: () => {
      return
    }
  })

  // 组件挂载即请求课程数据
  useEffect(() => {
    runGetCourses({ classID: userCenter?.classID?.toString() })
  }, [])

  return (
    <Collapse style={{ width: '100%' }}>
      {courses?.map((course: any) => {
        return (
          <Collapse.Panel header={course.chapterTitle} key={course.ID}>
            <strong>章节概况</strong>
            {course?.Sections?.map((section: any) => {
              return <div key={section.chapterID}>{section.sectionTitle}</div>
            })}
          </Collapse.Panel>
        )
      })}
    </Collapse>
  )
}

export default ClassMembers
