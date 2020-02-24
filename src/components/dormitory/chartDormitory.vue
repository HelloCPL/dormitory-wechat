<template>
  <div class="we-bg we-padding-left-10 we-padding-bottom-10 chart-container" v-if="dataList.length">
    <template v-for="(item, index) in dataList">
      <div class="we-padding-top-10 we-padding-right-10 chart-wrapper" :key="index">
        <div class="we-bg-white we-padding-5 chart-box">
          <img :src="item.imgList[0].url || chartImg" alt="">
          <div class="chart-word">
            <span class="we-tips we-line-2">{{item.title}}</span>
          </div>
        </div>
      </div>
    </template>

  </div>
</template>

<script>
export default {
  props: {
    dataList: {
      type: Array,
      default: function () {
        return [
          // { title: '宿舍结构图', content: '', imgList: [{ url: '' }] },
          // { title: '保修价格表', content: '', imgList: [{ url: '' }] },
          // { title: '水费价格表水费价格表水费价格表', content: '', imgList: [{ url: '' }] },
          // { title: '电费价格表', content: '', imgList: [{ url: '' }] },
          // { title: '电费价格表', content: '', imgList: [{ url: '' }] },
          // { title: '电费价格表', content: '', imgList: [{ url: '' }] },
          // { title: '电费价格表', content: '', imgList: [{ url: '' }] },
        ]
      }
    }
  },
  data() {
    return {
      chartImg: require('@icon/nodata.png')
    }
  },
}
</script>

<style lang="scss" scoped>
@import "./chartDormitory.scss";
</style>