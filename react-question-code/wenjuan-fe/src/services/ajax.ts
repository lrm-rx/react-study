import axios from 'axios'
import { message } from 'antd'

const instance = axios.create({
  timeout: 10 * 1000,
})

// response 拦截: 统一处理 code 和 msg
instance.interceptors.response.use(res => {
  const resData = (res.data || {}) as ResType
  const { code, data, msg } = resData

  if (code !== 200) {
    if (msg) {
      message.error(msg)
    }
    throw new Error(msg)
  }
  return data as any
})

export default instance

export type ResType = {
  code: number
  data?: ResDataType
  msg?: string
}

export type ResDataType = {
  [key: string]: any
}
