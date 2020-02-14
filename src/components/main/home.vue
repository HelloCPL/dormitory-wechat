<template>
  <div class="home-container">
    <!-- 头部轮播 -->
    <div class="home-header">
      <swiper-home :swiperList="swiperList"></swiper-home>
      <!-- 天气 -->
      <div class="home-header-weather">
        <weather />
      </div>
    </div>

    <!-- 公告 -->
    <div class="we-margin-bottom-10">
      <notice-home></notice-home>
    </div>

    <!-- 日常管理 -->
    <daily-home></daily-home>
  </div>
</template>

<script>
import swiperHome from '@com/home/swiperHome.vue'
import weather from '@com/home/weather.vue'
import noticeHome from '@com/home/noticeHome.vue'
import dailyHome from '@com/home/dailyHome.vue'
export default {
  components: {
    swiperHome,
    weather,
    noticeHome,
    dailyHome
  },
  data() {
    return {
      swiperList: [
        { img: require('@img/banner1.jpg') },
        { img: require('@img/banner2.jpg') },
        { img: require('@img/banner3.jpg') }
      ]
    }
  },
  methods: {
  }
}
</script>

<style lang="scss" scope>
@import "./home.scss";
</style>