// 与微信相关api均在此导出，直接使用，不需要二次封装

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

// 获取缓存
export const wxGetStorage = (key) => {
  try {
    return wx.getStorageSync(key)
  } catch (e) {
    console.log(`获取${key}缓存失败`)
  }
}

// 设置缓存
export const wxSetStorage = (key, value) => {
  try {
    wx.setStorageSync(key, value)
  } catch (e) {
    console.log(`设置${key}缓存失败`)
  }
}

// 移除缓存
export const wxRemoveStorage = (key) => {
  try {
    wx.removeStorageSync(key, value)
  } catch (e) {
    console.log(`移除${key}缓存失败`)
  }
}

// 清除本地所有的缓存
export const wxClearStorage = () => {
  try {
    wx.clearStorageSync()
  } catch (e) {
    console.log(`清除本地所有的缓存失败`)
  }
}
