<template>
  <div class="notification">
    <!-- 通知 -->
    <van-notice-bar mode="closeable" :left-icon="noticeBarIcon" :text="noticeBarText" />
    <!-- 我的消息和设置 -->
    <notice-and-setting />
    <!-- 登录 -->
    <login />
    <!-- 用户个人信息 -->
    <div class="we-margin-top-10">
      <user-info-mine />
    </div>
    <!-- 个人登记功能 -->
    <div class="we-margin-top-10">
      <van-cell-group>
        <template v-for="(item, index) in functionalList">
          <van-cell :title="item.title" :value="item.value" is-link :key="index" />
        </template>
      </van-cell-group>
    </div>
    <!-- 学校信息 -->
    <div class="we-margin-top-10">
      <van-cell title="我的学校" value="广东技术师范学院" is-link />
    </div>
  </div>
</template>

<script>

import noticeAndSetting from '@com/mine/noticeAndSetting'
import login from '@com/mine/login'
import userInfoMine from '@com/mine/userInfoMine'
export default {
  components: {
    noticeAndSetting,
    login,
    userInfoMine
  },
  data() {
    return {
      noticeBarIcon: require('@icon/icon_notify1.png'),
      noticeBarText: '如果未实名，这个通知就会显示，快点去认证吧。。。',

      functionalList: [
        { title: '个人物品', value: '查看', url: '' },
        { title: '来访人员', value: '申请', url: '' },
        { title: '出入品', value: '登记', url: '' },
        { title: '离返校', value: '登记', url: '' },
        { title: '托管', value: '申请', url: '' },
      ]
    }
  },
  methods: {

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