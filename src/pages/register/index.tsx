import { FC } from 'react'
import { history } from 'umi'
import { Image, Form, Input, Button, Radio, Row, Col, Checkbox } from 'antd'
import { useRequest } from 'ahooks'

import logo from '@/assets/logo.png'
import styles from './index.less'

import { UserServices } from '@/services'

const Register: FC = () => {
  const [form] = Form.useForm()

  const { run: runRegister } = useRequest(UserServices.register, {
    manual: true,
    onSuccess: () => {
      history.push('./registerSuccess')
    }
  })

  const onFinish = async () => {
    try {
      const values = await form.validateFields()
      if (values) {
        runRegister(values)
      }
    } catch (error) {
      console.log(error)
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
      <div className={styles.registerForm}>
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
            label="昵称"
            name="nickName"
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

          <Form.Item
            label="确认密码"
            name="commitPassword"
            rules={[
              { required: true, message: '请输入您的密码！' },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve()
                  }
                  return Promise.reject(new Error('两次密码输入不一致！'))
                }
              })
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            label="电话号码"
            name="telephone"
            htmlFor="number"
            rules={[
              { type: 'string', len: 11, message: '请输入正确的电话号码' },
              { required: true, message: '请输入您的电话号码！' }
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="邮箱地址"
            name="email"
            rules={[
              {
                type: 'email',
                message: '请输入正确的邮箱地址'
              },
              { required: true, message: '请输入您的邮箱地址！' }
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item label="我是：" name="roleId" rules={[]}>
            <Radio.Group>
              <Radio value={'1'}>学生</Radio>
              <Radio value={'2'}>教师</Radio>
            </Radio.Group>
          </Form.Item>

          <Form.Item
            name="agreement"
            valuePropName="checked"
            rules={[
              {
                validator: (_, value) =>
                  value ? Promise.resolve() : Promise.reject(new Error('您尚未同意用户协议'))
              }
            ]}
            wrapperCol={{ offset: 4, span: 8 }}
          >
            <Checkbox>
              我已经阅读并同意
              <Button
                type="link"
                onClick={() => {
                  history.push('./protocol')
                }}
              >
                《用户协议》
              </Button>
            </Checkbox>
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 4 }}>
            <Row>
              <Col offset={4} span={8}>
                <Button type="primary" htmlType="submit">
                  注册
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
          已有账号？
          <Button
            type="link"
            onClick={() => {
              history.push('./login')
            }}
          >
            现在登录
          </Button>
        </p>
      </div>
    </div>
  )
}

export default Register
