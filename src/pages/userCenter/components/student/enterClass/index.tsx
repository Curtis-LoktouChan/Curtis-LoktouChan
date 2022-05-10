import { history } from 'umi'
import { FC, useEffect } from 'react'
import { PageHeader, Collapse, Layout, Menu, Descriptions } from 'antd'
import { useRequest } from 'ahooks'
import { BankTwoTone, LeftCircleTwoTone } from '@ant-design/icons'
import { useSelector } from 'dva'

import styles from './index.less'
import { UserCenterServices } from '@/services'

const enterClass: FC = () => {
  const userCenter = useSelector((state: any) => state.userCenter) // 获取班级信息
  const { data: courses, run: runGetStudentCourses } = useRequest(
    UserCenterServices.getCourseInfo,
    {
      manual: true,
      onSuccess: () => {
        return
      }
    }
  )

  useEffect(() => {
    runGetStudentCourses(userCenter.classID)
  }, [])

  return (
    <Layout className={styles.unitStudyContainer}>
      <PageHeader
        style={{ backgroundColor: '#DDEEFF' }}
        backIcon={<LeftCircleTwoTone />}
        onBack={() => history.goBack()}
        title={userCenter.className}
        subTitle={`班级ID: ${userCenter.classID} 邀请码: ${userCenter.invitePwd}`}
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
          </Menu>
        </Layout.Sider>
        <Collapse style={{ width: '100%' }}>
          {courses?.map((course: any) => {
            return (
              <Collapse.Panel header={course.chapterTitle} key={course.ID}>
                <strong>章节概况</strong>
                {course.Sections.map((section: any) => {
                  return <div key={section.chapterID}>{section.sectionTitle}</div>
                })}
              </Collapse.Panel>
            )
          })}
        </Collapse>
      </Layout>
    </Layout>
  )
}

export default enterClass
