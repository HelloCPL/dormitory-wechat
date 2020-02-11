import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false
App.mpType = 'app'

// 封装交互方法
import { toast, confirm, alert, showLoading, hideLoading } from '@js/interaction'
Vue.prototype.$toast = toast
Vue.prototype.$confirm = confirm
Vue.prototype.$alert = alert
Vue.prototype.$showLoading = showLoading
Vue.prototype.$hideLoading = hideLoading

// 导入vuex
import store from '@store/index'
Vue.prototype.$store = store

// 导入tools常用js方法
import tools from '@js/tools'
Vue.prototype.$tools = tools

// 导入http.js请求封装
import http from '@api/http'
Vue.prototype.$http = http

// 引入dayjs事件处理方法
import dayjs from 'dayjs'
Vue.prototype.dayjs = dayjs

// 引入混入的全局方法
import common from '@/common'
Vue.use(common)


const app = new Vue(App)
app.$mount()