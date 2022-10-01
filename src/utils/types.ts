export interface IBaseResp<T = any> {
  code: number
  msg: string
  data?: T
}
