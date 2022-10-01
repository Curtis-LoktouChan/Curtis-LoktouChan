// @ts-nocheck
import { history, useLocation } from 'umi'
import { FC, useState } from 'react'
import { Layout, PageHeader, Button, Form, Input, Upload } from 'antd'
import { RollbackOutlined } from '@ant-design/icons'
import { useRequest } from 'ahooks'
import BraftEditor from 'braft-editor'
import 'braft-editor/dist/index.css'

import { UserCenterServices } from '@/services'

const SECTIONTYPE = 0
const SECTIONICON = 1

const AddSection: FC = () => {
  const location = useLocation() // 用于获取路由传参
  const [courseWare, setCourseWare] = useState([])
  const [sectionForm] = Form.useForm() // 表单
  const [editorValue, setEditorValue] = useState(BraftEditor.createEditorState(null))
  // 发布新课程小节的请求
  const { run: addSectionRequest } = useRequest(UserCenterServices.addSection, {
    manual: true,
    onSuccess: () => {
      history.push('/userCenter/enterCourse/courseCatalog')
    }
  })

  const handlePageBack = () => {
    history.push('/userCenter/myClassList')
  }

  // 提交小节信息
  const handleSubmit = (values) => {
    // if((location as any)?.query?.type[SECTIONTYPE] !== '课件')
    //   addSectionRequest({
    //     classID: (location as any)?.query?.aboutChapter?.classID,
    //     chapterID: (location as any)?.query?.aboutChapter?.ID,
    //     sectionTitle: values.sectionTitle,
    //     sectionContent: values.sectionContent ? values.sectionContent.toHTML() : '<p></p>',
    //     sectionType: (location as any)?.query?.type[SECTIONTYPE]
    //   })
    // 内容
    const sectionContent = editorValue.toHTML()
    const formData = new FormData()
    formData.append('classID', (location as any)?.query?.aboutChapter?.classID)
    formData.append('chapterID', (location as any)?.query?.aboutChapter?.ID)
    formData.append('sectionTitle', values.sectionTitle)
    formData.append('sectionContent', sectionContent)
    formData.append('sectionType', (location as any)?.query?.type[SECTIONTYPE])
    addSectionRequest(formData as any)
  }

  const handleChange = (files: any) => {
    if (files.file.status === 'done') {
      setCourseWare(files.fileList)
    }
  }

  return (
    <Layout style={{ backgroundColor: 'white' }}>
      <PageHeader
        style={{ backgroundColor: '#DDEEFF' }}
        backIcon={
          <div
            style={{ color: 'green' }}
            onClick={() => {
              history.goBack()
            }}
          >
            <RollbackOutlined />
            <p style={{ color: 'green' }}>返回</p>
          </div>
        }
        onBack={handlePageBack}
        title="添加小节"
        subTitle={(location as any)?.query?.aboutChapter?.chapterTitle}
        extra={[
          <Button
            type="primary"
            onClick={async () => {
              try {
                await sectionForm.validateFields()
                sectionForm.submit()
              } catch (e) {
                console.error(e)
              }
            }}
          >
            提交
          </Button>,
          <div>
            {
              (location as any)?.query?.type[SECTIONICON] // 离谱的用法
            }
            {(location as any)?.query?.type[SECTIONTYPE]}
          </div>
        ]}
      />
      <Form form={sectionForm} onFinish={handleSubmit}>
        <Form.Item
          label="小节标题"
          name="sectionTitle"
          rules={[{ required: true, message: '请输入正确小节标题！' }]}
        >
          <Input.TextArea
            placeholder="请输入小节标题"
            maxLength={100}
            showCount={true}
          ></Input.TextArea>
        </Form.Item>
        {(location as any)?.query?.type[SECTIONTYPE] !== '课件' ? (
          <Form.Item label="√小节正文" name="sectionContent">
            <BraftEditor
              placeholder="请输入正文（可插入文字、图片、视频链接，请根据选择类型合理编辑正文）"
              value={editorValue}
              onChange={(editorNewValue) => {
                setEditorValue(editorNewValue)
              }}
            />
          </Form.Item>
        ) : (
          <Form.Item name="courseWare" rules={[{ required: true, message: '请上传一个课件' }]}>
            <Upload
              accept=".pdf, .ppt, .pptx"
              onChange={handleChange}
              maxCount={1}
              beforeUpload={() => false}
            >
              <Button type="primary">上传文件</Button>
            </Upload>
          </Form.Item>
        )}
      </Form>
      <div style={{ height: '400px' }}></div>
    </Layout>
  )
}

export default AddSection
