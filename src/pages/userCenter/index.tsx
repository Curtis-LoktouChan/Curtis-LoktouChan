import { history } from 'umi'
import { FC, useEffect } from 'react'
import { Layout, Menu } from 'antd'
import { DesktopOutlined, UserSwitchOutlined, FileWordFilled } from '@ant-design/icons'
import { useSelector } from 'dva'

import Header from '@/components/header'
import Footer from '@/components/footer'
import styles from './index.less'

const STUDENT = '1'
const TEACHER = '2'

const userCenter: FC = (props) => {
  const user = useSelector((state: any) => state.user)

  useEffect(() => {
    // 判断是否已经登录且记录用户角色
    if (!localStorage.getItem('login_token') || !localStorage.getItem('user_roleId'))
      history.push('/waitToLogin')
    else {
      // 已经登录，判断用户身份
      const roleNum = localStorage.getItem('user_roleId')
      if (roleNum === STUDENT)
        history.push('/userCenter/student/classList') // 学生跳转到学生班级页面
      else history.push('/userCenter/myClassList') // 教师直接跳转到班级页面
    }
  }, [])

  const goMyClassList = () => {
    if (user.userInfo?.roleId === TEACHER) history.push('/userCenter/myClassList')
    else history.push('/userCenter/student/classList')
  }

  return (
    <Layout>
      <Layout.Content className={styles.userCenterOuter}>
        <Header />
        <Layout style={{ backgroundColor: 'white' }}>
          <Layout.Sider className={styles.userCenterSider} collapsible={true} theme="light">
            <Menu
              defaultSelectedKeys={['myClass']}
              defaultOpenKeys={['sub1']}
              mode="vertical"
              style={{ background: 'white', border: 'none' }}
            >
              <Menu.Item
                className={styles.itemSection}
                icon={<DesktopOutlined />}
                key="myClass"
                onClick={goMyClassList}
              >
                我的班级
              </Menu.Item>
              <Menu.Item
                className={styles.itemSection}
                icon={<FileWordFilled />}
                key="myWork"
                onClick={() => {
                  // history.push('/customerWork')
                  history.push('/comingSoon')
                }}
              >
                我的作品
              </Menu.Item>
              <Menu.Item
                className={styles.itemSection}
                icon={<UserSwitchOutlined />}
                key="studentIdentity"
                hidden={user.userInfo?.roleId === STUDENT ? true : false} // 学生身份隐藏该选项
                onClick={() => {
                  history.push('/userCenter/student/classList')
                }}
              >
                学生身份
              </Menu.Item>
            </Menu>
          </Layout.Sider>
          <Layout className={styles.userCenterContent}>
            <Layout.Content style={{ minHeight: '150vh', backgroundColor: 'white' }}>
              {props.children}
            </Layout.Content>
            <Layout.Footer
              style={{
                position: 'absolute',
                bottom: 0,
                width: '100%',
                backgroundColor: '#f4fbff'
              }}
            >
              <Footer />
            </Layout.Footer>
          </Layout>
        </Layout>
      </Layout.Content>
    </Layout>
  )
}

export default userCenter
