<template>
  <div class="we-bg-white we-padding we-padding-top-15 daily-home-container" v-if="dailyList.length">
    <div class="we-padding-bottom-5 daily-header">
      <span class="we-title">日常管理</span>
      <div class="daily-more" @click="toMore">
        <span class="we-color-blue">查看更多</span>
        <img :src="rightIcon">
      </div>
    </div>
    <div class="we-padding-top-10" v-for="(item, index) in dailyList" :key="index" @click="toDetail(item.id)">
      <p class="we-color-text we-line-1">{{item.title}}</p>
      <p class="we-color-tips we-font-12 we-padding-top-5">{{item.releaseDate}}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    length: { //最多显示通知列表
      type: [Number, String],
      default: 2
    }
  },
  data() {
    return {
      rightIcon: require('@icon/icon_right_blue.png'),
      dailyList: [
        {title: '12月学生宿舍内务卫生和违纪情况汇总', releaseDate: '2020-01-01 12:12:12'},
        {title: '第17周学生宿舍内务卫生和违纪情况汇总', releaseDate: '2020-01-01 12:12:12'}
      ]
    }
  },
  methods: {
    // 跳转到详情
    toDetail(id) {
      this.$navigate.push('/pages/home/noticeDetail/main?id=' + id)
    },

    // 跳转更多
    toMore() {
      this.$navigate.push('/pages/home/noticeAll/main')
    },
  }
}
</script>

<style lang="scss" scoped>
@import './dailyHome.scss';
</style>