<template>
  <div class="we-bg-white paid-container">
    <template v-for="(item, index) in dataList">
      <div class="we-bg-white we-padding-top-10 we-padding-left-15 we-padding-right-15" :key="index" @click="toPaymentDetail(item.id)">
        <div class="we-padding-bottom-10 we-border-bottom-1 unpaid-box">
          <div class="we-color-tips we-font-14 left">
            <div class="unpaid-box-side">
              <span class="title">{{item.title}}</span>
              <span class="word we-color-red" v-if="item.status == 1">待支付</span>
              <span class="word we-color-green" v-else-if="item.status == 2">已线上支付</span>
              <span class="word we-color-green" v-else-if="item.status == 3">已线下支付</span>
              <span class="word we-color-tips" v-else-if="item.status == 0">已取消</span>
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
            <div class="we-margin-top-2 unpaid-box-side" v-if="item.remark">
              <span class="title">备注</span>
              <span class="word we-color-color">{{item.remark}}</span>
            </div>
            <div class="we-margin-top-2 unpaid-box-side" v-if="item.payUserName">
              <span class="title">付款人</span>
              <span class="word">{{item.dorBuildingName}}{{item.dorRoomName}}{{item.payUserName}}</span>
            </div>
            <div class="we-margin-top-2 unpaid-box-side" v-if="item.payTimeStr">
              <span class="title">付款时间</span>
              <span class="word">{{item.payTimeStr}}</span>
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
  },
  data() {
    return {
      rightIcon: require('@icon/icon_right.png'),
      nodataIcon: require('@icon/nodata.png'),
    }
  },
  methods: {
    // 跳转到订单详情
    toPaymentDetail(id) {
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
@import "./paid.scss";
</style>


