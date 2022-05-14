import { FC, useEffect } from 'react'
import { ConfigProvider, Layout } from 'antd'
import zhCN from 'antd/lib/locale/zh_CN'

import styles from './index.less'
import Header from '@/components/header'
import Footer from '@/components/footer'
import { useRequest } from 'ahooks'
import { useState } from 'react'
import { List, Avatar, Row, PageHeader, Button, Input, message, Col, Modal, Form } from 'antd'
import { useSelector } from 'dva'
import { history } from 'umi'

import courseService from '@/services/courseCenter'

const courseCenter: FC = () => {
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [classID, setClassId] = useState(0)
  const [joinClassForm] = Form.useForm()
  const [pageNum, setPageNum] = useState(1)
  const [searchText, setSearchText] = useState('')
  const pageSize = 10
  //请求数据
  const isLogin = useSelector((state: any) => state.user.isLogin)
  const { data: courseList, run: getList } = useRequest(courseService.getList, {
    manual: true
  })

  useEffect(() => {
    getList({ pageNum, pageSize, searchText })
  }, [pageNum, searchText])

  const { data: joinClassMsg, run: joinClass } = useRequest(courseService.joinClass, {
    manual: true,
    onSuccess: (res) => {
      message.info(res.msg)
      return res
    }
  })

  //加入班级
  const showModal = (classID: number) => {
    setIsModalVisible(true)
    setClassId(classID)
  }
  const handleOk = () => {
    setIsModalVisible(false)

    try {
      const invitePwd = joinClassForm.getFieldValue('invitePwd')
      joinClass({ classID, invitePwd })
    } catch (error) {
      message.info('请重新加入！')
    }
  }
  const handleCancel = () => {
    setIsModalVisible(false)
  }

  return (
    <ConfigProvider locale={zhCN}>
      <Layout>
        <Layout.Content className={styles.homeContainer}>
          <Header />
          <div>
            <Row>
              <Col span={1}></Col>
              <Col span={22}>
                <PageHeader
                  style={{ marginTop: '-20px', background: '#a3d6ff24' }}
                  title="课程中心"
                  subTitle="选择感兴趣的课程学习吧！"
                  extra={
                    <Col>
                      <Input.Search
                        onSearch={(text) => setSearchText(text)}
                        allowClear
                        style={{ width: '100%' }}
                        placeholder="人工智能"
                      />
                    </Col>
                  }
                />
                {isLogin || localStorage.getItem('login_token') ? (
                  <List
                    itemLayout="vertical"
                    size="small"
                    pagination={{
                      onChange: (page) => {
                        setPageNum(page)
                      },
                      pageSize: pageSize,
                      total: courseList?.total
                    }}
                    dataSource={courseList?.courseList}
                    renderItem={(item) => (
                      <List.Item
                        key={item.id}
                        extra={
                          <img
                            width={200}
                            alt="logo"
                            src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
                          />
                        }
                      >
                        <List.Item.Meta
                          avatar={<Avatar src="https://joeschmoe.io/api/v1/jeane" />}
                          title={<p style={{ color: 'green', fontSize: '24px' }}>{item.name}</p>}
                          description={
                            '教师:  ' + item.username + ' , ' + '创建时间:' + item.created_at
                          }
                        />
                        {'简介:  ' + item.classBrief}

                        <Row justify="end">
                          <Button
                            onClick={() => {
                              showModal(item.id)
                            }}
                          >
                            加入班级
                          </Button>
                        </Row>
                      </List.Item>
                    )}
                  />
                ) : (
                  history.push('/waitToLogin')
                )}
              </Col>
            </Row>
            <Modal
              title="请输入班级邀请码(如无邀请码则不输入)"
              visible={isModalVisible}
              onOk={handleOk}
              onCancel={handleCancel}
            >
              <Form name="basic" layout="vertical" autoComplete="off" form={joinClassForm}>
                <Form.Item label="邀请码" name="invitePwd">
                  <Input size="large" maxLength={6} />
                </Form.Item>
              </Form>
            </Modal>
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
export default courseCenter
