import { history } from 'umi'
import { FC } from 'react'
import { Image, Button } from 'antd'

import styles from './index.less'
import logo from '@/assets/logo.png'
import qrCode from './qrCode.jpg'

const Footer: FC = () => {
  return (
    <div className={styles.footerContainer}>
      <div>
        <div className={styles.footerHeader}>
          <div className={styles.footerHeaderLogo}>
            <Image width={150} src={logo} />
          </div>
          <div className={styles.footerHeaderLink}>
            <div>
              <Button type="link">报个bug</Button>
              <Button type="link">常见问题</Button>
              <Button type="link">商务合作</Button>
            </div>
            <div>
              <Button type="link">关于我们</Button>
              <Button type="link">联系我们</Button>
              <Button type="text">微信公众号</Button>
            </div>
          </div>
          <div className={styles.footerHeaderQrCode}>
            <Image width={100} src={qrCode} />
          </div>
        </div>
        <p className={styles.footerBody}>
          Copyright © 2021 - 现在 All Rights Reserved. 华光人工智能教育机器人创新团队版权所有
          <br />
          备案号：粤ICP备19153801号-1
        </p>
        <span className={styles.footerBottom}>
          TEL : 13360493656 联系/合作E-mail : 2638261141@qq.com
        </span>
      </div>
    </div>
  )
}

export default Footer
