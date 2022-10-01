import { history } from 'umi'
import { FC, useEffect, useState } from 'react'
import { Layout, Spin, Result, Button, Tag } from 'antd'
import { LoadingOutlined, LikeTwoTone, CheckCircleTwoTone, EditTwoTone } from '@ant-design/icons'
import { useRequest } from 'ahooks'
import { useDispatch, useSelector } from 'dva'

import styles from './index.less'
import StepBar from '../stepBar/index'
import { AdaptiveLearningServices } from '@/services'
import { IKnowledgeList } from '@/services/adaptiveLearning/types'
import { ACTIONS } from '@/models'
import { STAGE } from '@/constants/adaptiveLearning'

let isUserPass: boolean | null = null // 判断用户是否通过测验

const TEACHER = '2'

const scoreResult: FC = () => {
  const dispatch = useDispatch()
  const user = useSelector((state: any) => state.user)
  const adaptiveLearning = useSelector((state: any) => state.adaptiveLearning)
  const [isChecked, setIsChecked] = useState(false) // 后台是否检测完成
  const [isPass, setIsPass] = useState(isUserPass) // 是否通过测试
  // 提交测试请求
  const { data: testResponse, run: runTestRequest } = useRequest(
    AdaptiveLearningServices.submitAnswers,
    {
      manual: true,
      onSuccess: () => {
        // 清空答案列表，在知识点学习页面返回此页时才不会提交请求
        dispatch({
          type: ACTIONS.adaptiveLearning.setAnswerList,
          payload: { answerList: [] }
        })
        setIsChecked(true)
        // 判断是否进行学习或通过测试
        if (
          testResponse?.isFinish! >= STAGE.BEFOREFINALTEST ||
          testResponse!.accuracy >= 0.6 ||
          adaptiveLearning.isFirstTime
        ) {
          setIsPass(true)
          // 更新学习状态
          dispatch({
            type: ACTIONS.adaptiveLearning.setReviewState,
            payload: { isReview: false }
          })
          // 更新知识点信息
          dispatch({
            type: ACTIONS.adaptiveLearning.setKnowledgeList,
            payload: { knowledgeList: testResponse?.knowledge_list }
          })
        } else {
          setIsPass(false)
        }
      }
    }
  )
  // 提交期末测试请求
  const { data: finalTestResponse, run: runFinalTest } = useRequest(
    AdaptiveLearningServices.submitFinalExam,
    {
      manual: true,
      onSuccess: () => {
        // 保存分数
        dispatch({
          type: ACTIONS.adaptiveLearning.setFinalScore,
          payload: { finalScore: finalTestResponse?.grade }
        })
        history.push('./finishAll')
      }
    }
  )

  // 组件挂载即发送请求提交答案
  useEffect(() => {
    dispatch({
      type: ACTIONS.adaptiveLearning.setReviewState,
      payload: { isReview: false }
    })
    if (adaptiveLearning.answerList.length !== 0) {
      const startTime = adaptiveLearning.startTime
      const endTime = new Date().getTime()
      const useTime = (endTime - startTime) / 1000
      adaptiveLearning.hasMock
        ? runFinalTest({ time_used: Math.round(useTime), answer: adaptiveLearning.answerList })
        : runTestRequest({ time_used: Math.round(useTime), answer: adaptiveLearning.answerList })
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
    dispatch({
      type: ACTIONS.adaptiveLearning.setReviewState,
      payload: { isReview: true }
    })
    history.push('./unitStudy')
  }

  // 返回个人中心
  const handleGoBackToUserCenter = () => {
    if (user.userInfo?.roleId === TEACHER) history.push('/userCenter/myClassList')
    else history.push('/userCenter/student/classList')
  }

  // 进入期末测试
  const handleFinalTest = () => {
    dispatch({
      type: ACTIONS.adaptiveLearning.setTestState,
      payload: { hasMock: true }
    })
    history.push('./mockOrFinalTest')
  }

  // 根据完成阶段选择渲染内容
  const renderStage = (stageNumber: number | null | undefined) => {
    if (!stageNumber) return
    else {
      switch (stageNumber) {
        // 未完成学习
        case STAGE.HAVENFINISHED:
          return (
            // 通过测试，显示正确率并展示知识点列表
            <div className={styles.passExam}>
              <p style={{ display: testResponse?.accuracy ? 'block' : 'none' }}>
                {`检测完成，你的正确率为${testResponse?.accuracy! * 100}%`}
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
          )
        // 未进行模拟测试
        case STAGE.BEFOREMOCK:
          return (
            <Result
              title="已完成全部知识点学习"
              icon={<CheckCircleTwoTone />}
              extra={
                <Button
                  type="primary"
                  size="large"
                  onClick={() => {
                    history.push('./mockOrFinalTest')
                  }}
                >
                  进入模拟测试
                </Button>
              }
            />
          )
        // 未进行期末测试
        case STAGE.BEFOREFINALTEST:
          if (testResponse?.accuracy === 1) {
            return (
              <Result
                title="已完成模拟测试"
                subTitle={`您的正确率为${testResponse?.accuracy! * 100}%`}
                icon={<EditTwoTone />}
                extra={
                  <Button
                    type="primary"
                    size="large"
                    onClick={() => {
                      handleFinalTest()
                    }}
                  >
                    进入期末测试
                  </Button>
                }
              />
            )
          }
          // 模拟测试正确率小于1需要复习
          else {
            return (
              <div className={styles.passExam}>
                <p style={{ display: testResponse?.accuracy ? 'block' : 'none' }}>
                  {`检测完成，你的正确率为${
                    testResponse?.accuracy! * 100
                  }%,，您有以下知识点需要复习`}
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
            )
          }
      }
    }
  }

  return (
    <Layout className={styles.scoreResultOuter}>
      <StepBar currentStep={1} />
      {(isChecked &&
        (isPass ? (
          // 通过测试，按步骤渲染
          renderStage(testResponse?.isFinish ?? adaptiveLearning.stage)
        ) : (
          // 测试不通过
          <Result
            className={styles.checkedNotPass}
            title={`提交成功！您的正确率为${testResponse?.accuracy! * 100}%，请尽快复习`}
            icon={<LikeTwoTone />}
            extra={
              <Button type="primary" size="large" onClick={handleRetry}>
                返回复习
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
      <div style={{ height: '400px', background: 'white' }}></div>
    </Layout>
  )
}

export default scoreResult
