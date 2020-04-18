<template>
  <div class="worker-detail-container">
    <!-- 头部主要信息 -->
    <div class="we-bg-white we-padding worker-header">
      <div class="we-padding-right-10">
        <van-image :src="dataInfo.headImg || userIcon" width="30" height="30" radius="4" @click="onPreviewImage(dataInfo.headImg)" />
      </div>
      <div class="we-color-tips right">
        <div class="we-margin-bottom-5 name">
          <span class="we-color-black we-font-18 we-padding-right-2">{{dataInfo.name}}</span>
          <img :src="womanIcon" alt="" class="icon" v-if="dataInfo.sex == '女'">
          <img :src="manIcon" alt="" class="icon" v-if="dataInfo.sex == '男'">
        </div>
        <p class="we-margin-top-2" v-if="dataInfo.position">职务：{{dataInfo.position}}</p>
        <p class="we-margin-top-2" v-if="dataInfo.phone">电话：{{dataInfo.phone}}</p>
        <p class="we-margin-top-2" v-if="dataInfo.instroduce">简介：{{dataInfo.instroduce}}</p>
      </div>
    </div>
    <!-- 留言板信息 -->
    <!-- <div class="we-bg-white we-margin-top-10 we-padding worker-board">
      留言板，有时间后期再补
    </div> -->
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
      dataInfo: {}, // 用户信息
    }
  },
  onLoad(query) {
    Object.assign(this.$data, this.$options.data())
    this.getDataInfo(query.id)
  },
  methods: {
    // 获取用户信息
    async getDataInfo(id) {
      if (!id) return
      let res = await this.$http.post('/dormitory/admin/detail', { id })
      if (res.errorCode === 0) {
        this.dataInfo = res.data
      }
    },

    // 图片预览
    onPreviewImage(img) {
      if (img)
        wxPreviewImage(img)
    }
  }
}
</script>

<style lang="scss" scope>
@import "./index.scss";
</style>