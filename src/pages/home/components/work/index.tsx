import { history } from 'umi'
import { FC, useEffect } from 'react'
import { Upload, Button, Card, Empty } from 'antd'
import { UploadOutlined, FileTextTwoTone, LockOutlined } from '@ant-design/icons'
import { useRequest } from 'ahooks'
import { useSelector } from 'dva'

import styles from './index.less'
import work from '@/assets/works/work.png'
import { WorkServices } from '@/services'

const { Meta } = Card

const Work: FC = () => {
  const user = useSelector((state: any) => state.user) // 用户信息

  const { data: works, run } = useRequest(WorkServices.getWorks, {
    manual: true,
    defaultParams: [null, { noNotification: true }]
  })

  useEffect(() => {
    if (user.isLogin) run()
  }, [])

  // 作品栏显示
  const whetherToRender = () => {
    return user?.isLogin ? (
      // 登录时内容区
      <div className={styles.workContext}>
        {works?.workList?.length !== 0 ? (
          <Card
            key={works?.workList[0].id}
            className={styles.workCard}
            hoverable
            cover={<img src={work} alt="我的作品" />}
          >
            <Meta title={works?.workList[0].projectName} />
          </Card>
        ) : (
          <Empty />
        )}
      </div>
    ) : (
      // 未登录时内容区
      <div
        className={styles.workContextNotLogged}
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
        {user?.isLogin && (
          <Upload className={styles.upload}>
            <Button icon={<UploadOutlined />}>上传作品</Button>
          </Upload>
        )}

        <Button
          size="small"
          type="link"
          onClick={() => {
            // history.push('/customerWork')
            history.push('/comingSoon')
          }}
        >
          查看更多
        </Button>
      </div>
    </div>
  )
}

export default Work
