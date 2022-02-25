import Log from 'log-sdk-javascript'

let token: string | null = localStorage.getItem('logToken')
if (!token) {
  token = new Date().getTime().toString()
}
localStorage.setItem('logToken', token)

const log = new Log(token, true)

export default log
