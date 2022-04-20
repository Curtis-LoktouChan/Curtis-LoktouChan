import React from 'react'
import { FC } from 'react'

import Header from '@/components/header'
import styles from './index.less'

import { Layout } from 'antd'

// import Header from "../components/header";
// import Footer from "../components/footer";
import Raspberry from './raspberry'
import Windows from './windows'
// import Banner from "../components/banner";

const SoftDownloadPage: FC = () => {
  // class SoftDownloadPage extends React.Component {
  //     render(){
  return (
    <Layout className={styles.homeContainer}>
      <Layout.Content>
        <Header />
        {/* <Banner imgSrc="assets/banners/softDownload.jpg" /> */}
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
