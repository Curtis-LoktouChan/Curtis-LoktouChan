// @ts-nocheck
import { history } from 'umi'
import { FC, useEffect, useState } from 'react'
import {
  PageHeader,
  Collapse,
  Layout,
  Menu,
  Descriptions,
  Row,
  Button,
  Card,
  Form,
  Checkbox,
  Tag
} from 'antd'
import { useRequest } from 'ahooks'
import { BankTwoTone, LeftCircleTwoTone, RollbackOutlined } from '@ant-design/icons'
import { useSelector, useDispatch } from 'dva'
import BraftEditor from 'braft-editor'
import 'braft-editor/dist/index.css'

import styles from './index.less'
import { UserCenterServices } from '@/services'

const enterClass: FC = () => {
  const [subTitileState, setSubTitileState] = useState(null)
  const [examState, setExamState] = useState(null)
  const userCenter = useSelector((state: any) => state.userCenter) // 获取班级信息
  const dispatch = useDispatch()
  const { data: courses, run: runGetStudentCourses } = useRequest(
    UserCenterServices.getStudentCourseInfo,
    {
      manual: true,
      onSuccess: () => {
        return
      }
    }
  )
  const { data: question, run: getQuestion } = useRequest(UserCenterServices.studentQuestion, {
    manual: true,
    onSuccess: (res) => {
      setSubTitileState(res.sectionTitle)
      setExamState(res.exams)
      return
    }
  })
  const classID = history.location.state?.classID
  const chapterID = history.location.state?.chapterID
  const sectionID = history.location.state?.sectionID

  useEffect(() => {
    runGetStudentCourses({ classID: userCenter?.classID?.toString() })
    getQuestion({ classID, chapterID, sectionID })
  }, [])

  const ExamQuestions = (exams, dispatch, sectionID) => {
    if (!exams) {
      return
    }
    let question = []

    const selectExcept = (e, examID) => {
      dispatch({
        type: 'updateAnswer',
        data: [{ examID, myAnswer: e.target.value, sectionID }]
      })
    }
    const selectMultiple = (ans, examID) => {
      let answer = ans.sort().join('')
      dispatch({
        type: 'updateAnswer',
        data: [{ examID, myAnswer: answer, sectionID }]
      })
    }

    exams.forEach((exam, index) => {
      question.push(
        <div style={{ margin: ' 0px 20px' }} key={index}>
          <Tag color="#2db7f5">第{index + 1}题</Tag>
          <Tag color="blue">{exam.examType}</Tag>
          <BraftEditor
            value={BraftEditor.createEditorState(exam.examDiscrition)}
            contentStyle={{ height: 'auto' }}
            controls={[]}
            readOnly
          />

          <Form.Item
            label="选择正确答案"
            name={`exam${index + 1}`}
            rules={[{ required: true, message: '请勾选正确答案！' }]}
            style={{ marginTop: '-40px' }}
          >
            {exam.examType === '多选题' ? (
              <Checkbox.Group
                onChange={(ans) => selectMultiple(ans, exam.ID)}
                style={{ width: '100%' }}
              >
                <Space direction="vertical">
                  {exam.A === undefined || exam.A === '' ? null : (
                    <Checkbox value="A">A: {exam.A}</Checkbox>
                  )}
                  {exam.B === undefined || exam.B === '' ? null : (
                    <Checkbox value="B">B: {exam.B}</Checkbox>
                  )}
                  {exam.C === undefined || exam.C === '' ? null : (
                    <Checkbox value="C">C: {exam.C}</Checkbox>
                  )}

                  {exam.D === undefined || exam.D === '' ? null : (
                    <Checkbox value="D">D: {exam.D}</Checkbox>
                  )}
                  {exam.E === undefined || exam.E === '' ? null : (
                    <Checkbox value="E">E: {exam.E}</Checkbox>
                  )}
                  {exam.F === undefined || exam.F === '' ? null : (
                    <Checkbox value="F">F: {exam.F}</Checkbox>
                  )}
                </Space>
              </Checkbox.Group>
            ) : (
              <Radio.Group onChange={(e) => selectExcept(e, exam.ID)}>
                <Space direction="vertical">
                  {exam.A === undefined || exam.A === '' ? null : (
                    <Radio value="A">A: {exam.A}</Radio>
                  )}
                  {exam.B === undefined || exam.B === '' ? null : (
                    <Radio value="B">B: {exam.B}</Radio>
                  )}
                  {exam.C === undefined || exam.C === '' ? null : (
                    <Radio value="C">C: {exam.C}</Radio>
                  )}
                  {exam.D === undefined || exam.D === '' ? null : (
                    <Radio value="D">D: {exam.D}</Radio>
                  )}
                  {exam.E === undefined || exam.E === '' ? null : (
                    <Radio value="E">E: {exam.E}</Radio>
                  )}
                  {exam.F === undefined || exam.F === '' ? null : (
                    <Radio value="F">F: {exam.F}</Radio>
                  )}
                </Space>
              </Radio.Group>
            )}
          </Form.Item>
          <Divider />
        </div>
      )
    })
    return question
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
      </Layout>
      <Layout>
        <div style={{ margin: '0px 20px' }}>
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
            title={<div>做题</div>}
            subTitle={subTitileState}
            // extra={
            //   <div>
            //     <div style={{ fontWeight: '900' }}>{sectionType}</div>
            //     {sectionTypeIcon[sectionType]}
            //   </div>
            // }
            style={{ background: '#1890ff26', margin: '4px 0px' }}
          />
          <div style={{ border: '1px solid #96cefb5c' }}>
            <Form scrollToFirstError>
              {ExamQuestions(examState, dispatch, sectionID)}
              <Form.Item>
                <Row align="bottom">
                  <Button htmlType="submit" type="primary">
                    提交
                  </Button>
                </Row>
              </Form.Item>
            </Form>
          </div>
        </div>
      </Layout>
      <div style={{ height: '400px', background: 'white' }}></div>
    </Layout>
  )
}

export default enterClass
