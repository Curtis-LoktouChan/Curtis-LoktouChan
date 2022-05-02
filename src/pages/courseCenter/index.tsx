import { FC } from 'react'
import { ConfigProvider, Layout } from 'antd'
import zhCN from 'antd/lib/locale/zh_CN'

import styles from './index.less'
import Header from '@/components/header'
import { useRequest } from 'ahooks'

import courseService from '@/services/courseCenter'

const courseCenter: FC = () => {
  //请求数据
  const { data, run: getList } = useRequest(courseService.getList, {
    // defaultParams: [{ pageNumber: 1, pageSize: 2 }],
    onSuccess: (res) => {
      console.log(res)
      return res
    }
  })
  return (
    <ConfigProvider locale={zhCN}>
      <Layout>
        <Layout.Content className={styles.homeContainer}>
          <Header />
          <div></div>
        </Layout.Content>
        <Layout.Footer
          style={{ justifyContent: 'space-around', alignItems: 'center' }}
        ></Layout.Footer>
      </Layout>
    </ConfigProvider>
  )
}
export default courseCenter
