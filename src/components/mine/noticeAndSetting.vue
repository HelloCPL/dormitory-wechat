<template>
  <div class="we-bg-white we-padding notice-container">
    <div class="header-footer">
      <!-- <div class="notify">
        <img :src="noticeImg" v-if="noticeList.length" class="we-margin-right-2 icon-notice">
        <img :src="notifyNoneImg" v-else class="we-margin-right-2 icon-notice">
        <span class="we-color-tips we-margin-right-2">我的消息</span>
        <van-tag type="danger" round v-if="noticeList.length">未读{{noticeList.length}}</van-tag>
      </div> -->
      <div class="notify">
        <img :src="settingImg" class="icon-setting">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {

  },
  data() {
    return {
      // noticeImg: require('@icon/icon_notify_red.png'),
      // notifyNoneImg: require('@icon/icon_notify.png'),
      settingImg: require('@icon/icon_setting.png'),

      noticeList: [1, 2, 2], //消息
    }
  },
  methods: {

  }
}
</script>

<style lang="scss" scoped>
@import "./noticeAndSetting.scss";
</style>


