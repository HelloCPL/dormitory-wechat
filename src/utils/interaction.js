// 交互方法
import tools from '@js/tools'
import {
  wxShowToast,
  wxShowLoading,
  wxHideLoading,
  wxShowModal
} from '@/wx/index'

// 提示
export const toast = (params) => {
  console.log(123, params)
  let obj = {
    icon: 'none',
    image: '',
    duration: 2000,
    mask: false
  }
  if (tools.isObject(params)) {
    obj.title = params.title
    obj.icon = params.icon || obj.icon
    obj.image = params.image || obj.image
    obj.duration = params.duration || obj.duration
    obj.mask = tools.isBoolean(params.mask) ? params.mask : obj.mask
  } else if (tools.isString(params) || tools.isNumber(params)) {
    obj.title = params
  } else if (tools.isArray(params)) {
    obj.title = params[0]
  }
  if (obj.title)
    wxShowToast(obj)
}

// 加载效果
export const showLoading = (params) => {
  let obj = {
    title: '加载中...',
    mask: true
  }
  if (tools.isObject(params)) {
    obj.title = params.title || obj.title
    obj.mask = tools.isBoolean(params.mask) ? params.mask : obj.mask
  } else if (tools.isString(params) || tools.isNumber(params)) {
    obj.title = params || obj.title
  }
  wxShowLoading(obj)
}

// 隐藏加载
export const hideLoading = () => {
  wxHideLoading()
}

// 确认取消
export const confirm = (params) => {
  let obj = {
    title: '温馨提示',
    content: '',
    showCancel: true,
    cancelText: '取消',
    cancelColor: '#80848f',
    confirmText: '确定',
    confirmColor: '#1989FA'
  }
  if (tools.isObject(params)) {
    obj.title = params.title || obj.title
    obj.content = params.content || obj.content
    obj.showCancel = params.showCancel || obj.showCancel
    obj.cancelText = params.cancelText || obj.cancelText
    obj.cancelColor = params.cancelColor || obj.cancelColor
    obj.confirmText = params.confirmText || obj.confirmText
    obj.confirmColor = params.confirmColor || obj.confirmColor
  } else if (tools.isString(params) || tools.isNumber(params)) {
    obj.content = params || obj.content
  }
  return wxShowModal(obj)
}

// 确定框
export const alert = (params) => {
  let obj = {
    title: '温馨提示',
    content: '',
    showCancel: false,
    confirmText: '确定',
    confirmColor: '#1989FA'
  }
  if (tools.isObject(params)) {
    obj.title = params.title || obj.title
    obj.content = params.content || obj.content
    obj.confirmText = params.confirmText || obj.confirmText
    obj.confirmColor = params.confirmColor || obj.confirmColor
  } else if (tools.isString(params) || tools.isNumber(params)) {
    obj.content = params || obj.content
  }
  return wxShowModal(obj)
}
