<template>
  <div class="we-padding we-bg apply-detail-container">
    <div class="we-padding we-bg-white we-color-tips we-shadow">
      <!-- 审核状态 -->
      <div class="we-margin-bottom-10 apply-success" v-if="dataInfo.state == 1">
        <img :src="successIcon" alt="" class="we-margin-right-2">
        <span class="we-color-green we-font-16">审核成功，请等待工作人员联系！</span>
      </div>
      <div class="we-margin-bottom-10 apply-success" v-else-if="dataInfo.state == 2">
        <img :src="failIcon" alt="" class="we-margin-right-2">
        <span class="we-color-red we-font-16">审核失败！</span>
      </div>
      <!-- 审核状态 -->
      <div class="we-margin-bottom-10 apply-title">
        <p class="left">
          <span class="we-title" v-if="dataInfo.type">{{dataInfo.type}}</span>
          <span class="we-tips" v-if="dataInfo.createDate">{{dataInfo.createDate}}</span>
        </p>
        <span class="we-padding-right-10 we-font-12 we-color-green right" v-if="dataInfo.state == 0">审核中</span>
      </div>
      <!-- 审核回复 -->
      <div class="we-margin-bottom-10 we-padding-bottom-10 we-border-bottom-1 reply" v-if="dataInfo.state != 0">
        <p class="apply-side" v-if="dataInfo.replyWorker">
          <span class="left">审核人：</span>
          <span class="right">{{dataInfo.replyWorker}}</span>
        </p>
        <p class="apply-side" v-if="dataInfo.replyDate">
          <span class="left">审核时间：</span>
          <span class="right">{{dataInfo.replyDate}}</span>
        </p>
        <p class="apply-side" v-if="dataInfo.replyContent">
          <span class="left">回复：</span>
          <span class="right">{{dataInfo.replyContent}}</span>
        </p>
      </div>
      <!-- 申请详细信息 -->
      <p class="apply-side" v-if="dataInfo.content">
        <span class="left">申请内容：</span>
        <span class="right">{{dataInfo.content}}</span>
      </p>
      <p class="apply-side" v-if="dataInfo.reason">
        <span class="left">申请原因：</span>
        <span class="right">{{dataInfo.reason}}</span>
      </p>
      <p class="we-margin-top-10 we-tips we-font-right">申请时长：{{dataInfo.startDate}} 至 {{dataInfo.endDate}}</p>
      <p class="we-tips we-font-right">申请人：{{dataInfo.address}} {{dataInfo.applyUser}}</p>
    </div>

    <!-- 联系工作人员 -->
    <div class="we-margin-top-10 apply-footer">
      <img :src="phoneIcon" alt="" class="we-margin-right-2" @click="onContact">
      <span class="we-color-blue" @click="onContact">联系工作人员</span>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      successIcon: require('@icon/icon_success_green.png'),
      failIcon: require('@icon/icon_warn_red.png'),
      phoneIcon: require('@icon/icon_phone_blue.png'),
      dataInfo: { id: 1, dorId: 1, uid: 1, state: 1, type: '物品', content: '申请装空调', reason: '这是原因', createDate: '2020-01-10 12:11', startDate: '2020-02-02 12:00', endDate: '2020-02-02 12:00', address: '西区666', applyUser: '梁婉鸣', replyDate: '2020-02-02', replyContent: '备注', replyWorker: '陈小花' }
    }
  },
  methods: {
    // 拨打工作人员电话
    onContact() {

    }
  }
}
</script>

<style lang="scss" scope>
@import "./index.scss";
</style>