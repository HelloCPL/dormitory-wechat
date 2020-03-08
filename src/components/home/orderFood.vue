<template>
  <div class="we-bg we-padding food-container">
    <template v-for="(item, index) in foodList">
      <div class="we-bg-white we-padding-10 we-margin-bottom-10 we-shadow wrapper" :key="index">
        <div class="left">
          <img :src="foodIcon" />
        </div>
        <div class="we-font-12 we-margin-left-10 right">
          <div class="we-margin-bottom-5 title">
            <p class="we-font-14 we-color-black we-line-1">{{item.title}}</p>
            <span class="we-color-green we-padding-left-5" v-if="item.status == 1">进行中</span>
            <span class="we-color-red we-padding-left-5" v-else-if="item.status == 2">已接单</span>
            <span class="we-color-tips we-padding-left-5" v-else>已结束</span>
          </div>
          <p class="we-line-2 we-margin-top-2">{{item.content}}</p>
          <p class="we-margin-top-2 we-line-1">起始地址:
            <span class="">{{item.startPlace}}</span>
          </p>
          <p class="we-margin-top-2 we-line-1">目的地:
            <span class="">{{item.endPlace}}</span>
          </p>
          <p class="we-margin-top-2 we-line-1">{{item.startTime}} 至 {{item.endTime}}</p>
          <div class="we-margin-top-5 footer">
            <span class="we-color-red we-font-14">￥{{item.money}} 元</span>
            <div>
              <van-button type="info" size="mini" round>查看详情</van-button>
            </div>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
export default {
  props: {
    active: {
      type: [Number, String],
    }
  },
  data() {
    return {
      foodIcon: require('@icon/order_food.png'),
      foodList: [ // status 1 进行中 2 已接单 0 已结束
        { title: '帮忙拿外卖', content: '顺便的话帮忙去XX地方拿外卖，重金酬谢！！！', startPlace: '饭堂', endPlace: '北二666', startTime: '2020-02-16 12:00', endTime: '2020-02-16 13:30', money: '3', payWay: '线下支付', status: 1, remark: '' },
        { title: '帮忙拿外卖', content: '顺便的话帮忙去XX地方拿外卖，重金酬谢！！！', startPlace: '饭堂', endPlace: '北二666', startTime: '2020-02-16 12:00', endTime: '2020-02-16 13:30', money: '3', payWay: '线下支付', status: 1, remark: '' },
        { title: '帮忙拿外卖', content: '顺便的话帮忙去XX地方拿外卖，重金酬谢！！！', startPlace: '饭堂', endPlace: '北二666', startTime: '2020-02-16 12:00', endTime: '2020-02-16 13:30', money: '3', payWay: '线下支付', status: 2, remark: '' }
      ]
    }
  },
  onPullDownRefresh() {
    if (this.active != 1) return
    console.log('下拉更新1')
  },
  onReachBottom() {
    if (this.active != 1) return
    console.log('触底了1')
  },
  methods: {

  },
  watch: {
    active(val, oldVal) {
      if (val === oldVal) return
      this.active = val
    }
  }
}
</script>

<style lang="scss" scoped>
@import "./orderFood.scss";
</style>


