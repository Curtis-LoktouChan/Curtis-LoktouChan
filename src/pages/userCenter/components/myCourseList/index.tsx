import { history } from 'umi'
import { FC, useState, useEffect } from 'react'
import { Card, Row, Col, Space, message, Tag, Avatar, Popconfirm } from 'antd'
import { useRequest } from 'ahooks'
import { PlusOutlined, SettingOutlined, EyeOutlined, DeleteOutlined } from '@ant-design/icons'
import { useSelector, useDispatch } from 'dva'

import styles from './index.less'
import { UserCenterServices } from '@/services'
import { ACTIONS } from '@/models'
import addClass from '@/assets/userCenter/addClass.png'

const myCourseList: FC = () => {
  const user = useSelector((state: any) => state.user)
  const dispatch = useDispatch()
  const [update, setUpdate] = useState(0) // 用于触发页面刷新
  // 获取课程列表请求
  const { data: courseListData, run: runGetTeacherClassList } = useRequest(
    UserCenterServices.getTeacherCourseList,
    {
      manual: true,
      onSuccess: (res) => {
        console.log(res)
        return
      }
    }
  )
  // 删除课程请求
  const { run: runDeleteCourse } = useRequest(UserCenterServices.deleteCourse, {
    manual: true,
    onSuccess: () => {
      message.success('删除成功')
      setUpdate(update + 1) // 删除完成刷新页面
    },
    onError: () => {
      alert('删除失败')
    }
  })

  // 渲染时获取
  useEffect(() => {
    runGetTeacherClassList()
  }, [update])

  // 删除课程回调
  const handleDeleteClass = (ID: number) => {
    runDeleteCourse({ courseID: ID })
  }
  //进入课程
  const handleEnterCourse = (courseInfo: any) => {
    console.log(courseInfo)
    dispatch({
      type: ACTIONS.userCenter.saveCourseInfo,
      payload: {
        courseID: courseInfo.ID,
        courseTitle: courseInfo.title,
        courseIntro: courseInfo.introduction
      }
    })
    history.push('./enterCourse')
  }

  return (
    <>
      <div style={{ padding: '0px 10px' }}>
        <Row gutter={16}>
          <Col span={6}>
            <Card
              hoverable
              size="small"
              cover={<img alt="example" src={addClass} />}
              onClick={() => {
                history.push('./createCourse')
              }}
            >
              <h1 style={{ textAlign: 'center', color: '#1890ff' }}>
                点击新建课程
                <PlusOutlined />
              </h1>
            </Card>
          </Col>
          {courseListData?.course_list.map((course_list, index) => {
            return (
              <Col key={`${course_list.ID}${index}`} span={6}>
                <Card
                  hoverable
                  size="small"
                  cover={
                    <img
                      alt="example"
                      src={
                        course_list.img
                          ? `http://42.192.82.19:50000${course_list.img}`
                          : 'https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png'
                      }
                      onClick={() => {
                        handleEnterCourse(course_list)
                      }}
                    />
                  }
                  key={course_list.ID}
                  actions={[
                    <Space
                      key={`${course_list.ID}${index}2`}
                      onClick={() => {
                        dispatch({
                          type: ACTIONS.userCenter.saveCourseInfo,
                          payload: { courseID: course_list.ID }
                        })
                        history.push('./edictCourseInfo')
                      }}
                    >
                      <EyeOutlined />
                      修改信息
                    </Space>,
                    <Popconfirm
                      key={`${course_list.ID}${index}3`}
                      title={`确认删除班级${course_list.title}吗？`}
                      onConfirm={() => {
                        handleDeleteClass(course_list.ID)
                      }}
                    >
                      <DeleteOutlined />
                      删除课程
                    </Popconfirm>
                  ]}
                >
                  <Card.Meta
                    avatar={
                      <Avatar
                        style={{ backgroundColor: '#1296db', verticalAlign: 'middle' }}
                        size="large"
                      >
                        {user.userInfo?.username}
                      </Avatar>
                    }
                    title={
                      <span>
                        {course_list.title}
                        <Tag style={{ float: 'right' }} color="blue">
                          自适应学习
                        </Tag>
                      </span>
                    }
                    description={course_list.introduction}
                  />
                </Card>
              </Col>
            )
          })}
        </Row>
      </div>
      <div style={{ height: '400px', backgroundColor: 'white' }}></div>
    </>
  )
}

export default myCourseList
