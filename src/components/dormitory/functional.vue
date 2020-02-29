<template>
  <div class="we-bg-white we-margin-top-10 functional-container">
    <van-grid :column-num="column">
      <template v-for="(item, index) in functionalList">
        <van-grid-item :icon="item.img" :text="item.text" :key="index" @click="toDetail(item.url)" />
      </template>
    </van-grid>
  </div>
</template>

<script>
export default {
  props: {
    column: {
      type: Number,
      default: 3
    }
  },
  data() {
    return {
      functionalList: [
        { img: require('@icon/pay.png'), text: '缴费', url: '/pages/dormitory/payment/main' },
        { img: require('@icon/repair.png'), text: '报修', url: '/pages/dormitory/repair/main' },
        { img: require('@icon/apply.png'), text: '申请', url: '/pages/dormitory/apply/main' },
        { img: require('@icon/suggest.png'), text: '投诉或建议', url: '/pages/dormitory/suggest/main' },
        { img: require('@icon/assess.png'), text: '宿舍评优', url: '/pages/dormitory/assess/main' },
        { img: require('@icon/punish.png'), text: '宿舍违纪', url: '/pages/dormitory/punish/main' },
        { img: require('@icon/check.png'), text: '卫生检查', url: '/pages/dormitory/check/main' },
      ]
    }
  },
  methods: {
    // 跳转到详情
    toDetail(url) {
      this.$navigate.push(url)
    }
  }
}
</script>

<style lang="scss" scoped>
@import "./functional.scss";
</style>


