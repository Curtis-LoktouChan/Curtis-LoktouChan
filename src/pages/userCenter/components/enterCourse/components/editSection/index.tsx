// @ts-nocheck
import { history, useLocation } from 'umi'
import { FC, useState, useEffect } from 'react'
import { Layout, PageHeader, Button, Form, Input, Upload, message } from 'antd'
import { RollbackOutlined } from '@ant-design/icons'
import { useRequest } from 'ahooks'
import BraftEditor from 'braft-editor'
import 'braft-editor/dist/index.css'

import { UserCenterServices } from '@/services'
import { sectionTypeWithIconPair, typeKeyValue } from '../sectionTypeWithIcon'
import { getFileFromServer, downloadFileFromBlob } from '@/utils/fileFetch/index'

const SECTIONTYPE = 0
const SECTIONICON = 1

const EditorSection: FC = () => {
  const location = useLocation()
  const [sectionForm] = Form.useForm()
  const [editorValue, setEditorValue] = useState(BraftEditor.createEditorState(null))
  const [file, setFile] = useState({})
  // 获取小节信息
  const { data: sectionData, run: getSectionRequest } = useRequest(UserCenterServices.getSection, {
    manual: true,
    onSuccess: (res) => {
      sectionForm.setFieldsValue({
        sectionContent: BraftEditor.createEditorState(res?.sectionContent)
      })
    }
  })
  // 更新小节
  const { data: courseWareFile, run: editorSectionRequest } = useRequest(
    UserCenterServices.editorSection,
    {
      manual: true,
      onSuccess: (res) => {
        history.push('/userCenter/enterCourse/courseCatalog')
      }
    }
  )

  useEffect(async () => {
    const { classID, ID, chapterID, sectionType } = (location as any)?.query.section
    const file = await getFileFromServer(
      `http://42.192.82.19:50000/api/v1/teacher/getSection?sectionID=${ID}&chapterID=${chapterID}&classID=${classID}&sectionType=课件`
    )
    setFile(file)
    // getSectionRequest({
    //   classID,
    //   chapterID,
    //   sectionID: ID,
    //   sectionType
    // })
  }, [])

  const handlePageBack = () => {
    history.push('/userCenter/myClassList')
  }

  // 提交小节信息
  const handleSubmit = (values) => {
    let sectionContent
    const formData = new FormData()
    // 课件类型小节要传文件
    if ((location as any)?.query?.section?.sectionType === '课件') {
      sectionContent = ''
      formData.append('file', values.courseWare.fileList[0].originFileObj)
    } else {
      sectionContent = values.sectionContent ? values.sectionContent.toHTML() : '<p></p>'
    }
    formData.append('classID', (location as any)?.query?.section?.classID)
    formData.append('chapterID', (location as any)?.query?.section?.chapterID)
    formData.append('sectionTitle', values.sectionTitle)
    formData.append('sectionContent', sectionContent)
    formData.append('sectionType', (location as any)?.query?.section?.sectionType)
    formData.append('sectionID', (location as any)?.query?.section?.ID)
    editorSectionRequest(formData)
  }

  const handleViewCourseWare = () => {
    downloadFileFromBlob(file?.fileBlob, file.fileName)
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
        subTitle={(location as any)?.query?.section?.sectionTitle}
        extra={[
          <Button
            type="primary"
            onClick={async () => {
              try {
                await sectionForm.validateFields()
                if ((location as any)?.query?.section?.sectionType === '课件') {
                  const fileContent = sectionForm.getFieldValue('courseWare')
                  !fileContent ? message.info('课件没有更新') : sectionForm.submit()
                } else {
                  sectionForm.submit()
                }
              } catch (e) {
                console.error(e)
              }
            }}
          >
            保存
          </Button>,
          <div>
            {
              (location as any)?.query?.section?.sectionType &&
                typeKeyValue[(location as any)?.query?.section?.sectionType]() // 离谱的用法
            }
            {(location as any)?.query?.section?.sectionType}
          </div>
        ]}
      />
      <Form form={sectionForm} onFinish={handleSubmit}>
        <Form.Item
          label="小节标题"
          name="sectionTitle"
          rules={[{ required: true, message: '请输入正确小节标题！' }]}
          initialValue={(location as any)?.query?.section?.sectionTitle}
        >
          <Input.TextArea
            placeholder="请输入小节标题"
            maxLength={100}
            showCount={true}
          ></Input.TextArea>
        </Form.Item>
        {(location as any)?.query?.section?.sectionType !== '课件' ? (
          <Form.Item label="√小节正文" name="sectionContent">
            <BraftEditor
              value={editorValue}
              onChange={(editorNewValue) => {
                setEditorValue(editorNewValue)
              }}
            />
          </Form.Item>
        ) : (
          <>
            <Form.Item name="courseWare">
              <Upload
                accept=".pdf, .ppt, .pptx"
                // onChange={handleChange}
                maxCount={1}
                beforeUpload={() => false}
              >
                <Button type="primary">上传文件</Button>
              </Upload>
            </Form.Item>
            <Button onClick={handleViewCourseWare}>查看原课件</Button>
          </>
        )}
      </Form>
      <div style={{ height: '400px' }}></div>
    </Layout>
  )
}

export default EditorSection
