import { history } from 'umi'
import { FC, useState, useEffect } from 'react'
import { Card, Row, Col, Space, Tag, Avatar, Modal, Form, Input } from 'antd'
import { useRequest } from 'ahooks'
import { PlusOutlined, EyeOutlined } from '@ant-design/icons'
import { useSelector, useDispatch } from 'dva'

import styles from './index.less'
import { UserCenterServices } from '@/services'
import { ACTIONS } from '@/models'
import addClass from '@/assets/userCenter/addClass.png'

const myClassList: FC = () => {
  const user = useSelector((state: any) => state.user)
  const [joinClass] = Form.useForm<any>()
  const [joinClassModalVisible, setJoinClassModalVisible] = useState(false)
  const dispatch = useDispatch()
  const [update, setUpdate] = useState(0)
  // 学生获取班级列表
  const { data: studentClassList, run: runGetStudentClassList } = useRequest(
    UserCenterServices.getStudentClassList,
    {
      manual: true,
      onSuccess: () => {
        return
      }
    }
  )
  // 加入班级
  const { run: runJoinClass } = useRequest(UserCenterServices.studentJoinClass, {
    manual: true,
    onSuccess: () => {
      setUpdate(update + 1)
    }
  })

  // 获取班级信息
  useEffect(() => {
    runGetStudentClassList()
  }, [update])

  // 进入班级
  const handleEnterClass = (classInfo: any) => {
    // 保存班级信息，进入班级显示
    dispatch({
      type: ACTIONS.userCenter.saveClassInfo,
      payload: {
        className: classInfo.name,
        classID: classInfo.ID,
        adaptiveLearningSubject: classInfo.selfStudySubject,
        classBrief: classInfo.classBrief,
        invitePwd: classInfo.invitePwd
      }
    })
    if (classInfo.selfStudySubject === '') {
      // 不是自适应学习课程直接进入班级
      history.push('/userCenter/student/enterClass')
    } else {
      // 进入自适应学习
      history.push('/userCenter/adaptiveLearning/introduction')
    }
  }

  // 关闭对话框，加入班级
  const handleJoinClass = () => {
    const classID = parseInt(joinClass.getFieldValue('className'))
    const invitePwd = joinClass.getFieldValue('invitePwd').toString() || ''
    setJoinClassModalVisible(false)
    runJoinClass({
      classID,
      invitePwd
    })
  }

  return (
    <div className={styles.myClassListContainer}>
      <Row gutter={16}>
        <Col span={6}>
          <Card
            hoverable
            size="small"
            cover={<img alt="example" src={addClass} />}
            onClick={() => {
              setJoinClassModalVisible(true)
            }}
          >
            <h1 style={{ textAlign: 'center', color: '#1890ff' }}>
              加入班级
              <PlusOutlined />
            </h1>
          </Card>
        </Col>
        {studentClassList?.allClassList.map((classInfo, index) => {
          return (
            <Col key={`${classInfo.ID}${index}`} span={6}>
              <Card
                hoverable
                size="small"
                cover={
                  <img
                    alt="example"
                    src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                  />
                }
                onClick={() => {
                  handleEnterClass(classInfo)
                }}
                key={classInfo.ID}
                actions={[
                  <Space
                    onClick={() => {
                      handleEnterClass(classInfo)
                    }}
                  >
                    <EyeOutlined />
                    进入班级
                  </Space>
                ]}
              >
                <Card.Meta
                  avatar={
                    <Avatar
                      style={{ backgroundColor: '#1296db', verticalAlign: 'middle' }}
                      size="large"
                    >
                      {user?.userInfo?.username}
                    </Avatar>
                  }
                  title={
                    <span>
                      {classInfo.name}
                      {classInfo.selfStudySubject !== '' ? (
                        <Tag style={{ float: 'right' }} color="blue">
                          自适应学习
                        </Tag>
                      ) : null}
                    </span>
                  }
                  description={classInfo.classBrief}
                />
              </Card>
            </Col>
          )
        })}
      </Row>
      <Modal
        title="请输入班级ID和邀请码（如不需要邀请码可以不输入）"
        centered
        visible={joinClassModalVisible}
        onOk={handleJoinClass}
        onCancel={() => setJoinClassModalVisible(false)}
        okText="加入"
        cancelText="取消"
      >
        <Form layout="vertical" form={joinClass}>
          <Form.Item
            label="班级ID"
            name="className"
            rules={[{ required: true, message: '输入班级ID' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item label="邀请码" name="invitePwd" initialValue="">
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}

export default myClassList
