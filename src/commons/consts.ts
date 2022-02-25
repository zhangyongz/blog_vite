let BASE_URL: string

switch (process.env.NODE_ENV) {
  case 'development':
    BASE_URL = 'http://admin.zhangayong.com'
    break
  case 'production':
    BASE_URL = 'http://admin.zhangayong.com'
    break
  default:
    BASE_URL = ''
    break
}

export {
  BASE_URL
}
