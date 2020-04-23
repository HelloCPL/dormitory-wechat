<template>
  <div class="we-bg-white unpaid-container">
    <!-- 头部未缴费信息 -->
    <div class="unpaid-header">
      <p class="we-tips">未缴金额</p>
      <div class="we-margin-top-5 we-color-black">
        <span class="we-font-12 we-padding-right-2">￥</span>
        <span class="price">{{money}}</span>
        <span class="we-font-12 we-padding-left-2">元</span>
      </div>
      <p class="we-tips help" @click="onHelper">帮助中心</p>
    </div>
    <!-- 未缴费列表 -->
    <div class="we-bg we-padding-top-10">
      <p class="we-padding we-title we-bg-white">待缴账单：</p>
      <template v-for="(item, index) in dataList">
        <div class="we-bg-white we-padding-top-10 we-padding-left-15 we-padding-right-15" :key="index" @click="toPaymentDetail(item.id)">
          <div class="we-padding-bottom-10 we-border-bottom-1 unpaid-box">
            <div class="we-color-tips we-font-14 left">
              <div class="unpaid-box-side">
                <span class="we-title title">{{item.title}}</span>
                <span class="word we-color-red" v-if="item.status == 1">待支付</span>
              </div>
              <div class="we-margin-top-2 unpaid-box-side" v-if="item.content">
                <span class="title">账单说明</span>
                <span class="word">{{item.content}}</span>
              </div>
              <div class="we-margin-top-2 unpaid-box-side">
                <span class="title">金额</span>
                <span class="word">{{item.price}}元</span>
              </div>
              <div class="we-margin-top-2 unpaid-box-side" v-if="item.releaseUserName">
                <span class="title">发布者</span>
                <span class="word">{{item.releaseUserName}}</span>
              </div>
              <div class="we-margin-top-2 unpaid-box-side">
                <span class="title">收款方</span>
                <span class="word">{{item.accountName}}</span>
              </div>
              <div class="we-margin-top-2 unpaid-box-side">
                <span class="title">缴费截止时间</span>
                <span class="word we-color-color">{{item.endTimeStr}}</span>
              </div>
              <div class="we-margin-top-2 we-color-red unpaid-box-side" v-if="item.remark">
                <span class="title">备注</span>
                <span class="word we-color-color">{{item.remark}}</span>
              </div>
            </div>
            <div class="we-margin-left-5 right">
              <img :src="rightIcon" alt="">
            </div>
          </div>
        </div>
      </template>
      <div class="we-padding we-font-center" v-if="!dataList.length">
        <img :src="nodataIcon" alt="" style="width: 150px; height: 150px;">
        <p class="we-tips">暂没有记录</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    dataList: {
      type: Array,
      default: function () {
        return []
      }
    },
    money: {
      type: [Number, String]
    },
  },
  data() {
    return {
      rightIcon: require('@icon/icon_right.png'),
      nodataIcon: require('@icon/nodata.png'),
    }
  },

  methods: {
    // 帮助
    onHelper() {
      let str = `1.如已线下支付账单，不需再进行支付，等待管理员更新状态即可。\n2.如对账单有任何疑问或支付出现问题，请致电联系管理员！`
      this.$alert(str)
    },
    // 跳转到订单详情
    toPaymentDetail(id) {
      console.log(id)
      this.$navigate.push('/pages/dormitory/paymentDetail/main?id=' + id)
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
@import "./unpaid.scss";
</style>


