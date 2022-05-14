import { history } from 'umi'
import { FC, useEffect } from 'react'
import { Button, Result } from 'antd'
import { FundTwoTone } from '@ant-design/icons'
import { useRequest } from 'ahooks'
import { useDispatch } from 'dva'

import styles from './index.less'
import { AdaptiveLearningServices } from '@/services'
import { ACTIONS } from '@/models'

const Introduction: FC = () => {
  const dispatch = useDispatch()
  const loginToken = localStorage.getItem('login_token')
  const { data, run } = useRequest(AdaptiveLearningServices.getExamList, {
    manual: true,
    onSuccess: () => {
      if (!data?.isLearn) {
        // 将试题存入全局状态
        dispatch({
          type: ACTIONS.adaptiveLearning.setExamList,
          payload: { examList: data?.exam_list }
        })
        history.push('./firstTimeStudy')
      } else {
        // 不是首次学习，判断knowledge_list是否为空
        if (data?.knowledge_list.length !== 0) {
          // knowledge_list不空，未完成所有学习，跳转到结果页列出知识点
          dispatch({
            type: ACTIONS.adaptiveLearning.setKnowledgeList,
            payload: { knowledgeList: data?.knowledge_list }
          })
          history.push('./scoreResult')
        } else {
          history.push('./finishAll')
        }
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
