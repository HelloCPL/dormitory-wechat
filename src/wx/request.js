import tools from '@js/tools'
import {
  toast
} from '@js/interaction'
// 导出请求
export const wxRequest = (params) => {
  return new Promise((resolve, reject) => {
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
          if (data.errorCode !== 0) toast(msg)
          resolve(data)
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
  })
}
