<template>
  <div class="we-bg-white swiper-home-container" v-if="swiperList.length">
    <swiper indicator-dots circular autoplay :interval="3500">
      <template v-for="(item, index) in swiperList">
        <swiper-item :key="index">
          <img :src="item.img" class="swiper-img" />
        </swiper-item>
      </template>
    </swiper>
  </div>
</template>

<script>
export default {
  props: {
    swiperList: {
      type: Array,
      default: function() {
        return []
      }
    }
  }
}
</script>

<style lang="scss" scope>
@import "./swiperHome.scss";
</style>