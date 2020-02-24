import {
  wxNavigateTo,
  wxRedirectTo,
  wxReLaunch,
  wxNavigateBack
} from '@/wx/index'
import {
  toast
} from '@js/interaction'
import tools from '@js/tools'
import store from '@store/index'

const navigate = {
  // 普通跳转
  push(url, config) {
    if (!navigate._checkConfig(config)) return
    return wxNavigateTo(url)
  },

  // 替换当前页 关闭当前页面，跳转到应用内的某个页面
  replace(url, config = {}) {
    if (!navigate._checkConfig(config)) return
    return wxRedirectTo(url)
  },

  // 关闭所有页面， 打开到应用内的某个页面
  replaceAll(url, config) {
    if (!navigate._checkConfig(config)) return
    return wxReLaunch(url)
  },

  // 处理 config 参数 isLogin 要求登录 isAuth 要求认证
  _checkConfig(config = {}) {
    const tokenGetter1 = store.getters.tokenGetter1
    const authenticationGetter = store.getters.authenticationGetter
    config.isLogin = tools.isBoolean(config.isLogin) ? config.isLogin : true
    config.isAuth = tools.isBoolean(config.isAuth) ? config.isAuth : true
    if (config.isLogin && !tokenGetter1) {
      toast('登录后才能访问，请前往登录！')
      return false
    }
    if (config.isAuth && !authenticationGetter) {
      toast('实名认证后才能访问，请前往实名认证！')
      return false
    }
    return true
  },

  // 后退
  back(detal = 1) {
    return wxNavigateBack(detal)
  }
}

export default navigate
