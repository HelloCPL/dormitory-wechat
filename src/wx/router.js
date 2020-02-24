// 普通跳转
export const wxNavigateTo = (url) => {
  return new Promise((resolve, reject) => {
    wx.navigateTo({
      url,
      success: () => {
        resolve()
      },
      fail: () => {
        reject()
      }
    })
  })
}

// 关闭当前页面，跳转到应用内的某个页面
export const wxRedirectTo = (url) => {
  return new Promise((resolve, reject) => {
    wx.redirectTo({
      url,
      success: () => {
        resolve()
      },
      fail: () => {
        reject()
      }
    })
  })
}

// 关闭所有页面，打开到应用内的某个页面
export const wxReLaunch = (url) => {
  return new Promise((resolve, reject) => {
    wx.reLaunch({
      url,
      success: () => {
        resolve()
      },
      fail: () => {
        reject()
      }
    })
  })
}

// 返回
export const wxNavigateBack = (delta) => {
  return new Promise((resolve, reject) => {
    wx.navigateBack({
      delta,
      success: () => {
        resolve()
      },
      fail: () => {
        reject()
      }
    })
  })
}