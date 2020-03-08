<template>
  <div class="payment-detail-container">
    <!-- 账单详情 -->
    <div class="we-margin-15 we-padding-bottom-20 we-bg-white we-shadow payment-wrapper">
      <div class="we-padding title">
        <span class="we-title">账单编号：{{dataInfo.orderId}}</span>
        <span class="we-color-red we-font-12" v-if="dataInfo.state == 0">待支付</span>
        <span class="we-color-green we-font-12" v-else-if="dataInfo.state == 1">已支付</span>
        <span class="we-color-orange we-font-12" v-else-if="dataInfo.state == 2">已线下支付</span>
      </div>
      <div class="we-padding main">
        <img :src="timeIcon" alt="" class="we-margin-top-20">
        <p class="we-margin-top-5 we-color-black">
          <span class="we-font-12 we-padding-right-2">￥</span>
          <span class="price">{{dataInfo.price}}</span>
          <span class="we-font-12 we-padding-left-2">元</span>
        </p>
        <p class="we-margin-top-10 we-margin-bottom-10 we-tips" v-if="dataInfo.state == 0">
          <span>请在</span>
          <span>{{dataInfo.endDate}}</span>
          <span>前完成支付</span>
        </p>
      </div>
      <div class="we-padding">
        <p class="we-title we-margin-bottom-10">账单说明</p>
        <p class="we-color-tips we-margin-bottom-5">类型：{{dataInfo.title}}</p>
        <p class="we-color-tips we-margin-bottom-5">收款方：{{dataInfo.business}}</p>
        <p class="we-color-tips we-margin-bottom-5">创建时间：{{dataInfo.startDate}}</p>
        <p class="we-color-tips we-margin-bottom-5" v-if="dataInfo.state == 0">过期时间：{{dataInfo.endDate}}</p>
        <p class="we-color-tips we-margin-bottom-5" v-if="dataInfo.state != 0">付款人：{{dataInfo.payUser}}</p>
        <p class="we-color-tips we-margin-bottom-5" v-if="dataInfo.state != 0">付款时间：{{dataInfo.payDate}}</p>
      </div>
    </div>
    <!-- 申请退款 -->
    <!-- <div class="refund" v-if="dataInfo.state == 1">
      <img :src="refundIcon" alt="" class="we-margin-right-2" @click="onRefund">
      <span class="we-color-tips tips" @click="onRefund">申请退款</span>
    </div> -->
    <!-- 立即支付 -->
    <div class="we-margin-15 we-padding" v-if="dataInfo.state == 0">
      <van-button type="info" size="large" round @click="onPayment">立即支付</van-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      timeIcon: require('@icon/icon_time_blue.png'),
      refundIcon: require('@icon/icon_rmb.png'),
      dataInfo: { // state 0 待支付 1 已支付 2 已线下支付
        id: 1,
        dorid: 1,
        uid: null,
        payUser: '梁婉鸣',
        state: 0,
        price: '12.00',
        title: '水费、电费',
        business: '广东技术师范学院',
        startDate: '2020-02-02 12:00',
        endDate: '2020-02-23 12:00',
        payDate: '2020-02-22 12:00:00',
        payway: null,
        orderId: '202002021200120101'
      },
    }
  },
  methods: {
    // 申请退款
    onRefund() {

    },

    // 立即支付
    onPayment() {

    },
  }
}
</script>

<style lang="scss" scope>
@import "./index.scss";
</style>