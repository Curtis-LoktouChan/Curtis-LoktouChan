import { history } from 'umi'
import { FC, useEffect, useRef, MutableRefObject, useState } from 'react'
import { Button, message } from 'antd'
import { useRequest } from 'ahooks'
import { useSelector, useDispatch } from 'dva'

import { ACTIONS } from '@/models'
import styles from './index.less'
import { AdaptiveLearningServices } from '@/services'
import QuestionsAndAnswers from '../questionsAndAnswer/index'
import { ISubmitAnswer } from '@/services/adaptiveLearning/types'
import StepBar from '../stepBar'

const UnitTest: FC = () => {
  const dispatch = useDispatch()
  const adaptiveLearning = useSelector((state: any) => state.adaptiveLearning)
  let exam_list: any = []
  const ChildRef: MutableRefObject<any> = useRef({})
  const [examList, setExamList] = useState(exam_list)
  const { data, run } = useRequest(AdaptiveLearningServices.unitTest, {
    manual: true,
    onSuccess: () => {
      setExamList(data!.exam_list)
    }
  })

  useEffect(() => {
    run(adaptiveLearning.knowledgeName)
    const timeInterval = setInterval(() => {
      dispatch({
        type: ACTIONS.adaptiveLearning.presentTime
      })
    }, 1000)

    return () => {
      // 结束测试，结束计时
      dispatch({
        type: ACTIONS.adaptiveLearning.setTestingState,
        payload: { isTesting: false }
      })
      clearInterval(timeInterval)
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
      history.push('./scoreResult')
    } else {
      message.info('您有未完成的测试题！')
    }
  }

  return (
    <div className={styles.unitTestContainer}>
      <StepBar currentStep={2} />
      <QuestionsAndAnswers questionList={examList} cRef={ChildRef} />
      <div className={styles.testBottom}>
        <Button type="primary" size="large" className={styles.submitButton} onClick={submitAnswers}>
          提交
        </Button>
      </div>
    </div>
  )
}

export default UnitTest
