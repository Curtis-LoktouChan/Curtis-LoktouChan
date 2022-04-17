import { FC } from 'react'
import { ConfigProvider, Layout, Button } from 'antd'
import zhCN from 'antd/lib/locale/zh_CN'

import styles from './index.less'
import HomeService from '@/services/home'
import { useRequest } from 'ahooks'

import Header from '@/components/header'
import MyCarousel from '@/components/home/myCarousel'
import Introduction from '@/components/home/introduction'
import Hardware from '@/components/home/hardware'
import Course from '@/components/home/course'
import Work from '@/components/home/work'
import SoftDownload from '@/components/home/softDownload'

const Home: FC = () => {
  // ahooks 的 useRequest 举例
  const { data, run } = useRequest(HomeService.testApi, {
    defaultParams: [{ mode: 'test' }],
    manual: true,
    onSuccess: (res) => {
      console.log('成功', res)
      return res
    },
    onError: (reason) => {
      console.log('失败', reason)
    }
  })

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
