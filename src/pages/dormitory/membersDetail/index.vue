<template>
  <div class="members-detail-container">
    <!-- 头部主要信息 -->
    <div class="we-bg-white we-padding members-header">
      <div class="we-padding-right-10">
        <van-image :src="dataInfo.headImg.fullName" width="30" height="30" radius="4" @click="onPreviewImage(dataInfo.headImg.fullName)" v-if="dataInfo.headImg && dataInfo.headImg.fullName"/>
        <van-image :src="dataInfo.avatarUrl" width="30" height="30" radius="4" @click="onPreviewImage(dataInfo.avatarUrl)" v-else-if="dataInfo.avatarUrl" />
        <van-image :src="userIcon" width="30" height="30" radius="4" v-else />
      </div>
      <div class="we-color-tips right">
        <div class="we-margin-bottom-5 name">
          <span class="we-color-black we-font-18 we-padding-right-2">{{dataInfo.name}}</span>
          <img :src="womanIcon" alt="" class="icon" v-if="dataInfo.sex == '女'">
          <img :src="manIcon" alt="" class="icon" v-if="dataInfo.sex == '男'">
        </div>
        <p class="we-margin-top-2">宿舍：{{dataInfo.dorBuildingName}}{{dataInfo.dorRoomName}}</p>
        <p class="we-margin-top-2" v-if="dataInfo.phone">电话：{{dataInfo.phone}}</p>
        <p class="we-margin-top-2" v-if="dataInfo.birthday">生日：{{dataInfo.birthday}}</p>
        <p class="we-margin-top-2" v-if="dataInfo.address">住址：{{dataInfo.address}}</p>
      </div>
    </div>
    <!-- 更多个人信息 -->
    <div class="we-bg-white we-margin-top-10 members-info">
      <van-cell title="学校" :value="dataInfo.school" v-if="dataInfo.school" />
      <van-cell title="专业" :value="dataInfo.major" v-if="dataInfo.major" />
      <van-cell title="学年" :value="dataInfo.admissionTimeStr + '至' + dataInfo.graduationTimeStr" v-if="dataInfo.admissionTimeStr && dataInfo.graduationTimeStr" />
      <van-cell title="学号" :value="dataInfo.studentNum" v-if="dataInfo.studentNum" />
      <van-cell title="邮箱" :value="dataInfo.email" v-if="dataInfo.email" />
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
      let res = await this.$http.post('/dormitory/member/detail', { id })
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