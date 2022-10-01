// @ts-nocheck   忽略ts检查
import { FC, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { Select, PageHeader, Form, Col, Button, Row, Input, Upload, Layout, message } from 'antd'
import { useRequest } from 'ahooks'
import type { UploadFile } from 'antd/es/upload/interface'
import { UploadOutlined, LeftCircleTwoTone } from '@ant-design/icons'
//引入富文本编辑器
import BraftEditor from 'braft-editor'
import 'braft-editor/dist/index.css'
import Header from '@/components/header'
import Footer from '@/components/footer'

import styles from './index.less'
import CaseService from '@/services/caseShow'

const PublishCase: FC = () => {
  const history = useHistory()
  const { Option } = Select
  const [form] = Form.useForm()
  const [uploading, setUploading] = useState(false)
  const [fileList, setFileList] = useState<UploadFile[]>([])
  const [caseClass, setCaseClass] = useState('')
  const { run: PublishCase } = useRequest(CaseService.publishCase, {
    manual: true,
    onSuccess: (res) => {
      setUploading(true)
      if (res.code == 200) {
        message.success('发布成功')
        history.goBack()
      } else {
        message.error('请重新发布！')
      }
    },
    onError: () => {
      message.error('请重新发布！')
    },
    onFinally: () => {
      setUploading(false) // 发布按钮还原
    }
  })
  //获取类别列表
  const { data: caseClassList, run: GetClassList } = useRequest(CaseService.getCaseClass)
  const [editorState, setEditorState] = useState(BraftEditor.createEditorState(null))
  const handleEditorChange = (editorState) => {
    setEditorState(editorState)
  }

  const props = {
    onRemove: (file) => {
      const index = fileList.indexOf(file)
      const newFileList = fileList.slice()
      newFileList.splice(index, 1)
      setFileList(newFileList)
    },
    beforeUpload: (file) => {
      setFileList([file])
      return false
    },
    fileList
  }

  const onBack = () => {
    history.goBack()
  }
  const publishCase = (value) => {
    const { caseTitle, caseDiscription } = value
    const caseContent = editorState.toHTML()

    const formData = new FormData()
    fileList.forEach((file, i) => {
      formData.append('file', file)
    })
    formData.append('caseTitle', caseTitle)
    formData.append('caseContent', caseContent)
    formData.append('caseDiscription', caseDiscription)
    formData.append('caseClass', caseClass)
    PublishCase(formData)
  }

  return (
    <Layout>
      <Layout.Content style={{ backgroundColor: 'white' }}>
        <Header />
        <div style={{ margin: '1% 5%' }}>
          {' '}
          <PageHeader
            backIcon={<LeftCircleTwoTone style={{ fontSize: '30px' }} />}
            onBack={onBack}
            title={<div>编写案例中...</div>}
          />
          <Form name="caseForm" form={form} onFinish={publishCase}>
            <Row>
              <Col span={20}>
                {' '}
                <Form.Item
                  name="caseSort"
                  rules={[{ required: true, message: '分类必须选' }]}
                  label="案例类别"
                >
                  {/* <Input.TextArea size="small" maxLength={5} showCount placeholder="请输入案例类别" /> */}
                  <Select
                    disabled={false}
                    style={{ width: 120 }}
                    onSelect={(value) => setCaseClass(value)}
                  >
                    {caseClassList?.caseClassList?.map((caseClassList) => {
                      return (
                        <Option value={caseClassList.caseClass} key={caseClassList.ID}>
                          {caseClassList.caseClass}
                        </Option>
                      )
                    })}
                  </Select>
                </Form.Item>
                <Form.Item
                  name="caseTitle"
                  rules={[{ required: true, message: '案例标题不为空！' }]}
                  label="案例标题"
                >
                  <Input.TextArea
                    size="small"
                    maxLength={50}
                    showCount
                    placeholder="请输入案例标题"
                  />
                </Form.Item>
                <Form.Item name="caseDiscription" label="♪ 案例描述">
                  <Input.TextArea
                    size="large"
                    maxLength={200}
                    showCount
                    placeholder="请简要的描述您的案例吧"
                  />
                </Form.Item>
              </Col>
              <Col span={2}></Col>
              <Col span={2}>
                {' '}
                <Form.Item>
                  <Button style={{ float: 'right' }} size="large" type="primary" htmlType="submit">
                    {uploading ? '正在发布...' : '发布'}
                  </Button>
                </Form.Item>
              </Col>
            </Row>

            <Form.Item name="caseContent">
              <BraftEditor
                value={editorState}
                onChange={handleEditorChange}
                placeholder="请输入正文..."
              />
            </Form.Item>
          </Form>
          <Row>
            <Upload {...props} maxCount={1} accept=".xml">
              <Button icon={<UploadOutlined />}>上传案例文件(最多上传1个)</Button>
            </Upload>
          </Row>
        </div>
      </Layout.Content>
      <Layout.Footer
        style={{
          justifyContent: 'space-around',
          alignItems: 'center',
          backgroundColor: '#f4fbff'
        }}
      >
        <Footer />
      </Layout.Footer>
    </Layout>
  )
}
export default PublishCase
