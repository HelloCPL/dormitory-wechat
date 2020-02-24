import tools from '@js/tools'

// 微信登录用于获取code
export const wxLogin = (timeout) => {
  timeout = timeout || 12000
  return new Promise((resolve, reject) => {
    wx.login({
      timeout,
      success: (res) => {
        if (res.code) {
          resolve(res.code)
        } else {
          reject()
        }
      },
      fail: () => {
        reject()
      }
    })
  })
}

// 获取用户信息
export const wxGetUserInfo = ({
  withCredentials = false,
  lang = 'zn_CN'
}) => {
  return new Promise((resolve, reject) => {
    wx.getUserInfo({
      withCredentials,
      lang,
      success: (res) => {
        if (res && !tools.isEmptyObject(res)) {
          resolve(res)
        } else {
          reject()
        }
      },
      fail: () => {
        reject()
      }
    })
  })
}
