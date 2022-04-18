import { history } from 'umi'
import { FC } from 'react'
import { Button, Image } from 'antd'

import softDownload from '@/assets/softDownload.jpg'
import styles from './index.less'

const SoftDownload: FC = () => {
  return (
    <div className={styles.softwareOuter}>
      <div className={styles.softwareBody}>
        <div className={styles.softwareImage}>
          <Image src={softDownload} preview={true} />
        </div>
        <div className={styles.softwarePara}>
          <span>软件下载</span>
          <br />
          <span>
            软件简介：一款图形化编程软件，能够配合树莓派以及硬件使用，也能在window上面流畅运行对应仿真程序，具备编写人工智能程序能力
          </span>
          <br />
          <Button
            size="small"
            type="link"
            onClick={() => {
              history.push('./softDownload')
            }}
          >
            前往下载
          </Button>
        </div>
      </div>
    </div>
  )
}

export default SoftDownload
