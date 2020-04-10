import {
  Base64
} from 'js-base64'
import {
  wxRequest
} from '@/wx/index'
import {
  showLoading,
  hideLoading,
  toast
} from '@js/interaction'
import tools from '@js/tools'
import store from '@store/index'
const baseURL = process.env.API_BASE_URL

// token 之后另外处理 -----------------


const http = {
  // get 请求，需要token存在
  get(url, data, config = {}) {
    const tokenGetter = store.getters.tokenGetter
    if (!tokenGetter) {
      toast('用户token不存在')
      return Promise.reject('用户token不存在')
    }
    url = baseURL + url
    config.header = config.header || {}
    config.header.Authorization = http._encode()
    return http._handlerParams('GET', url, data, config)
  },

  // get 请求，不需要token存在即可请求
  getPub(url, data, config = {}) {
    url = baseURL + url
    return http._handlerParams('GET', url, data, config)
  },

  // get 请求外部接口（需要外部接口做跨域请求处理，url为全路径）
  getExt(url, data, config = {}) {
    return http._handlerParams('GET', url, data, config)
  },

  // post 请求，需要token存在
  post(url, data, config = {}) {
    const tokenGetter = store.getters.tokenGetter
    if (!tokenGetter) {
      toast('用户token不存在')
      return Promise.reject('用户token不存在')
    }
    url = baseURL + url
    config.header = config.header || {}
    config.header.Authorization = http._encode()
    return http._handlerParams('POST', url, data, config)
  },

  // post 请求，不需要token存在
  postPub(url, data, config = {}) {
    url = baseURL + url
    return http._handlerParams('POST', url, data, config)
  },

  // post 请求外部接口 （需要外部接口做跨域请求处理，url为全路径）
  postExt(url, data, config = {}) {
    return http._handlerParams('POST', url, data, config)
  },

  // 处理请求参数
  _handlerParams(method, url, data, config) {
    let obj = {
      method,
      url,
      data,
      header: {
        'Content-Type': 'application/json'
      },
      timeout: config.timeout || 12000,
      dataType: config.dataType || 'json',
      responseType: config.responseType || 'text'
    }
    // 处理请求头
    if (tools.isObject(config.header) && !tools.isEmptyObject(config.header)) {
      Object.assign(obj.header, config.header)
    }
    return http._request(obj)
  },

  // 发送请求
  _request(params) {
    // 此处可做请求拦截...

    return new Promise((resolve, reject) => {
      showLoading()
      wxRequest(params)
        .then(res => {
          resolve(res)
        })
        .catch(err => {
          reject(err)
        })
        .finally(() => {
          hideLoading()
        })
    })
  },

  // 处理token加密
  _encode() {
    const tokenGetter = store.getters.tokenGetter
    const base64 = Base64.encode(tokenGetter + ':')
    return 'Basic ' + base64
  },
}

export default http
