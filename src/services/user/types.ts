export interface IUserLoginRequest {
  username: string
  password: string
}

export interface IUserLoginResponse {
  login_token: string
  username: string
}

export interface IUserRegisterRequest {
  username: string
  nickName: string
  password: string
  telephone: string
  email: string
  roleId: string
}
