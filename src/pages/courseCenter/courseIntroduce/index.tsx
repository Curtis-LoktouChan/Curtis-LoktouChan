import { FC, useState } from 'react'
import {
  Layout,
  PageHeader,
  Breadcrumb,
  Image,
  Row,
  Col,
  List,
  Collapse,
  Button,
  Modal,
  Input,
  Form,
  message,
  Divider
} from 'antd'
import { history } from 'umi'

import Header from '@/components/header'
import Footer from '@/components/footer'
import styles from './index.less'
import { useRequest } from 'ahooks'

import courseService from '@/services/courseCenter/index'

const CourseIntroduce: FC = () => {
  const [joinClassForm] = Form.useForm()
  const { Panel } = Collapse
  const [isVisible, setIsVisible] = useState(false)
  const courseInfo: any = history.location.state

  //加入班级请求
  const { data: joinClassMsg, run: joinClass } = useRequest(courseService.joinClass, {
    manual: true,
    onSuccess: (res) => {
      if (res.code == 200) {
        message.success('加入班级成功！')
        setIsVisible(false)
      }
      return res
    },
    onError: () => {
      message.error('加入班级失败！')
    }
  })

  const handleOk = () => {
    try {
      const invitePwd = joinClassForm.getFieldValue('invitePwd')
      const classID = joinClassForm.getFieldValue('classID')
      joinClass({ classID, invitePwd })
    } catch (error) {
      message.info('请重新加入！')
    }
  }

  return (
    <Layout>
      <Layout.Content style={{ backgroundColor: 'white' }}>
        <Header />
      </Layout.Content>
      <Layout.Content style={{ backgroundColor: 'white' }}>
        <div className={styles.courseIntroduceHeader}>
          {' '}
          <PageHeader>
            <Breadcrumb>
              <Breadcrumb.Item>
                <a onClick={() => history.goBack()}>课程列表</a>
              </Breadcrumb.Item>
              <Breadcrumb.Item>{courseInfo.courseInfo.Title}</Breadcrumb.Item>
            </Breadcrumb>
            <List>
              {' '}
              <List.Item style={{ margin: '10px 24px' }}>
                <div style={{ marginRight: '20px' }}>
                  <Image
                    src={
                      courseInfo.courseInfo.img
                        ? `http://42.192.82.19:50000${courseInfo.courseInfo.img}`
                        : 'https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png'
                    }
                    height={280}
                    width={350}
                  ></Image>
                </div>
                <List.Item.Meta
                  title={
                    <div
                      style={{
                        marginLeft: '6px',
                        fontWeight: 'bold',
                        fontSize: '30px',
                        textAlign: 'left'
                      }}
                    >
                      {courseInfo.courseInfo.Title}
                    </div>
                  }
                  description={
                    <div>
                      {' '}
                      <Collapse defaultActiveKey={['0']}>
                        <Panel key={'0'} header="第一次课">
                          <p>授课老师：{courseInfo.courseInfo.Author}</p>
                          <p>开始时间：{courseInfo.courseInfo.created_at}</p>
                          <p>课程简介：{courseInfo.courseInfo.introduction}</p>
                        </Panel>
                      </Collapse>
                      <Button shape="round" size="large" onClick={() => setIsVisible(true)}>
                        立即参加
                      </Button>
                    </div>
                  }
                />
              </List.Item>
            </List>
          </PageHeader>
        </div>
        <div className={styles.courseIntroduceText}>
          <Row>
            <Col span={18} offset={1}>
              <div>
                <h1>课程大纲</h1>
                <div dangerouslySetInnerHTML={{ __html: courseInfo.courseInfo.outline }}></div>
              </div>
            </Col>
            <Col>
              <div>
                <h1>老师介绍</h1>
                <h3>{courseInfo.courseInfo.Author}</h3>
              </div>
            </Col>
          </Row>
        </div>
        <Modal
          title="请输入班级邀请码(如无邀请码则不输入)"
          visible={isVisible}
          onOk={() => handleOk()}
          onCancel={() => setIsVisible(false)}
        >
          <Form name="basic" layout="vertical" autoComplete="off" form={joinClassForm}>
            <Form.Item label="班级ID" name="classId" required={true}>
              <Input size="large" maxLength={6} />
            </Form.Item>
            <Form.Item label="邀请码" name="invitePwd" required={true}>
              <Input size="large" maxLength={6} />
            </Form.Item>
          </Form>
        </Modal>
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
  )
}

export default CourseIntroduce
