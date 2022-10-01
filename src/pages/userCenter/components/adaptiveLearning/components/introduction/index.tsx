import { history } from 'umi'
import { FC, useEffect } from 'react'
import { Button, Result } from 'antd'
import { FundTwoTone } from '@ant-design/icons'
import { useRequest } from 'ahooks'
import { useDispatch } from 'dva'

import styles from './index.less'
import { AdaptiveLearningServices } from '@/services'
import { ACTIONS } from '@/models'
import { STAGE } from '@/constants/adaptiveLearning'

const Introduction: FC = () => {
  const dispatch = useDispatch()
  const loginToken = localStorage.getItem('login_token')
  const { data, run } = useRequest(AdaptiveLearningServices.getExamList, {
    manual: true,
    onSuccess: () => {
      dispatch({
        type: ACTIONS.adaptiveLearning.setStage,
        payload: { stage: data?.isLearn }
      })
      switch (data?.isLearn) {
        // 未首次学习
        case STAGE.HAVENLEARNT:
          dispatch({
            type: ACTIONS.adaptiveLearning.setExamList,
            payload: { examList: data?.exam_list }
          })
          history.push('./firstTimeStudy')
          break
        // 未完成学习
        case STAGE.HAVENFINISHED:
          dispatch({
            type: ACTIONS.adaptiveLearning.setKnowledgeList,
            payload: { knowledgeList: data?.knowledge_list }
          })
          history.push('./scoreResult')
          break
        // 完成学习，未模拟测试
        case STAGE.BEFOREMOCK:
          history.push('./mockOrFinalTest')
          break
        // 完成模拟测试，未期末测试
        case STAGE.BEFOREFINALTEST:
          dispatch({
            type: ACTIONS.adaptiveLearning.setTestState,
            payload: { hasMock: true }
          })
          history.push('./mockOrFinalTest')
          break
        // 全部完成
        case STAGE.FINISHALL:
          history.push('./finishAll')
          break
        default:
          dispatch({
            type: ACTIONS.adaptiveLearning.setExamList,
            payload: { examList: data?.exam_list }
          })
          history.push('./firstTimeStudy')
          break
      }
    }
  })

  useEffect(() => {
    dispatch({
      type: ACTIONS.adaptiveLearning.setReviewState,
      payload: { isReview: false }
    })
  }, [])

  const handleStartLearning = () => {
    run(loginToken as string)
  }

  return (
    <>
      <Result
        title={
          <div>
            欢迎进入自适应学习系统
            <h2 style={{ color: 'green' }}> 科目:初识神经网络 </h2>
          </div>
        }
        subTitle="自适应学习系统是通过学生每一阶段的能力测评结果，再制定出适应于用户自身能力状况的学习解决方案，精准定制专属于每一位用户的动态学习计划的一种学习方式"
        icon={<FundTwoTone />}
        extra={
          <Button type="primary" size="large" onClick={handleStartLearning}>
            开始学习
          </Button>
        }
      />
    </>
  )
}

export default Introduction
