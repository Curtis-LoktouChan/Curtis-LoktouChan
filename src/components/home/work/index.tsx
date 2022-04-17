import { history } from 'umi'
import { FC, useState } from 'react'
import { Upload, message, Button, Card } from 'antd'
import { UploadOutlined, FileTextTwoTone, LockOutlined } from '@ant-design/icons'

import styles from './index.less'
import work from '@/assets/works/work.png'

const { Meta } = Card

const Work: FC = () => {
  const [isLogged, setIsLogged] = useState(true)

  const whetherToRender = () => {
    return isLogged ? (
      // 登录时内容区
      <div>
        <div className={styles.workContext}>
          <Card className={styles.workCard} hoverable cover={<img src={work} alt="我的作品" />}>
            <Meta title="我的作品" />
          </Card>
          <Card className={styles.workCard} hoverable cover={<img src={work} alt="我的作品" />}>
            <Meta title="我的作品" />
          </Card>
          <Card className={styles.workCard} hoverable cover={<img src={work} alt="我的作品" />}>
            <Meta title="我的作品" />
          </Card>
          <Card className={styles.workCard} hoverable cover={<img src={work} alt="我的作品" />}>
            <Meta title="我的作品" />
          </Card>
        </div>
        <Upload className={styles.upload} style={{ visibility: isLogged ? 'hidden' : 'visible' }}>
          <Button icon={<UploadOutlined />}>上传作品</Button>
        </Upload>
      </div>
    ) : (
      // 未登录时内容区
      <div className={styles.workContextUnlogged}>
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
          {/* <button onClick={()=>{
            console.log(isLogged)
            setIsLogged(!isLogged)}}>点击测试</button> */}
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
