// 导出设置顶部导航标题api
export const wxSetNavigationBarTitle = (title) => {
  wx.setNavigationBarTitle({
    title: title
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

// 监听屏幕窗口变化
export const wxOnWindowResize = () => {
  return new Promise(resolve => {
    wx.onWindowResize(res => {
      resolve(res)
    })
  })
}
