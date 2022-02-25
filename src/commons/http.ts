// @ts-nocheck
import axios from 'axios'
import { ElMessage } from 'element-plus'
import { BASE_URL } from './consts'
import store from '@/store'

const instance = axios.create()

instance.defaults.baseURL = BASE_URL
instance.defaults.timeout = 30000

instance.defaults.headers.common.token = store.state.token

instance.interceptors.response.use((res) => {
  if (res.data.reCode !== 200) {
    if (res.config.toastShow !== 0) {
      ElMessage.warning(res.data.reInfo)
    }
  }
  return Promise.resolve(res)
}, (error) => {
  if (error.config.toastShow !== 0) {
    const { response } = error
    if (response) {
      ElMessage.warning('网络请求失败，请稍后重试')
    } else if (error.code === 'ECONNABORTED') {
      ElMessage.warning('网络请求超时，请检查网络')
    } else {
      ElMessage.warning('网络连接失败，请检查手机网络')
    }
  }
  console.log(error.message)
  return Promise.reject(error)
})

export default instance
