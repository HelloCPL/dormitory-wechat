<template>
  <div class="we-bg-white we-padding notice-home-container" v-if="noticeList.length">
    <div class="notice-wrapper">
      <span class="we-bg-orange we-color-white notice-title">公告</span>
      <div class="notice-content">
        <swiper vertical circular autoplay :interval="5000">
          <template v-for="(item, index) in noticeList">
            <swiper-item :item-id="index" :key="index">
              <p class="we-line-1 we-color-text" @click="toDetail(item.id)">{{item.title}}</p>
            </swiper-item>
          </template>
        </swiper>
      </div>
      <div class="we-padding-left-5 notice-more" @click="toMore">
        <span class="we-color-blue">更多</span>
        <img :src="rightIcon">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      rightIcon: require('@icon/icon_right_blue.png'),
      noticeList: [
        { title: '关于进一步加强学生宿舍管理秩序的通知', id: 1 },
        { title: '文明寝室评选结果公示', id: 2 },
        { title: '关于2019年寒假学生宿舍安排的通知', id: 3 },
      ]
    }
  },
  methods: {
    // 跳转到详情
    toDetail(id) {
      console.log(id)
      this.$navigate.push('/pages/home/noticeDetail/main?id=' + id)
    },

    // 跳转更多
    toMore() {
      this.$navigate.push('/pages/home/noticeAll/main')
    },
  }
}
</script>

<style lang="scss">
.notice-home-container swiper {
  height: 16px !important;
  line-height: 16px;
}
</style>


<style lang="scss" scoped>
@import "./noticeHome.scss";
</style>