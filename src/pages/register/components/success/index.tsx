import { FC } from 'react'
import { history } from 'umi'
import { Image, Button } from 'antd'

import logo from '@/assets/logo.png'
import styles from './index.less'

const RegisterSuccess: FC = () => {
  return (
    <div className={styles.container}>
      <div className={styles.logo}>
        <Image src={logo} preview={false} onClick={() => history.push('./home')} />
      </div>
      <div>
        <p>
          注册成功，
          <Button
            type="link"
            onClick={() => {
              history.push('./login')
            }}
          >
            前往登录
          </Button>
        </p>
      </div>
    </div>
  )
}

export default RegisterSuccess
