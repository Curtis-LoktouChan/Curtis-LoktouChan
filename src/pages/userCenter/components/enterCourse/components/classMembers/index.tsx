import { useLocation, history } from 'umi'
import { FC, useState, useEffect } from 'react'
import { Table, Tag, Button, Avatar, Popconfirm, Input, message, Popover } from 'antd'
import { useSelector } from 'dva'
import { useRequest } from 'ahooks'
import { UserOutlined } from '@ant-design/icons'

import styles from './index.less'
import { UserCenterServices } from '@/services'

import request from '@/utils/request/request'
import { PREFIX_URL_V1 } from '@/constants'

const STUDENT = '1'
const TEACHER = '2'

const ClassMembers: FC = () => {
  const location = useLocation()
  const [isSettingPhone, setIsSettingPhone] = useState(false)
  const [isSettingName, setIsSettingName] = useState(false)
  const userCenter = useSelector((state: any) => state.userCenter)
  const [classMembers, setClassMembers] = useState<any>([])
  const [classInfo, setClassInfo] = useState<any>([])
  const [updateNum, setUpdateNum] = useState<any>(0)
  // 获取班级成员列表数据
  // const { data: classMembersData, run: runGetClassMembers } = useRequest(
  //   UserCenterServices.getClassMembers,
  //   {
  //     manual: true,
  //     onSuccess: () => {
  //       const members = classMembersData?.map((member: any, index: number) => {
  //         return {
  //           memberIndex: index + 1,
  //           name: member.username,
  //           nickName: member.nickName,
  //           roleId: member.roleId,
  //           phoneNumber: member.telephone
  //         }
  //       })
  //       setClassMembers(members)
  //     }
  //   }
  // )
  // 撤销学生选课
  // const { run: runDeleteStudent } = useRequest(UserCenterServices.deleteStudent, {
  //   manual: true,
  //   onSuccess: (res) => {
  //     message.info('修改成功')
  //     setUpdateNum(updateNum + 1)
  //   }
  // })
  // 修改学生信息
  // const { run: runSetStudentMessage } = useRequest(UserCenterServices.updateStudentInfo, {
  //   manual: true,
  //   onSuccess: () => {
  //     setUpdateNum(updateNum + 1)
  //   }
  // })
  //删除班级
  const { run: deleteClass } = useRequest(UserCenterServices.deleteClass, {
    manual: true,
    onSuccess: () => {
      message.success('删除班级成功！')
      setUpdateNum(updateNum + 1)
    },
    onError: () => {
      message.error('请重新尝试！')
    }
  })
  //获取课程所有班级
  const { data, run: getClass } = useRequest(UserCenterServices.getClassByCourseID, {
    manual: true,
    onSuccess: (res) => {
      const classList = res.class_list.map((class_list, index) => {
        return {
          memberIndex: index + 1,
          name: class_list.name,
          nums: class_list.nums,
          author: class_list.author,
          classID: class_list.id,
          invitePwd: class_list.invitePwd
        }
      })
      setClassInfo(classList)
    }
  })
  // 组件挂载即请求获取学生数据
  useEffect(() => {
    getClass({ courseID: userCenter.courseID })
  }, [updateNum, (location as any)?.query.addCounts])

  // 撤销选课
  // const handleCancelChoosing = (username: string) => {
  //   runDeleteStudent({
  //     className: userCenter.className,
  //     studentUsername: username
  //   })
  // }

  // 修改学生信息
  // const setStudentInfo = (message: any) => {
  //   runSetStudentMessage(message)
  // }

  // 成员表头
  const columns = [
    {
      title: '序号',
      dataIndex: 'memberIndex',
      key: 'memberIndex'
    },
    {
      title: '班级ID',
      dataIndex: 'classID',
      key: 'classID'
    },
    {
      title: '班级名称',
      dataIndex: 'name',
      key: 'name'
    },
    {
      title: '班级人数',
      dataIndex: 'nums',
      key: 'nums'
    },
    {
      title: '教师名称',
      dataIndex: 'author',
      key: 'author'
    },
    {
      title: '邀请码',
      dataIndex: 'invitePwd',
      key: 'invitePwd'
    },
    {
      title: '删除班级',
      dataIndex: 'operation',
      key: 'operation',
      render: (_: any, record: any) => {
        const classID = record.classID
        return (
          <Popconfirm
            title="是否确认删除班级？"
            okText="是"
            cancelText="否"
            onConfirm={() => {
              deleteClass({ classID })
            }}
          >
            <a>删除班级</a>
          </Popconfirm>
        )
      }
    },
    {
      title: '操作',
      dataIndex: 'operation',
      key: 'operation',
      render: () => <Button onClick={() => message.info('功能尚未开放')}>查看班级</Button>
    }
    // {
    //   title: '头像',
    //   dataIndex: 'avatar',
    //   key: 'avatar',
    //   render: () => {
    //     return <Avatar style={{ backgroundColor: '#87d068' }} icon={<UserOutlined />} />
    //   }
    // },
    // {
    //   title: '姓名',
    //   dataIndex: 'nickName',
    //   key: 'nickName',
    //   render: (info: any, record: any) => {
    //     return (
    //       <Input
    //         key={info}
    //         defaultValue={info}
    //         bordered={isSettingName}
    //         onFocus={(event: any) => {
    //           setIsSettingName(true)
    //         }}
    //         onBlur={(event) => {
    //           setIsSettingName(false)
    //           setStudentInfo({
    //             username: record.name,
    //             telephone: record.phoneNumber.toString(),
    //             nickName: event.target.value
    //           })
    //         }}
    //       />
    //     )
    //   }
    // },
    // {
    //   title: '用户名',
    //   dataIndex: 'name',
    //   key: 'name'
    // },
    // {
    //   title: '角色',
    //   dataIndex: 'roleId',
    //   key: 'roleId',
    //   render: (roleId: string) => {
    //     if (roleId === TEACHER) {
    //       return <Tag color="purple">教师</Tag>
    //     } else {
    //       return <Tag color="blue">学生</Tag>
    //     }
    //   }
    // },
    // {
    //   title: '手机号',
    //   dataIndex: 'phoneNumber',
    //   key: 'phoneNumber',
    //   render: (info: any, record: any) => {
    //     return (
    //       <Input
    //         key={info}
    //         defaultValue={info}
    //         bordered={isSettingPhone}
    //         onFocus={() => {
    //           setIsSettingPhone(true)
    //         }}
    //         onBlur={(event) => {
    //           setIsSettingPhone(false)
    //           setStudentInfo({
    //             username: record.name,
    //             telephone: event.target.value.toString(),
    //             nickName: record.nickName
    //           })
    //         }}
    //       />
    //     )
    //   }
    // },
    // {
    //   title: '操作',
    //   dataIndex: 'action',
    //   key: 'action',
    //   render: (_: any, record: any) => {
    //     if (record.roleId === TEACHER) {
    //       return null
    //     } else {
    //       return (
    //         <Popconfirm
    //           title="确认撤销该学生选课？"
    //           onConfirm={() => {
    //             handleCancelChoosing(record.name)
    //           }}
    //         >
    //           <Button type="primary" shape="round">
    //             撤销选课
    //           </Button>
    //         </Popconfirm>
    //       )
    //     }
    //   }
    // }
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
      dataSource={classInfo}
      pagination={false}
    />
  )
}

export default ClassMembers
