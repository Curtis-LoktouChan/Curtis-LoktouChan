import { FC, useState, useEffect, SetStateAction } from 'react'
import { useHistory } from 'react-router-dom'
import zhCN from 'antd/lib/locale/zh_CN'
import {
  List,
  Avatar,
  Row,
  PageHeader,
  Button,
  Pagination,
  Input,
  message,
  Col,
  Popconfirm,
  Layout,
  ConfigProvider,
  Select
} from 'antd'
import { UserOutlined } from '@ant-design/icons'
import { useSelector } from 'dva'
import useRequest from '@ahooksjs/use-request'

import Header from '@/components/header'
import Footer from '@/components/footer'
import styles from './index.less'
import CaseService from '@/services/caseShow'

const CaseShowIndex: FC = () => {
  const [pageNum, setPageNum] = useState(1)
  const [total, setTotal] = useState<any>(0)
  const [update, setupdate] = useState<any>(0)
  const [caseList, setCaseList] = useState<any>([])
  const [searchText, setSearchText] = useState('')
  const [isMyCase, setIsMyCase] = useState(false)
  const [flag, setFlag] = useState('')
  const [caseClass, setCaseClass] = useState('所有') //默认获取所有案例
  const history = useHistory()
  const user = useSelector((state: any) => state.user) // 用户信息
  const pageSize = 10
  const { Option } = Select

  //通过页码获取案例
  const { run: GetCaseListByPageNum } = useRequest(CaseService.getCaseListByPageNum, {
    manual: true,
    onSuccess: (res) => {
      setCaseList(res.caseList)
      setTotal(res.total)
    },
    onError: () => {
      message.error('error')
    }
  })
  //获取自己的案例
  const { run: GetMyCase } = useRequest(CaseService.getMyCase, {
    manual: true,
    onSuccess: (res) => {
      setCaseList(res.caseList)
      setTotal(res.total)
    },
    onError: () => {
      message.error('error')
    }
  })
  //获取类别列表
  const { data: caseClassList, run: GetClassList } = useRequest(CaseService.getCaseClass)
  //类别获取案例
  const { run: GetCaseListByCaseClass } = useRequest(CaseService.getCaseListByCaseClass, {
    manual: true,
    onSuccess: (res) => {
      setCaseList(res.caseList)
      setTotal(res.total)
    },
    onError: () => {
      message.error('error')
    }
  })
  //删除案例
  const { run: DeleteMyCase } = useRequest(CaseService.deleteCase, {
    manual: true
  })

  useEffect(() => {
    //若获取自己的案例 要判断类别是否为’所有‘ 后端不能识别’所有‘ 只有caseClass为空时才返回所有自己案例
    if (isMyCase) {
      if (caseClass === '所有') {
        GetMyCase({ pageNum, pageSize, searchText, isMyCase, caseClass: '', flag })
      } else {
        GetMyCase({ pageNum, pageSize, searchText, isMyCase, caseClass, flag })
      }
    } else {
      if (caseClass === '所有') {
        GetCaseListByPageNum({ pageNum, pageSize, searchText }) //请求所有案例
      } else {
        GetCaseListByCaseClass({ pageNum, pageSize, searchText, caseClass }) //类别不是所有
      }
    }
  }, [pageNum, update, caseClass, isMyCase])
  //点击案例进入详情页
  const onClickViewCase = (case_id: string) => {
    history.push('/caseShow/viewCase?case_id=' + case_id)
  }
  //换页页码改变
  const pageOnChange = (page: number) => {
    setPageNum(page)
  }
  //发布案例按钮
  const publishCase = () => {
    // 验证是否登录，登录就可以发布案例
    if (user?.isLogin) {
      history.push('/caseShow/publishCase')
    } else {
      history.push('/waitToLogin')
    }
  }
  //搜索案例
  const onSearch = (searchText: SetStateAction<string>) => {
    setupdate(update + 1)
    setPageNum(1)
    if (isMyCase) {
      setFlag('search') //我的案例接口标志flag
    }
  }
  //点击我的按钮和案例大厅按钮
  const myCase = () => {
    if (!user?.isLogin) {
      history.push('/login')
      return
    }
    setPageNum(1)
    setCaseClass('所有')
    setIsMyCase(!isMyCase)
    setFlag('page')
    setSearchText('')
  }
  //删除案例
  const confirmDelete = (caseID: any) => {
    DeleteMyCase({ caseID })
      .then((res) => {
        setupdate(update + 1)
        message.info('删除成功')
      })
      .catch(() => {
        message.error('删除失败')
      })
  }
  //编辑案例
  const onClickEdit = (caseID: string) => {
    history.push('/caseShow/editCase?case_id=' + caseID)
  }
  //类别修改
  const handleClassChange = (value: string) => {
    setCaseClass(value)
    setPageNum(1)
    if (isMyCase) {
      setFlag('page')
    }
  }
  const searchOnchange = (e: any) => {
    setSearchText(e.target.value)
  }

  return (
    <ConfigProvider locale={zhCN}>
      <Layout>
        <Layout.Content className={styles.homeContainer}>
          <Header />
          <div className={styles.maincontainer}>
            <PageHeader
              style={{ marginTop: '-20px', background: '#a3d6ff24' }}
              title="案例展示"
              subTitle="快来分享自己的案例成果吧!"
              extra={
                <Col>
                  <Select
                    value={caseClass}
                    defaultValue="所有"
                    placeholder="类别"
                    style={{ width: 120 }}
                    onChange={handleClassChange}
                    disabled={false}
                  >
                    {caseClassList?.caseClassList?.map((caseClassList) => {
                      return (
                        <Option value={caseClassList.caseClass} key={caseClassList.ID}>
                          {caseClassList.caseClass}
                        </Option>
                      )
                    })}
                    <Option value="所有" key={'last'}>
                      所有
                    </Option>
                  </Select>
                  &nbsp;
                  <Input.Search
                    value={searchText}
                    onSearch={onSearch}
                    onChange={searchOnchange}
                    allowClear
                    style={{ width: '50%' }}
                    placeholder="人工智能"
                  />
                  &nbsp;&nbsp;
                  <Button onClick={publishCase} type="primary">
                    发布案例
                  </Button>
                  &nbsp;&nbsp;
                  <Button
                    style={{ background: isMyCase ? 'blue' : 'green' }}
                    onClick={myCase}
                    type="primary"
                  >
                    {isMyCase ? '案例大厅' : '我的案例'}
                  </Button>
                </Col>
              }
            />
            <List
              itemLayout="horizontal"
              dataSource={caseList}
              renderItem={(item: any) => (
                <List.Item key={item?.ID}>
                  <List.Item.Meta
                    avatar={
                      <Avatar style={{ backgroundColor: '#87d068' }} icon={<UserOutlined />} />
                    }
                    title={
                      <a
                        onClick={(e) => {
                          e.preventDefault()
                          onClickViewCase(item?.ID)
                        }}
                      >
                        {item.caseTitle}
                      </a>
                    }
                    description={item.caseDiscription}
                  />
                  <Row align="middle">
                    <Row style={{ color: '#00000073' }}>
                      作者：{item.author} &nbsp;&nbsp; 时间：{item.created_at} &nbsp;&nbsp; 类别：
                      {item.case_class}
                    </Row>

                    {isMyCase && user?.isLogin ? (
                      <Row>
                        <Col>
                          {' '}
                          <Button type="link" onClick={() => onClickEdit(item?.ID)}>
                            编辑
                          </Button>
                        </Col>
                        <Col>
                          <Popconfirm
                            title="确认删除吗?"
                            onConfirm={() => {
                              confirmDelete(item?.ID)
                            }}
                            okText="是"
                            cancelText="否"
                          >
                            <Button type="link">删除</Button>
                          </Popconfirm>
                        </Col>
                      </Row>
                    ) : null}
                  </Row>
                </List.Item>
              )}
            />

            <Row justify="center">
              <Pagination
                style={{ margin: '20px 0px' }}
                defaultCurrent={1}
                total={total}
                showSizeChanger={false}
                current={pageNum}
                onChange={pageOnChange}
                pageSize={pageSize}
              />
            </Row>
          </div>
        </Layout.Content>
        <Layout.Footer
          style={{
            justifyContent: 'space-around',
            alignItems: 'center',
            backgroundColor: '#f4fbff'
          }}
        >
          <Footer />
        </Layout.Footer>
      </Layout>
    </ConfigProvider>
  )
}

export default CaseShowIndex
