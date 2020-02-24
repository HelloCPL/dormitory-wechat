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
    <div class="we-margin-top-10">
      <title-divider title="帮一帮">
        <div class="home-add">
          <span class="we-color-blue">我要发布</span>
          <img :src="addIcon" class="we-margin-left-2" />
        </div>
      </title-divider>
      <div class="order-wrapper">
        <van-tabs :active="active" color="#ed3f14" swipeable animated @change="changeActive">
          <van-tab title="帮拿快递" :name="0">
            <order-mail :active="active" />
          </van-tab>
          <van-tab title="帮拿外卖" :name="1">
            <order-food :active="active" />
          </van-tab>
          <van-tab title="其他" :name="2">
            <order-other :active="active" />
          </van-tab>
          <van-tab title="我的" :name="3">
            <order-mine :active="active" />
          </van-tab>
        </van-tabs>
      </div>
    </div>
  </div>
</template>

<script>
import swiperHome from '@com/home/swiperHome.vue'
import weather from '@com/home/weather.vue'
import noticeHome from '@com/home/noticeHome.vue'
import dailyHome from '@com/home/dailyHome.vue'
import titleDivider from '@com/common/titleDivider'
import orderMail from '@com/home/orderMail.vue'
import orderFood from '@com/home/orderFood.vue'
import orderOther from '@com/home/orderOther.vue'
import orderMine from '@com/home/orderMine.vue'
export default {
  components: {
    swiperHome,
    weather,
    noticeHome,
    dailyHome,
    titleDivider,
    orderMail,
    orderFood,
    orderOther,
    orderMine
  },
  data() {
    return {
      addIcon: require('@icon/icon_add_blue.png'),
      active: 0,
      swiperList: [
        { img: require('@img/banner1.jpg') },
        { img: require('@img/banner2.jpg') },
        { img: require('@img/banner3.jpg') }
      ]
    }
  },
  methods: {
    // 点击标签栏
    changeActive(e) {
      e = e.mp.detail.name
      this.active = e
      console.log(e)
    }
  }
}
</script>

<style lang="scss" scope>
@import "./home.scss";
</style>