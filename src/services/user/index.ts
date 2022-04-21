import apiHandle from '@/utils/request'
import { IBaseResp } from '@/utils/types'
import { IUserLoginRequest, IUserLoginResponse } from './types'

export default {
  login: apiHandle<IUserLoginRequest, IBaseResp<IUserLoginResponse>>({
    method: 'GET', // TODO json-server mock
    url: 'api/v1/base/login'
  }),
  loginWithToken: apiHandle<null, IBaseResp<IUserLoginResponse>>({
    method: 'GET', // json-server mock
    url: 'api/v1/base/tokenLogin'
  }),
  logout: apiHandle<null, IBaseResp>({
    method: 'GET',
    url: 'logout'
  })
}
