import apiHandle from '@/utils/request'
import { ITestRequest, ITestResponse } from './types'

export default {
  testApi: apiHandle<ITestRequest, ITestResponse>({
    method: 'GET',
    url: 'getWork'
  })
}
