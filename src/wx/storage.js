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
    wx.removeStorageSync(key)
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