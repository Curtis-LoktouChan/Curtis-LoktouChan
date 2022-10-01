// @ts-nocheck   忽略ts检查

import { FC, useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { PageHeader, Form, Col, Button, Row, Input, Upload, message, Layout, Select } from 'antd'
//引入富文本编辑器
import BraftEditor from 'braft-editor'
import 'braft-editor/dist/index.css'

import Header from '@/components/header'
import Footer from '@/components/footer'
import { UploadOutlined, LeftCircleTwoTone } from '@ant-design/icons'
import CaseService from '@/services/caseShow'
import useRequest from '@ahooksjs/use-request'

const EditCase: FC = () => {
  const history = useHistory()
  const { Option } = Select
  const [uploading, setUploading] = useState(false)
  const [caseClass, setCaseClass] = useState('')
  const [fileList, setFileList] = useState([] as any)
  const [form] = Form.useForm()
  const [editorState, setEditorState] = useState(BraftEditor.createEditorState(null))
  const handleEditorChange = (editorState: any) => {
    setEditorState(editorState)
  }
  const case_id = history.location.search.split('=')[1]
  //获取类别列表
  const { data: caseClassList, run: GetClassList } = useRequest(CaseService.getCaseClass)
  const { data, run: getCaseById } = useRequest(CaseService.getListById, {
    manual: true,
    onSuccess: (res) => {
      setCaseClass(res.case_class)
      form.setFieldsValue({
        caseContent: BraftEditor.createEditorState(data?.caseContent),
        caseTitle: data?.caseTitle,
        caseDiscription: data?.caseDiscription,
        caseSort: data?.case_class
      })
    }
  })

  const { run: updateCase } = useRequest(CaseService.updateCase, {
    manual: true,
    onSuccess: (res) => {
      {
        if (res?.code === 200) {
          setFileList([])
          message.success('发布成功')
          history.goBack()
        } else if (res?.code === 400) {
          message.error('发布失败:文件格式有误')
        } else {
          message.error('发布失败：服务内部错误')
        }
      }
      return res
    }
  })

  useEffect(() => {
    getCaseById({ case_id })
  }, [case_id, form])

  const props = {
    onRemove: (file: any) => {
      const index = fileList.indexOf(file)
      const newFileList = fileList.slice()
      newFileList.splice(index, 1)
      setFileList(newFileList)
    },
    beforeUpload: (file: any) => {
      setFileList([file])
      return false
    },
    fileList
  }

  const handleUpload = (formData: any) => {
    updateCase(formData)
  }

  const onBack = () => {
    history.goBack()
  }
  const publishCase = (value: any) => {
    const { caseTitle, caseDiscription, caseSort } = value
    const caseContent = editorState.toHTML()

    const formData = new FormData()
    fileList.forEach((file: string | Blob, i: any) => {
      formData.append('file', file)
    })
    formData.append('caseTitle', caseTitle)
    formData.append('caseContent', caseContent)
    formData.append('caseDiscription', caseDiscription)
    formData.append('case_id', case_id)
    formData.append('caseClass', caseSort)

    handleUpload(formData)
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
            title={<div>修改案例中...</div>}
          />
          <Form form={form} onFinish={publishCase}>
            <Row>
              <Col span={20}>
                {' '}
                <Form.Item
                  name="caseSort"
                  rules={[{ required: true, message: '分类必须选' }]}
                  label="案例类别"
                >
                  <Select initialvalue={data?.case_class} disabled={false} style={{ width: 120 }}>
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
              <Button icon={<UploadOutlined />}>
                请在这里上传要更新文件，不更新则保留之前已上传的文件
              </Button>
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

export default EditCase
