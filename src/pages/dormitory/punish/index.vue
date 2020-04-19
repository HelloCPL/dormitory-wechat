<template>
  <div class="we-bg-white assess-container">
    <!-- 卫生检查 -->
    <div class="we-padding we-margin-top-10">
      <p class="we-title we-margin-bottom-10">{{dormitoryName}}宿舍违纪记录</p>
      <template v-for="(item, index) in dataList">
        <div class="we-padding-top-10 we-padding-bottom-10 we-border-bottom-1 we-color-tips" :key="index">
          <p class="we-padding-bottom-5 we-color-text" v-if="item.title">{{item.title}}</p>
          <div class="we-padding-bottom-2 assess-scope">
            <span>评价等级：</span>
            <van-rate :value="item.scope" :count="5" disabled disabled-color="#ffd21e" />
            <span class="we-tips" v-if="item.scope == 1">（非常差）</span>
            <span class="we-tips" v-if="item.scope == 2">（差）</span>
            <span class="we-tips" v-if="item.scope == 3">（合格）</span>
            <span class="we-tips" v-if="item.scope == 4">（良好）</span>
            <span class="we-tips" v-if="item.scope == 5">（优秀）</span>
          </div> 
          <p class="we-padding-bottom-5">违纪时间：{{item.checkTimeStr}}</p>
          <p class="we-padding-bottom-5" v-if="item.startTimeStr && item.endTimeStr">检查阶段：{{item.startTimeStr}}至{{item.endTimeStr}}</p>
          <p class="we-padding-bottom-2 assess-content" v-if="item.releaseUserName">检查人：{{item.releaseUserName}}</p>
          <p class="we-padding-bottom-2 assess-content" v-if="item.content">违纪内容：{{item.content}}</p>
          <p class="we-padding-bottom-2 we-color-red assess-content" v-if="item.remark">备注：{{item.remark}}</p>
        </div>
      </template>
    </div>

  </div>
</template>

<script>
export default {
  data() {
    return {
      dormitoryName: '', // 宿舍名称
      dataList: [], // 评优数据列表
      pageNo: 1,
      pageSize: 10,
      finish: false,
      lock: false,
    }
  },
  onLoad(query) {
    Object.assign(this.$data, this.$options.data())
    this.onRefresh()
  },
  // 上拉加载更多
  onReachBottom() {
    if (!this.finish) {
      this.getDataList()
    }
  },
  methods: {
    // 刷新
    onRefresh() {
      this.lock = false
      this.finish = false
      this.pageNo = 1
      this.pageSize = 10
      this.getDataList()
    },

    // 请求数据
    async getDataList() {
      if (this.lock || this.finish) return
      if (this.pageNo === 1) this.dataList = []
      this.lock = true
      let params = {
        type: 2,
        pageNo: this.pageNo,
        pageSize: this.pageSize
      }
      let res = await this.$http.post('/dormitory/evaluation/list', params)
      if (res.errorCode === 0) {
        this.dataList = this.dataList.concat(res.data)
        this.pageNo += 1
        if (!this.dormitoryName && this.dataList.length)
          this.dormitoryName = this.dataList[0]['dorBuildingName'] + this.dataList[0]['dorRoomName']
        if (this.dataList.length >= res.total)
          this.finish = true
      }
      this.lock = false
    },
  }
}
</script>

<style lang="scss" scope>
@import "./index.scss";
</style>