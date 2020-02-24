<template>
  <div class="we-bg-white we-padding-top-10 we-padding-bottom-20 login-container">
    <div class="login-wrapper">
      <img :src="unLoginImg" v-if="!tokenGetter">
      <img :src="loginImg" v-else-if="tokenGetter && !userInfoGetter.avatarUrl">
      <img :src="userInfoGetter.avatarUrl" v-else-if="tokenGetter && userInfoGetter.avatarUrl">

      <button open-type="getUserInfo" class="we-margin-top-10 we-tips" @getuserinfo="toLogin" v-if="!tokenGetter">点击登录</button>
      <span class="we-color-tips we-margin-top-10" v-else>{{userInfoGetter.nickName}}</span>
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
      'initTokenAction',
      'initUserInfoAction'
    ]),

    // 点击登录
    toLogin(e) {
      if (this.lock) return
      e = e.mp.detail.userInfo
      if (!e) return
      let userInfo = {
        avatarUrl: e.avatarUrl,
        country: e.country,
        province: e.province,
        city: e.city,
        nickName: e.nickName,
      }
      this.lock = true
      this.wxLogin()
        .then(res => {
          return this.$http.postPub('/register', {
            code: res,
            ...userInfo
          })
        })
        .catch(() => {
          this.$toast('发生错误')
        })
        .then(res => {
          if (res.errorCode === 0) {
            let token = res.data.token
            this.initTokenAction(token)
            this.initUserInfoAction(userInfo)
            this.wxSetStorage('token', token)
            this.wxSetStorage('userInfo', userInfo)
          }
        })
        .finally(() => {
          this.lock = false
        })
    }
  }
}
</script>

<style lang="scss" scoped>
@import "./login.scss";
</style>


