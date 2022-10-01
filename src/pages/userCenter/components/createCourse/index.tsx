// @ts-nocheck   忽略ts检查
import { history } from 'umi'
import { FC, useState } from 'react'
import { PageHeader, Form, Input, Button, message, Upload, Layout, Row, Col, Modal } from 'antd'
import { useRequest } from 'ahooks'
import { LeftCircleTwoTone, PlusOutlined } from '@ant-design/icons'

import BraftEditor from 'braft-editor'
import 'braft-editor/dist/index.css'
import styles from './index.less'
import { UserCenterServices } from '@/services'

const createCourse: FC = () => {
  const [previewOpen, setPreviewOpen] = useState(false)
  const [previewImage, setPreviewImage] = useState('')
  const [previewTitle, setPreviewTitle] = useState('')
  const [fileList, setFileList] = useState([])
  const formData = new FormData()
  const [editorState, setEditorState] = useState(BraftEditor.createEditorState(null))
  const handleEditorChange = (editorState) => {
    setEditorState(editorState)
  }
  const { run: createCourse } = useRequest(UserCenterServices.createCourse, {
    manual: true,
    onSuccess: () => {
      history.goBack()
      message.success('新建课程成功！')
    }
  })

  // 提交表单，创建新课程
  const handleSubmit = (values: any) => {
    const Outline = editorState.toHTML()
    formData.append('title', values.title)
    formData.append('introduction', values.introduction)
    formData.append('outline', Outline)
    createCourse(formData as any)
  }

  // 创建失败
  const handleCreateFailed = (res: any) => {
    alert('创建失败，请填写必要信息')
  }
  const uploadOnchange = (info: any) => {
    info.file.status = 'done'
    setFileList(info.fileList)
  }
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
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj)
    }
    setPreviewImage(file.url || file.preview)
    setPreviewOpen(true)
    setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1))
  }
  //
  // const onPreview = async (file: UploadFile) => {
  //   let src = file.url as string
  //   if (!src) {
  //     src = await new Promise((resolve) => {
  //       const reader = new FileReader()
  //       reader.readAsDataURL(file.originFileObj as RcFile)
  //       reader.onload = () => resolve(reader.result as string)
  //     })
  //   }
  //   const image = new Image()
  //   image.src = src
  //   const imgWindow = window.open(src)
  //   imgWindow?.document.write(image.outerHTML)
  // }
  const customRequest = (file: any) => {
    formData.append('img', file.file)
  }
  const beforeUpload = (file: any) => {
    // console.log(file?.type)
    //  file.type = file.type.toLowerCase()
    console.log(file)
    const width = 800
    const height = 800
    return new Promise((resolve, reject) => {
      let filereader = new FileReader()

      filereader.onload = (e) => {
        // console.log( e.target.result);
        let src = e.target.result.toString()
        const image = new Image()
        image.onload = function () {
          console.log(this)
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
                  <Form.Item wrapperCol={{ offset: 4 }}>
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
              <Form.Item></Form.Item>
            </Form>
          </div>
          <div className={styles.uploadBtn}>
            {' '}
            <Row>
              <Col>请上传课程封面（只能上传1张）</Col>
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
        </div>
      </Layout.Content>
    </Layout>
  )
}

export default createCourse
