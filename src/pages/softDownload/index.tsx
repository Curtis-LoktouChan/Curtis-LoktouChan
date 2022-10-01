import { FC } from 'react'
import { Layout } from 'antd'

import Header from '@/components/header'
import Footer from '@/components/footer'
import styles from './index.less'
import Raspberry from './raspberry'
import Windows from './windows'
import Banner from '@/components/banner'
import softDownLoad from '../../assets/banners/softDownload.jpg'

const SoftDownloadPage: FC = () => {
  return (
    <Layout>
      <Layout.Content style={{ backgroundColor: 'white' }}>
        <Header />
        <Banner imgSrc={softDownLoad}></Banner>
        <Raspberry />
        <Windows />
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

export default SoftDownloadPage
