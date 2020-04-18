<template>
  <div class="we-bg-white we-padding we-padding-top-15 daily-home-container" v-if="dailyList.length">
    <div class="we-padding-bottom-5 daily-header">
      <span class="we-title">日常管理</span>
      <div class="daily-more" @click="toMore" v-if="dailyList.length > 2">
        <span class="we-color-blue">查看更多</span>
        <img :src="rightIcon">
      </div>
    </div>
    <div class="we-padding-top-10" v-for="(item, index) in dailyList" :key="index" @click="toDetail(item.id)" v-if="index < 2">
      <p class="we-color-text we-line-1">{{item.title}}</p>
      <p class="we-color-tips we-font-12 we-padding-top-5">{{item.updateTimeStr}}</p>
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
      dailyList: []
    }
  },
  onLoad() {
    this.getDataList()
  },
  methods: {
    // 获取数据
    async getDataList() {
      let res = await this.$http.postPub('/management/notices/list', { type: 2, pageSize: 3 })
      if (res.errorCode === 0) {
        this.dailyList = res.data
      }
    },

    // 跳转到详情
    toDetail(id) {
      this.$navigate.push(`/pages/dormitory/institutionDetail/main?id=${id}`, {
        isLogin: false,
        isAuth: false
      })
    },

    // 跳转更多
    toMore() {
      this.$navigate.push('/pages/home/noticeAll/main?type=' + 2, {
        isLogin: false,
        isAuth: false
      })
    },
  }
}
</script>

<style lang="scss" scoped>
@import "./dailyHome.scss";
</style>