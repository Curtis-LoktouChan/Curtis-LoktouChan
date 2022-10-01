import { FC } from 'react'
import { Layout } from 'antd'

import Header from '@/components/header'
import Footer from '@/components/footer'
import Banner from '@/components/banner'
import styles from './index.less'
import topImage from '../../assets/banners/customerWork.jpg'
import WorkDetails from './getMyWork'

const customWork: FC = () => {
  return (
    <Layout>
      <Layout.Content style={{ backgroundColor: 'white' }}>
        <Header />
        <Banner imgSrc={topImage}></Banner>
        <WorkDetails></WorkDetails>
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
