import { Effect, Reducer } from 'umi'
import { UserServices } from '@/services'
import { IBaseResp } from '@/utils/types'
import { IUserLoginResponse } from '@/services/user/types'
import { BASE_AVATAR_SRC } from '@/constants'
import { history } from 'umi'

export interface IUserModelState {
  isLogin: boolean
  userInfo: {
    username: string
    login_token: string
    avatarSrc?: string
    roleId: string
  } | null
}

export interface IUserModel {
  namespace: 'user'
  state: IUserModelState
  effects: {
    loginEffect: Effect
    loginWithTokenEffect: Effect
    logoutEffect: Effect
  }
  reducers: {
    login: Reducer<IUserModelState>
    logout: Reducer<IUserModelState>
  }
}

const userModel: IUserModel = {
  namespace: 'user',
  state: {
    isLogin: false,
    userInfo: null
  },
  effects: {
    // 手动登录
    *loginEffect({ payload, callback }, { call, put }) {
      // 执行异步函数
      const res: IUserLoginResponse = yield call(() => UserServices.login(payload))
      if (res) {
        callback && callback(res)
        yield put({
          type: 'login',
          payload: res
        })
      }
    },
    // token 登录
    *loginWithTokenEffect({ payload, callback }, { call, put }) {
      const res: IBaseResp = yield call(() =>
        UserServices.loginWithToken(null, { noNotification: true })
      )
      // 手动判断业务逻辑
      if (res?.code === 200) {
        callback && callback(res)
        yield put({
          type: 'login',
          payload: res.data
        })
      } else {
        yield put({
          type: 'logout'
        })
      }
    },
    *logoutEffect({ payload, callback }, { call, put }) {
      localStorage.setItem('login_token', '')
      history.push('/home')
      yield put({
        type: 'logout'
      })
    }
  },
  reducers: {
    login(state, action) {
      return {
        ...state,
        isLogin: true,
        userInfo: {
          username: action?.payload?.username,
          login_token: action?.payload?.token,
          avatarSrc: action?.payload?.userInfo?.avatarSrc || BASE_AVATAR_SRC,
          roleId: action?.payload?.roleId
        }
      }
    },
    logout(state) {
      return {
        ...state,
        isLogin: false,
        userInfo: null
      }
    }
  }
}

export default userModel
