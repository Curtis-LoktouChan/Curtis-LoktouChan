import { history } from 'umi'
import { FC, useEffect } from 'react'
import { Layout, Menu } from 'antd'
import { DesktopOutlined, UserSwitchOutlined, FileWordFilled } from '@ant-design/icons'
import { useSelector } from 'dva'

import Header from '@/components/header'
import Footer from '@/components/footer'
import styles from './index.less'

const userCenter: FC = (props) => {
  const user = useSelector((state: any) => state.user)

  useEffect(() => {
    if (!user.isLogin) {
      // 未登录时跳转到登录界面
      history.push('/waitToLogin')
    } else {
      // 已经登录，判断用户身份
      if (user.userInfo.roleId === 2)
        history.push('/userCenter/student/classList') // 学生跳转到学生班级页面
      else history.push('/userCenter/myClassList') // 教师直接跳转到班级页面
    }
  }, [])

  return (
    <Layout>
      <Layout.Content className={styles.userCenterouter}>
        <Header />
        <Layout style={{ backgroundColor: 'white' }}>
          <Layout.Sider className={styles.userCenterSider} collapsible={true} theme="light">
            <Menu
              defaultSelectedKeys={['myClass']}
              defaultOpenKeys={['sub1']}
              mode="vertical"
              style={{ background: 'white', border: 'none' }}
            >
              <Menu.Item className={styles.itemSection} icon={<DesktopOutlined />} key="myClass">
                我的班级
              </Menu.Item>
              <Menu.Item
                className={styles.itemSection}
                icon={<FileWordFilled />}
                key="myWork"
                onClick={() => {
                  history.push('/customerWork')
                }}
              >
                我的作品
              </Menu.Item>
              <Menu.Item
                className={styles.itemSection}
                icon={<UserSwitchOutlined />}
                key="studentIdentity"
                hidden={user.userInfo.roleId === 1 ? false : true} // 学生身份隐藏该选项
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
