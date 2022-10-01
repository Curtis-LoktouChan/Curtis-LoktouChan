import { FC } from 'react'
import { Layout } from 'antd'

import Header from '@/components/header'
import Footer from '@/components/footer'
import styles from './index.less'

const customWork: FC = () => {
  return (
    <Layout>
      <Layout.Content style={{ backgroundColor: 'white' }}>
        <Header />
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
  )
}

export default customWork
