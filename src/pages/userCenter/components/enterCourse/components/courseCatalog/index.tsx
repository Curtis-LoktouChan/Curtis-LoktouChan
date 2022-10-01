import { history, useLocation } from 'umi'
import { FC, useEffect, useState } from 'react'
import {
  Collapse,
  Row,
  Col,
  Button,
  Popconfirm,
  message,
  Modal,
  Form,
  Input,
  Card,
  Select,
  Layout,
  PageHeader
} from 'antd'
import Icon, { EyeTwoTone, DeleteTwoTone, EditTwoTone, FileAddTwoTone } from '@ant-design/icons'
import { useSelector, useDispatch } from 'dva'
import { useRequest } from 'ahooks'

import styles from './index.less'
import { UserCenterServices } from '@/services'
import { ICourseInfo } from '@/services/userCenter/types'
import { sectionTypeWithIconPair } from '../sectionTypeWithIcon'
import { getFileFromServer, downloadFileFromBlob } from '@/utils/fileFetch/index'
import Dispatcher from '@/.umi/plugin-model/helpers/dispatcher'
import { ACTIONS } from '@/models'

const CourseCatalog: FC = () => {
  const Option = Select
  const location = useLocation()
  const userCenter = useSelector((state: any) => state.userCenter)
  const dispatch = useDispatch()
  const [classID, setClassID] = useState('')
  const [chapterFlag, setChapterFlag] = useState(0)
  const [isEditChapterVisible, setIsEditChapterVisibleState] = useState(false) // 是否打开编辑章节对话框
  const [isAddSectionVisible, setIsAddSectionVisible] = useState(false)
  const [chapterInformation, setChapterInformation] = useState<any>({}) // 用于保存章节信息传递给对话框
  const [editChapterForm] = Form.useForm() // 创建编辑章节表单实例
  //获取课程班级
  const { data, run: getClass } = useRequest(UserCenterServices.getClassByCourseID, {
    manual: true,
    onSuccess: (res) => {
      console.log(res.class_list)
    }
  })

  // 获取班级成员列表数据
  const { data: courses, run: runGetCourses } = useRequest(UserCenterServices.getCourseInfo, {
    manual: true,
    onSuccess: (res) => {
      console.log(res)
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
  const { run: runDeleteSection } = useRequest(UserCenterServices.deleteSection, {
    manual: true,
    onSuccess: () => {
      setChapterFlag(chapterFlag + 1)
    }
  })
  // 获取文件并下载
  // const { run: runGetSectionRequest } = useRequest(UserCenterServices.getSection, {
  //   manual: true,
  //   onSuccess: (res) => {
  //     // console.log('res文件形式', res)
  //   }
  // })

  // 组件挂载即请求课程数据
  useEffect(() => {
    getClass({ courseID: userCenter.courseID })
    runGetCourses({ classID: userCenter?.classID?.toString() })
  }, [chapterFlag, (location as any)?.query?.addCounts])

  // 点击编辑按钮时重置表单以获取新的数据
  useEffect(() => {
    editChapterForm.resetFields()
  }, [chapterInformation])

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

  // 选择添加的小节类型
  const handleChooseType = (type: any, index: number) => {
    if (index > 1) {
      message.info('正在完善中')
      return
    }
    history.push({
      pathname: '/userCenter/enterCourse/addSection',
      query: {
        aboutChapter: chapterInformation,
        type
      }
    })
  }

  // 前往编辑课程小节
  const handleEditorSection = (section: any) => {
    history.push({
      pathname: '/userCenter/enterCourse/editorSection',
      query: {
        section
      }
    })
  }

  // 查看课程小节
  const handleViewSection = (section: any) => {
    if (section?.sectionType !== '课件')
      history.push({
        pathname: '/userCenter/enterCourse/viewSection',
        query: {
          section
        }
      })
    else {
      const asyncFileFromServer = getFileFromServer(
        `http://42.192.82.19:50000/api/v1/teacher/getSection?sectionID=${section.ID}&chapterID=${section.chapterID}&classID=${section.classID}&sectionType=课件`
      )
      asyncFileFromServer.then((file) => {
        downloadFileFromBlob(file?.fileBlob, file?.fileName as string)
      })
    }
  }

  // 章节操作按钮
  const panelExtra = (course: ICourseInfo) => {
    return (
      <div>
        <Button
          size="middle"
          icon={<FileAddTwoTone />}
          onClick={() => {
            setIsAddSectionVisible(true)
            setChapterInformation({ ...course })
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
  //选择班级
  const onSelect = (value: any) => {
    runGetCourses({ classID: value })
    dispatch({ type: ACTIONS.userCenter.saveClassInfo, payload: { classID: value } })
  }

  return (
    <div className={styles.courseContent}>
      <PageHeader
        title="编辑班级章节......"
        subTitle="请先选择要编辑的班级！"
        extra={
          <Select
            placeholder={'请选择班级'}
            value={classID ? classID : '请选择班级'}
            onChange={(value) => {
              setClassID(value)
            }}
            onSelect={onSelect}
            style={{ width: '150px' }}
          >
            {data?.class_list.map((courseClass, index) => {
              return (
                <Select.Option key={index} value={courseClass.id}>
                  {courseClass.name}
                </Select.Option>
              )
            })}
          </Select>
        }
      ></PageHeader>
      <div style={{ width: '100%' }}>
        {' '}
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
                      key={section?.ID?.toString() + section?.chapterID?.toString()}
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
                        <Button
                          icon={<EyeTwoTone />}
                          onClick={() => {
                            handleViewSection(section)
                          }}
                        >
                          浏览
                        </Button>
                      </Col>
                      <Col span={3}>
                        {section.sectionType === '试题' ? (
                          <Button icon={<EditTwoTone />} onClick={weAreTrying}>
                            修改
                          </Button>
                        ) : (
                          <Button
                            icon={<EditTwoTone />}
                            onClick={() => {
                              handleEditorSection(section)
                            }}
                          >
                            编辑
                          </Button>
                        )}
                      </Col>
                      <Col span={3}>
                        <Popconfirm
                          title="确定删除吗(不可恢复)？"
                          okText="是"
                          cancelText="否"
                          onConfirm={() => {
                            runDeleteSection({
                              chapterID: section.chapterID,
                              classID: section.classID,
                              sectionID: section.ID
                            })
                          }}
                        >
                          <Button icon={<DeleteTwoTone />}>删除</Button>
                        </Popconfirm>
                      </Col>
                    </Row>
                  )
                })}
                {/* 编辑章节表单对话框 */}
                <Modal
                  title="编辑章节"
                  visible={isEditChapterVisible}
                  okText="确认"
                  cancelText="取消"
                  onOk={() => {
                    handleEditChapterOK()
                  }}
                  onCancel={() => {
                    setIsEditChapterVisibleState(false)
                  }}
                  destroyOnClose={true}
                >
                  <Form
                    layout="vertical"
                    form={editChapterForm}
                    initialValues={{
                      chapterTitle: chapterInformation.chapterTitle,
                      chapterDiscription: chapterInformation.chapterDiscription
                    }}
                  >
                    <Form.Item
                      rules={[{ required: true, message: '请填写正确的章节标题！' }]}
                      name="chapterTitle"
                      label="章节标题"
                    >
                      <Input.TextArea showCount maxLength={100} />
                    </Form.Item>
                    <Form.Item required={false} name="chapterDiscription" label="章节概述">
                      <Input.TextArea
                        showCount
                        maxLength={200}
                        style={{
                          height: '8em'
                        }}
                      />
                    </Form.Item>
                  </Form>
                </Modal>
                {/* 选择添加的小节类型 */}
                <Modal
                  title="小节类型"
                  visible={isAddSectionVisible}
                  closable={false} // 不展示右上角的叉
                  onCancel={() => {
                    setIsAddSectionVisible(false)
                  }}
                  footer={
                    <Button
                      type="default"
                      onClick={() => {
                        setIsAddSectionVisible(false)
                      }}
                    >
                      取消
                    </Button>
                  }
                >
                  <Row align="middle" justify="space-between">
                    {sectionTypeWithIconPair.map((theType, index) => {
                      const [type, theIcon] = theType
                      return (
                        <Col span={6} key={theType.toString()}>
                          <Card
                            hoverable
                            style={{ height: '100px' }}
                            cover={<Icon component={theIcon as FC} />}
                            bordered={false}
                            onClick={() => {
                              handleChooseType(theType, index)
                            }}
                          >
                            <Card.Meta style={{ textAlign: 'center' }} title={type} />
                          </Card>
                        </Col>
                      )
                    })}
                  </Row>
                </Modal>
              </Collapse.Panel>
            )
          })}
        </Collapse>
      </div>
    </div>
  )
}

export default CourseCatalog
