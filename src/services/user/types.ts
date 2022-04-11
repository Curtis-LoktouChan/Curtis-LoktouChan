export interface IUserLoginRequest {
  username: string
  password: string
}

export interface IUserLoginResponse {
  login_token: string
  username: string
}
