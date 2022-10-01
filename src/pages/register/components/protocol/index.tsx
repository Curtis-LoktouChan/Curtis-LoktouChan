import { FC } from 'react'
import styles from './main.less'

import { Layout } from 'antd'
import Header from '@/components/header'
import Footer from '@/components/footer'
import Protocol from './main'

const UserProtocol: FC = () => {
  return (
    <Layout className={styles.homeContainer}>
      <Layout.Content className={styles.homeContainer}>
        <Header />
        <Protocol />
      </Layout.Content>
      <Layout.Footer>
        <Footer />
      </Layout.Footer>
    </Layout>
  )
}

export default UserProtocol
