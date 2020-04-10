<template>
  <div class="we-bg-white we-padding-top-10 we-padding-bottom-20 login-container">
    <div class="login-wrapper">
      <img :src="unLoginImg" v-if="!isLoginGetter">
      <img :src="loginImg" v-else-if="isLoginGetter && !userInfoGetter.avatarUrl">
      <img :src="userInfoGetter.avatarUrl" v-else-if="isLoginGetter && userInfoGetter.avatarUrl">
      <button open-type="getUserInfo" class="we-margin-top-10 we-tips login-btn" @getuserinfo="toLogin" v-if="!isLoginGetter">点击登录</button>
      <span class="we-color-tips we-margin-top-10" v-else>{{userInfoGetter.nickname}}</span>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  data() {
    return {
      unLoginImg: require('@icon/icon_user_unlogin.png'),
      loginImg: require('@icon/icon_user_login.png'),

      lock: false
    }
  },
  methods: {
    ...mapActions([
      'setUserInfoAction',
      'setTokenAction'
    ]),

    // 点击登录
    async toLogin(e) {
      if (this.lock) return
      e = e.mp.detail.userInfo
      if (!e) return
      let userInfo = {
        avatarUrl: e.avatarUrl,
        nickName: e.nickName,
      }
      this.lock = true
      const code = await this.wxLogin()
      const res = await this.$http.postPub('/login', { code })
      if (res.errorCode === 0) {
        if (res.data.type) {
          // 保存用户信息
          this.setUserInfoAction(res.data)
          this.wxSetStorage('userInfo', res.data)
          // 请求token
          let params = {
            openId: res.data.openId,
            studentId: res.data.id,
            dorRoomId: res.data.dorRoomId
          }
          let resToken = await this.$http.postPub('/token/generate', params)
          if (resToken.errorCode === 0 && resToken.data) {
            this.setTokenAction(resToken.data)
            this.wxSetStorage('token', resToken.data)
          }
        } else {
          // 保存用户信息 (仅有 openId nickname avatarUrl)
          let userInfo = {
            openId: res.data.openId,
            avatarUrl: e.avatarUrl,
            nickname: e.nickName
          }
          this.setUserInfoAction(userInfo)
          this.wxSetStorage('userInfo', userInfo)
        }
      } else {
        this.$toast(res.msg)
      }
      this.lock = false
    }
  }
}
</script>

<style lang="scss" scoped>
@import "./login.scss";
</style>


