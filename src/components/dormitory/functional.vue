<template>
  <div class="we-bg-white functional-container">
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
        { img: require('@icon/pay.png'), text: '缴费', url: '1' },
        { img: require('@icon/repair.png'), text: '报修', url: '2' },
        { img: require('@icon/apply.png'), text: '申请', url: '3' },
        { img: require('@icon/suggest.png'), text: '投诉或建议', url: '4' },
        { img: require('@icon/assess.png'), text: '宿舍评优', url: '5' },
        { img: require('@icon/punish.png'), text: '宿舍违纪', url: '6' },
        { img: require('@icon/check.png'), text: '卫生检查', url: '7' },
      ]
    }
  },
  methods: {
    // 跳转到详情
    toDetail(url) {
      console.log(url)
    }
  }
}
</script>

<style lang="scss" scoped>
@import "./functional.scss";
</style>


