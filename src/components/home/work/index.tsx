import { history } from 'umi'
import { FC, useEffect } from 'react'
import { Upload, Button, Card } from 'antd'
import { UploadOutlined, FileTextTwoTone, LockOutlined } from '@ant-design/icons'

import { useDispatch, useSelector } from 'dva'
import { ACTIONS } from '@/models'

import styles from './index.less'
import work from '@/assets/works/work.png'

const { Meta } = Card

interface WorkObj {
  name: string
  work: string
  id: string
}

const Work: FC = () => {
  const works = useSelector((state: any) => state.works) // 用户作品
  const user = useSelector((state: any) => state.user) // 用户信息
  const dispatch = useDispatch()

  // 组件完成挂载时触发
  useEffect(() => {
    user?.isLogin &&
      dispatch({
        type: ACTIONS.works.getWork
      })
  }, [])

  // user状态更新时触发
  useEffect(() => {
    user?.isLogin &&
      dispatch({
        type: ACTIONS.works.getWork
      })
  }, [user])

  const whetherToRender = () => {
    return user?.isLogin ? (
      // 登录时内容区
      <div>
        <div className={styles.workContext}>
          {works.works.map((workObj: WorkObj) => {
            return (
              <Card
                className={styles.workCard}
                hoverable
                cover={<img src={work} alt="我的作品" />}
                key={workObj.id}
              >
                <Meta title={workObj.name} />
              </Card>
            )
          })}
        </div>
        <Upload className={styles.upload}>
          <Button icon={<UploadOutlined />}>上传作品</Button>
        </Upload>
      </div>
    ) : (
      // 未登录时内容区
      <div
        className={styles.workContextUnlogged}
        onClick={() => {
          history.push('./login')
        }}
      >
        <LockOutlined />
        <span>去登录</span>
      </div>
    )
  }

  return (
    <div className={styles.workOuter}>
      <div>
        <div className={styles.workHeader}>
          <FileTextTwoTone />
          <span>我的作品</span>
        </div>
        {whetherToRender()}

        <Button size="small" type="link">
          查看更多
        </Button>
      </div>
    </div>
  )
}

export default Work
