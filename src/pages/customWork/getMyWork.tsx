import { FC } from 'react'
import { history } from 'umi'
import { Button, Upload, message, Card, Pagination, Layout, Image } from 'antd'
import { FileTextTwoTone, UploadOutlined } from '@ant-design/icons'
import styles from './index.less'
import useRequest from '@ahooksjs/use-request'
import workServices from '@/services/work'
import workImg from '../../assets/works/work.png'

const WorkDetails: FC = () => {
  //获取数据
  const { data: works, run: runGetWork } = useRequest(workServices.getWorks, {
    onSuccess: (res) => {
      console.log(res)
      return
    }
  })
  const { data, run: download } = useRequest(workServices.downloadWork, {
    manual: true,
    onSuccess: (res) => {
      console.log(res)
      return
    }
  })
  const { data: dw, run: deleteWork } = useRequest(workServices.deleteWork, {
    manual: true,
    onSuccess: (res) => {
      message.info(res)
    }
  })
  const handlePageChange = (page: number) => {}
  //
  // const downloadFiles = (data:Blob, filename:string) => {
  //   // 接收的是文件流，需要转化一下
  //   var blob = new Blob([data])
  //   if (typeof window.chrome !== 'undefined') {
  //     // Chrome version
  //     var link = document.createElement('a')
  //     link.href = window.URL.createObjectURL(blob)
  //     link.download = filename
  //     link.click()
  //   } else if (typeof window.navigator.msSaveBlob !== 'undefined') {
  //     // IE version
  //     blob = new Blob([data], { type: 'application/force-download' })
  //     window.navigator.msSaveBlob(blob, filename)
  //   } else {
  //     // Firefox version
  //     var file = new File([data], filename, { type: 'application/force-download' })
  //     window.open(URL.createObjectURL(file))
  //   }
  // }
  const handleCardOnClick = (name: string) => {
    download({ projectName: name })
  }
  const handleDeleteOnClick = (name: string) => {
    console.log(name)
    deleteWork({ projectName: name })
  }
  const renderWorkList = () => {
    if (works?.workList.length) {
      return works.workList.map((workList: any) => {
        return (
          <Card
            key={workList.id}
            className={styles.customerWorkCard}
            hoverable
            cover={<img src={workImg} alt={'作品图片' + workList.id} />}
          >
            <Card.Meta
              title={workList.projectName}
              description={
                <div className={styles.cardButtonsContainer}>
                  <Button
                    size="small"
                    type="primary"
                    onClick={() => handleCardOnClick(workList.projectName)}
                  >
                    下载作品
                  </Button>
                  <Button
                    size="small"
                    type="primary"
                    onClick={() => handleDeleteOnClick(workList.projectName)}
                  >
                    删除作品
                  </Button>
                </div>
              }
            />
          </Card>
        )
      })
    }

    return <div className={styles.noWork}>还没有作品哟~</div>
  }

  return (
    <div className={styles.customerWorkContainer}>
      <div>
        <div className={styles.customerWorkTitle}>
          <FileTextTwoTone />
          <span>我的作品</span>
        </div>
        <div className={styles.customerWorkContext}>
          {renderWorkList()}{' '}
          <Pagination
            total={works?.workList.length}
            defaultCurrent={1}
            defaultPageSize={12}
            onChange={(page) => handlePageChange(page)}
          />
        </div>
        <div className={styles.customerWorkPageControl}></div>
        <div className={styles.customerWorkUploadButton}>
          <Upload>
            <Button type="primary" icon={<UploadOutlined />}>
              上传作品
            </Button>
          </Upload>
        </div>

        <Button onClick={() => history.push('./home')}>返回主页</Button>
      </div>
    </div>
  )
}
export default WorkDetails
