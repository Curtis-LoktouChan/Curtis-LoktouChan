import { history } from 'umi'
import { FC, useRef, MutableRefObject, useEffect } from 'react'
import { Button, message } from 'antd'
import { useDispatch, useSelector } from 'dva'

import { ISubmitAnswer } from '@/services/adaptiveLearning/types'
import styles from './index.less'
import StepBar from '../stepBar/index'
import QuestionsAndAnswers from '../questionsAndAnswer/index'
import { ACTIONS } from '@/models'

const FirstTimeStudy: FC = () => {
  const dispatch = useDispatch()
  const examList = useSelector((state: any) => state.adaptiveLearning.examList)
  const childRef: MutableRefObject<any> = useRef({})

  useEffect(() => {
    dispatch({
      type: ACTIONS.adaptiveLearning.setStartTime,
      payload: { startTime: new Date().getTime() }
    })
  }, [])

  // 提交答案的回调
  const submitAnswers = () => {
    const answerList = childRef.current.getAnswers()
    // 判断是否完成所有题目，完成题目时isFinish为null
    const isFinish = answerList.find((answer: ISubmitAnswer) => {
      return !answer.my_answer
    })
    if (!isFinish) {
      // 完成所有题目，保存答案列表，在结果页发送
      dispatch({
        type: ACTIONS.adaptiveLearning.setAnswerList,
        payload: { answerList }
      })
      dispatch({
        type: ACTIONS.adaptiveLearning.setIsFirstTime,
        payload: { isFirstTime: true }
      })
      window.location.href = '#'
      history.push('./scoreResult')
    } else {
      message.info('您有未完成的测试题！')
    }
  }

  return (
    <div className={styles.firstTimeStudyOuter}>
      <StepBar currentStep={0} />
      <QuestionsAndAnswers questionList={examList} cRef={childRef} />
      <div className={styles.testBottom}>
        <Button type="primary" size="large" className={styles.submitButton} onClick={submitAnswers}>
          提交
        </Button>
      </div>
    </div>
  )
}

export default FirstTimeStudy
