import { FC } from 'react'
import { ConfigProvider, Layout } from 'antd'
import zhCN from 'antd/lib/locale/zh_CN'

import styles from './index.less'
import Header from '@/components/header'
import Footer from '@/components/footer'
import { useRequest } from 'ahooks'
import { useState } from 'react'
import { List, Avatar, Row, PageHeader, Button, Input, message, Col, Modal, Form } from 'antd'

import courseService from '@/services/courseCenter'

const courseCenter: FC = () => {
  const login_token = localStorage.getItem('login_token')
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [classID, setclassID] = useState(0)
  const [joinClassForm] = Form.useForm()
  //请求数据
  const { data: data1, run: getList } = useRequest(courseService.getList, {
    defaultParams: [{ token: login_token }],
    onSuccess: (res) => {
      console.log(res)
      return res
    }
  })
  const { data: data2, run: joinClass } = useRequest(courseService.joinClass, {
    manual: true,
    onSuccess: (res) => {
      console.log(res)
      message.info(res.msg)
      return res
    }
  })

  //加入班级
  const showModal = (classID: number) => {
    setIsModalVisible(true)
    setclassID(classID)
  }
  const handleOk = () => {
    setIsModalVisible(false)
    //加入班级
    const invitePwd = joinClassForm.getFieldValue('invitePwd')
    joinClass({ classID, invitePwd })
  }
  const handleCancel = () => {
    setIsModalVisible(false)
  }

  //搜索课程
  const onSearch = (text: string) => {
    getList({ searchCourse: text })
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
                        onSearch={onSearch}
                        allowClear
                        style={{ width: '100%' }}
                        placeholder="人工智能"
                      />
                    </Col>
                  }
                />
                <List
                  itemLayout="vertical"
                  size="small"
                  pagination={{
                    // onChange: (page: number) => {
                    //   getList({ page })
                    // },
                    defaultPageSize: 10,
                    total: data1?.total
                  }}
                  dataSource={data1?.courseList}
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
                        title={<h1 style={{ color: 'green' }}>{item.name}</h1>}
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
