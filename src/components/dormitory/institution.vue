<template>
  <div class="we-bg-white institution-container">
    <div class="institution-wrapper">
      <van-collapse :value="activeName" @change="onChange" accordion>
        <template v-if="managementList.length">
          <van-collapse-item title="管理规定" value="查看" :name="0">
            <chart-dormitory :dataList="managementList" :key="0" />
          </van-collapse-item>
        </template>
        <template v-if="guideList.length">
          <van-collapse-item title="服务指南" value="查看" :name="1">
            <chart-dormitory :dataList="guideList" :key="1" />
          </van-collapse-item>
        </template>
        <template v-if="safeList.length">
          <van-collapse-item title="安全警示" value="查看" :name="2">
            <chart-dormitory :dataList="safeList" :key="2" />
          </van-collapse-item>
        </template>
        <template v-if="apartmentList.length">
          <van-collapse-item title="中心简介" value="查看" :name="3">
            <chart-dormitory :dataList="apartmentList" :key="3" />
          </van-collapse-item>
        </template>
      </van-collapse>
    </div>
  </div>
</template>

<script>
import chartDormitory from '@com/dormitory/chartDormitory'
export default {
  components: {
    chartDormitory
  },
  props: {

  },
  data() {
    return {
      activeName: '',
      managementList: [],
      guideList: [],
      safeList: [],
      apartmentList: []
    }
  },
  onLoad() {
    this.getDataList()
  },
  methods: {
    // 获取数据
    async getDataList() {
      let res1 = await this.$http.post('/management/notices/list', { type: 3, pageSize: 100 })
      if (res1.errorCode === 0) {
        this.managementList = res1.data
      }
      let res2 = await this.$http.post('/management/notices/list', { type: 4, pageSize: 100 })
      if (res2.errorCode === 0) {
        this.guideList = res2.data
      }
      let res3 = await this.$http.post('/management/notices/list', { type: 5, pageSize: 100 })
      if (res3.errorCode === 0) {
        this.safeList = res3.data
      }
      let res4 = await this.$http.post('/management/notices/list', { type: 6, pageSize: 100 })
      if (res4.errorCode === 0) {
        this.apartmentList = res4.data
      }
    },
    onChange(e) {
      this.activeName = e.mp.detail
    }
  }
}
</script>

<style lang="scss">
.institution-container {
  .van-collapse-item__content {
    padding: 0px !important;
  }
}
</style>

<style lang="scss" scoped>
@import "./institution.scss";
</style>


