import axios from 'axios'
import Qs from 'qs'
import { Message } from 'element-ui'

// axios配置
axios.defaults.baseURL = process.env.BASE_API
axios.defaults.timeout = 0 // 响应时间
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8' // 配置POST请求头
axios.defaults.headers.delete['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8' // 配置delete请求头
axios.defaults.withCredentials = true // 是否允许设置cookie
axios.interceptors.request.use(
  config => {
    var method = config.method
    if (method === 'post' || method === 'put' || method === 'delete') {
      config.data = Qs.stringify(config.data, { allowDots: true })
    }
    return config
  },
  err => {
    return Promise.reject(err)
  }
)
axios.interceptors.response.use(
  response => {
    if (response.data.code !== 200) {
      Message({
        message: response.data.message,
        type: 'error',
        duration: 2 * 1000
      })
      // const err = new Error(response.data.message)
      // err.data = response.data
      // err.response = response
      // throw err
      return Promise.reject(response)
    }
    return response
  },
  error => {
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default axios
