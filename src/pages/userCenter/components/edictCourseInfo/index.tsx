// @ts-nocheck   忽略ts检查
import { history } from 'umi'
import { FC, useState, useEffect } from 'react'
import { PageHeader, Form, Input, Button, message, Upload, Layout, Row, Col, Modal } from 'antd'
import { useRequest } from 'ahooks'
import { LeftCircleTwoTone, PlusOutlined } from '@ant-design/icons'
import { useSelector } from 'dva'

import BraftEditor from 'braft-editor'
import 'braft-editor/dist/index.css'
import styles from './index.less'
import { UserCenterServices } from '@/services'

const createCourse: FC = () => {
  const [previewOpen, setPreviewOpen] = useState(false)
  const [previewImage, setPreviewImage] = useState('')
  const [previewTitle, setPreviewTitle] = useState('')
  const [fileList, setFileList] = useState([])
  const userCenter = useSelector((state: any) => state.userCenter)
  const formData = new FormData()
  const [form] = Form.useForm()
  const [editorState, setEditorState] = useState(BraftEditor.createEditorState(null))
  const handleEditorChange = (editorState) => {
    setEditorState(editorState)
  }
  //获取原本信息
  const { data, run: getCourseMsg } = useRequest(UserCenterServices.getCourseMsg, {
    manual: true,
    onSuccess: (res) => {
      form.setFieldsValue({
        title: res.course.section_info.title,
        introduction: res.course.section_info.content.introduction,
        outline: BraftEditor.createEditorState(res.course.section_info.content.text)
      })
    }
  })
  const { run: updateCourse } = useRequest(UserCenterServices.updateCourseMsg, {
    manual: true,
    onSuccess: () => {
      history.goBack()
      message.success('更新课程成功！')
    }
  })

  // 提交表单，创建新课程
  const handleSubmit = (values: any) => {
    const Outline = editorState.toHTML()
    formData.append('courseID', userCenter.courseID)
    formData.append('newTitle', values.title)
    formData.append('newIntroduction', values.introduction)
    formData.append('newOutline', Outline)
    updateCourse(formData as any)
  }
  //
  useEffect(() => {
    getCourseMsg({ course_id: userCenter.courseID })
  }, [form])
  // 创建失败
  const handleCreateFailed = (res: any) => {
    alert('创建失败，请填写必要信息')
  }
  const uploadOnchange = (info: any) => {
    info.file.status = 'done'
    setFileList(info.fileList)
  }

  //
  const customRequest = (file: any) => {
    formData.append('newImg', file.file)
  }
  //
  const getBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => {
        resolve(reader.result)
      }
      reader.onerror = (error) => reject(error)
    })
  const handleCancel = () => setPreviewOpen(false)
  const handlePreview = async (file) => {
    console.log(!file.url && !file.preview)
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj)
    }

    setPreviewImage(file.url || file.preview)
    setPreviewOpen(true)
    setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1))
  }
  const beforeUpload = (file: any) => {
    // console.log(file?.type)
    //  file.type = file.type.toLowerCase()
    // console.log(file)
    const width = 800
    const height = 800
    return new Promise((resolve, reject) => {
      let filereader = new FileReader()

      filereader.onload = (e) => {
        // console.log( e.target.result);
        let src = e.target.result.toString()
        const image = new Image()
        image.onload = function () {
          // console.log(this)
          if (this.width >= width && this.height >= height) {
            // 上传图片的宽高与传递过来的限制宽高作比较，超过限制则调用失败回调
            reject()
          } else {
            resolve()
          }
        }
        image.onerror = reject
        image.src = src
      }
      filereader.readAsDataURL(file)
    })
  }
  const uploadButton = (
    <div>
      <PlusOutlined />
      <div
        style={{
          marginTop: 8
        }}
      >
        Upload
      </div>
    </div>
  )
  return (
    <Layout style={{ backgroundColor: 'white' }}>
      {' '}
      <Layout.Content>
        <PageHeader
          style={{ backgroundColor: 'white' }}
          backIcon={<LeftCircleTwoTone />}
          onBack={() => history.push('/userCenter/myCourseList')}
          title="新建课程"
        />{' '}
        <div className={styles.createCourseContent}>
          {' '}
          <div className={styles.createCourseForm}>
            {' '}
            <Form
              form={form}
              layout="vertical"
              name="basic"
              labelCol={{ span: 20 }}
              wrapperCol={{ span: 20 }}
              initialValues={{ remember: true }}
              className={styles.createClassForm}
              onFinish={handleSubmit}
              onFinishFailed={handleCreateFailed}
            >
              <Row>
                <Col span={20}>
                  {' '}
                  <Form.Item
                    label="课程名称"
                    name="title"
                    rules={[
                      {
                        required: true,
                        message: '请输入正确的课程名称',
                        type: 'string',
                        max: 20
                      }
                    ]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
                <Col>
                  {' '}
                  <Form.Item wrapperCol={{ offset: 4 }} name="button">
                    <Button type="primary" htmlType="submit">
                      提交
                    </Button>
                  </Form.Item>
                </Col>
              </Row>

              <Form.Item
                label="课程简介"
                name="introduction"
                rules={[
                  {
                    required: true,
                    message: '请输入正确的简介,不超过30字',
                    type: 'string',
                    max: 30
                  }
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="课程大纲"
                name="outline"
                rules={[
                  {
                    required: true,
                    message: '请输入正确的大纲',
                    type: 'string',
                    transform: (value) => {
                      return String(value)
                    }
                  }
                ]}
              >
                <BraftEditor
                  style={{ width: '100%', height: '400px' }}
                  value={editorState}
                  onChange={handleEditorChange}
                  placeholder="请输入正文..."
                />
              </Form.Item>
            </Form>
          </div>
          <div className={styles.uploadBtn}>
            {' '}
            <Row>
              <Col>请在这里更新封面，不上传则保留原封面</Col>
              <Col span={1} />
              <Col>
                {' '}
                <Upload
                  listType="picture-card"
                  onChange={uploadOnchange}
                  customRequest={(file) => customRequest(file)}
                  maxCount={1}
                  onPreview={handlePreview}
                >
                  {fileList.length >= 1 ? null : uploadButton}
                </Upload>
              </Col>
            </Row>
          </div>
          <Modal visible={previewOpen} title={previewTitle} footer={null} onCancel={handleCancel}>
            <img
              alt="example"
              style={{
                width: '100%'
              }}
              src={previewImage}
            />
          </Modal>
        </div>
      </Layout.Content>
    </Layout>
  )
}

export default createCourse
