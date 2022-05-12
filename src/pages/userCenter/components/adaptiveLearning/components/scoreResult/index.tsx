import { history } from 'umi'
import { FC, useEffect, useState } from 'react'
import { Layout, Spin, Result, Button, Tag } from 'antd'
import { LoadingOutlined, LikeTwoTone } from '@ant-design/icons'
import { useRequest } from 'ahooks'
import { useDispatch, useSelector } from 'dva'

import styles from './index.less'
import StepBar from '../stepBar/index'
import { AdaptiveLearningServices } from '@/services'
import { IKnowledgeList } from '@/services/adaptiveLearning/types'
import { ACTIONS } from '@/models'

let isUserPass: boolean | null = null // 判断用户是否通过测验

const TEACHER = '2'

const scoreResult: FC = () => {
  const dispatch = useDispatch()
  const user = useSelector((state: any) => state.user)
  const adaptiveLearning = useSelector((state: any) => state.adaptiveLearning)
  const [isChecked, setIsChecked] = useState(false) // 后台是否检测完成
  const [isPass, setIsPass] = useState(isUserPass) // 是否通过测试
  const { data, run } = useRequest(AdaptiveLearningServices.submitAnswers, {
    manual: true,
    onSuccess: () => {
      // 清空答案列表，在知识点学习页面返回此页时才不会提交请求
      dispatch({
        type: ACTIONS.adaptiveLearning.setAnswerList,
        payload: { answerList: [] }
      })
      setIsChecked(true)
      if (data!.isFinish) {
        setIsPass(true)
        data?.knowledge_list.length === 0 && history.push('./finishAll') // 不存在题目，表示已完成
        // 更新知识点信息
        dispatch({
          type: ACTIONS.adaptiveLearning.setKnowledgeList,
          payload: { knowledgeList: data?.knowledge_list }
        })
      } else {
        setIsPass(false)
      }
    }
  })

  // 组件挂载即发送请求提交答案
  useEffect(() => {
    if (adaptiveLearning.answerList.length !== 0) {
      const startTime = adaptiveLearning.startTime
      const endTime = new Date().getTime()
      const useTime = endTime - startTime
      run({ time_used: useTime, answer: adaptiveLearning.answerList })
    } else {
      // 答案不存在，即点击开始学习时非首次学习
      setIsChecked(true)
      setIsPass(true)
      return
    }
  }, [])

  // 点击知识点的回调
  const handleChooseKnowledge = (knowledgeName: string) => {
    // 设置知识点名称，以获取响应学习内容
    dispatch({
      type: ACTIONS.adaptiveLearning.setKnowledgeName,
      payload: { knowledgeName }
    })
    history.push('./unitStudy')
  }

  // 重新测验的回调
  const handleRetry = () => {
    if (adaptiveLearning.isLearn) {
      history.push('./unitStudy')
    } else {
      history.push('./firstTimeStudy')
    }
  }

  // 返回个人中心
  const handleGoBackToUserCenter = () => {
    if (user.userInfo?.roleId === TEACHER) history.push('/userCenter/myClassList')
    else history.push('/userCenter/student/classList')
  }

  return (
    <Layout className={styles.scoreResultOuter}>
      <StepBar currentStep={1} />
      {(isChecked &&
        (isPass ? (
          // 通过测试，显示正确率并展示知识点列表
          <div className={styles.passExam}>
            <p style={{ display: data?.accuracy ? 'block' : 'none' }}>
              {`检测完成，你的正确率为${data?.accuracy! * 100}%`}
            </p>
            <div className={styles.knowledgeList}>
              {adaptiveLearning.knowledgeList.map((knowledge: IKnowledgeList) => {
                const { id, name } = knowledge
                return (
                  <Tag
                    className={styles.knowledgeItem}
                    key={id}
                    onClick={() => {
                      handleChooseKnowledge(name)
                    }}
                    color="red"
                  >
                    {name}
                  </Tag>
                )
              })}
            </div>
            <Button
              type="primary"
              className={styles.returnToUserCenter}
              size="large"
              onClick={handleGoBackToUserCenter}
            >
              返回个人中心
            </Button>
          </div>
        ) : (
          // 测试不通过
          <Result
            className={styles.checkedNotPass}
            title={`提交成功！您的正确率为${data?.accuracy! * 100}%，请尽快复习`}
            icon={<LikeTwoTone />}
            extra={
              <Button type="primary" size="large" onClick={handleRetry}>
                {adaptiveLearning.isLearn ? '返回复习' : '重新测验'}
              </Button>
            }
          />
        ))) || (
        // 等待检测结果
        <div className={styles.waitingCheck}>
          <p>正在检测中，请等待检测结果&nbsp;.&nbsp;.&nbsp;.</p>
          <Spin className={styles.waitingCheckIcon} indicator={<LoadingOutlined />} />
        </div>
      )}
    </Layout>
  )
}

export default scoreResult
