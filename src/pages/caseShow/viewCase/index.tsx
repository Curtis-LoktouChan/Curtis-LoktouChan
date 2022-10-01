// @ts-nocheck   忽略ts检查
import { FC, useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { PageHeader, Row, Button, message, Col, Layout, ConfigProvider } from 'antd'
import zhCN from 'antd/lib/locale/zh_CN'
import { useSelector } from 'dva'
import { useRequest } from 'ahooks'
import { LeftCircleTwoTone, FullscreenOutlined } from '@ant-design/icons'
//引入富文本编辑器
import BraftEditor from 'braft-editor'
import 'braft-editor/dist/index.css'

import styles from './index.less'
import Header from '@/components/header'
import Footer from '@/components/footer'
import CaseService from '@/services/caseShow'

const downloadFiles = (data: Blob, filename: string) => {
  // 接收的是文件流，需要转化一下
  const blob = new Blob([data])
  if (typeof window.chrome !== 'undefined') {
    // Chrome version
    const link = document.createElement('a')
    link.href = window.URL.createObjectURL(blob)
    link.download = filename
    link.click()
  } else if (typeof nav.msSaveBlob !== 'undefined') {
    // IE version
    blob = new Blob([data], { type: 'application/force-download' })
    nav.msSaveBlob(blob, filename)
  } else {
    //Firefox version
    const file = new File([data], filename, { type: 'application/force-download' })
    window.open(URL.createObjectURL(file))
  }
}

const ViewCase: FC = () => {
  const user = useSelector((state: any) => state.user)
  const history = useHistory()
  const case_id = history.location.search.split('=')[1]
  const { run: download } = useRequest(CaseService.downloadCaseFile, {
    manual: true,
    onSuccess: (res) => {
      downloadFiles(res?.fileContent, data?.fileName)
    }
  })
  const { data, run: getListById } = useRequest(CaseService.getListById, {})
  const fullScreen = () => {
    if (window.previewWindow) {
      window.previewWindow.close()
    }

    window.previewWindow = window.open()
    window.previewWindow.document.write(data.caseContent)
    window.previewWindow.document.close()
  }

  useEffect(() => {
    getListById({ case_id })
  }, [case_id])

  const onBack = () => {
    history.goBack()
  }

  return (
    <ConfigProvider locale={zhCN}>
      <Layout>
        <Layout.Content className={styles.homeContainer}>
          <Header />

          <div style={{ marginTop: '-20px', marginBottom: '20px' }}>
            {' '}
            <PageHeader
              backIcon={<LeftCircleTwoTone style={{ fontSize: '30px' }} />}
              onBack={onBack}
              title={
                data === null ? null : (
                  <Row>
                    <Col style={{ color: 'green' }}>【案例】</Col>
                    {data?.caseTitle}
                    <Col style={{ color: '#fb7299', fontSize: '15px' }}>
                      【作者】{data === null ? null : data?.author}
                    </Col>
                  </Row>
                )
              }
            />
            <BraftEditor
              value={data === null ? null : BraftEditor.createEditorState(data?.caseContent)}
              controls={[]}
              readOnly={true}
              style={{ background: '#59a5e926' }}
            />
            <Row justify="end">
              <Button type="ghost" onClick={fullScreen} style={{ color: 'green' }}>
                <FullscreenOutlined />
                全屏
              </Button>
            </Row>
            <Row>
              <p style={{ fontSize: '20px', color: 'green' }}>附件下载:</p>
            </Row>
            <div style={{ marginTop: '-20px' }}>
              {data === null ? null : (
                <Button
                  type="link"
                  onClick={() => {
                    if (user?.isLogin) {
                      download({ url: data?.url })
                    } else {
                      history.push('/waitToLogin')
                    }
                  }}
                >
                  {data?.fileName}
                </Button>
              )}
            </div>
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
    </ConfigProvider>
  )
}

export default ViewCase
