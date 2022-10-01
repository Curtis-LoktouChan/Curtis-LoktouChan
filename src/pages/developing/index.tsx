import { history } from 'umi'
import { FC } from 'react'
import { Layout, Button, Result } from 'antd'
import { RocketTwoTone } from '@ant-design/icons'

import Header from '@/components/header'
import Footer from '@/components/footer'
import styles from './index.less'

const Developing: FC = () => {
  return (
    <Layout>
      <Layout.Content style={{ backgroundColor: 'white' }}>
        <Header />
        <Result
          icon={<RocketTwoTone />}
          title="我们正在努力，敬请期待~"
          extra={
            <span>
              <Button
                type="primary"
                size="large"
                onClick={() => {
                  history.push('/home')
                }}
              >
                返回主页
              </Button>
            </span>
          }
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
