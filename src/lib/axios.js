import axios from 'axios'
import { message } from 'antd'

const instance = axios.create({
  baseURL:
    process.env.NODE_ENV === 'development'
      ? 'http://localhost:8080'
      : 'http://118.89.94.14:8080',
  timeout: 20000 //
})

let timer

// 拦截请求
instance.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.common['Authorization'] = 'Bearer ' + token
    }
    return config
  },
  err => {
    message.error('bad request')
    Promise.reject(err)
  }
)

// 拦截响应
instance.interceptors.response.use(
  response => {
    if (response.data.status !== 200) {
      // response.data.message && message.warn(response.data.message)
      // return Promise.reject(response.data)
    }
    return response.data
  },
  err => {
    clearTimeout(timer)
    timer = setTimeout(() => {
      if (err && err.response) {
        switch (err.response.status) {
          case 400:
            message.error(`${err.response.data.message}`)
            break
          default:
            message.error(`连接错误${err.response.code}`)
            break
        }
      }
    }, 200)
    return Promise.reject(err)
  }
)

export default instance
