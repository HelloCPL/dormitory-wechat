import {
  Base64
} from 'js-base64'
import tools from '@js/tools'
import {
  toast
} from '@js/interaction'
import {
  wxSetStorage
}
from '@/wx/index'

// 导出请求
export const wxRequest = (params) => {
  return new Promise((resolve, reject) => {
    _request(params, resolve, reject)
  })
}

// 执行 发送请求
function _request(params, resolve, reject) {
  wx.request({
    ...params,
    success: function (res) {
      console.log('请求成功返回：', res)
      let data = res.data
      let msg = data.msg || '请求错误'
      if (tools.isString(data)) {
        try {
          data = JSON.parse(data)
        } catch (e) {}
      }
      if (res.statusCode.toString().substr(0, 1) === '2') {
        // 拦截处理 0 正常返回 
        // 403(token过期) 请求token 发送二次请求
        // 其他状态码 提示
        if (data.errorCode === 0) {
          resolve(data)
        } else if (data.errorCode === 403) {
          // 二次重发
          _rePost(params, resolve, reject, data)
        } else {
          toast(msg)
          resolve(data)
        }
      } else {
        toast(msg)
        reject(data)
      }
    },
    fail: function (err) {
      toast('请求发生错误')
      reject(err)
    }
  })
}

// 请求权限 二次重发
function _rePost(params, resolve, reject, data) {
  const http = require('@api/http').default
  const store = require('@store/index').default
  const userInfo = store.getters.userInfoGetter
  if (userInfo.id && userInfo.openId && userInfo.dorRoomId) {
    let paramsObj = {
      openId: userInfo.openId,
      studentId: userInfo.id,
      dorRoomId: userInfo.dorRoomId
    }
    http.postPub('/token/generate', paramsObj)
      .then(res => {
        if (res.errorCode === 0 && res.data) {
          store.dispatch('setTokenAction', res.data)
          wxSetStorage('token', res.data)
          const tokenGetter = store.getters.tokenGetter
          // 重置token
          params.header.Authorization = _encode(tokenGetter)
          _request(params, resolve, reject)
        } else {
          reject(data)
        }
      })
      .catch(() => {
        reject(data)
      })
  } else {
    reject(data)
  }
}

// 处理token加密
function _encode(tokenGetter) {
  const base64 = Base64.encode(tokenGetter + ':')
  return 'Basic ' + base64
}