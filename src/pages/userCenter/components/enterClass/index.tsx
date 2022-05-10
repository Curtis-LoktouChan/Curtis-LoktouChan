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
  Input
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
  const [chapterForm] = Form.useForm()
  const addStudentRef = useRef<any>()
  const userCenter = useSelector((state: any) => state.userCenter) // 获取班级信息
  const { run: runAddStudents } = useRequest(UserCenterServices.addStudents, {
    manual: true
  })

  useEffect(() => {
    history.push('./enterClass/courseCatalog')
  }, [])

  // 确认添加学生
  const handleAddStudentOK = () => {
    setIsAddStudentsModalVisible(false)
    runAddStudents({
      className: userCenter.className,
      newStudentNum: addStudentRef.current?.value
    })
  }

  // 确认添加章节, 接口？
  const handleAddChapterOK = () => {
    setIsAddChapterModalVisible(false)
    // const chapterTitle = chapterForm.getFieldValue('chapterTitle')  // 章节名
    // const chapterDiscrption = chapterForm.getFieldValue('chapterDiscrption')  // 章节描述
  }

  return (
    <Layout className={styles.unitStudyContainer}>
      <PageHeader
        style={{ backgroundColor: '#DDEEFF' }}
        backIcon={<LeftCircleTwoTone />}
        onBack={() => history.goBack()}
        title={userCenter.className}
        subTitle={`班级ID: ${userCenter.classID} 邀请码: ${userCenter.invitePwd}`}
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
                history.push('/userCenter/enterClass/classMenbers')
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
      <Modal
        title="添加学员"
        visible={isAddStudentsModalVisible}
        onOk={handleAddStudentOK}
        onCancel={() => {
          setIsAddStudentsModalVisible(false)
        }}
      >
        <p>
          输入班级人数，系统将自动批量创建相应数量的学员账户。学员使用分配的账户登录后，将自动加入班级。
        </p>
        <InputNumber
          style={{ marginRight: '10px', marginBottom: '10px' }}
          min={1}
          max={99}
          ref={addStudentRef}
        />
        位学员
        <p>（一个班级最多99个学生。)</p>
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
          <Form.Item label="章节描述" name="chapterDiscrption">
            <Input.TextArea size="large" showCount maxLength={200} />
          </Form.Item>
        </Form>
      </Modal>
    </Layout>
  )
}

export default enterClass
