// 项目运行环境
export const isDev = process.env.NODE_ENV === 'development'

// 对应环境的后端路由前缀，请在 .umirc.ts 文件（或对应 umirc.prod.ts）修改
export const BASE_URL = process.env.BASE_URL

// 默认用户头像地址
export const BASE_AVATAR_SRC = '' // TODO
