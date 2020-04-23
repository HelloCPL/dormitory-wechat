<template>
  <div class="we-bg we-padding repair-list-container">
    <template v-for="(item, index) in dataList">
      <div class="we-padding-10 we-margin-bottom-10 we-bg-white we-color-tips we-shadow" :key="index">
        <div class="we-margin-bottom-5 repair-box-side">
          <span class="we-title title">编号：{{item.id}}</span>
          <div class="we-flex">
            <span class="we-color-green right" v-if="item.status == 1">审核中</span>
            <span class="we-color-green right" v-else-if="item.status == 2">待维修</span>
            <span class="we-color-orange right" v-else-if="item.status == 3">待评价</span>
            <span class="we-color-red right" v-else-if="item.status == 0">审核失败</span>
            <span class="right" v-else-if="item.status == 4">已结束</span>
            <img :src="deleteIcon" alt="" class="delete-icon" v-if="item.isDelete == 1" @click="onDelete(item.id, index)" />
          </div>
        </div>
        <div class="we-margin-bottom-2 repair-box-side" v-if="item.content">
          <span class="left">维修内容</span>
          <span class="right">{{item.content}}</span>
        </div>
        <div class="we-margin-bottom-2 repair-box-side" v-if="item.releaseUserName">
          <span class="left">报修人</span>
          <span class="right">{{item.releaseUserName}}</span>
        </div>
        <div class="we-margin-bottom-2 repair-box-side" v-if="dormitoryName">
          <span class="left">地点</span>
          <span class="right">{{dormitoryName}}</span>
        </div>
        <div class="we-margin-bottom-2 repair-box-side" v-if="item.createTimeStr">
          <span class="left">申报时间</span>
          <span class="right">{{item.createTimeStr}}</span>
        </div>
        <!-- 图片展示 -->
        <div class="img-box" v-if="item.imgList && item.imgList.length">
          <template v-for="(subItem, subIndex) in item.imgList">
            <img :src="subItem.fullName" alt="" :key="subIndex" @click="onPreview(item.imgList, subIndex)">
          </template>
        </div>

        <div class="we-margin-top-10 we-padding-top-10 we-border-top-1" v-if="item.status != 1">
          <div class="we-margin-bottom-2 repair-box-side" v-if="item.replyUserName">
            <span class="left">处理人</span>
            <span class="right">{{item.replyUserName}}</span>
          </div>
          <div class="we-margin-bottom-2 repair-box-side" v-if="item.replyTimeStr">
            <span class="left">处理时间</span>
            <span class="right">{{item.replyTimeStr}}</span>
          </div>
          <div class="we-margin-bottom-2 repair-box-side" v-if="item.replyContent">
            <span class="left">回复内容</span>
            <span class="right">{{item.replyContent}}</span>
          </div>
          <div class="we-margin-bottom-2 repair-box-side" v-if="item.repairWorker">
            <span class="left">维修人员</span>
            <span class="right">{{item.repairWorker}}</span>
          </div>
          <div class="we-margin-bottom-2 repair-box-side" v-if="item.repairTimeStr">
            <span class="left">维修时间</span>
            <span class="right">{{item.repairTimeStr}}</span>
          </div>
        </div>
        <div class="we-margin-bottom-2 repair-box-side" v-if="item.remark">
          <span class="left">备注</span>
          <span class="right">{{item.remark}}</span>
        </div>
        <div class="we-margin-bottom-2 repair-box-side" v-if="item.status == 4 && item.evaluationId">
          <span class="left">评价信息</span>
          <div class="right">
            <van-rate readonly :value="item.evaluationScope" v-if="item.evaluationScope" />
            <span class="we-padding-left-5 evaluation-word" v-if="item.evaluationScope == 1">(非常不满意)</span>
            <span class="we-padding-left-5 evaluation-word" v-else-if="item.evaluationScope == 2">(不满意)</span>
            <span class="we-padding-left-5 evaluation-word" v-else-if="item.evaluationScope == 3">(一般)</span>
            <span class="we-padding-left-5 evaluation-word" v-else-if="item.evaluationScope == 4">(满意)</span>
            <span class="we-padding-left-5 evaluation-word" v-else-if="item.evaluationScope == 5">(非常满意)</span>
            <p v-if="item.evaluationContent">{{item.evaluationContent}}</p>
          </div>
        </div>
        <div class="we-margin-top-10 repair-box-btn" v-if="item.status == 3 && item.isDelete == 1">
          <van-button plain type="warning" size="small" @click="toRepairEvaluate(item)">评价</van-button>
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
    }
  },
  methods: {
    // 删除 
    async onDelete(id, index) {
      let res = await this.$http.post('/dormitory/repair/delete', { id })
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

    // 去评价
    toRepairEvaluate(item) {
      this.$navigate.push(`/pages/dormitory/repairEvaluate/main?id=${item.id}&createTimeStr=${item.createTimeStr}&content=${item.content}&repairWorker=${item.repairWorker}&repairTimeStr=${item.repairTimeStr}`)
    }
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
@import "./repairList.scss";
</style>


