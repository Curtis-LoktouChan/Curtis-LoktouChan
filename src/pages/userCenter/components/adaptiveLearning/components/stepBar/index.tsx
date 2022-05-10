import { FC } from 'react'
import { Steps } from 'antd'

import styles from './index.less'

interface PropsType {
  currentStep: number
}

const { Step } = Steps

const StepBar: FC<PropsType> = (props: PropsType) => {
  const { currentStep } = props

  return (
    <Steps className={styles.stepsOuter} current={currentStep}>
      <Step title="能力水平初探" />
      <Step title="查看结果" />
      <Step title="查漏补缺" />
      <Step title="生成推荐" />
    </Steps>
  )
}

export default StepBar
