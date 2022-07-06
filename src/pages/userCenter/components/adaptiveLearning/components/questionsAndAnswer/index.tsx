import { FC, useEffect, useState, MutableRefObject, useCallback } from 'react'
import { Radio, Space, Tag } from 'antd'
import { IExamList } from '@/services/adaptiveLearning/types'

import styles from './index.less'
import { ISubmitAnswer } from '@/services/adaptiveLearning/types'

interface PropsType {
  questionList: IExamList[]
  cRef: MutableRefObject<any>
}

// 用户答案列表初始化
let answers: ISubmitAnswer[] = []

const QuestionsAndAnswers: FC<PropsType> = (props: PropsType) => {
  const [answerList, setAnswerList] = useState(answers) // 存放用户选择的答案
  const { questionList, cRef } = props

  // 生成未填写的答案列表
  useEffect(() => {
    answers = [] // 清空上一次的答案，为什么组件销毁了answers列表数据没有删除？
    questionList?.map((question: IExamList) => {
      const answer = { exam_id: question.id, my_answer: '', self_study_class_id: 73 }
      answers.push(answer)
    })
    setAnswerList(answers)
  }, [questionList])

  // 获取答案，在父组件调用
  const getAnswers = useCallback(() => {
    return answerList
  }, [answerList])

  useEffect(() => {
    if (cRef && cRef.current) {
      cRef.current.getAnswers = getAnswers
    }
  }, [getAnswers])

  // 更改选项
  const handleAnswerChange = (flag: number, event: any) => {
    const answerItem = answers.find((item) => {
      return item.exam_id === flag
    })
    answerItem!.my_answer = event.target.value // 填写或更改答案
  }

  return (
    <ul className={styles.questionsAndAnswersContainer}>
      <Space direction="vertical" size="large">
        {questionList &&
          questionList?.map((question: IExamList, index: number) => {
            const {
              exam_discrition: discrition,
              exam_type: questionType,
              id,
              ...selectItems
            } = question // 解构赋值同时起别名
            const selectItemOrders = Object.getOwnPropertyNames(selectItems) // 所有选项名列表
            return (
              <li key={id} className={styles.questionItem}>
                <Tag color="#2db7f5" style={{ cursor: 'default' }}>{`第${++index}题`}</Tag>
                &nbsp;
                <Tag style={{ cursor: 'default' }}>{questionType}</Tag>
                {/* 将题目字符串转换成虚拟DOM */}
                <div dangerouslySetInnerHTML={{ __html: discrition }}></div>
                <div className={styles.selectOrders}>
                  <div>
                    <span style={{ color: 'red' }}>*</span>请选择正确选项&nbsp;&nbsp;&nbsp;
                  </div>
                  <Radio.Group
                    onChange={(event: any): void => {
                      handleAnswerChange(id, event)
                    }}
                  >
                    <Space direction="vertical">
                      {selectItemOrders?.map((item) => {
                        // 返回本题的每一个选项
                        return selectItems[item] !== '' ? (
                          <Radio key={item} value={item}>
                            {item.toUpperCase() + ':  ' + selectItems[item]}
                          </Radio>
                        ) : null
                      })}
                    </Space>
                  </Radio.Group>
                </div>
              </li>
            )
          })}
      </Space>
    </ul>
  )
}

export default QuestionsAndAnswers
