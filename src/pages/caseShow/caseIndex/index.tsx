import { FC } from 'react'
import { ConfigProvider, Layout } from 'antd'
import zhCN from 'antd/lib/locale/zh_CN'
import { history } from 'umi'

import { useState, useEffect } from 'react'
import styles from './index.less'
import { useRequest } from 'ahooks'
import Header from '@/components/header'
import CaseService from '@/services/caseShow'

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
  Popconfirm
} from 'antd'

import { UserOutlined } from '@ant-design/icons'
const isLogin = true
const caseShow: FC = () => {
  //hooks
  const [isMyCase, setIsMyCase] = useState(true)
  //获取列表
  const { data, run: getList } = useRequest(CaseService.getList, {
    // defaultParams: [{ pageNumber: 1, pageSize: 2 }],
    onSuccess: (res) => {
      console.log(res)
      return res
    }
  })

  //
  useEffect(() => {})
  //搜索函数
  const onSearch = (text: string) => {
    getList({ searchCase: text })
  }
  //
  const getMyCase = () => {
    if (isLogin) {
      console.log('1')
      setIsMyCase(!isMyCase)
      //获取自己的案例
      getList({ myCase: '123' })
    } else {
      history.push('/Login')
    }
  }
  return (
    <ConfigProvider locale={zhCN}>
      <Layout>
        <Layout.Content className={styles.homeContainer}>
          <Header />
          {/* 搜索框 */}
          <div>
            <PageHeader
              style={{ marginTop: '-20px', background: '#a3d6ff24' }}
              title="案例展示"
              subTitle="快来分享自己的案例成果吧!"
              extra={
                <Col>
                  <Input.Search
                    onSearch={onSearch}
                    allowClear
                    style={{ width: '60%' }}
                    placeholder="人工智能"
                  />
                  &nbsp;&nbsp;
                  <Button
                    type="primary"
                    onClick={() => {
                      history.push(isLogin ? './Login' : './publishCase')
                    }}
                  >
                    发布案例
                  </Button>
                  &nbsp;&nbsp;
                  <Button
                    style={{ background: isMyCase ? 'blue' : 'green' }}
                    type="primary"
                    onClick={getMyCase}
                  >
                    {isMyCase ? '我的案例' : '案例大厅'}
                  </Button>
                </Col>
              }
            />
            {/* 展示列表 */}
            <List
              itemLayout="horizontal"
              dataSource={data?.case}
              renderItem={(item) => (
                <List.Item>
                  <List.Item.Meta
                    avatar={
                      <Avatar style={{ backgroundColor: '#87d068' }} icon={<UserOutlined />} />
                    }
                    title={
                      <a
                        href={'/viewCase/' + item.ID}
                        onClick={(e) => {
                          e.preventDefault()
                          // onClickViewCase(item.ID);
                        }}
                      >
                        {item.caseTitle}
                      </a>
                    }
                    description={item.caseDiscription}
                  />
                  <Row align="middle">
                    <Row style={{ color: '#00000073' }}>
                      作者：{item.author} &nbsp;&nbsp; 时间：{item.created_at}
                    </Row>

                    {isMyCase && isLogin ? (
                      <Row>
                        <Col>
                          {' '}
                          <Button
                            type="link"
                            onClick={() => {
                              history.push('./edictCase')
                            }}
                          >
                            编辑
                          </Button>
                        </Col>
                        <Col>
                          <Popconfirm title="确认删除吗?" okText="是" cancelText="否">
                            <Button type="link">删除</Button>
                          </Popconfirm>
                        </Col>
                      </Row>
                    ) : null}
                  </Row>
                </List.Item>
              )}
              pagination={{
                position: 'bottom',
                total: data?.total,
                defaultCurrent: 1,
                defaultPageSize: 5,
                showSizeChanger: false
                // onChange: (page, pageSize) => {
                //   console.log(page, pageSize)
                //   //getList({ pageNumber: page, pageSize: pageSize })
                // }
              }}
            />
          </div>
        </Layout.Content>
        <Layout.Footer style={{ justifyContent: 'space-around', alignItems: 'center' }}>
          {/* <Footer /> */}
        </Layout.Footer>
      </Layout>
    </ConfigProvider>
  )
}
export default caseShow
