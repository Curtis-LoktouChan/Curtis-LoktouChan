import { FC } from 'react'
import { ConfigProvider, Layout } from 'antd'
import zhCN from 'antd/lib/locale/zh_CN'

import styles from './index.less'

import Header from '@/components/header'
import Footer from '@/components/footer'
import MyCarousel from './components/carousel'
import Introduction from './components/introduction'
import Hardware from './components/hardware'
import Course from './components/course'
import Work from './components/work'
import SoftDownload from './components/softDownload'
import HomeAffix from './components/affix'

const Home: FC = () => {
  //新增HomeAffix
  return (
    <ConfigProvider locale={zhCN}>
      <Layout>
        <Layout.Content className={styles.homeContainer}>
          <HomeAffix />
          <Header />
          <MyCarousel />
          <Introduction />
          <Hardware />
          <Course />
          <Work />
          <SoftDownload />
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

export default Home
