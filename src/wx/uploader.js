import tools from '@js/tools'
import {
  toast
} from '@js/interaction'
const baseURL = process.env.API_BASE_URL

// 上传文件
export const wxUploadFile = (url, filePath, formData = {}) => {
  url = baseURL + url
  return new Promise((resolve, reject) => {
    wx.uploadFile({
      url,
      filePath,
      name: 'file',
      header: {
        'Content-Type': 'multipart/form-data'
      },
      formData,
      success: res => {
        console.log('上传文件返回', res)
        let data = res.data
        let msg = data.msg || '上传文件发生错误'
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
      fail: () => {
        toast('上传文件发生错误')
        reject()
      }
    })
  })
}

// 下载文件 参数1 地址 参数2 指定本地存储位置 参数3 header
export const wxDownloadFile = (url, filePath, header) => {
  return new Promise((resolve, reject) => {
    wx.downloadFile({
      url,
      filePath,
      header,
      success: res => {
        let msg = data.msg || '文件下载发生错误'
        if (res.statusCode.toString().substr(0, 1) === '2') {
          if (data.errorCode !== 0) toast(msg)
          resolve(res.data)
        } else {
          toast(msg)
          reject(res.data)
        }
      },
      fail: () => {
        toast('文件下载发生错误')
        reject()
      }
    })
  })
}

// 选择图片
export const wxChooseImage = (params) => {
  params = params || {}
  const {
    count = 9,
      sizeType = ['original', 'compressed'],
      sourceType = ['album', 'camera']
  } = params
  return new Promise((resolve, reject) => {
    wx.chooseImage({
      count,
      sizeType,
      sourceType,
      success: (res) => {
        resolve(res)
      },
      fail: () => {
        reject()
      }
    })
  })
}

// 图片预览 参数1 图片数组或单个地址字符串 参数2 索引
export const wxPreviewImage = (urls, index = 0) => {
  let current
  if (tools.isString(urls)) {
    current = urls
    urls = [urls]
  } else if (tools.isArray(urls) && !tools.isEmptyArray(urls)) {
    current = urls[index]
  } else {
    toast('图片参数错误')
    return
  }
  return new Promise((resolve, reject) => {
    wx.previewImage({
      current,
      urls,
      success: () => {
        resolve()
      },
      fail: () => {
        reject()
      }
    })
  })
}
