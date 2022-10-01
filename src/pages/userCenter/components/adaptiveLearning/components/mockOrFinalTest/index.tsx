import { history } from 'umi'
import { FC, useEffect, useRef, MutableRefObject, useState } from 'react'
import { Button, message, Result } from 'antd'
import { useRequest } from 'ahooks'
import { useSelector, useDispatch } from 'dva'
import { CalculatorTwoTone } from '@ant-design/icons'

import { ACTIONS } from '@/models'
import styles from './index.less'
import { AdaptiveLearningServices } from '@/services'
import QuestionsAndAnswers from '../questionsAndAnswer/index'
import { ISubmitAnswer } from '@/services/adaptiveLearning/types'
import StepBar from '../stepBar'

let timeInterval: any

const MockOrFinalTest: FC = () => {
  const hasMock = useSelector((state: any) => state.adaptiveLearning.hasMock)
  const dispatch = useDispatch()
  let exam_list: any = []
  const ChildRef: MutableRefObject<any> = useRef({})
  const [examList, setExamList] = useState(exam_list)
  const [isReady, setIsReady] = useState(false)
  // 模拟测试
  const { data: mockExamData, run: runMockExam } = useRequest(AdaptiveLearningServices.mockExam, {
    manual: true,
    onSuccess: () => {
      setExamList(mockExamData!.exam_list)
    }
  })
  // 期末测试
  const { data: finalExamData, run: runFinalExam } = useRequest(
    AdaptiveLearningServices.finalExam,
    {
      manual: true,
      onSuccess: () => {
        setExamList(finalExamData!.exam_list)
      }
    }
  )

  useEffect(() => {
    // 条件判断，模拟测试或期末测试
    !hasMock ? runMockExam() : runFinalExam()

    return () => {
      // 设为未模拟操作，避免误操作
      dispatch({
        type: ACTIONS.adaptiveLearning.setTestState,
        payload: { hasMock: false }
      })
      // 结束测试，结束计时
      dispatch({
        type: ACTIONS.adaptiveLearning.setTestingState,
        payload: { isTesting: false }
      })
      timeInterval && clearInterval(timeInterval)
    }
  }, [])

  const submitAnswers = () => {
    const answerList = ChildRef.current.getAnswers()
    // 判断是否完成所有题目
    const isFinish = answerList.find((answer: ISubmitAnswer) => {
      return !answer.my_answer
    })
    if (!isFinish) {
      // 完成所有题目，保存答案列表，在结果页发送
      // 更新state的答案列表
      dispatch({
        type: ACTIONS.adaptiveLearning.setAnswerList,
        payload: { answerList }
      })
      dispatch({
        type: ACTIONS.adaptiveLearning.setSubmitTime,
        payload: { submitTime: new Date().getTime() }
      })
      window.location.href = '#'
      history.push('./scoreResult')
    } else {
      message.info('您有未完成的测试题！')
    }
  }

  const handleStartTest = () => {
    // 定时更新计时器
    timeInterval = setInterval(() => {
      dispatch({
        type: ACTIONS.adaptiveLearning.presentTime
      })
    }, 1000)
    // 开始时间
    dispatch({
      type: ACTIONS.adaptiveLearning.setStartTime,
      payload: { startTime: new Date().getTime() }
    })
    // 设为正在测试，以便计时
    dispatch({
      type: ACTIONS.adaptiveLearning.setTestingState,
      payload: { isTesting: true }
    })
    // 切换到测试组件
    setIsReady(true)
  }

  return (
    <>
      {isReady ? (
        <div className={styles.unitTestContainer}>
          <StepBar currentStep={3} />
          <QuestionsAndAnswers questionList={examList} cRef={ChildRef} />
          <div className={styles.testBottom}>
            <Button
              type="primary"
              size="large"
              className={styles.submitButton}
              onClick={submitAnswers}
            >
              提交
            </Button>
          </div>
        </div>
      ) : (
        <Result
          style={{ marginTop: '5vh' }}
          icon={<CalculatorTwoTone />}
          title={hasMock ? '您已完成学习，进入期末测试' : '您已完成学习，进入模拟测试'}
          extra={
            <Button
              type="primary"
              size="large"
              onClick={() => {
                handleStartTest()
              }}
            >
              {hasMock ? '开始期末测试' : '开始模拟测试'}
            </Button>
          }
        />
      )}
    </>
  )
}

export default MockOrFinalTest
