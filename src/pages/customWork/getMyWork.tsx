import { FC } from 'react'
import { history } from 'umi'
import { Button, Upload, message, Card, Pagination, Input, PageHeader, Row, Col } from 'antd'
import { FileTextTwoTone, UploadOutlined } from '@ant-design/icons'
import styles from './index.less'
import useRequest from '@ahooksjs/use-request'
import workServices from '@/services/work'
import workImg from '../../assets/works/work.png'
import { useState, useEffect } from 'react'
import { IWorkListItemRes } from '@/services/work/types'

const WorkDetails: FC = () => {
  const { Search } = Input
  const pageSize = 12
  const [fileName, setFileName] = useState('') //文件名
  const [update, setUpdate] = useState(0) //删除后自动页面刷新
  const [worksList, setWorksList] = useState<IWorkListItemRes[]>([])
  const [searchText, setSearchText] = useState('')
  const [pageNum, setPageNum] = useState(1)
  const [total, setTotal] = useState(0)
  const nav = window.navigator as any //ie浏览器下载文件接口

  useEffect(() => {
    runGetWorkByPage({ pageNum, pageSize, searchText })
  }, [update])
  //通过分页获取数据
  const { data: worksByPage, run: runGetWorkByPage } = useRequest(workServices.getWorksByPage, {
    manual: true,
    onSuccess: (res) => {
      setWorksList(res?.workList)
      setTotal(res?.total)
      return
    }
  })
  //通过搜索获取数据
  const { data: worksBySearch, run: runGetWorkBySearch } = useRequest(
    workServices.getWorksBySearch,
    {
      manual: true,
      onSuccess: (res) => {
        setWorksList(res?.workList)
        setTotal(res?.total)
        return
      }
    }
  )
  //上传作品
  const { run: runUploadWorks } = useRequest(workServices.uploadWork, {
    manual: true,
    onSuccess: () => {
      setUpdate(update + 1)
    }
  })
  //下载作品
  const { run: download } = useRequest(workServices.downloadWork, {
    manual: true,
    onSuccess: (res) => {
      if (window.confirm(`是否要下载${fileName}文件？`)) {
        try {
          downloadFiles(res.fileText, fileName)
        } catch (error) {
          console.log(error)
        }
      }

      return
    }
  })
  //删除文件(用fetch代替)
  const { run: deleteWork } = useRequest(workServices.deleteWork, {
    manual: true
  })

  //换页请求内容
  const handlePageChange = (page: number) => {
    runGetWorkByPage({ pageNum: page, pageSize, searchText })
    setPageNum(page)
  }
  //下载文件
  const downloadFiles = (data: Blob, filename: string) => {
    // 接收的是文件流，需要转化一下
    const blob = new Blob([data])
    if (typeof window.chrome !== 'undefined') {
      // Chrome version
      const link = document.createElement('a')
      link.href = window.URL.createObjectURL(blob)
      link.download = filename
      link.click()
    } else if (typeof nav.msSaveBlob !== 'undefined') {
      // IE version
      const blob = new Blob([data], { type: 'application/force-download' })
      nav.msSaveBlob(blob, filename)
    } else {
      //Firefox version
      const file = new File([data], filename, { type: 'application/force-download' })
      window.open(URL.createObjectURL(file))
    }
  }

  //点击下载作品
  const handleCardOnClick = (name: string) => {
    download({ projectName: name })
    setFileName(name)
  }
  //点击删除作品
  const handleDeleteOnClick = (name: string) => {
    if (window.confirm(`是否确认删除${name}文件？`)) {
      try {
        deleteWork({ projectName: name })
          .then((res) => {
            setUpdate(update - 1)
            message.info('删除成功')
          })
          .catch(() => {
            message.error('删除失败')
          })
      } catch (error) {
        console.log(error)
      }
    }
  }

  //搜索
  const handleSearchOnclick = (value: string) => {
    runGetWorkBySearch({ pageNum: 1, pageSize, searchText: value })
    setSearchText(value)
    setPageNum(1)
  }
  //渲染列表
  const renderWorkList = () => {
    if (worksList?.length) {
      return worksList.map((workList: any) => {
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
  //上传作品
  const customRequest = (file: any) => {
    file.onSuccess(() => {
      file.status = 'done'
    })
    const formData = new FormData()
    formData.append('file', file.file)
    runUploadWorks(formData as any)
  }
  const props = {
    showUploadList: {
      showRemoveIcon: false
    }
  }
  const uploadOnchange = (info: any) => {
    if (info.file.status !== 'uploading') {
      console.log(info.file, info.fileList)
    }
    if (info.file.status === 'done') {
      message.success(`${info.file.name} file uploaded successfully`)
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} file upload failed.`)
    }
  }
  return (
    <div style={{ margin: '1% 14% 5% 14%' }} className={styles.customerWork}>
      <div>
        {' '}
        <PageHeader
          className={styles.customerWorkHeader}
          avatar={{ style: { backgroundColor: 'white' }, size: 'large', icon: <FileTextTwoTone /> }}
          title={'我的作品'}
          extra={
            <Search
              placeholder="古诗助手"
              allowClear
              onSearch={(value) => {
                handleSearchOnclick(value)
              }}
              style={{ width: 200 }}
            />
          }
        ></PageHeader>
      </div>

      <div className={styles.customerWorkContext}>{renderWorkList()} </div>

      <div className={styles.customerWorkFootButton}>
        <Row justify="center">
          {' '}
          <Pagination
            total={total}
            defaultCurrent={1}
            defaultPageSize={pageSize}
            onChange={(page) => handlePageChange(page)}
          />
        </Row>
        <Row>
          <Col>
            {' '}
            <Upload
              {...props}
              customRequest={(file) => customRequest(file)}
              accept=".xml"
              onChange={(info) => uploadOnchange(info)}
              maxCount={1}
            >
              <Button type="primary" icon={<UploadOutlined />}>
                上传作品
              </Button>
            </Upload>
          </Col>
          <Col offset={17}>
            {' '}
            <Button style={{ marginRight: '1px' }} onClick={() => history.push('./home')}>
              返回主页
            </Button>
          </Col>
        </Row>
      </div>
    </div>
  )
}
export default WorkDetails
