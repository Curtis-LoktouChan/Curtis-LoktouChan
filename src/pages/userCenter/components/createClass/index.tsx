import { history } from 'umi'
import { FC, useState } from 'react'
import { PageHeader, Radio, Form, Input, Button, Select } from 'antd'
import { useRequest } from 'ahooks'
import { LeftCircleTwoTone } from '@ant-design/icons'

import styles from './index.less'
import { UserCenterServices } from '@/services'

const createClass: FC = () => {
  const [isPermissionNeeded, setIsPermissionNeeded] = useState(false) // 是否需要邀请码
  const [isAdaptiveLearning, setIsAdaptiveLearning] = useState(false) // 是否设置为自适应学习
  const { run } = useRequest(UserCenterServices.createClass, {
    manual: true,
    onSuccess: () => {
      history.goBack()
    }
  })

  // 是否需要邀请码
  const handlePermissionChange = (event: any) => {
    setIsPermissionNeeded(event.target.value)
  }

  // 是否设置为自适应学习
  const handleAdaptiveLearningChange = (event: any) => {
    setIsAdaptiveLearning(event.target.value)
  }

  // 提交表单，创建新班级
  const handleSubmit = (values: any) => {
    const newClass = {
      name: values.name,
      classBrief: values.classBrief,
      invitePwd: values.invitePwd
    }
    run(newClass)
  }

  // 创建失败
  const handleCreateFailed = (res: any) => {
    alert(res)
  }

  return (
    <div>
      <PageHeader
        className={styles.adaptiveLearingPageHeader}
        backIcon={<LeftCircleTwoTone />}
        onBack={() => history.push('/userCenter/myClassList')}
        title="新建班级"
      />
      <Form
        name="basic"
        labelCol={{ span: 0 }}
        wrapperCol={{ span: 8 }}
        initialValues={{ remember: true }}
        className={styles.createClassForm}
        onFinish={handleSubmit}
        onFinishFailed={handleCreateFailed}
      >
        <Form.Item
          label="班级名称"
          name="name"
          rules={[
            {
              required: true,
              message: '请输入正确的班级名称',
              type: 'string',
              max: 20
            }
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="班级简介"
          name="classBrief"
          rules={[
            {
              required: true,
              message: '请输入正确的简介，不超过30字',
              type: 'string',
              max: 30
            }
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="是否设置邀请码"
          name="permission"
          rules={[{ required: true, message: '选择是否需要邀请码加入班级' }]}
        >
          <Radio.Group onChange={handlePermissionChange}>
            <Radio value={true}>设置</Radio>
            <Radio value={false}>不设置</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item
          label="六位邀请码"
          name="invitePwd"
          hidden={!isPermissionNeeded}
          rules={[
            {
              required: isPermissionNeeded ? true : false,
              message: '请输入六位邀请码',
              len: 6
            }
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="是否开启自适应学习功能"
          name="isSelfStudy"
          rules={[{ required: true, message: '选择是否开启自适应学习功能' }]}
        >
          <Radio.Group onChange={handleAdaptiveLearningChange}>
            <Radio value={true}>开启</Radio>
            <Radio value={false}>不开启</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item
          label="选择科目"
          name="subject"
          hidden={!isAdaptiveLearning}
          rules={[
            {
              required: isAdaptiveLearning ? true : false,
              message: '请选择自适应学习的科目'
            }
          ]}
        >
          <Select>
            <Select.Option value="小学数学">小学数学</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 4 }}>
          <Button type="primary" htmlType="submit">
            提交
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}

export default createClass
