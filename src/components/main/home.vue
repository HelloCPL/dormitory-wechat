<template>
  <div class="home-container">
    <!-- 头部轮播 -->
    <div class="home-header">
      <swiper-home :swiperList="swiperList" />
      <!-- 天气 -->
      <div class="home-header-weather">
        <weather />
      </div>
    </div>
    <!-- 公告 -->
    <div class="we-margin-bottom-10">
      <notice-home />
    </div>
    <!-- 日常管理 -->
    <daily-home />
    <!-- 辅助功能 -->
    
  </div>
</template>

<script>
import swiperHome from '@com/home/swiperHome.vue'
import weather from '@com/home/weather.vue'
import noticeHome from '@com/home/noticeHome.vue'
import dailyHome from '@com/home/dailyHome.vue'
import titleDivider from '@com/common/titleDivider'
export default {
  components: {
    swiperHome,
    weather,
    noticeHome,
    dailyHome,
    titleDivider,
  },
  data() {
    return {
      addIcon: require('@icon/icon_add_blue.png'),
      active: 0,
      swiperList: []
    }
  },
  onLoad() {
    this.getSwiperList()
  },
  methods: {
    // 获取轮播图
    async getSwiperList() {
      let res = await this.$http.postPub('/management/images/list', { type: 1 })
      if (res.errorCode === 0) {
        this.swiperList = res.data
      }
    },
    // 点击标签栏
    changeActive(e) {
      e = e.mp.detail.name
      this.active = e
    }
  }
}
</script>

<style lang="scss" scope>
@import "./home.scss";
</style>