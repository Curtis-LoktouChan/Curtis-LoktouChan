import { history } from 'umi'
import { FC } from 'react'
import { useSelector } from 'dva'
import { Result, Button } from 'antd'
import { SmileOutlined } from '@ant-design/icons'

import styles from './index.less'

const FinishAll: FC = () => {
  const finalScore = useSelector((state: any) => state.adaptiveLearning.finalScore)

  return (
    <Result
      icon={<SmileOutlined />}
      title={
        finalScore !== null
          ? `测试完成，您的期末成绩是${finalScore}`
          : `恭喜你！已完成所有内容的学习`
      }
      subTitle={finalScore !== null ? '恭喜你！已完成所有内容的学习' : ''}
      extra={
        <Button
          type="primary"
          size="large"
          onClick={() => {
            history.push('/home')
          }}
        >
          返回主页
        </Button>
      }
    />
  )
}

export default FinishAll
