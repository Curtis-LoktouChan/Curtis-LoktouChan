import { FC } from 'react'
import { Layout } from 'antd'

import Header from '@/components/header'
import styles from './index.less'
import Raspberry from './raspberry'
import Windows from './windows'

const SoftDownloadPage: FC = () => {
  return (
    <Layout className={styles.homeContainer}>
      <Layout.Content>
        <Header />
        <Raspberry />
        <Windows />
      </Layout.Content>
      {/* <Layout.Footer justify="space-around" align="middle"> */}
      {/* <Footer /> */}
      {/* </Layout.Footer> */}
    </Layout>
  )
}

export default SoftDownloadPage
