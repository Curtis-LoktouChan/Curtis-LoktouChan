import { FC, useState } from 'react'
import { Layout, PageHeader, Descriptions, Image, Button } from 'antd'

import Header from '@/components/header'
import Footer from '@/components/footer'
import styles from './index.less'
import qrCode from '@/assets/qrCode.jpg'

const Developing: FC = () => {
  const [visible, setVisible] = useState(false)

  return (
    <Layout>
      <Layout.Content style={{ backgroundColor: 'white' }}>
        <Header />
        <PageHeader title="联系我们" backIcon={false} style={{ width: '60%', margin: 'auto' }}>
          <Descriptions size="small" column={3}>
            <Descriptions.Item label="团队">华光人工智能教育机器人创新团队</Descriptions.Item>
            <Descriptions.Item label="电话">13360493656</Descriptions.Item>
            <Descriptions.Item label="工作地点">广州市番禺大学城</Descriptions.Item>
            <Descriptions.Item label="微信">
              <a onClick={() => setVisible(true)}>微信公众号</a>
            </Descriptions.Item>
            <Descriptions.Item label="Address">
              University Town, Panyu District, Guangzhou, Guangdong, 510006 P.R. China
            </Descriptions.Item>
          </Descriptions>
        </PageHeader>
        <Image
          style={{ display: 'none' }}
          src={qrCode}
          preview={{
            visible,
            onVisibleChange: (value) => setVisible(value)
          }}
        />
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

export default Developing
