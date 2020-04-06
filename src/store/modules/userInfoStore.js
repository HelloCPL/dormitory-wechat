// 用户信息
import tools from '@js/tools'
const state = {
  userInfo: {}, //用户信息 
  isLogin: false, // 是否已登录
  isAuth: false, // 是否已实名认证
  token: '', // 令牌
}

const getters = {
  // 导出 用户信息
  userInfoGetter: state => state.userInfo,
  isLoginGetter: state => state.isLogin,
  isAuthGetter: state => state.isAuth,
  tokenGetter: state => state.token,
}

const actions = {
  // 设置 用户信息
  setUserInfoAction({
    commit
  }, params) {
    commit('setUserInfo', params)
  },

  // 设置 token
  setTokenAction({
    commit
  }, value) {
    commit('setToken', value)
  },
}

const mutations = {
  'setUserInfo'(state, params) {
    if (tools.isObject(params)) {
      state.userInfo = params
      if (params.openId)
        state.isLogin = true
      if (params.id)
        state.isAuth = true
    }
  },

  'setToken'(state, value) {
    state.token = value
  },
}

export default {
  state,
  getters,
  mutations,
  actions
}
