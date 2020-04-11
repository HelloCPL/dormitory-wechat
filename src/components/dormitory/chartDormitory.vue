<template>
  <div class="we-bg we-padding-left-10 we-padding-bottom-10 chart-container" v-if="dataList.length">
    <template v-for="(item, index) in dataList">
      <div class="we-padding-top-10 we-padding-right-10 chart-wrapper" :key="index">
        <div class="we-bg-white we-padding-5 we-shadow chart-box" @click="toInstitutionDetail(item.id)">
          <img :src="item.thumbnail || chartImg" alt="">
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
        return []
      }
    }
  },

  data() {
    return {
      chartImg: require('@icon/nodata.png')
    }
  },

  methods: {
    // 跳转到制度详情
    toInstitutionDetail(id) {
      this.$navigate.push(`/pages/dormitory/institutionDetail/main?id=${id}`)
    }
  }
}
</script>

<style lang="scss" scoped>
@import "./chartDormitory.scss";
</style>