import { history, useLocation } from 'umi'
import { FC, useEffect, useState } from 'react'
import { Collapse, Row, Col, Button, Popconfirm, message, Modal, Form, Input } from 'antd'
import { EyeTwoTone, DeleteTwoTone, EditTwoTone, FileAddTwoTone } from '@ant-design/icons'
import { useSelector } from 'dva'
import { useRequest } from 'ahooks'

import styles from './index.less'
import { UserCenterServices } from '@/services'
import { ICourseInfo } from '@/services/userCenter/types'

const ClassMembers: FC = () => {
  const location = useLocation()
  const userCenter = useSelector((state: any) => state.userCenter)
  const [chapterFlag, setChapterFlag] = useState(0)
  const [isEditChapterVisible, setIsEditChapterVisibleState] = useState(false) // 是否打开编辑章节对话框
  const [chapterInformation, setChapterInformation] = useState<any>({}) // 用于保存章节信息传递给对话框
  const [editChapterForm] = Form.useForm() // 创建编辑章节表单实例
  // 获取班级成员列表数据
  const { data: courses, run: runGetCourses } = useRequest(UserCenterServices.getCourseInfo, {
    manual: true,
    onSuccess: () => {
      return
    }
  })
  // 删除章节请求
  const { run: runDeleteChapter } = useRequest(UserCenterServices.deleteChapter, {
    manual: true,
    onSuccess: () => {
      setChapterFlag(chapterFlag + 1)
    }
  })
  // 编辑章节请求
  const { run: runUpdateChapter } = useRequest(UserCenterServices.updateChapter, {
    manual: true,
    onSuccess: () => {
      setChapterFlag(chapterFlag + 1)
    }
  })

  // 组件挂载即请求课程数据
  useEffect(() => {
    console.log('刷新页面')
    runGetCourses({ classID: userCenter?.classID?.toString() })
  }, [chapterFlag, (location as any)?.query?.addCounts])

  // 提示信息
  const weAreTrying = () => {
    message.info('正在完善中')
  }

  // 确认删除章节
  const onClickDeleteChapter = (chapterID: number, classID: number) => {
    runDeleteChapter({
      chapterID,
      classID
    })
  }

  // 编辑章节完成
  const handleEditChapterOK = async () => {
    try {
      await editChapterForm.validateFields() // 校验表单
      runUpdateChapter({
        chapterDiscription: editChapterForm.getFieldValue('chapterDiscription'),
        chapterTitle: editChapterForm.getFieldValue('chapterTitle'),
        classID: chapterInformation.classID,
        chapterID: chapterInformation.ID
      })
      editChapterForm.resetFields() // 重置表单
      setIsEditChapterVisibleState(false)
    } catch (e) {
      console.log(e)
    }
  }

  const panelExtra = (course: ICourseInfo) => {
    return (
      <div>
        <Button
          size="middle"
          icon={<FileAddTwoTone />}
          onClick={() => {
            // history.push('./addSection')
            message.info('正在完善')
          }}
        >
          添加小节
        </Button>
        &nbsp;&nbsp;
        <Button
          size="middle"
          icon={<EditTwoTone />}
          onClick={() => {
            setChapterInformation({ ...course })
            setIsEditChapterVisibleState(true)
          }}
        >
          编辑章节
        </Button>
        &nbsp;&nbsp;
        <Popconfirm
          title="删除章节下的全部内容？"
          okText="是"
          cancelText="否"
          onConfirm={() => {
            onClickDeleteChapter(course.ID, course.classID)
          }}
        >
          <Button size="middle" icon={<DeleteTwoTone />}>
            删除章节
          </Button>
        </Popconfirm>
      </div>
    )
  }

  return (
    <Collapse style={{ width: '100%', backgroundColor: 'white' }}>
      {courses?.map((course: any) => {
        return (
          <Collapse.Panel
            header={
              <h3
                style={{
                  color: '#1890ff',
                  fontWeight: '900',
                  background: '#e3eaef'
                }}
              >
                {course.chapterTitle}
              </h3>
            }
            style={{
              flexDirection: 'column'
            }}
            key={course.ID}
            extra={panelExtra(course)}
          >
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
            <Modal
              title="编辑章节"
              visible={isEditChapterVisible}
              onOk={() => {
                handleEditChapterOK()
              }}
              onCancel={() => {
                editChapterForm.resetFields()
                setIsEditChapterVisibleState(false)
              }}
            >
              <Form layout="vertical" form={editChapterForm}>
                <Form.Item
                  rules={[{ required: true, message: '请填写正确的章节标题！' }]}
                  name="chapterTitle"
                  label="章节标题"
                  initialValue={chapterInformation.chapterTitle}
                >
                  <Input.TextArea
                    showCount
                    maxLength={100}
                    defaultValue={chapterInformation.chapterTitle}
                  />
                </Form.Item>
                <Form.Item
                  required={false}
                  name="chapterDiscription"
                  label="章节概述"
                  initialValue={chapterInformation.chapterDiscription}
                >
                  <Input.TextArea
                    showCount
                    maxLength={200}
                    defaultValue={chapterInformation.chapterDiscription}
                    style={{
                      height: '8em'
                    }}
                  />
                </Form.Item>
              </Form>
            </Modal>
          </Collapse.Panel>
        )
      })}
    </Collapse>
  )
}

export default ClassMembers
