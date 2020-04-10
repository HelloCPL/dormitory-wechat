<script>
import {
  mapGetters,
  mapActions
} from 'vuex'
export default {
  // 项目初始化
  created() {
    // 调用API从本地缓存中获取数据
    /*
     * 平台 api 差异的处理方式:  api 方法统一挂载到 mpvue 名称空间, 平台判断通过 mpvuePlatform 特征字符串
     * 微信：mpvue === wx, mpvuePlatform === 'wx'
     * 头条：mpvue === tt, mpvuePlatform === 'tt'
     * 百度：mpvue === swan, mpvuePlatform === 'swan'
     * 支付宝(蚂蚁)：mpvue === my, mpvuePlatform === 'my'
     */

    let logs
    if (mpvuePlatform === 'my') {
      logs = mpvue.getStorageSync({ key: 'logs' }).data || []
      logs.unshift(Date.now())
      mpvue.setStorageSync({
        key: 'logs',
        data: logs
      })
    } else {
      logs = mpvue.getStorageSync('logs') || []
      logs.unshift(Date.now())
      mpvue.setStorageSync('logs', logs)
    }
    this.initTokenAndUserInfo()
  },
  computed: {
    ...mapGetters([
      'tokenGetter'
    ])
  },
  methods: {
    ...mapActions([
      'setTokenAction',
      'setUserInfoAction',
      'setIsAuthAction'
    ]),
    // 将token和userInfo存在Vuex中
    initTokenAndUserInfo() {
      let token = this.wxGetStorage('token')
      let userInfo = this.wxGetStorage('userInfo')
      if (token)
        this.setTokenAction(token)
      if (userInfo && this.$tools.isObject(userInfo)) {
        this.setUserInfoAction(userInfo)
      }
      this.verifyToken(userInfo)
    },

    // 检查token是否合法 不合法 userInfo存在 更新token
    async verifyToken(userInfo) {
      if (!this.tokenGetter) return
      let res = this.$http.post('/token/verify')
      if (res.errorCode === 0) {
        let flag = !res.data && userInfo && userInfo.id && userInfo.openId && userInfo.dorRoomId
        if (flag) {
          // 请求token
          let params = {
            openId: userInfo.openId,
            studentId: userInfo.id,
            dorRoomId: userInfo.dorRoomId
          }
          let resToken = await this.$http.postPub('/token/generate', params)
          if (resToken.errorCode === 0 && resToken.data) {
            this.setTokenAction(resToken.data)
            this.wxSetStorage('token', resToken.data)
          }
        }
      }
    },
  }

}
</script>