<template>
  <div class="we-padding we-bg apply-detail-container">
    <template v-for="(item, index) in dataList">
      <div class="we-padding we-bg-white we-color-tips we-margin-bottom-15 we-shadow" :key="index">
        <!-- 审核状态 -->
        <div class="we-margin-bottom-10 apply-success" v-if="item.status == 2">
          <img :src="successIcon" alt="" class="we-margin-right-2">
          <span class="we-color-green we-font-16">审核成功，请等待工作人员联系！</span>
        </div>
        <div class="we-margin-bottom-10 apply-success" v-else-if="item.status == 0">
          <img :src="failIcon" alt="" class="we-margin-right-2">
          <span class="we-color-red we-font-16">审核失败！</span>
        </div>
        <!-- 审核状态 -->
        <div class="we-margin-bottom-10 we-flex-jc">
          <span class="we-flex-1">{{dormitoryName}}申请{{item.type}}</span>
          <div class="we-nowrap we-flex">
            <span class="we-color-green" v-if="item.status == 1">处理中</span>
            <img :src="deleteIcon" alt="" class="delete-icon" v-if="item.isDelete == 1" @click="onDelete(item.id, index)" />
          </div>
        </div>
        <!-- 申请详细信息 -->
        <p class="apply-side" v-if="item.createTimeStr">
          <span class="left">申请时间：</span>
          <span class="right">{{item.createTimeStr}}</span>
        </p>
        <p class="apply-side" v-if="item.content">
          <span class="left">申请内容：</span>
          <span class="right">{{item.content}}</span>
        </p>
        <p class="apply-side" v-if="item.reason">
          <span class="left">申请原因：</span>
          <span class="right">{{item.reason}}</span>
        </p>
        <p class="apply-side" v-if="item.startTimeStr && item.endTimeStr">
          <span class="left">申请时长：</span>
          <span class="right">{{item.startTimeStr}}至{{item.endTimeStr}}</span>
        </p>
        <p class="apply-side" v-if="item.releaseUserName">
          <span class="left">申请人：</span>
          <span class="right">{{item.releaseUserName}}</span>
        </p>
        <!-- 审核回复 -->
        <div class="we-margin-top-10 we-padding-top-10 we-border-top-1 reply" v-if="item.replyUserId">
          <p class="apply-side" v-if="item.replyUserName">
            <span class="left">处理人</span>
            <span class="right">{{item.replyUserName}}</span>
          </p>
          <p class="apply-side" v-if="item.replyTimeStr">
            <span class="left">处理时间</span>
            <span class="right">{{item.replyTimeStr}}</span>
          </p>
          <p class="apply-side" v-if="item.replyContent">
            <span class="left">回复内容</span>
            <span class="right">{{item.replyContent}}</span>
          </p>
          <p class="we-color-red apply-side" v-if="item.remark">
            <span class="left">备注</span>
            <span class="right">{{item.remark}}</span>
          </p>
          <!-- 联系工作人员 -->
          <div class="we-margin-top-5 apply-footer" v-if="item.replyPhone && item.status == 2">
            <img :src="phoneIcon" alt="" class="we-margin-right-2" @click="onContact(item.replyPhone)">
            <span class="we-color-blue" @click="onContact(item.replyPhone)">联系工作人员</span>
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
import { wxMakePhoneCall } from '@/wx/index'
export default {
  props: {
    dataList: {
      type: Array,
      default: function () {
        return []
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
      phoneIcon: require('@icon/icon_phone_blue.png')
    }
  },
  methods: {
    // 删除 
    async onDelete(id, index) {
      let res = await this.$http.post('/dormitory/apply/delete', { id })
      if (res.errorCode === 0) {
        this.$toast('删除成功')
        this.$emit('delete', index)
      }
    },

    // 拨打工作人员电话
    onContact(phone) {
      if (!phone) return
      wxMakePhoneCall(phone)
        .then(() => {
          console.log('拨打成功')
        })
        .catch(() => {
          this.$toast('拨打失败')
        })
    }
  }
}
</script>

<style lang="scss" scoped>
@import "./applyHistory.scss";
</style>


