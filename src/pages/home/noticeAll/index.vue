<template>
  <div class="we-bg-white">
    <template v-for="(item, index) in dataList">
      <div class="we-padding we-border-bottom-1" :key="index" @click="toDetail(item.id, index)">
        <p class="we-line-1 we-flex-al" v-if="item.title">
          <van-tag round type="warning" class="we-margin-right-5" v-if="item.type == 1">公告</van-tag>
          <van-tag round type="warning" class="we-margin-right-5" v-if="item.type == 2">日常</van-tag>
          <span class="we-title">{{item.title}}</span>
        </p>
        <p class="we-line-1 we-margin-top-10" v-if="item.abstract" v-html="item.abstract"></p>
        <p class="we-margin-top-10 we-tips">
          <span class="we-padding-right-10">浏览量：{{item.browseCount}}</span>
          <span>发布时间：{{item.updateTimeStr}}</span>
        </p>
      </div>
    </template>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dataList: [],
      total: 0,
      pageNo: 1,
      pageSize: 16,
      finish: false,
      lock: false,
      type: null
    }
  },
  onLoad(e) {
    Object.assign(this.$data, this.$options.data())
    this.type = parseInt(e.type)
    this.onRefresh()
  },
  // 上拉加载更多
  onReachBottom() {
    if (!this.finish) {
      this.getDataList()
    }
  },
  methods: {
    // 更新 数据
    onRefresh() {
      this.total = 0
      this.lock = false
      this.finish = false
      this.pageNo = 1
      this.pageSize = 16
      this.dataList = []
      this.getDataList()
    },

    // 请求数据
    async getDataList() {
      if (this.lock || this.finish) return
      this.lock = true
      let params = {
        type: this.type,
        pageNo: this.pageNo,
        pageSize: this.pageSize
      }
      let res = await this.$http.post('/management/notices/list', params)
      if (res.errorCode === 0) {
        this.dataList = this.dataList.concat(res.data)
        this.total = res.total
        this.pageNo += 1
        if (this.dataList.length >= this.total) {
          this.finish = true
        }
      }
      this.lock = false
    },

    // 跳转到详情
    toDetail(id, index) {
      setTimeout(() => {
        let browseCount = this.dataList[index]['browseCount'] + 1
        this.$set(this.dataList[index], 'browseCount', browseCount)
      }, 500)
      this.$navigate.push(`/pages/dormitory/institutionDetail/main?id=${id}`)
    },
  }
}
</script>

<style lang="scss" scope>
@import "./index.scss";
</style>