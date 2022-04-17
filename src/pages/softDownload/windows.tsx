import { FC } from 'react'

import { connect } from 'react-redux'
import { Button, Image, Row } from 'antd'
import { WindowsFilled, FileAddTwoTone } from '@ant-design/icons'
import styles from './index.less'
import aboutUs from '../../assets/aboutUs.png'
// import { actions } from "../../constant";

const Windows: FC = () => {
  const handleCardOnClickNOR = () => {
    window.open(' https://pan.baidu.com/s/1qXN-A3ck3tn7oZhKzsRlTw')
  }
  // const handleCardOnClickPRO = () => {
  //   window.open("https://pan.baidu.com/s/1wx6ZC-zg8r0rtOWeORoygg");
  // };

  return (
    <div className={styles.windowsContainer}>
      <div>
        <div className={styles.windowsTitle}>
          <WindowsFilled style={{ color: '#1890ff' }} />
          <span>Windows版本</span>
        </div>
        <div className={styles.windowsContext}>
          <div className={styles.windowsContextImgLeft}>
            <Image src={aboutUs} />
          </div>
          <div className={styles.windowsContextText}>
            <p>
              在笔记本电脑Windows系统上运行，能够通过运行对应的仿真器，模拟对硬件硬件的控制。
              <br />
              一款Windows上的图形化编程软件。
            </p>
            <Row justify="center">
              <p style={{ color: 'red' }}>普通版链接：提取码:hv72</p>
              &nbsp;&nbsp;&nbsp;
              <Button type="primary" icon={<FileAddTwoTone />} onClick={handleCardOnClickNOR}>
                点我下载
              </Button>
              <br></br>
              <br></br>
            </Row>
            {/* <Row>
                <p style={{ color: "red" }}>专业版链接：提取码:gyy2</p>
                &nbsp;&nbsp;&nbsp;
                <Button
                  type="primary"
                  icon={<FileAddTwoTone />}
                  onClick={handleCardOnClickPRO}
                >
                  点我下载
                </Button>
              </Row> */}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Windows
