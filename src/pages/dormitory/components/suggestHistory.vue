<template>
  <div class="we-padding suggest-list-container">
    <template v-for="(item, index) in dataList">
      <div class="we-padding-10 we-margin-bottom-10 we-bg-white we-color-tips we-shadow" :key="index">
        <!-- 处理结果 -->
        <div class="we-margin-bottom-10 apply-success" v-if="item.status == 2">
          <img :src="successIcon" alt="" class="we-margin-right-2">
          <span class="we-color-green we-font-16" v-if="item.type == 1">你的投诉已被处理</span>
          <span class="we-color-green we-font-16" v-else-if="item.type == 2">你的建议已被采纳</span>
        </div>
        <div class="we-margin-bottom-10 apply-success" v-else-if="item.status == 0">
          <img :src="failIcon" alt="" class="we-margin-right-2">
          <span class="we-color-red we-font-16" v-if="item.type == 1">你的投诉未被采纳</span>
          <span class="we-color-red we-font-16" v-else-if="item.type == 2">你的建议未被采纳</span>
        </div>
        <!-- 投诉类型 -->
        <div class="we-margin-bottom-10 suggest-box-side">
          <span class="we-title title">{{dormitoryName}} {{item.type == 1 ? '投诉' : '建议'}}</span>
          <div class="we-flex">
            <span class="we-color-green right" v-if="item.status == 1">处理中</span>
            <img :src="deleteIcon" alt="" class="delete-icon" v-if="item.isDelete == 1" @click="onDelete(item.id, index)" />
          </div>
        </div>
        <!-- 详细信息 -->
        <div class="we-margin-bottom-2 suggest-box-side" v-if="item.createTimeStr">
          <span class="left">{{item.type == 1 ? '投诉' : '建议'}}时间</span>
          <span class="right">{{item.createTimeStr}}</span>
        </div>
        <div class="we-margin-bottom-2 suggest-box-side" v-if="item.releaseUserName">
          <span class="left">{{item.type == 1 ? '投诉' : '建议'}}人</span>
          <span class="right">{{item.releaseUserName}}</span>
        </div>
        <div class="we-margin-bottom-2 suggest-box-side" v-if="item.content">
          <span class="left">{{item.type == 1 ? '投诉' : '建议'}}内容</span>
          <span class="right">{{item.content}}</span>
        </div>
        <!-- 图片展示 -->
        <div class="img-box" v-if="item.imgList && item.imgList.length">
          <template v-for="(subItem, subIndex) in item.imgList">
            <img :src="subItem.fullName" alt="" :key="subIndex" @click="onPreview(item.imgList, subIndex)">
          </template>
        </div>

        <div class="we-margin-top-10 we-padding-top-10 we-border-top-1" v-if="item.replyUserId">
          <div class="we-margin-bottom-2 suggest-box-side" v-if="item.replyUserName">
            <span class="left">处理人</span>
            <span class="right">{{item.replyUserName}}</span>
          </div>
          <div class="we-margin-bottom-2 suggest-box-side" v-if="item.replyTimeStr">
            <span class="left">处理时间</span>
            <span class="right">{{item.replyTimeStr}}</span>
          </div>
          <div class="we-margin-bottom-2 suggest-box-side" v-if="item.replyContent">
            <span class="left">回复内容</span>
            <span class="right">{{item.replyContent}}</span>
          </div>
          <div class="we-margin-bottom-2 suggest-box-side" v-if="item.remark">
            <span class="left">备注</span>
            <span class="right">{{item.remark}}</span>
          </div>
        </div>
      </div>
    </template>
    <div class="we-padding we-font-center" v-if="!dataList.length">
        <img :src="nodataIcon" alt="" style="width: 150px; height: 150px;">
        <p class="we-tips">暂没有记录</p>
      </div>
  </div>
</template>

<script>

import {
  wxPreviewImage
} from '@/wx/index'
export default {
  props: {
    dataList: {
      type: Array,
      default: function () {
        return
      }
    },
    dormitoryName: { // 宿舍名称
      type: String,
      default: ''
    }
  },
  data() {
    return {
      deleteIcon: require('@icon/icon_delete.png'),
      nodataIcon: require('@icon/nodata.png'),
      successIcon: require('@icon/icon_success_green.png'),
      failIcon: require('@icon/icon_warn_red.png'),
    }
  },
  methods: {
    // 删除 
    async onDelete(id, index) {
      let res = await this.$http.post('/dormitory/suggestion/delete', { id })
      if (res.errorCode === 0) {
        this.$toast('删除成功')
        this.$emit('delete', index)
      }
    },

    // 预览图片
    onPreview(imgList, index) {
      let arr = []
      imgList.forEach(item => {
        arr.push(item.fullName)
      })
      wxPreviewImage(arr, index)
    },
  },

  watch: {
    dataList: {
      handler(val, oldVal) {
        if (val === oldVal) return
        this.dataList = val
      },
      deep: true,
      immediate: true
    }
  }
}
</script>

<style lang="scss" scoped>
@import "./suggestHistory.scss";
</style>


