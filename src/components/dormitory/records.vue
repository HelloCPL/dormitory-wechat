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
                <van-image :src="item.avatarUrl || userImg" fit="fill" :radius="4" lazy-load width="26" height="26"
                  @click="toMembersDetail(item.uid)" />
                <div class="we-padding-left-5 records-name">
                  <p>
                    <span @click="toMembersDetail(item.uid)">{{item.username}}</span>
                  </p>
                  <p class="we-padding-top-2 we-font-12 we-color-tips">{{item.updateDate}}</p>
                </div>
                <div class="records-like" @click="toggleLikeStatus(item.likeStatus, index, item.likeCount)">
                  <img :src="item.likeStatus == 1 ? likeIcon : unLikeIcon" v-if="!item.likeStatus" />
                  <span class="we-padding-left-2 we-color-tips">{{item.likeCount}}</span>
                </div>
              </div>
              <!-- 消息文本 -->
              <div @click="toRecordsDetail(item.id)">
                <div class="we-padding-top-10 we-line-2 records-info">
                  <template v-html="item.content"></template>
                </div>
                <!-- 消息图片 -->
                <div class="we-padding-top-10" v-if="item.imgList.length">
                  <template v-for="(value, index2) in item.imgList">
                    <van-image :src="value" width="80" height="50" class="we-margin-right-10" :key="index2" v-if="index2 < 3" />
                  </template>
                </div>
              </div>
            </div>
          </swiper-item>
        </template>
      </swiper>
    </div>

    <!-- 内容 -->
    <title-divider title="宿舍时光屋">
      <div class="side">
        <p class="we-padding-right-15 add" @click="toRecordsAdd">添加足迹</p>
        <p class="we-padding-left-15" @click="toRecordsList">浏览全部</p>
      </div>
    </title-divider>
  </div>
</template>

<script>
import titleDivider from '@com/common/titleDivider'
export default {
  components: {
    titleDivider
  },
  data() {
    return {
      userImg: require('@icon/icon_user_login.png'),
      likeIcon: require('@icon/icon_like_blue.png'),
      unLikeIcon: require('@icon/icon_like.png'),
      iconImg: require('@icon/icon_filter.png'),

      testImg: require('@img/banner1.jpg'),
      previousMargin: '15px', //30px
      nextMargin: '40px', // 0px
      recordsList: [
        {          id: 1, uid: 1, avatarUrl: 'https://wx.qlogo.cn/mmopen/vi_32/EB9hYpjibEZqibuHqcmKvJadoLIahX054hXiaFYocBsZcXzwd7dcC4C6z957aLKhYZGIqv6MDTfhI3FcbArpYrWNg/132', username: '陈小子', updateDate: '2020-01-01 12:42:01', likeStatus: 0, likeCount: 5, content: '今天天气真美好，到处都有蚊子咬',
          imgList: [require('@icon/user.png'), require('@icon/user.png')],
          comments: [{ username: '陈小子', content: '不错不错' }]
        },
        {          id: 2, uid: 2, avatarUrl: null, username: '陈小子', updateDate: '2020-01-01 12:42:01', likeStatus: 0, likeCount: 5, content: '今天天气真美好，到处都有蚊子咬',
          imgList: [require('@icon/user.png'), require('@icon/user.png')],
          comments: [{ username: '陈小子', content: '不错不错' }]
        },
        {          id: 3, uid: 3, avatarUrl: null, username: '陈小子', updateDate: '2020-01-01 12:42:01', likeStatus: 0, likeCount: 5, content: '今天天气真美好，到处都有蚊子咬',
          imgList: [require('@icon/user.png'), require('@icon/user.png')],
          comments: [{ username: '陈小子', content: '不错不错' }]
        },
        {          id: 4, uid: 4, avatarUrl: null, username: '陈小子', updateDate: '2020-01-01 12:42:01', likeStatus: 0, likeCount: 5, content: '今天天气真美好，到处都有蚊子咬',
          imgList: [require('@icon/user.png')],
          comments: [{ username: '陈小子', content: '不错不错' }]
        },
        {          id: 5, uid: 5, avatarUrl: null, username: '陈小子', updateDate: '2020-01-01 12:42:01', likeStatus: 0, likeCount: 5, content: '今天天气真美好，到处都有蚊子咬',
          imgList: [require('@icon/user.png'), require('@icon/user.png'), require('@icon/user.png')],
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
    },

    // 跳转到个人信息
    toMembersDetail(uid) {
      this.$navigate.push('/pages/dormitory/membersDetail/main?uid=' + uid)
    },

    // 跳转添加时光
    toRecordsAdd() {
      this.$navigate.push('/pages/dormitory/recordsAdd/main')
    },

    // 跳转到时光列表
    toRecordsList() {
      this.$navigate.push('/pages/dormitory/recordsList/main')
    },

    toRecordsDetail(id) {
      this.$navigate.push(`/pages/dormitory/recordsDetail/main?id=${id}`)
    }
  }
}
</script>

<style lang="scss" scoped>
@import "./records.scss";
</style>


