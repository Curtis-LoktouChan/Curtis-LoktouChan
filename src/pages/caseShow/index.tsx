import { FC } from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import { Layout, Row, Col, ConfigProvider } from 'antd'
import zhCN from 'antd/lib/locale/zh_CN'

import styles from './index.less'
import Header from '@/components/header'
import Footer from '@/components/footer'
import CaseShowIndex from './caseShowIndex'
import ViewCase from './viewCase'
import PublishCase from './publishCase'
import EditCase from './editCase'

const CaseShow: FC = (props) => {
  return (
    <ConfigProvider locale={zhCN}>
      <Layout>
        <Layout.Content className={styles.homeContainer}>
          <Header />
          <Row>
            <Col span={1}></Col>
            <Col span={22}>{props.children}</Col>
          </Row>
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

export default CaseShow
