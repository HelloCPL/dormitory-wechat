<template>
  <div class="we-bg-white authentication-container">
    <div class="we-margin-bottom-20 we-font-center">
      <img :src="headerIcon" alt="" class="header-img">
      <p class="we-tips">请抓紧时间认证，否则给与真香警告！</p>
    </div>

    <van-field label="学号" :value="studentNum" placeholder="请输入学号" input-align="right" @input="setStudentNum" />
    <van-field label="真实姓名" :value="name" placeholder="请输入真实姓名" input-align="right" @input="setName" />
    <van-field label="初始密码" type="password" :value="password" placeholder="请输入初始密码" input-align="right" @input="setPassword" />

    <!-- 认证 -->
    <div class="we-margin-btn we-padding">
      <van-button type="info" size="large" @click="onSubmit">认证</van-button>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  data() {
    return {
      headerIcon: require('@icon/order_mine.png'),
      name: '',
      studentNum: '',
      password: '',
    }
  },
  // 重置数据
  onLoad() {
    Object.assign(this.$data, this.$options.data())
  },
  methods: {
    ...mapActions([
      'setUserInfoAction',
      'setTokenAction'
    ]),
    // 设置真实姓名
    setName(e) {
      e = e.mp.detail
      this.name = e
    },

    // 设置学号
    setStudentNum(e) {
      e = e.mp.detail
      this.studentNum = e
    },

    // 设置初始密码
    setPassword(e) {
      e = e.mp.detail
      this.password = e
    },

    async onSubmit() {
      if (!this.name) {
        this.$toast('请输入真实姓名')
        return
      } else if (!this.studentNum) {
        this.$toast('请输入学号')
        return
      } else if (!this.password) {
        this.$toast('请输入初始密码')
        return
      }
      let params = {
        name: this.name,
        studentNum: this.studentNum,
        password: this.password,
        openId: this.userInfoGetter.openId,
        avatarUrl: this.userInfoGetter.avatarUrl,
        nickname: this.userInfoGetter.nickname
      }
      let res = await this.$http.postPub('/auth', params)
      if (res.errorCode === 0 && res.data.type) {
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
        this.$alert('恭喜，认证成功！')
          .then(() => {
            this.$navigate.back()
          })
      }
    }
  }
}
</script>

<style lang="scss" scope>
@import "./index.scss";
</style>