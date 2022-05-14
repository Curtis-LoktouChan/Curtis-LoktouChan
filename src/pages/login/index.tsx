import { FC } from 'react'
import { history } from 'umi'
import { Image, Form, Input, Button, Checkbox, Row, Col } from 'antd'
import { useDispatch } from 'dva'
import logo from '../../assets/logo.png'
import styles from './index.less'

import { IUserLoginResponse } from '@/services/user/types'
import { ACTIONS } from '@/models'

const Login: FC = () => {
  const dispatch = useDispatch()
  const [form] = Form.useForm()

  const onFinish = async () => {
    try {
      const values = await form.validateFields()
      dispatch({
        type: ACTIONS.user.login,
        payload: { username: values?.username, password: values?.password },
        callback: (data: IUserLoginResponse) => {
          localStorage.setItem('login_token', data?.token)
          history.push('./home')
        }
      })
    } catch (error) {
      console.log('FormError:', error)
    }
  }

  const onReset = () => {
    form.resetFields()
  }

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo)
  }

  return (
    <div className={styles.container}>
      <div className={styles.logo}>
        <Image src={logo} preview={false} onClick={() => history.push('./home')} />
      </div>
      <div className={styles.loginForm}>
        <Form
          name="basic"
          form={form}
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="用户名"
            name="username"
            rules={[{ required: true, message: '请输入您的用户名！' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="密码"
            name="password"
            rules={[{ required: true, message: '请输入您的密码！' }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 8, span: 16 }}>
            <Checkbox>记住我！</Checkbox>
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 4 }}>
            <Row>
              <Col offset={4} span={8}>
                <Button type="primary" htmlType="submit">
                  登录
                </Button>
              </Col>
              <Col offset={4} span={8}>
                <Button htmlType="button" onClick={onReset}>
                  重置
                </Button>
              </Col>
            </Row>
          </Form.Item>
        </Form>
      </div>
      <div className={styles.register}>
        <p>
          没有账号？
          <Button type="link" onClick={() => history.push('./register')}>
            现在注册
          </Button>
        </p>
      </div>
    </div>
  )
}

export default Login
