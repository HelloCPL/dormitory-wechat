<template>
  <div class="we-bg-white unpaid-container">
    <!-- 头部未缴费信息 -->
    <div class="unpaid-header">
      <p class="we-tips">未缴金额</p>
      <div class="we-margin-top-5 we-color-black">
        <span class="we-font-12 we-padding-right-2">￥</span>
        <span class="price">{{totalPrice}}</span>
        <span class="we-font-12 we-padding-left-2">元</span>
      </div>
      <p class="we-tips help">帮助中心</p>
    </div>
    <!-- 未缴费列表 -->
    <div class="we-bg we-padding-top-10">
      <template v-for="(item, index) in paymentList">
        <div class="we-bg-white we-padding-top-10 we-padding-left-15 we-padding-right-15" :key="index" v-if="item.state == 0" @click="toPaymentDetail(item.id)">
          <div class="we-padding-bottom-10 we-border-bottom-1 unpaid-box">
            <div class="we-color-tips we-font-14 left">
              <div class="unpaid-box-side">
                <span class="title">{{item.title}}</span>
                <span class="word we-color-red">待支付</span>
              </div>
              <div class="we-margin-top-2 unpaid-box-side">
                <span class="title">金额</span>
                <span class="word">{{item.price}}元</span>
              </div>
              <div class="we-margin-top-2 unpaid-box-side">
                <span class="title">收款方</span>
                <span class="word">{{item.business}}</span>
              </div>
              <div class="we-margin-top-2 unpaid-box-side">
                <span class="title">过期时间</span>
                <span class="word we-color-green">{{item.endDate}}</span>
              </div>
            </div>
            <div class="we-margin-left-5 right">
              <img :src="rightIcon" alt="">
            </div>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    paymentList: {
      type: Array,
      default: function () {
        return [ // state 0 待支付 1 已支付 2 已线下支付
          { id: 1,  dorid: 1, uid: null, payUser: null, state: 0, price: '12.00', title: '水费、电费', business: '广东技术师范学院', startDate: '2020-02-02 12:00', endDate: '2020-02-23 12:00', payDate: '2020-02-22 12:00:00', payway: null, orderId: '202002021200120101' },
          { id: 1,  dorid: 1, uid: null, payUser: null, state: 1, price: '12.00', title: '水费、电费', business: '广东技术师范学院', startDate: '2020-02-02 12:00', endDate: '2020-02-23 12:00', payDate: '2020-02-22 12:00:00', payway: null, orderId: '202002021200120101' },
          { id: 1,  dorid: 1, uid: null, payUser: null, state: 0, price: '12.00', title: '水费、电费', business: '广东技术师范学院', startDate: '2020-02-02 12:00', endDate: '2020-02-23 12:00', payDate: '2020-02-22 12:00:00', payway: null, orderId: '202002021200120101' },
          { id: 1,  dorid: 1, uid: null, payUser: null, state: 0, price: '12.00', title: '水费、电费', business: '广东技术师范学院', startDate: '2020-02-02 12:00', endDate: '2020-02-23 12:00', payDate: '2020-02-22 12:00:00', payway: null, orderId: '202002021200120101' }
        ]
      }
    }
  },
  data() {
    return {
      rightIcon: require('@icon/icon_right.png'),
      totalPrice: '48.00',
    }
  },

  methods: {
    // 跳转到订单详情
    toPaymentDetail(id) {
      this.$navigate.push('/pages/dormitory/paymentDetail/main?id=' + id)
    }
  }
}
</script>

<style lang="scss" scoped>
@import "./unpaid.scss";
</style>


