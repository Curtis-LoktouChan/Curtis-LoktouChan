import { FC } from 'react'
import { ConfigProvider, Layout, Button } from 'antd'
import zhCN from 'antd/lib/locale/zh_CN'

import styles from './index.less'
import HomeService from '@/services/home'
import { useRequest } from 'ahooks'

import Header from '@/components/header'
import MyCarousel from './components/myCarousel'
import Introduction from './components/introduction'
import Hardware from './components/hardware'
import Course from './components/course'
import Work from './components/work'
import SoftDownload from './components/softDownload'

const Home: FC = () => {
  return (
    <ConfigProvider locale={zhCN}>
      <Layout>
        <Layout.Content className={styles.homeContainer}>
          {/* <HomeAffix /> */}
          <Header />
          <MyCarousel />
          <Introduction />
          <Hardware />
          <Course />
          <Work />
          <SoftDownload />
        </Layout.Content>
        <Layout.Footer style={{ justifyContent: 'space-around', alignItems: 'center' }}>
          {/* <Footer /> */}
        </Layout.Footer>
      </Layout>
    </ConfigProvider>
  )
}

export default Home
