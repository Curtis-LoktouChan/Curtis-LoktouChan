import { Effect, Reducer } from 'umi'
import UserService from '@/services/user'
import { IBaseResp } from '@/utils/types'
import { IUserLoginResponse } from '@/services/user/types'
import { BASE_AVATAR_SRC } from '@/constants'

export interface IUserModelState {
  isLogin: boolean
  userInfo: {
    username: string
    login_token: string
    avatarSrc?: string
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
      const res: IUserLoginResponse = yield call(() => UserService.login(payload))
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
      const res: IUserLoginResponse = yield call(() => UserService.loginWithToken())
      if (res) {
        callback && callback(res)
        yield put({
          type: 'login',
          payload: res
        })
      }
    },
    *logoutEffect({ payload, callback }, { call, put }) {
      const res: IBaseResp = yield call(() => UserService.logout())
      if (res.code === 200) {
        callback && callback(res)
        localStorage.clear()
      }
    }
  },
  reducers: {
    login(state, action) {
      return {
        ...state,
        isLogin: true,
        userInfo: {
          username: action?.payload?.username,
          login_token: action?.payload?.login_token,
          avatarSrc: action?.payload?.avatarSrc || BASE_AVATAR_SRC
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
