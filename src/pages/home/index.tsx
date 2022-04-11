import { FC } from 'react'
import { ConfigProvider, Layout } from 'antd'
import zhCN from 'antd/lib/locale/zh_CN'

import styles from './index.less'
import HomeService from '@/services/home'
import { useRequest } from 'ahooks'

import Header from '@/components/header'

const Home: FC = () => {
  // ahooks 的 useRequest 举例
  const { data, run } = useRequest(HomeService.testApi, {
    defaultParams: [{ mode: 'test' }],
    onSuccess: (res) => {
      console.log(res)
      return res
    }
  })

  return (
    <ConfigProvider locale={zhCN}>
      <Layout>
        <Layout.Content className={styles.homeContainer}>
          {/* <HomeAffix /> */}
          <Header />
          {/* <MyCarousel />
            <Introduction />
            <Hardware />
            <Course />
            <Work />
            <SoftDownload /> */}
        </Layout.Content>
        <Layout.Footer style={{ justifyContent: 'space-around', alignItems: 'center' }}>
          {/* <Footer /> */}
        </Layout.Footer>
      </Layout>
    </ConfigProvider>
  )
}

export default Home
