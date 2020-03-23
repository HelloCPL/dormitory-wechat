<template>
  <div class="worker-detail-container">
    <!-- 头部主要信息 -->
    <div class="we-bg-white we-padding worker-header">
      <div class="we-padding-right-10">
        <van-image :src="avatarUrl" width="30" height="30" radius="4" @click="onPreviewImage(avatarUrl)" />
      </div>
      <div class="we-color-tips right">
        <div class="we-margin-bottom-5 name">
          <span class="we-color-black we-font-18 we-padding-right-2">梁婉鸣</span>
          <img :src="womanIcon" alt="" class="icon">
        </div>
        <p class="we-margin-top-2">职务：北二宿管</p>
        <p class="we-margin-top-2">电话：15866666666</p>
        <p class="we-margin-top-2">个性签名：为人名服务</p>
      </div>
    </div>
    <!-- 留言板信息 -->
    <div class="we-bg-white we-margin-top-10 we-padding worker-board">
      留言板，有时间后期再补
    </div>
  </div>
</template>

<script>
import { wxPreviewImage } from '@/wx/index'
export default {
  data() {
    return {
      userIcon: require('@icon/icon_user_login.png'),
      womanIcon: require('@icon/icon_woman.png'),
      manIcon: require('@icon/icon_man.png'),
      avatarUrl: 'https://wx.qlogo.cn/mmopen/vi_32/EB9hYpjibEZqibuHqcmKvJadoLIahX054hXiaFYocBsZcXzwd7dcC4C6z957aLKhYZGIqv6MDTfhI3FcbArpYrWNg/132'
    }
  },
  methods: {
    // 图片预览
    onPreviewImage(img) {
      wxPreviewImage(img)
    }
  }
}
</script>

<style lang="scss" scope>
@import "./index.scss";
</style>