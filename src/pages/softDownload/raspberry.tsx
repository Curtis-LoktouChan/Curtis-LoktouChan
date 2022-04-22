import { FC } from 'react'
import { Image } from 'antd'
import { CarTwoTone } from '@ant-design/icons'
import styles from './index.less'
import aboutUs from '../../assets/aboutUs.png'

const Raspberry: FC = () => {
  return (
    <div className={styles.raspberryContainer}>
      <div>
        <div className={styles.raspberryTitle}>
          <CarTwoTone />
          <span>树莓派版本</span>
        </div>
        <div className={styles.raspberryContext}>
          <div className={styles.raspberryContextImgLeft}>
            <Image src={aboutUs} />
          </div>
          <div className={styles.raspberryContextText}>
            <p>
              在树莓派上运行，能够与硬件通信，完成对硬件硬件的控制。
              <br />
              一款树莓派上的图形化编程软件。
            </p>
            {/* <Button type="primary" icon={<FileAddTwoTone />} onClick={handleCardOnClick}>立即下载</Button> */}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Raspberry
