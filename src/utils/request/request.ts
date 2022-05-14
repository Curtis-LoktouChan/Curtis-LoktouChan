import { extend, RequestOptionsInit, ResponseError } from 'umi-request'
import { ErrorShowType, history } from 'umi'
import { notification } from 'antd'

import { BASE_URL } from '@/constants'
import { IBaseResp } from '../types'

const errorType = {
  systemError: 1111,
  netWorkError: 2222
}

interface IErrorData {
  code: number
  msg: string
  data?: any
}

const errorHandler = (error: ResponseError<IErrorData>): any | void => {
  const { data, response } = error
  if (!data.code && 400 <= response?.status && response?.status < 500) {
    notification.error({
      message: '系统或网络错误，请检查后重试', // TODO 判断客户端错误类型
      duration: 3
    })
    return Promise.reject({ code: errorType.systemError, msg: error })
  }

  // 登录验证重定向处理
  if (response?.redirected) {
    history.replace({
      pathname: '/login',
      search: JSON.stringify({
        redirect: window.location.hash.substring(1)
      })
    })

    localStorage.clear()
  }

  // 统一错误通知处理
  notification.config({
    maxCount: 3
  })
  notification.error({
    message: error.data?.code,
    description: error.data?.msg,
    duration: 3
  })
}

const request = extend({
  prefix: BASE_URL,
  timeout: 50000,
  errorHandler
  // credentials: 'include'
})

request.interceptors.request.use((url, options: RequestOptionsInit) => {
  const loginToken = localStorage.getItem('login_token') || ''

  const { headers = {} } = options || {}

  const newHeaders = {
    Authorization: loginToken,
    ...headers
  }

  if (options?.method?.toUpperCase() === 'GET') {
    options.params = options.data
  } else {
    options.requestType = options?.requestType || 'json'
  }

  return {
    url,
    options: {
      ...options,
      headers: loginToken ? newHeaders : { ...headers }
    }
  }
})

request.interceptors.response.use(async (response, options) => {
  const res = await response.clone().json()

  // http 错误处理
  if (!response.ok || response?.status < 200 || response?.status >= 300) {
    return Promise.reject({ response, data: res })
  }

  if (options?.options?.noNotification) {
    // 自定义结果处理，无论正确与否
    return res as IBaseResp
  } else if (res?.code < 200 || res?.code >= 300) {
    // 业务逻辑错误处理
    return Promise.reject({ response, data: res })
  } else {
    return res?.data || (res as IBaseResp)
  }
})

export default request
