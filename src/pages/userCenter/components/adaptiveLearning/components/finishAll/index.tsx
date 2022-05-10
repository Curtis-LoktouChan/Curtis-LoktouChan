import { FC } from 'react'

import styles from './index.less'

const FinishAll: FC = () => {
  return (
    <div className={styles.finishAll}>
      <p>完成学习</p>
      <p>恭喜你，已经完成所有内容的学习啦！</p>
    </div>
  )
}

export default FinishAll
