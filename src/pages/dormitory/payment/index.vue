<template>
  <div class="we-bg-white payment-container">
    <van-tabs :active="active" color="#ed3f14" swipeable animated @change="onChange">
      <van-tab title="缴费" :name="0">
        <unpaid :dataList="dataList" :money="money" />
      </van-tab>
      <van-tab title="历史记录" :name="1">
        <paid :dataList="dataList" />
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import paid from '../components/paid'
import unpaid from '../components/unpaid'
export default {
  components: {
    paid,
    unpaid
  },
  data() {
    return {
      active: 0,
      status: 1,
      money: 0,
      dataList: [], // 数据列表
      lock: false,
      finish: false,
      pageNo: 1,
      pageSize: 10
    }
  },
  onLoad() {
    Object.assign(this.$data, this.$options.data())
  },
  onShow() {
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
        status: this.status,
        pageNo: this.pageNo,
        pageSize: this.pageSize
      }
      let res = await this.$http.post('/dormitory/payment/list', params)
      if (res.errorCode === 0) {
        this.money = res.data.money
        this.dataList = this.dataList.concat(res.data.data)
        this.pageNo += 1
        if (this.dataList.length >= res.total)
          this.finish = true
      }
      this.lock = false
    },

    // 切换
    onChange(e) {
      e = e.mp.detail.name
      this.active = e
      if (e === 0) {
        this.status = '1'
        this.onRefresh()
      } else if (e === 1) {
        this.status = '0,1,2,3'
        this.onRefresh()
      }
    },

  }
}
</script>
