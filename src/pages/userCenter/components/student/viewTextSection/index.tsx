// @ts-nocheck
import { history } from 'umi'
import { FC, useEffect, useState } from 'react'
import { PageHeader, Collapse, Layout, Menu, Descriptions, Card } from 'antd'
import { useRequest } from 'ahooks'
import { BankTwoTone, LeftCircleTwoTone, RollbackOutlined } from '@ant-design/icons'
import { useSelector } from 'dva'
import BraftEditor from 'braft-editor'
import 'braft-editor/dist/index.css'

import styles from './index.less'
import { UserCenterServices } from '@/services'

const enterClass: FC = () => {
  const userCenter = useSelector((state: any) => state.userCenter) // 获取班级信息
  const { data: course, run: runGetStudentCourses } = useRequest(
    UserCenterServices.getStudentCourseInfo,
    {
      manual: true,
      onSuccess: () => {
        return
      }
    }
  )
  const [subTitileState, setSubTitileState] = useState(null)
  const [editorState, setEditorState] = useState(BraftEditor.createEditorState(null))
  const { data: section, run: getSection } = useRequest(UserCenterServices.studentSection, {
    manual: true,
    onSuccess: (res) => {
      const resContent = res.sectionContent
      const editorText = BraftEditor.createEditorState(resContent)
      setEditorState(editorText)
      const resSubTitle = res.sectionTitle
      setSubTitileState(resSubTitle)
      return
    }
  })
  const { classID, chapterID, sectionID, sectionType } = history.location.state

  useEffect(() => {
    runGetStudentCourses({ classID: userCenter?.classID?.toString() })
    getSection({
      classID,
      chapterID,
      sectionID,
      sectionType
    })
  }, [])

  return (
    <Layout>
      <PageHeader
        style={{ backgroundColor: '#DDEEFF' }}
        backIcon={<LeftCircleTwoTone />}
        onBack={() => history.goBack()}
        title={userCenter.className}
        subTitle={`班级ID: ${userCenter.classID} 邀请码: ${
          userCenter.invitePwd ? userCenter.invitePwd : '无'
        }`}
      >
        <Descriptions size="small">
          <Descriptions.Item label="班级简介">{userCenter.classBrief}</Descriptions.Item>
        </Descriptions>
      </PageHeader>
      <Layout style={{ backgroundColor: 'white' }}>
        <Layout.Sider className={styles.classSider} theme="light">
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
                history.push('/userCenter/student/enterClass')
              }}
            >
              课程目录
            </Menu.Item>
          </Menu>
        </Layout.Sider>
        <Layout style={{ backgroundColor: 'white' }}>
          <PageHeader
            backIcon={
              <Card
                cover={
                  <RollbackOutlined
                    style={{
                      fontSize: '30px',
                      color: 'green',
                      background: '#1890ff26'
                    }}
                  />
                }
                size="small"
                hoverable={true}
                bordered={false}
                bodyStyle={{
                  color: 'green',
                  textAlign: 'center',
                  background: '#1890ff26'
                }}
              >
                返回
              </Card>
            }
            onBack={() => history.goBack()}
            title={<div>正在浏览</div>}
            subTitle={subTitileState}
            // extra={
            //   <div>
            //     <div style={{ fontWeight: '900' }}>{sectionType}</div>
            //     {sectionTypeIcon[sectionType]}
            //   </div>
            // }
            style={{ backgroundColor: '#DDEEFF', margin: '4px 0px' }}
          />
          <BraftEditor
            value={editorState}
            style={{ backgroundColor: 'white' }}
            controls={[]}
            readOnly={true}
          />
        </Layout>
      </Layout>
      <div style={{ height: '400px', background: 'white' }}></div>
    </Layout>
  )
}

export default enterClass
