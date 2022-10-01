import { history } from 'umi'
import { FC } from 'react'
import { Button } from 'antd'
import { FileTextTwoTone } from '@ant-design/icons'

import styles from './index.less'

const Course: FC = () => {
  return (
    <div className={styles.courseOuter}>
      <div>
        <div className={styles.courseHeader}>
          <FileTextTwoTone className={styles.courseIcon} />
          <span>课程案例</span>
        </div>
        <Button
          size="small"
          type="link"
          onClick={() => {
            history.push('/courseCenter')
          }}
        >
          查看更多
        </Button>
      </div>
    </div>
  )
}

export default Course
