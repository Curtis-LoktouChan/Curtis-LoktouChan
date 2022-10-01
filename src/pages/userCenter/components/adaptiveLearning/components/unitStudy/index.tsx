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
import useTime from '@/utils/adaptiveLearning/timer'

const UnitStudy: FC = () => {
  const dispatch = useDispatch()
  const adaptiveLearning = useSelector((state: any) => state.adaptiveLearning)
  const { data, run } = useRequest(AdaptiveLearningServices.getKnowledge, {
    manual: true,
    onSuccess: () => {}
  })

  useEffect(() => {
    if (!adaptiveLearning?.isReview) {
      dispatch({
        type: ACTIONS.adaptiveLearning.setStartTime,
        payload: { startTime: new Date().getTime() }
      })
    } else {
      dispatch({
        type: ACTIONS.adaptiveLearning.setStartTime,
        payload: {
          startTime: new Date().getTime() - adaptiveLearning.submitTime + adaptiveLearning.startTime
        }
      })
    }
    run({ point_name: adaptiveLearning.knowledgeName })
    const timeInterval = setInterval(() => {
      dispatch({
        type: ACTIONS.adaptiveLearning.presentTime
      })
    }, 1000)
    // 卸载组件时清除定时器
    return () => {
      clearInterval(timeInterval)
    }
  }, [])

  // 显示学习时间
  // const useTime = () => {
  //   const startTime = adaptiveLearning.startTime
  //   if (!startTime) return
  //   const totalTime = Math.floor(
  //     (adaptiveLearning.presentTime - parseInt(JSON.parse(startTime!))) / 1000
  //   ) // 计算开始至今的秒数
  //   if (totalTime < 0) return '00:00' // 一切不合法的时间都返回00:00
  //   const hours = Math.floor(totalTime / (60 * 60)) // 小时数
  //   let minutes: number | string = Math.floor((totalTime - hours * 60 * 60) / 60) // 分钟数
  //   let seconds: number | string = Math.floor(totalTime - (hours * 60 * 60 + minutes * 60)) // 秒数
  //   if (minutes >= 0 && minutes < 10) minutes = '0' + minutes
  //   if (seconds >= 0 && seconds < 10) seconds = '0' + seconds
  //   return (hours > 0 ? hours + ':' : '') + minutes + ':' + seconds
  // }

  const handleGoTesting = () => {
    dispatch({ type: ACTIONS.adaptiveLearning.setTestingState, payload: { isTesting: true } })
    history.push('./unitTest')
  }

  const handlePageBack = () => {
    history.push('/userCenter/myClassList')
  }

  return (
    <Layout className={styles.unitStudyContainer}>
      <Layout.Sider className={styles.unitStudySider} theme="light">
        <Menu
          defaultSelectedKeys={['myClass']}
          defaultOpenKeys={['sub1']}
          mode="vertical"
          style={{ background: 'white', border: 'none' }}
        >
          <Menu.Item
            className={styles.itemSection}
            icon={<BankTwoTone />}
            key="myClass"
            // onClick={() => {history.push('./customerWork')}}
          >
            课程目录
          </Menu.Item>
          <Menu.Item
            className={styles.itemSection}
            icon={<AliwangwangOutlined />}
            key="myWork"
            // onClick={() => {history.push('./customerWork')}}
          >
            班级成员
          </Menu.Item>
          <Menu.Item
            className={styles.itemSection}
            icon={<PlusSquareOutlined />}
            key="studentIdentity"
            // onClick={() => {history.push('./customerWork')}}
          >
            申请列表
          </Menu.Item>
        </Menu>
      </Layout.Sider>
      <Layout style={{ backgroundColor: 'white' }}>
        <PageHeader
          style={{ backgroundColor: '#DDEEFF' }}
          tags={
            <div>
              <Button type="primary" style={{ marginLeft: '5vh' }} onClick={handleGoTesting}>
                小节测试
              </Button>
              <strong
                style={{ paddingLeft: '100px', fontSize: '30px', position: 'sticky', top: '5px' }}
              >
                {useTime(adaptiveLearning.startTime, adaptiveLearning.presentTime)}
              </strong>
            </div>
          }
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
          title="正在浏览"
          subTitle={adaptiveLearning.knowledgeName}
        />
        <div dangerouslySetInnerHTML={{ __html: data?.knowledge?.section_info?.content! }}></div>
        <div style={{ height: '400px' }}></div>
      </Layout>
    </Layout>
  )
}

export default UnitStudy
