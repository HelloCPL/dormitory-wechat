// 用户信息
import tools from '@js/tools'
const state = {
  userInfo: { //用户信息 字段如下
    // avatarUrl: "",
    // city: "",
    // country: "Gibraltar",
    // nickName: "陳一枝",
    // province: "",
  },
  token: '', // 作为是否登录标记
  token1: true, // 作为是否登录标记
  authentication: true, // 是否已实名认证
}

const getters = {
  // 导出 用户信息
  userInfoGetter: state => state.userInfo,
  tokenGetter: state => state.token,
  tokenGetter1: state => state.token1,
  authenticationGetter: state => state.authentication,
}

const actions = {
  initTokenAction({
    commit
  }, token) {
    commit('initToken', token)
  },
  // 初始化 用户信息  注意：只在模块首页初始化一次即可，拿取用户信息请使用 getters
  initUserInfoAction({
    commit
  }, params) {
    commit('initUserInfo', params)
  },
}

const mutations = {
  'initUserInfo'(state, value) {
    if (tools.isObject(value)) {
      // value = tools.deepCopy(value)
      state.userInfo = value
    }
  },
  'initToken'(state, value) {
    state.token = value
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
