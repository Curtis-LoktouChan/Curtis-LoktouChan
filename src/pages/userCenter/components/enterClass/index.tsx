import { history } from 'umi'
import { FC, useState, useRef, useEffect } from 'react'
import {
  PageHeader,
  Button,
  Layout,
  Menu,
  Descriptions,
  message,
  Modal,
  InputNumber,
  Form,
  Input,
  Space
} from 'antd'
import { useRequest } from 'ahooks'
import {
  BankTwoTone,
  AliwangwangOutlined,
  PlusSquareOutlined,
  LeftCircleTwoTone
} from '@ant-design/icons'
import { useSelector } from 'dva'

import styles from './index.less'
import { UserCenterServices } from '@/services'

const enterClass: FC = (props) => {
  const [isAddStudentsModalVisible, setIsAddStudentsModalVisible] = useState(false) // 添加学生对话框
  const [isAddChapterModalVisible, setIsAddChapterModalVisible] = useState(false) // 添加章节对话框
  const [chapterForm] = Form.useForm(),
    [addStudentForm] = Form.useForm()
  const inputNumberRef = useRef<any>(null)
  const [addChapterFlag, setAddChapterFlag] = useState(0)
  const [addStudentsFlag, setAddStudentsFlag] = useState(0)
  const userCenter = useSelector((state: any) => state.userCenter) // 获取班级信息
  // 批量添加学生
  const { run: runAddStudents } = useRequest(UserCenterServices.addStudents, {
    manual: true,
    onSuccess: () => {
      setAddStudentsFlag(addStudentsFlag + 1)
    }
  })
  // 添加章节
  const { run: runAddChapter } = useRequest(UserCenterServices.addChapter, {
    manual: true,
    onSuccess: () => {
      setAddChapterFlag(addChapterFlag + 1)
    }
  })

  useEffect(() => {
    history.push({
      pathname: '/userCenter/enterClass/classMembers',
      query: {
        addCounts: addStudentsFlag.toString()
      }
    })
  }, [addStudentsFlag])

  useEffect(() => {
    history.push({
      pathname: '/userCenter/enterClass/courseCatalog',
      query: {
        addCounts: addChapterFlag.toString()
      }
    })
  }, [addChapterFlag])

  useEffect(() => {
    history.push('/userCenter/enterClass/courseCatalog')
  }, [])

  // 确认添加学生
  const handleAddStudentOK = async () => {
    try {
      // 校验表单
      await addStudentForm.validateFields()
      runAddStudents({
        classID: userCenter.classID,
        newStudentNum: addStudentForm.getFieldValue('studentNumber'),
        prefixName: addStudentForm.getFieldValue('prefixName')
      })
      addStudentForm.resetFields()
      setIsAddStudentsModalVisible(false)
    } catch (e) {
      console.log(e)
    }
  }

  // 确认添加章节, 接口？
  const handleAddChapterOK = async () => {
    try {
      await chapterForm.validateFields()
      runAddChapter({
        chapterDiscription: chapterForm.getFieldValue('chapterDiscription') ?? '',
        chapterTitle: chapterForm.getFieldValue('chapterTitle'),
        classID: userCenter.classID
      })
      chapterForm.resetFields()
      setIsAddChapterModalVisible(false)
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <Layout className={styles.unitStudyContainer}>
      <PageHeader
        style={{ backgroundColor: '#DDEEFF' }}
        backIcon={<LeftCircleTwoTone />}
        onBack={() => history.goBack()}
        title={userCenter.className}
        subTitle={`班级ID: ${userCenter.classID} 邀请码: ${
          userCenter.invitePwd ? userCenter.invitePwd : '无'
        }`}
        extra={[
          <Button
            shape="round"
            type="primary"
            key="editButton"
            onClick={() => {
              message.info('功能尚未开放')
            }}
          >
            编辑班级
          </Button>,
          <Button
            shape="round"
            type="primary"
            key="addStudentButton"
            onClick={() => {
              setIsAddStudentsModalVisible(true)
            }}
          >
            添加学员
          </Button>,
          <Button
            shape="round"
            type="primary"
            key="addChapterButton"
            onClick={() => {
              setIsAddChapterModalVisible(true)
            }}
          >
            添加章节
          </Button>
        ]}
      >
        <Descriptions size="small">
          <Descriptions.Item label="班级简介">{userCenter.classBrief}</Descriptions.Item>
        </Descriptions>
      </PageHeader>
      <Layout style={{ backgroundColor: 'white' }}>
        <Layout.Sider className={styles.unitStudySider} theme="light">
          <Menu
            defaultSelectedKeys={['myClass']}
            defaultOpenKeys={['sub1']}
            mode="vertical"
            style={{ background: 'white', border: 'none' }}
          >
            <Menu.Item
              className={styles.itemSection}
              icon={<BankTwoTone />}
              key="myClass"
              onClick={() => {
                history.push('/userCenter/enterClass/courseCatalog')
              }}
            >
              课程目录
            </Menu.Item>
            <Menu.Item
              className={styles.itemSection}
              icon={<AliwangwangOutlined />}
              key="myWork"
              onClick={() => {
                history.push('/userCenter/enterClass/classMembers')
              }}
            >
              班级成员
            </Menu.Item>
            <Menu.Item
              className={styles.itemSection}
              icon={<PlusSquareOutlined />}
              key="studentIdentity"
              disabled={true}
              // onClick={() => {history.push('./customerWork')}}
            >
              申请列表
            </Menu.Item>
          </Menu>
        </Layout.Sider>
        {props.children}
      </Layout>
      <div style={{ height: '300px', backgroundColor: 'white' }}></div>
      <Modal
        title="添加学员"
        visible={isAddStudentsModalVisible}
        onOk={handleAddStudentOK}
        onCancel={() => {
          setIsAddStudentsModalVisible(false)
        }}
      >
        <p>
          输入班级人数，系统将自动批量创建相应数量的学员账户。学员使用分配的账户登录后，将自动加入班级。（一个班级最多99个学生。）
        </p>
        <Form form={addStudentForm}>
          <Form.Item>
            <Space
              align="start"
              style={
                {
                  // border: '1px solid black',
                  // height: '20px'
                }
              }
              className={styles.inputNumberSpace}
            >
              <Form.Item
                name="studentNumber"
                label="学生人数"
                rules={[{ required: true, message: '请输入正确人数值！' }]}
              >
                <InputNumber
                  style={{ marginRight: '10px', marginBottom: '10px' }}
                  min={1}
                  max={99}
                  ref={inputNumberRef}
                />
              </Form.Item>
              <span>位学员</span>
            </Space>
          </Form.Item>
          <Form.Item
            label="用户前缀"
            name="prefixName"
            rules={[{ required: true, message: '请输入正确的用户前缀！' }]}
          >
            <Input style={{ width: '50%' }}></Input>
          </Form.Item>
        </Form>
      </Modal>
      <Modal
        title="新建章节"
        visible={isAddChapterModalVisible}
        onOk={handleAddChapterOK}
        onCancel={() => {
          setIsAddChapterModalVisible(false)
        }}
      >
        <Form name="basic" layout="vertical" form={chapterForm} autoComplete="off">
          <Form.Item
            label="章节标题"
            name="chapterTitle"
            rules={[{ required: true, message: '章节标题不能为空！' }]}
          >
            <Input.TextArea size="small" showCount maxLength={100} />
          </Form.Item>
          <Form.Item label="章节描述" name="chapterDiscription">
            <Input.TextArea size="large" showCount maxLength={200} />
          </Form.Item>
        </Form>
      </Modal>
      <div style={{ height: '400px', backgroundColor: 'white' }}></div>
    </Layout>
  )
}

export default enterClass
