import apiHandle from '@/utils/request'
import { IBaseResp } from '@/utils/types'
import { IUserLoginRequest, IUserLoginResponse } from './types'
import { PREFIX_URL_V1 } from '@/constants'

export default {
  login: apiHandle<IUserLoginRequest, IBaseResp<IUserLoginResponse>>({
    method: 'POST',
    url: `${PREFIX_URL_V1}base/login`
  }),
  loginWithToken: apiHandle<null, IBaseResp<IUserLoginResponse>>({
    method: 'GET',
    url: `${PREFIX_URL_V1}base/tokenLogin`
  }),
  logout: apiHandle<null, IBaseResp>({
    method: 'GET',
    url: 'logout'
  })
}
