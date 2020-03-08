<template>
  <div class="we-bg we-padding repair-list-container">
    <template v-for="(item, index) in dataList">
      <div class="we-padding-10 we-margin-bottom-10 we-bg-white we-color-tips we-shadow" :key="index">
        <div class="we-margin-bottom-5 repair-box-side">
          <span class="we-title title">编号：292929</span>
          <span class="we-color-green right" v-if="item.state == 0">进行中</span>
          <span class="we-color-red right" v-else-if="item.state == 1">审核失败</span>
          <span class="we-color-orange right" v-else-if="item.state == 2">待评价</span>
          <span class="right" v-else-if="item.state == 3">已结束</span>
        </div>
        <div class="we-margin-bottom-2 repair-box-side" v-if="item.content">
          <span class="left">维修内容</span>
          <span class="right">{{item.content}}</span>
        </div>
        <div class="we-margin-bottom-2 repair-box-side" v-if="item.repairUser">
          <span class="left">报修人</span>
          <span class="right">{{item.repairUser}}</span>
        </div>
        <div class="we-margin-bottom-2 repair-box-side" v-if="item.address">
          <span class="left">地点</span>
          <span class="right">{{item.address}}</span>
        </div>
        <div class="we-margin-bottom-2 repair-box-side" v-if="item.createDate">
          <span class="left">申请时间</span>
          <span class="right">{{item.createDate}}</span>
        </div>
        <div v-if="item.state == 2 || item.state == 3">
          <div class="we-margin-bottom-2 repair-box-side" v-if="item.repairWorker">
            <span class="left">维修人员</span>
            <span class="right">{{item.repairWorker}}</span>
          </div>
          <div class="we-margin-bottom-2 repair-box-side" v-if="item.repairDate">
            <span class="left">维修时间</span>
            <span class="right">{{item.repairWorker}}</span>
          </div>
          <div class="we-margin-bottom-2 repair-box-side" v-if="item.price">
            <span class="left">维修费用</span>
            <span class="we-color-red right">{{item.price}}元</span>
          </div>
        </div>
        <div class="we-margin-bottom-2 repair-box-side" v-if="item.state != 0 && item.remark">
          <span class="left">备注</span>
          <span class="right">已成功修复</span>
        </div>
        <div class="we-margin-bottom-2 repair-box-side" v-if="item.state == 3 && item.evaluate">
          <span class="left">评价信息</span>
          <div class="right">
            <van-rate readonly :value="item.evaluate.scope" v-if="item.evaluate.scope"/>
            <p v-if="item.evaluate.content">很好很好很好很好很好很好很好很好很好很好很好很好很好很好很好很好</p>
          </div>
        </div>
        <div class="we-margin-top-10 repair-box-btn" v-if="item.state == 2">
          <van-button plain type="warning" size="small" @click="toRepairEvaluate(item.id)">评价</van-button>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
export default {
  props: {
    dataList: {
      type: Array,
      default: function () {
        return
      }
    }
  },
  data() {
    return {

    }
  },
  methods: {
    // 去评价
    toRepairEvaluate(id) {
      this.$navigate.push('/pages/dormitory/repairEvaluate/main?id=' + id)
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


