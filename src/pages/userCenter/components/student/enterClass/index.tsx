import { history } from 'umi'
import { FC, useEffect } from 'react'
import { PageHeader, Collapse, Layout, Menu, Descriptions, Row, Col, Button, message } from 'antd'
import { useRequest } from 'ahooks'
import { BankTwoTone, LeftCircleTwoTone, EditTwoTone } from '@ant-design/icons'
import { useSelector } from 'dva'

import styles from './index.less'
import { UserCenterServices } from '@/services'
import { getFileFromServer, downloadFileFromBlob } from '@/utils/fileFetch/index'

const enterClass: FC = () => {
  const userCenter = useSelector((state: any) => state.userCenter) // 获取班级信息
  // 获取班级课程信息
  const { data: courses, run: runGetStudentCourses } = useRequest(
    UserCenterServices.getStudentCourseInfo,
    {
      manual: true,
      onSuccess: () => {
        return
      }
    }
  )
  // // 获取小节并下载文件
  // const { run: runGetSection } = useRequest(UserCenterServices.studentSection, {
  //   manual: true,
  //   onSuccess: (res) => {
  //     return
  //   }
  // })

  useEffect(() => {
    runGetStudentCourses({ classID: userCenter?.classID?.toString() })
  }, [])

  const weAreTrying = () => {
    message.info('正在完善中')
  }

  const handleLearning = (section: any) => {
    if (section.sectionType === '视频' || section.sectionType === '试题') message.info('正在完善中')
    if (section?.sectionType !== '课件')
      history.push({
        pathname: './viewTextSection',
        state: {
          classID: userCenter?.classID,
          chapterID: section?.chapterID,
          sectionID: section?.ID,
          sectionType: section.sectionType
        }
      })
    else {
      const { classID, chapterID, ID: sectionID } = section
      const asyncFileFromServer = getFileFromServer(
        `http://42.192.82.19:50000/api/v1/student/getSection?classID=${classID}&chapterID=${chapterID}&sectionID=${sectionID}&sectionType=课件`
      )
      asyncFileFromServer.then((file) => {
        downloadFileFromBlob(file?.fileBlob, file?.fileName as string)
      })
    }
    // section.sectionType === '课件'
    //   ? runGetSection({
    //       classID: section?.classID,
    //       chapterID: section?.chapterID,
    //       sectionID: section?.ID,
    //       sectionType: section?.sectionType
    //     })
    // : history.push({
    //     pathname: './viewTextSection',
    //     state: {
    //       classID: userCenter?.classID,
    //       chapterID: section?.chapterID,
    //       sectionID: section?.ID,
    //       sectionType: section.sectionType
    //     }
    //   })
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
                      <Col span={1}></Col>
                      <Col span={2}>{section.sectionType}</Col>
                      <Col span={15}>
                        <strong>标题: &nbsp;</strong>
                        {section.sectionTitle}
                      </Col>
                      <Col span={3}>
                        {section.sectionType === '试题' ? (
                          <Button
                            onClick={
                              () => {
                                message.info('正在完善中')
                              }
                              // () =>
                              // history.push({
                              //   pathname: './viewExam',
                              //   state: {
                              //     classID: userCenter?.classID,
                              //     chapterID: section?.chapterID,
                              //     sectionID: section?.ID
                              //   }
                              // })
                            }
                            icon={<EditTwoTone />}
                          >
                            做题
                          </Button>
                        ) : (
                          <Button onClick={() => handleLearning(section)} icon={<EditTwoTone />}>
                            学习
                          </Button>
                        )}
                      </Col>
                    </Row>
                  )
                })}
              </Collapse.Panel>
            )
          })}
        </Collapse>
      </Layout>
      <div style={{ height: '400px', background: 'white' }}></div>
    </Layout>
  )
}

export default enterClass
