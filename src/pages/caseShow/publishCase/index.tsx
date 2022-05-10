import { FC } from 'react'
import { ConfigProvider, Layout } from 'antd'
import zhCN from 'antd/lib/locale/zh_CN'

import styles from './index.less'

import { UploadOutlined, LeftCircleTwoTone } from '@ant-design/icons'
import { PageHeader, Form, Col, Button, Row, Input, Upload, message } from 'antd'
import Header from '@/components/header'

const Publishcase: FC = () => {
  return (
    <ConfigProvider locale={zhCN}>
      <Layout>
        <Layout.Content className={styles.homeContainer}>
          {/* <HomeAffix /> */}
          <Header />
          <div style={{ marginTop: '-20px', marginBottom: '20px' }}>
            {' '}
            <PageHeader
              backIcon={<LeftCircleTwoTone style={{ fontSize: '30px' }} />}
              // onBack={onBack}
              title={<div>编写案例中...</div>}
            />
            <Form
              name="caseForm"
              // onFinish={publishCase}
              // onFinishFailed={submitFailed}
            >
              <Row>
                <Col span={20}>
                  {' '}
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
                    <Button
                      style={{ float: 'right' }}
                      size="large"
                      type="primary"
                      htmlType="submit"
                    >
                      {/* {uploading ? '正在发布...' : '发布'} */}
                      正在发布
                    </Button>
                  </Form.Item>
                </Col>
              </Row>

              <Form.Item name="caseContent">
                {/* <BraftEditor
                  value={editorState}
                  onChange={handleEditorChange}
                  placeholder="请输入正文..."
                /> */}
              </Form.Item>
            </Form>
            <Row>
              <Upload maxCount={1} accept=".xml">
                <Button icon={<UploadOutlined />}>上传案例文件(最多上传1个)</Button>
              </Upload>
            </Row>
          </div>
        </Layout.Content>
        <Layout.Footer style={{ justifyContent: 'space-around', alignItems: 'center' }}>
          {/* <Footer /> */}
        </Layout.Footer>
      </Layout>
    </ConfigProvider>
  )
}
export default Publishcase
