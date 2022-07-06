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

const myClassList: FC = () => {
  const user = useSelector((state: any) => state.user)
  const dispatch = useDispatch()
  const [update, setUpdate] = useState(0) // 用于触发页面刷新
  // 获取班级列表请求
  const { data: classListData, run: runGetTeacherClassList } = useRequest(
    UserCenterServices.getTeacherClassList,
    {
      manual: true,
      onSuccess: () => {
        return
      }
    }
  )
  // 删除班级请求
  const { run: runDeleteClass } = useRequest(UserCenterServices.deleteClass, {
    manual: true,
    onSuccess: () => {
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

  // 删除班级回调
  const handleDeleteClass = (name: number) => {
    // runDeleteClass({ classID: name })
    // 先用着，找到其他方法再改
    fetch(`http://42.192.82.19:50000/api/v1/teacher/class?classID=${name}`, {
      method: 'DELETE',
      headers: {
        Authorization: localStorage.getItem('login_token')!
      }
    })
      .then((res) => {
        setUpdate(update + 1)
      })
      .catch((err) => {
        console.log(err)
      })
  }

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
      history.push('./enterClass')
    } else {
      // 进入自适应学习
      history.push('/userCenter/adaptiveLearning/introduction')
    }
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
                history.push('./createClass')
              }}
            >
              <h1 style={{ textAlign: 'center', color: '#1890ff' }}>
                点击新建班级
                <PlusOutlined />
              </h1>
            </Card>
          </Col>
          {classListData?.classList?.map((classInfo, index) => {
            return (
              <Col key={`${classInfo.ID}${index}`} span={6}>
                <Card
                  hoverable
                  size="small"
                  cover={
                    <img
                      alt="example"
                      src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                      onClick={() => {
                        handleEnterClass(classInfo)
                      }}
                    />
                  }
                  key={classInfo.ID}
                  actions={[
                    <Space
                      key={`${classInfo.ID}${index}1`}
                      onClick={() => {
                        message.info('功能尚未开放')
                      }}
                    >
                      <SettingOutlined />
                      设置
                    </Space>,
                    <Space
                      key={`${classInfo.ID}${index}2`}
                      onClick={() => {
                        handleEnterClass(classInfo)
                      }}
                    >
                      <EyeOutlined />
                      进入班级
                    </Space>,
                    <Popconfirm
                      key={`${classInfo.ID}${index}3`}
                      title={`确认删除班级${classInfo.name}吗？`}
                      onConfirm={() => {
                        handleDeleteClass(classInfo.ID)
                      }}
                    >
                      <DeleteOutlined />
                      删除班级
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
      </div>
      <div style={{ height: '400px', backgroundColor: 'white' }}></div>
    </>
  )
}

export default myClassList
