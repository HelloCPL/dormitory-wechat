// 导出 showToast 提示
export const wxShowToast = (obj) => {
  wx.showToast(obj)
}

// 导出 showLoading 加载提示
export const wxShowLoading = (obj) => {
  wx.showLoading(obj)
}

//导出 hideLoading 关闭加载提示
export const wxHideLoading = () => {
  wx.hideLoading()
}

// 导出 showModal 确认交互api
export const wxShowModal = (obj) => {
  return new Promise((resolve, reject) => {
    wx.showModal({
      ...obj,
      success: function (res) {
        if (res.confirm) {
          resolve()
        } else {
          reject()
        }
      },
      fail: function () {
        reject()
      }
    })
  })
}