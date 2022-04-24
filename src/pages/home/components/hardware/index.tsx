import { history } from 'umi'
import { FC } from 'react'
import { Card, Button } from 'antd'
import { CarTwoTone } from '@ant-design/icons'

import styles from './index.less'
import hardware1 from '@/assets/hardwares/raspberryExtend.png'
import hardware2 from '@/assets/hardwares/CACA NO.1.jpg'
import hardware3 from '@/assets/hardwares/CACA NO.2.jpg'
import hardware4 from '@/assets/hardwares/CACA NO.3.jpg'

const { Meta } = Card

const Hardware: FC = () => {
  return (
    <div className={styles.hardwareOuter}>
      <div>
        <div className={styles.hardwareTitle}>
          <CarTwoTone />
          <span>硬件系统</span>
        </div>
        <div className={styles.hardwareContext}>
          <Card
            className={styles.hardwareCard}
            hoverable
            cover={<img src={hardware1} alt="树莓派拓展板" />}
          >
            <Meta title="树莓派拓展板" />
          </Card>
          <Card
            className={styles.hardwareCard}
            hoverable
            cover={<img src={hardware2} alt="CACA机器人一号" />}
          >
            <Meta title="CACA机器人一号" />
          </Card>
          <Card
            className={styles.hardwareCard}
            hoverable
            cover={<img src={hardware3} alt="CACA机器人二号" />}
          >
            <Meta title="CACA机器人二号" />
          </Card>
          <Card
            className={styles.hardwareCard}
            hoverable
            cover={<img src={hardware4} alt="华小光" />}
          >
            <Meta title="华小光" />
          </Card>
        </div>
        <Button
          size="small"
          type="link"
          onClick={() => {
            history.push('./hardware')
          }}
        >
          查看更多
        </Button>
      </div>
    </div>
  )
}

export default Hardware
