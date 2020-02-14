<template>
  <div class="notification">
    <!-- 通知 -->
    <van-notice-bar mode="closeable" :left-icon="notifyImg1" :text="notifyWord" />

    <!-- 头部 -->
    <div class="we-bg-white we-padding header">
      <div class="we-margin-bottom-20 header-footer">
        <div class="notify" v-if="!notificationList.length">
          <img :src="notifyNoneImg">
          <span class="we-color-tips we-margin-right-2">我的消息</span>
          <van-tag type="danger" round>未读5</van-tag>
          <!-- <van-tag type="danger" round>1</van-tag> -->
        </div>
        <div class="notify" v-else>
          <img :src="notifyImg">
          <span class="we-color-tips we-margin-right-2">我的消息</span>
        </div>

        <div class="notify">
          <img :src="settingImg">
        </div>
      </div>
      <div class="img-wrapper">
        <img :src="unLoginImg" class="header-img" v-if="!tokenGetter">
        <img :src="loginImg" class="header-img" v-else-if="tokenGetter && !userInfoGetter.avatarUrl">
        <img :src="userInfoGetter.avatarUrl" class="header-img" v-if="tokenGetter && userInfoGetter.avatarUrl">
        <!-- <span class="we-tips we-margin-top-15" v-if="!tokenGetter">点击登录</span> -->
        <button open-type="getUserInfo" @getuserinfo="toLogin" v-if="!tokenGetter">点击登录</button>
        <span class="we-color-tips we-margin-top-15" v-else>{{userInfoGetter.nickName}}</span>
      </div>
    </div>

    <!-- 我的信息 -->
    <div class="we-divider"></div>
    <van-cell-group>
      <van-cell value="去认证" is-link>
        <div slot="title" class="">
          <span class="van-cell-text we-margin-right-5">实名认证</span>
          <van-tag type="danger" round>未认证</van-tag>
        </div>
      </van-cell>
      <van-cell title="个人信息" value="修改" is-link />
    </van-cell-group>

    <!-- 学校信息 -->
    <div class="we-divider"></div>
    <van-cell-group>
      <van-cell title="我的宿舍" value="北一999" is-link />
      <van-cell title="我的学校" value="广东技术师范学院" is-link />
      </van-cell>
      <van-cell title="规章制度" is-link />
    </van-cell-group>

  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  data() {
    return {
      unLoginImg: require('@icon/icon_user_unlogin.png'),
      loginImg: require('@icon/icon_user_login.png'),
      notifyNoneImg: require('@icon/icon_notify.png'),
      notifyImg: require('@icon/icon_notify_red.png'),
      notifyImg1: require('@icon/icon_notify1.png'),
      settingImg: require('@icon/icon_setting.png'),
      userImg: '',

      notificationList: [], //消息
      notifyWord: '如果未实名，这个通知就会显示，快点去认证吧。。。'
    }
  },
  methods: {
    ...mapActions([
      'initTokenAction',
      'initUserInfoAction'
    ]),
    toLogin(e) {
      e = e.mp.detail.userInfo
      if (!e) return
      let userInfo = {
        avatarUrl: e.avatarUrl,
        country: e.country,
        province: e.province,
        city: e.city,
        nickName: e.nickName,
      }
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
    }
  }
}
</script>

<style lang="scss">
.notification {
  .van-notice-bar {
    height: auto;
    padding-top: 2px;
    padding-bottom: 2px;
  }
  .van-notice-bar__right-icon {
    top: 6px;
  }
}
</style>

<style lang="scss" scope>
@import "./mine.scss";
</style>