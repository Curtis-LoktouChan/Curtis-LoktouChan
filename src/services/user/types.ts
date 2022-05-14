export interface IUserLoginRequest {
  username: string
  password: string
}

export interface IUserLoginResponse {
  token?: string
  username: string
  roleId: string
}

export interface IUserRegisterRequest {
  username: string
  nickName: string
  password: string
  telephone: string
  email: string
  roleId: string
}
