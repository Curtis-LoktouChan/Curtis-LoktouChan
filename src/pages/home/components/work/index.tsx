import { history } from 'umi'
import { FC } from 'react'
import { Upload, Button, Card } from 'antd'
import { UploadOutlined, FileTextTwoTone, LockOutlined } from '@ant-design/icons'
import { useRequest } from 'ahooks'
import { useSelector } from 'dva'

import styles from './index.less'
import work from '@/assets/works/work.png'
import { WorkServices } from '@/services'

const { Meta } = Card

const Work: FC = () => {
  const user = useSelector((state: any) => state.user) // 用户信息

  const { data: works } = useRequest(WorkServices.getWorks, {
    defaultParams: [null, { noNotification: true }]
  })

  const whetherToRender = () => {
    return user?.isLogin ? (
      // 登录时内容区
      <div className={styles.workContext}>
        {works?.workList?.map((item) => {
          return (
            <Card
              key={item.id}
              className={styles.workCard}
              hoverable
              cover={<img src={work} alt="我的作品" />}
            >
              <Meta title={item.projectName} />
            </Card>
          )
        })}
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
        {user?.isLogin && (
          <Upload className={styles.upload}>
            <Button icon={<UploadOutlined />}>上传作品</Button>
          </Upload>
        )}

        <Button
          size="small"
          type="link"
          onClick={() => {
            history.push('./customerWork')
          }}
        >
          查看更多
        </Button>
      </div>
    </div>
  )
}

export default Work
