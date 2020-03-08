<template>
  <div class="we-bg we-padding apply-container">
    <template v-for="(item, index) in dataList">
    <div class="we-padding we-margin-bottom-10 we-bg-white we-shadow we-color-tips apply-box" :key="index" @click="toApplyDetail(item.id)">
      <p class="apply-box-title we-margin-bottom-5">
        <span class="we-title we-line-1 left">{{item.type}}</span>
        <span class="we-font-12 we-color-green we-padding-left-10  right" v-if="item.state == 0">审核中</span>
        <span class="we-font-12 we-color-orange we-padding-left-10  right" v-else-if="item.state == 1">审核通过</span>
        <span class="we-font-12 we-color-red we-padding-left-10  right" v-else-if="item.state == 2">审核失败</span>
      </p>
      <p class="we-margin-bottom-10 we-line-2" v-if="item.content">{{item.content}}</p>
      
      <p class="we-tips we-font-right">
        <span>申请时长：</span>
        <span class="we-tips">{{item.startDate}} 至 {{item.endDate}}</span>
      </p>
      <p class="we-tips we-font-right">
        <span>申请人：</span>
        <span class="we-padding-right-5">{{item.address}}</span>
        <span>{{item.applyUser}}</span>
      </p>
    </div>
    </template>
  </div>
</template>

<script>
export default {
  props: {
    dataList: {
      type: Array,
      default: function() {
        return []
      }
    }
  },
  onLoad() {
    console.log(1)
    Object.assign(this.$data, this.$options.data())
  },
  data() {
    return {

    }
  },
  methods: {
    // 跳转到申请详情页
    toApplyDetail(id) {
      console.log(123)
      this.$navigate.push('/pages/dormitory/applyDetail/main?id=' + id)
    }
  }
}
</script>

<style lang="scss" scoped>
@import './applyHistory.scss';
</style>


