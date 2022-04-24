import { history } from 'umi'
import { FC } from 'react'
import { Image, Button } from 'antd'
import { IdcardTwoTone } from '@ant-design/icons'

import styles from './index.less'
import aboutUs from '@/assets/banners/aboutUs.jpg'

const Introduction: FC = () => {
  return (
    <div className={styles.introductionOuter}>
      <div>
        <div className={styles.introductionHeader}>
          <IdcardTwoTone className={styles.introductionIcon} />
          <span>关于我们</span>
        </div>
        <div className={styles.introductionBody}>
          <div className={styles.introductionBodyImage}>
            <Image src={aboutUs} preview={false} />
          </div>
          <div className={styles.introductionBodyPara}>
            <p>
              我们是华光人工智能教育机器人创新团队，简称华光教育，是研发智能教育机器人的硬件、软件、课程、平台的创新团队，致力于普及与推广中小学人工智能教育。
              <br />
              团队是一支复合型的队伍。成员分别来自“双一流”建设高校华南师范大学的信息光电子科技学院、物理与电信学院和经济与管理学院。涵盖技术类专业、教育类专业以及管理类专业。
            </p>
            <Button
              size="small"
              type="link"
              onClick={() => {
                history.push('./aboutUs')
              }}
            >
              查看更多
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Introduction
