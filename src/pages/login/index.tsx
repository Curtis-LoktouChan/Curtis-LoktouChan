import { FC } from 'react'
import { history } from 'umi'
import { Form, Input, Button, Checkbox } from 'antd'
import { useDispatch } from 'dva'

import { IUserLoginResponse } from '@/services/user/types'
import { ACTIONS } from '@/models'

const Login: FC = () => {
  const dispatch = useDispatch()

  const onFinish = (values: any) => {
    dispatch({
      type: ACTIONS.user.login,
      payload: { username: values?.username, password: values?.password },
      callback: (data: IUserLoginResponse) => {
        localStorage.setItem('login_token', data?.login_token)
        history.push('./home')
      }
    })
  }

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo)
  }

  return (
    <Form
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item
        label="Username"
        name="username"
        rules={[{ required: true, message: 'Please input your username!' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[{ required: true, message: 'Please input your password!' }]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 8, span: 16 }}>
        <Checkbox>Remember me</Checkbox>
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  )
}

export default Login
