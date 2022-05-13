import { FC, useState, useEffect } from 'react'
import { Table, Tag, Button, Avatar, Popconfirm, Input, message } from 'antd'
import { useSelector } from 'dva'
import { useRequest } from 'ahooks'
import { UserOutlined } from '@ant-design/icons'

import styles from './index.less'
import { UserCenterServices } from '@/services'

const STUDENT = '1'
const TEACHER = '2'

const ClassMembers: FC = () => {
  const [isSettingPhone, setIsSettingPhone] = useState(false)
  const [isSettingName, setIsSettingName] = useState(false)
  const userCenter = useSelector((state: any) => state.userCenter)
  const [classMembers, setClassMembers] = useState<any>([])
  // 获取班级成员列表数据
  const { data: classMembersData, run: runGetClassMembers } = useRequest(
    UserCenterServices.getClassMembers,
    {
      manual: true,
      onSuccess: () => {
        const members = classMembersData?.map((member: any, index: number) => {
          return {
            memberIndex: index + 1,
            name: member.username,
            nickName: member.nickName,
            roleId: member.roleId,
            phoneNumber: member.telephone
          }
        })
        setClassMembers(members)
      }
    }
  )
  // 撤销学生选课
  const { run: runDeleteStudent } = useRequest(UserCenterServices.deleteStudent, {
    manual: true,
    onSuccess: () => {
      message.info('修改成功')
    }
  })
  // 修改学生信息
  const { run: runSetStudentMessage } = useRequest(UserCenterServices.updateStudentInfo, {
    manual: true,
    onSuccess: () => {
      return
    }
  })

  // 组件挂载即请求获取学生数据
  useEffect(() => {
    runGetClassMembers({ classID: userCenter?.classID?.toString() })
  }, [])

  // 撤销选课
  const handleCancelChoosing = (username: string) => {
    runDeleteStudent({
      className: userCenter.className,
      StudentUserName: username
    })
  }

  // 修改学生信息
  const setStudentInfo = (message: any) => {
    runSetStudentMessage(message)
  }

  // 成员表头
  const columns = [
    {
      title: '序号',
      dataIndex: 'memberIndex',
      key: 'memberIndex'
    },
    {
      title: '头像',
      dataIndex: 'avatar',
      key: 'avatar',
      render: () => {
        return <Avatar style={{ backgroundColor: '#87d068' }} icon={<UserOutlined />} />
      }
    },
    {
      title: '姓名',
      dataIndex: 'nickName',
      key: 'nickName',
      render: (info: any, record: any) => {
        return (
          <Input
            key={info}
            defaultValue={info}
            bordered={isSettingName}
            onFocus={(event: any) => {
              console.log(event.target)
              setIsSettingName(true)
            }}
            onBlur={(event) => {
              setIsSettingName(false)
              setStudentInfo({
                username: record.name,
                telephone: event.target.value.toString(),
                nickName: record.nickName
              })
            }}
          />
        )
      }
    },
    {
      title: '用户名',
      dataIndex: 'name',
      key: 'name'
    },
    {
      title: '角色',
      dataIndex: 'roleId',
      key: 'roleId',
      render: (roleId: string) => {
        if (roleId === TEACHER) {
          return <Tag color="purple">教师</Tag>
        } else {
          return <Tag color="blue">学生</Tag>
        }
      }
    },
    {
      title: '手机号',
      dataIndex: 'phoneNumber',
      key: 'phoneNumber',
      render: (info: any, record: any) => {
        return (
          <Input
            key={info}
            defaultValue={info}
            bordered={isSettingPhone}
            onFocus={() => {
              setIsSettingPhone(true)
            }}
            onBlur={(event) => {
              setIsSettingPhone(false)
              setStudentInfo({
                username: record.name,
                telephone: event.target.value.toString(),
                nickName: record.nickName
              })
            }}
          />
        )
      }
    },
    {
      title: '操作',
      dataIndex: 'action',
      key: 'action',
      render: (_: any, record: any) => {
        if (record.roleId === TEACHER) {
          return null
        } else {
          return (
            <Popconfirm
              title="确认撤销该学生选课？"
              onConfirm={() => {
                handleCancelChoosing(record.username)
              }}
            >
              <Button type="primary" shape="round">
                撤销选课
              </Button>
            </Popconfirm>
          )
        }
      }
    }
  ]

  // 表头项目名称居中
  columns.forEach((item: any) => {
    item.align = 'center'
  })

  return (
    <Table
      rowKey={(record) => record.memberIndex} // 每一行的key值，不设会报错
      className={styles.classMembersTable}
      columns={columns}
      dataSource={classMembers}
      pagination={{ position: ['bottomCenter'] }}
    />
  )
}

export default ClassMembers
