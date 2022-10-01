import { history } from 'umi'
import { FC, useEffect } from 'react'
import { Layout, PageHeader } from 'antd'
import { LeftCircleTwoTone } from '@ant-design/icons'
import { useSelector, useDispatch } from 'dva'

import styles from './index.less'
import { ACTIONS } from '@/models'
import useTime from '@/utils/adaptiveLearning/timer'

const TEACHER = '2'

const AdaptiveLearning: FC = (props) => {
  const adaptiveLearning = useSelector((state: any) => state.adaptiveLearning)
  const userCenter = useSelector((state: any) => state.userCenter)
  const user = useSelector((state: any) => state.user)
  const dispatch = useDispatch()

  const myClassName = `${userCenter.className}`
  const myClassInfo = `班级ID: ${userCenter.classID} 邀请码: ${
    userCenter.invitePwd ? userCenter.invitePwd : '无'
  }`

  useEffect(() => {
    return () => {
      dispatch({
        type: ACTIONS.adaptiveLearning.setReviewState,
        payload: { isReview: false }
      })
    }
  }, [])

  // const useTime = () => {
  //   const startTime = adaptiveLearning.startTime
  //   if (!startTime) return
  //   const totalTime = Math.floor(
  //     (adaptiveLearning.presentTime - parseInt(JSON.parse(startTime!))) / 1000
  //   ) // 计算秒数
  //   if (totalTime < 0) return '00:00'
  //   const hours = Math.floor(totalTime / (60 * 60)) // 小时数
  //   let minutes: number | string = Math.floor((totalTime - hours * 60 * 60) / 60) // 分钟数
  //   let seconds: number | string = Math.floor(totalTime - (hours * 60 * 60 + minutes * 60)) // 秒数
  //   if (minutes >= 0 && minutes < 10) minutes = '0' + minutes
  //   if (seconds >= 0 && seconds < 10) seconds = '0' + seconds
  //   return (hours > 0 ? hours + ':' : '') + minutes + ':' + seconds
  // }

  const tag = adaptiveLearning.isTesting ? (
    <strong style={{ paddingLeft: '100px', fontSize: '30px' }}>
      {useTime(adaptiveLearning.startTime, adaptiveLearning.presentTime)}
    </strong>
  ) : (
    <></>
  )

  const handleGoBack = () => {
    if (user.userInfo?.roleId === TEACHER) history.push('/userCenter/myClassList')
    else history.push('/userCenter/student/classList')
  }

  return (
    <Layout className={styles.adaptiveLearningOuter}>
      <PageHeader
        className={styles.adaptiveLearningPageHeader}
        tags={tag}
        backIcon={<LeftCircleTwoTone />}
        onBack={handleGoBack}
        title={myClassName}
        subTitle={myClassInfo}
      />
      {props.children}
    </Layout>
  )
}

export default AdaptiveLearning
