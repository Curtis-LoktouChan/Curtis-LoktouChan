import { history } from 'umi'
import { FC } from 'react'
import { Layout, Button, Result } from 'antd'
import { RocketTwoTone } from '@ant-design/icons'

import Header from '@/components/header'
import Footer from '@/components/footer'
import styles from './index.less'

const waitToLogin: FC = () => {
  return (
    <Layout>
      <Layout.Content className={styles.waitToLoginontainer}>
        <Header />
        <Result
          icon={<RocketTwoTone />}
          title="您尚未登录"
          extra={
            <span>
              <Button
                type="primary"
                onClick={() => {
                  history.push('/home')
                }}
              >
                返回主页
              </Button>
              &nbsp;&nbsp;&nbsp;
              <Button
                type="primary"
                onClick={() => {
                  history.push('/login')
                }}
              >
                去登陆
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

export default waitToLogin
