<template>
  <div class="we-bg-white records-container">
    <!-- 头部滑块 -->
    <div class="records-header" v-if="recordsList.length">
      <swiper :duration="300" :previous-margin="previousMargin" :next-margin="nextMargin" @animationfinish="onAnimationfinish">
        <template v-for="(item, index) in recordsList">
          <swiper-item :key="index">
            <div class="we-padding records-wrapper">
              <!-- 消息头部 -->
              <div class="records-wrapper-header">
                <van-image :src="userImg" fit="fill" round lazy-load width="26" height="26" />
                <div class="we-padding-left-5 records-name">
                  <p>陈小子</p>
                  <p class="we-padding-top-2 we-font-12 we-color-tips">2020-01-01 12:12:12</p>
                </div>
                <div class="records-like" @click="toggleLikeStatus(item.likeStatus, index, item.likeCount)">
                  <img :src="unLikeImg" v-if="!item.likeStatus" />
                  <img :src="likeImg" v-if="item.likeStatus" />
                  <span class="we-padding-2 we-color-tips">{{item.likeCount}}</span>
                </div>
              </div>
              <!-- 消息文本 -->
              <p class="we-padding-top-10 we-line-2 records-info">我是很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长的文本</p>
              <!-- 消息图片 -->
              <div class="we-padding-top-10">
                <van-image :src="testImg" width="80" height="50" fit="fill" class="we-margin-right-10" />
                <van-image :src="testImg" width="80" height="50" fit="fill" class="we-margin-right-10" />
                <van-image :src="testImg" width="80" height="50" fit="fill" class="we-margin-right-10" />
              </div>
            </div>
          </swiper-item>
        </template>
      </swiper>
    </div>

    <!-- 内容 -->
    <div class="we-padding records-content">
      <div class="title">
        <img :src="iconImg" />
        <span class="we-color-tips we-font-12">宿舍时光屋</span>
      </div>
      <div class="side">
        <p class="we-padding-right-15 add">添加足迹</p>
        <p class="we-padding-left-15">浏览全部</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userImg: require('@icon/icon_user_login.png'),
      likeImg: require('@icon/icon_like_blue.png'),
      unLikeImg: require('@icon/icon_like.png'),
      iconImg: require('@icon/icon_filter.png'),

      testImg: require('@img/banner1.jpg'),
      previousMargin: '15px', //30px
      nextMargin: '40px', // 0px
      recordsList: [
        {          avatarUrl: null, username: '陈小子', updateDate: '2020-01-01 12:42:01', likeStatus: 0, likeCount: 5, content: '今天天气真美好，到处都有蚊子咬',
          imgList: [require('@icon/user.png'), require('@icon/user.png')],
          comments: [{ username: '陈小子', content: '不错不错' }]
        },
        {          avatarUrl: null, username: '陈小子', updateDate: '2020-01-01 12:42:01', likeStatus: 0, likeCount: 5, content: '今天天气真美好，到处都有蚊子咬',
          imgList: [require('@icon/user.png'), require('@icon/user.png')],
          comments: [{ username: '陈小子', content: '不错不错' }]
        },
        {          avatarUrl: null, username: '陈小子', updateDate: '2020-01-01 12:42:01', likeStatus: 0, likeCount: 5, content: '今天天气真美好，到处都有蚊子咬',
          imgList: [require('@icon/user.png'), require('@icon/user.png')],
          comments: [{ username: '陈小子', content: '不错不错' }]
        },
        {          avatarUrl: null, username: '陈小子', updateDate: '2020-01-01 12:42:01', likeStatus: 0, likeCount: 5, content: '今天天气真美好，到处都有蚊子咬',
          imgList: [require('@icon/user.png'), require('@icon/user.png')],
          comments: [{ username: '陈小子', content: '不错不错' }]
        },
        {          avatarUrl: null, username: '陈小子', updateDate: '2020-01-01 12:42:01', likeStatus: 0, likeCount: 5, content: '今天天气真美好，到处都有蚊子咬',
          imgList: [require('@icon/user.png'), require('@icon/user.png')],
          comments: [{ username: '陈小子', content: '不错不错' }]
        },
      ]
    }
  },
  methods: {
    // 监听滑块变化，当转到最后一个时切换margin
    onAnimationfinish(e) {
      let current = e.mp.detail.current
      if (current === (this.recordsList.length - 1)) {
        this.previousMargin = '50px'
        this.nextMargin = '5px'
      } else if (current === 0) {
        this.previousMargin = '15px'
        this.nextMargin = '40px'
      }
    },

    // 点赞或取消
    toggleLikeStatus(status, index, count) {
      count = status ? (count - 1) : (count + 1)
      status = status ? 0 : 1
      this.$set(this.recordsList[index], 'likeStatus', status)
      this.$set(this.recordsList[index], 'likeCount', count)
    }
  }
}
</script>

<style lang="scss" scoped>
@import "./records.scss";
</style>


