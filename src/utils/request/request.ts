import { extend, RequestOptionsInit, ResponseError } from 'umi-request'
import { history } from 'umi'
import { notification } from 'antd'

import { BASE_URL } from '@/constants'

const errorType = {
  systemError: 1111,
  netWorkError: 2222
}

const errorHandler = (error: ResponseError): Promise<Response> => {
  console.log(error)
  if (!error.response) {
    notification.error({
      message: '系统或网络错误，请检查后重试',
      duration: 3
    })
    // TODO 判断客户端错误类型
    return Promise.reject({ code: errorType.netWorkError, message: '网络错误', error: error })
  }

  // 登录验证重定向处理
  if (error.response?.redirected) {
    history.replace({
      pathname: '/login',
      search: JSON.stringify({
        redirect: window.location.hash.substring(1)
      })
    })

    localStorage.clear()
  }

  // 是否自定义通知处理
  const { options } = error.request || {}
  // TODO 需要增加对自定义的 options 选项的 ts 提示
  if (options?.noNotification) {
    return Promise.reject(error)
  }

  // 统一错误通知处理
  notification.config({
    maxCount: 3
  })
  notification.error({
    message: error.response?.statusText,
    description: error.response?.text,
    duration: 3
  })

  return Promise.reject(error)
}

const request = extend({
  prefix: BASE_URL,
  timeout: 50000,
  errorHandler,
  credentials: 'include'
})

request.interceptors.request.use((url, options: RequestOptionsInit) => {
  const loginToken = localStorage.getItem('login_token') || ''

  const { headers = {} } = options || {}

  const newHeaders = {
    login_token: loginToken,
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

request.interceptors.response.use(async (response) => {
  const res = await response.clone().json()

  if (response.ok && 200 <= res?.code && 300 > res?.code) {
    return res?.data || res
  }

  return response
})

export default request
