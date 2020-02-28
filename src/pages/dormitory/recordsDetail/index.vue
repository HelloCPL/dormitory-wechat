<template>
  <div class="we-bg-white records-list-container">
    <!-- 时光详情 -->
    <div class="we-padding-15 records-wrapper">
      <div class="box-left">
        <van-image :src="dataInfo.avatarUrl || userIcon" width="30" height="30" :radius="4" />
      </div>
      <div class="box-right">
        <p class="we-color-black">{{dataInfo.username}}</p>
        <p class="we-tips we-margin-top-2">{{dataInfo.updateDate}}</p>
        <div class="we-margin-top-5 we-text content" v-if="dataInfo.content">
          <template v-html="dataInfo.content"></template>
        </div>
        <!-- 图片 -->
        <div class="we-padding-top-5 box-img" v-if="dataInfo.imgList && dataInfo.imgList.length">
          <template v-for="(value, index) in dataInfo.imgList">
            <div class="we-margin-right-5 we-margin-bottom-5" :key="index">
              <van-image :src="value" :width="dataInfo.imgList.length > 1 ? 80 : 165" :height="dataInfo.imgList.length > 1 ? 80 : 165"
                radius="2" @click="onPreviewImage(dataInfo.imgList, index)" />
            </div>
          </template>
        </div>
        <!-- 浏览、评论、点赞 -->
        <div class="we-padding-2 we-tips box-info">
          <div>
            <!-- 仅当发布本人可删除 -->
            <span v-if="dataInfo.uid == 1" @click="onDelete(dataInfo.id)">删除</span>
          </div>
          <div class="right">
            <img :src="commentIcon" alt="" @click="toComment">
            <span class="we-margin-left-2" @click="toComment">{{dataInfo.comments.length}}</span>
            <img :src="dataInfo.likeStatus == 1 ? likeIcon : unLikeIcon" alt="" class="we-margin-left-20" @click="onLike">
            <span class="we-margin-left-2" @click="onLike">{{dataInfo.likeCount}}</span>
          </div>
        </div>
        <!-- 评论内容 -->
        <div class="we-margin-top-10 we-font-12 box-comment" v-if="dataInfo.comments.length">
          <template v-for="(list, index2) in dataInfo.comments">
            <div class="we-margin-top-2" :key="index2">
              <span class="we-color-black we-padding-right-2">{{list.username}}：</span>
              <span>{{list.content}}</span>
            </div>
          </template>
        </div>
      </div>
    </div>
    <!-- 评论框 -->
    <van-popup :show="commentFlag" position="bottom" overlay-style="background: rgba(0, 0, 0, 0)" @close="closeOverlay">
      <div class="comment-wrapper">
        <div class="we-padding-left-10 we-padding-right-10 left">
          <van-field :value="commentValue" placeholder="请输入你的评论内容" :focus="inputFocus" @input="setCommentValue" />
        </div>
        <div class="we-padding-right-10">
          <van-button type="primary" size="small" :disabled="!commentValue" @click="onComment">发送</van-button>
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script>
import { wxPreviewImage } from '@/wx/index'
export default {
  data() {
    return {
      userIcon: require('@icon/icon_user_login.png'),
      likeIcon: require('@icon/icon_like_blue.png'),
      unLikeIcon: require('@icon/icon_like.png'),
      commentIcon: require('@icon/icon_info.png'),
      dataInfo: {
        id: 1,
        uid: 1,
        avatarUrl: 'https://wx.qlogo.cn/mmopen/vi_32/EB9hYpjibEZqibuHqcmKvJadoLIahX054hXiaFYocBsZcXzwd7dcC4C6z957aLKhYZGIqv6MDTfhI3FcbArpYrWNg/132',
        username: '陈小子',
        updateDate: '2020-01-01 12:42:01',
        likeStatus: 0,
        likeCount: 0,
        clickCount: 12,
        content: '<p>今天天气真美好，到处都有蚊子咬</p>',
        imgList: ['http://localhost:3000/public/2r8r31582382956070.jpg', 'http://localhost:3000/public/ca6g51582365336332.jpg', 'http://localhost:3000/public/2r8r31582382956070.jpg', 'http://localhost:3000/public/ca6g51582365336332.jpg', 'http://localhost:3000/public/2r8r31582382956070.jpg'],
        comments: [
          { username: '陈小子', content: '不错不错' },
          { username: '陈小子', content: '不错不错不错不错不错不错不错不错不错不错不错不错不错不错不错不错' }
        ]
      },
      commentFlag: false, // 评论框显示控制
      commentValue: '', // 评论内容
      inputFocus: false
    }
  },
  onLoad(query) {
    let id = query.id
    console.log(`id: ${id}`)
  },
  onShow() {
    Object.assign(this.$data, this.$options.data())
  },
  methods: {
    // 图片预览
    onPreviewImage(list, index) {
      wxPreviewImage(list, index)
    },

    // 打开评论
    toComment() {
      this.commentFlag = true
      // 键盘聚焦
      setTimeout(() => {
        this.inputFocus = true
      }, 200)
    },

    // 设置评论内容
    setCommentValue(e) {
      e = e.mp.detail
      this.commentValue = e
    },

    // 关闭评论遮罩层
    closeOverlay() {
      this.commentFlag = false
      this.inputFocus = false
    },

    // 评论操作
    onComment() {
      // 根据id发送请求 。。。
      console.log(this.userInfoGetter)
      let params = {
        username: this.userInfoGetter.nickName,
        content: this.commentValue
      }
      let comments = this.$tools.deepCopy(this.dataInfo.comments)
      comments.unshift(params)
      this.$set(this.dataInfo, 'comments', comments)
      this.commentFlag = false
      this.commentValue = ''
      this.inputFocus = false
    },

    // 删除时光
    onDelete(id) {
      console.log(`删除id为${id}`)
    },

    // 点赞或取消
    onLike() {
      // 根据id发送请求 。。。
      let status = this.dataInfo.likeStatus
      let count = this.dataInfo.likeCount
      count = status == 1 ? count - 1 : count + 1
      status = status == 1 ? 0 : 1
      this.$set(this.dataInfo, 'likeStatus', status)
      this.$set(this.dataInfo, 'likeCount', count)
    }
  }
}
</script>

<style lang="scss" scope>
@import "./index.scss";
</style>