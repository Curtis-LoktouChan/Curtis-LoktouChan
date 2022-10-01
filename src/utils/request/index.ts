import { RequestOptionsInit } from 'umi-request'

import request from './request'

function apiHandle<T, K>(requestConfig: {
  url: string
  method: 'GET' | 'POST' | 'PUT' | 'DELETE'
}): (data?: T, options?: RequestOptionsInit) => Promise<K> {
  const { url, method } = requestConfig
  const res = (data?: T, options?: RequestOptionsInit): Promise<K> => {
    return request(url, {
      method,
      data,
      options
    })
  }
  return res
}

export default apiHandle
