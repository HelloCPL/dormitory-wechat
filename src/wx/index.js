// 与微信相关api均在此导出，需要在其他地方二次封装使用

// 导出请求
export const wxRequest = (params) => {
  return new Promise((resolve, reject) => {
    wx.request({
      ...params,
      success: function (res) {
        console.log('请求成功返回：', res)
        if (res.statusCode.toString().substr(0, 1) === '2') {
          resolve(res.data)
        } else {
          reject(res.data)
        }
      },
      fail: function (err) {
        console.log('请求失败', err)
        reject(err)
      }
    })
  })
}

// 导出设置顶部导航标题api
export const wxSetNavigationBarTitle = (title) => {
  wx.setNavigationBarTitle({
    title: title
  })
}

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

// 导出 createSelectorQuery 获取元素宽高信息
export const wxCreateSelectorQuery = (id) => {
  return new Promise(resolve => {
    let query = wx.createSelectorQuery()
    query.select(id).boundingClientRect()
    query.exec(res => {
      resolve(res[0])
    })
  })
}

