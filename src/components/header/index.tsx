import { FC, useEffect } from 'react'
import { history } from 'umi'
import { Image, Avatar, Menu, Dropdown, Button } from 'antd'
import { UserOutlined } from '@ant-design/icons'
import { useDispatch, useSelector } from 'dva'
import { ACTIONS } from '@/models'

import styles from './index.less'
import logo from './logo.png'

const Header: FC = () => {
  const user = useSelector((state: any) => state.user)
  const dispatch = useDispatch()

  const loginMenu = (
    <Menu>
      <Menu.Item key="1">
        <span style={{ color: '#1890ff' }} onClick={() => history.push('./login')}>
          登录
        </span>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="2">
        <span style={{ color: '#1890ff' }} onClick={() => history.push('./signUP')}>
          注册
        </span>
      </Menu.Item>
    </Menu>
  )
  const loggedInMenu = (
    <Menu>
      <Menu.Item key="1">
        <span style={{ color: 'black' }} onClick={() => history.push('/customerCenter')}>
          我的信息
        </span>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="2">
        <span style={{ color: 'black' }} onClick={() => history.push('/customerForgotPassword')}>
          修改密码
        </span>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item
        style={{ color: '#black' }}
        onClick={() => {
          dispatch({
            type: ACTIONS.user.logout
          })
        }}
        key="3"
      >
        退出登录
      </Menu.Item>
    </Menu>
  )

  // 自动登录代替数据持久化
  useEffect(() => {
    if (user?.isLogin || !localStorage.getItem('login_token')) {
      return
    }
    dispatch({
      type: ACTIONS.user.loginWithToken
    })
  }, [])

  return (
    <div className={styles.headerContainer}>
      <div className={styles.headerInner}>
        <div className={styles.first}>
          <Image src={logo} width={150} preview={false} onClick={() => history.push('./home')} />
        </div>
        <div className={styles.second}>
          <Button type="link" onClick={() => history.push('./aboutUs')}>
            关于我们
          </Button>
          <Button type="link" onClick={() => history.push('./hardware')}>
            硬件系统
          </Button>
          <Button type="link" onClick={() => history.push('./course')}>
            教学案例
          </Button>
          <Button type="link" onClick={() => history.push('./softDownload')}>
            下载软件
          </Button>
          <Button type="link" onClick={() => history.push('./userCenter')}>
            个人中心
          </Button>
        </div>
        <div className={styles.third}>
          <Dropdown
            className={styles.dropdown}
            overlay={user?.isLogin ? loggedInMenu : loginMenu}
            placement="bottomLeft"
            arrow
            trigger={['hover']}
          >
            <div className={styles.userContainer}>
              <span className={styles.username}>
                {user?.isLogin ? user?.userInfo?.username : '未登录'}
              </span>
              <Avatar
                shape="circle"
                size="small"
                src={user?.isLogin ? user?.userInfo?.avatarSrc : ''}
                icon={<UserOutlined />}
              />
            </div>
          </Dropdown>
        </div>
      </div>
    </div>
  )
}

export default Header
