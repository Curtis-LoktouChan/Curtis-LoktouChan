import { FC, useEffect } from 'react'
import { Collapse, Row, Col, Button, Popconfirm, message } from 'antd'
import { EyeTwoTone, DeleteTwoTone, EditTwoTone } from '@ant-design/icons'
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

  // 提示信息
  const weAreTrying = () => {
    message.info('正在完善中')
  }

  return (
    <Collapse style={{ width: '100%', backgroundColor: 'white' }}>
      {courses?.map((course: any) => {
        return (
          <Collapse.Panel header={course.chapterTitle} key={course.ID}>
            <strong>章节概况：</strong>
            {course.chapterDiscription}
            {course?.sections?.map((section: any, index: number) => {
              return (
                <Row
                  align="middle"
                  style={{
                    height: '50px',
                    border: '1px solid #d9d9d9d9',
                    marginBottom: '4px'
                  }}
                >
                  <Col
                    style={{
                      borderLeft: '5px solid #1890ff70',
                      height: '50px'
                    }}
                    span={2}
                  >
                    <p style={{ lineHeight: '50px', margin: 'auto', textAlign: 'center' }}>
                      {index + 1}
                    </p>
                  </Col>
                  <Col span={1}>{section.sectionType === '试题' ? <></> : <></>}</Col>
                  <Col span={2}>{section.sectionType}</Col>
                  <Col span={10}>
                    <strong>标题: &nbsp;</strong>
                    {section.sectionTitle}
                  </Col>
                  <Col span={3}>
                    <Button icon={<EyeTwoTone />} onClick={weAreTrying}>
                      浏览
                    </Button>
                  </Col>
                  <Col span={3}>
                    {section.sectionType === '试题' ? (
                      <Button icon={<EditTwoTone />} onClick={weAreTrying}>
                        修改
                      </Button>
                    ) : (
                      <Button icon={<EditTwoTone />} onClick={weAreTrying}>
                        编辑
                      </Button>
                    )}
                  </Col>

                  <Col span={3}>
                    <Popconfirm
                      title="确定删除吗(不可恢复)？"
                      okText="是"
                      cancelText="否"
                      onConfirm={weAreTrying}
                    >
                      <Button icon={<DeleteTwoTone />}>删除</Button>
                    </Popconfirm>
                  </Col>
                </Row>
              )
            })}
          </Collapse.Panel>
        )
      })}
    </Collapse>
  )
}

export default ClassMembers
