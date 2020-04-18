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
      <div class="we-padding-left-5 notice-more" @click="toMore" v-if="noticeList.length > 2">
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
      noticeList: []
    }
  },
  onLoad() {
    this.getDataList()
  },
  methods: {
    // 获取数据
    async getDataList() {
      let res = await this.$http.postPub('/management/notices/list', { type: 1 })
      if (res.errorCode === 0) {
        this.noticeList = res.data
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
      this.$navigate.push('/pages/home/noticeAll/main?type=' + 1, {
        isLogin: false,
        isAuth: false
      })
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