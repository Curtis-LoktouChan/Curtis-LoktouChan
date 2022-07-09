import { history } from 'umi'
import { FC, useEffect } from 'react'
import { Layout, Menu, PageHeader, Button } from 'antd'
import { RollbackOutlined } from '@ant-design/icons'
import { useRequest } from 'ahooks'
import { useDispatch, useSelector } from 'dva'
import { BankTwoTone, AliwangwangOutlined, PlusSquareOutlined } from '@ant-design/icons'

import { ACTIONS } from '@/models'
import styles from './index.less'
import { AdaptiveLearningServices } from '@/services'

const UnitStudy: FC = () => {
  const dispatch = useDispatch()
  const adaptiveLearning = useSelector((state: any) => state.adaptiveLearning)
  const { data, run } = useRequest(AdaptiveLearningServices.getKnowledge, {
    manual: true,
    onSuccess: () => {}
  })

  const handlePageBack = () => {
    history.push('/userCenter/myClassList')
  }

  return (
    <Layout style={{ backgroundColor: 'white' }}>
      <PageHeader
        style={{ backgroundColor: '#DDEEFF' }}
        backIcon={
          <div
            style={{ color: 'green' }}
            onClick={() => {
              history.goBack()
            }}
          >
            <RollbackOutlined />
            <p style={{ color: 'green' }}>返回</p>
          </div>
        }
        onBack={handlePageBack}
        title="添加小节"
        subTitle={adaptiveLearning.knowledgeName}
        extra={[<Button></Button>]}
      />
      <div style={{ height: '400px' }}></div>
    </Layout>
  )
}

export default UnitStudy
