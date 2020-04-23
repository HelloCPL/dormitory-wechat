<template>
  <div class="payment-detail-container">
    <!-- 账单详情 -->
    <div class="we-margin-15 we-padding-bottom-20 we-bg-white we-shadow payment-wrapper">
      <div class="we-padding title">
        <span class="we-title">账单编号：{{dataInfo.id}}</span>
        <span class="we-color-red we-font-12" v-if="dataInfo.status == 1">待支付</span>
        <span class="we-color-green we-font-12" v-else-if="dataInfo.status == 2">已线上支付</span>
        <span class="we-color-green we-font-12" v-else-if="dataInfo.status == 3">已线下支付</span>
        <span class="we-color-tips we-font-12" v-else-if="dataInfo.status == 0">已取消</span>
      </div>
      <div class="we-padding main">
        <img :src="timeIcon" alt="" class="we-margin-top-20">
        <p class="we-margin-top-5 we-color-black">
          <span class="we-font-12 we-padding-right-2">￥</span>
          <span class="price">{{dataInfo.price}}</span>
          <span class="we-font-12 we-padding-left-2">元</span>
        </p>
        <p class="we-margin-top-10 we-margin-bottom-10 we-tips" v-if="dataInfo.status == 1">
          <span>请在</span>
          <span>{{dataInfo.endTimeStr}}</span>
          <span>前完成支付</span>
        </p>
        <p class="we-margin-top-10 we-margin-bottom-10 we-tips" v-if="(dataInfo.status == 2 || dataInfo.status == 3) && dataInfo.payTimeStr && dataInfo.releaseUserName">
          <span>{{dataInfo.releaseUserName}}已在</span>
          <span>{{dataInfo.payTimeStr}}</span>
          <span>完成支付</span>
        </p>
      </div>
      <div class="we-padding">
        <p class="we-title we-margin-bottom-10">账单说明</p>
        <p class="we-color-tips we-margin-bottom-5" v-if="dataInfo.title">类型：{{dataInfo.title}}</p>
        <p class="we-color-tips we-margin-bottom-5" v-if="dataInfo.content">具体内容：{{dataInfo.title}}</p>
        <p class="we-color-tips we-margin-bottom-5" v-if="dataInfo.accountName">收款方：{{dataInfo.accountName}}</p>
        <p class="we-color-tips we-margin-bottom-5" v-if="dataInfo.createTimeStr">创建时间：{{dataInfo.createTimeStr}}</p>
        <p class="we-color-tips we-margin-bottom-5" v-if="dataInfo.status == 1">缴费截止时间：{{dataInfo.endTimeStr}}</p>
        <p class="we-color-tips we-margin-bottom-5" v-if="dataInfo.status != 1 && dataInfo.payUserName">付款人：{{dataInfo.payUserName}}</p>
        <p class="we-color-tips we-margin-bottom-5" v-if="dataInfo.status != 1 && dataInfo.payTimeStr">付款时间：{{dataInfo.payTimeStr}}</p>
      </div>
    </div>
    <!-- 申请退款 -->
    <div class="refund" v-if="dataInfo.status == 2">
      <img :src="refundIcon" alt="" class="we-margin-right-2" @click="onRefund">
      <span class="we-color-tips tips" @click="onRefund">申请退款说明</span>
    </div>
    <!-- 立即支付 -->
    <div class="we-margin-15 we-padding" v-if="dataInfo.status == 1">
      <van-button type="info" size="large" round @click="onPayment">立即支付</van-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      id: '',
      timeIcon: require('@icon/icon_time_blue.png'),
      refundIcon: require('@icon/icon_rmb.png'),
      dataInfo: {}, // 账单数据
    }
  },
  onLoad(query) {
    Object.assign(this.$data, this.$options.data())
    this.id = query.id
    this.getDataList(query.id)
  },
  methods: {
    // 请求数据
    async getDataList(id) {
      if (!id) return
      let res = await this.$http.post('/dormitory/payment/detail', { id })
      if (res.errorCode === 0) {
        this.dataInfo = res.data
      }
    },

    // 申请退款
    onRefund() {
      let str = '如需申请退款必须找管理员申请'
      this.$alert(str)
    },

    // 立即支付
    async onPayment() {
      let params = {
        id: this.id,
        keyCode: 1
      }
      let res = await this.$http.post('/dormitory/payment/pay', params)
      if (res.errorCode === 0) {
        this.$alert({
          title: '支付完成',
          content: '暂时模拟支付，后期完善'
        })
          .then(() => {
            this.$navigate.back()
          })
      }
    },
  }
}
</script>

<style lang="scss" scope>
@import "./index.scss";
</style>