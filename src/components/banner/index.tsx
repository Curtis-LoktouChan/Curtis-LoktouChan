import { FC } from 'react'
import { Image } from 'antd'

import styles from './index.less'

interface myProps {
  imgSrc: string
}
const Banner: FC<myProps> = (props: myProps) => {
  const { imgSrc } = props
  return (
    <div className={styles.bannerContainer}>
      <div>
        <Image src={imgSrc} width={'80%'} preview={false}></Image>
      </div>
    </div>
  )
}
export default Banner
