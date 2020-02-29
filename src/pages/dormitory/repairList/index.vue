<template>
  <div class="repair-list-container">
    <van-tabs :active="active" color="#ed3f14" swipeable animated @change="onChange">
      <van-tab title="全部" :name="0">
        <repair-list :dataList="dataList" />
      </van-tab>
      <van-tab title="进行中" :name="1">
        <repair-list :dataList="dataList" />
      </van-tab>
      <van-tab title="审核失败" :name="2">
        <repair-list :dataList="dataList" />
      </van-tab>
      <van-tab title="已结束" :name="3">
        <repair-list :dataList="dataList" />
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import repairList from '../components/repairList'
export default {
  components: {
    repairList
  },
  data() {
    return {
      active: 0,
      dataList: [ // state 0 进行中 1 审核失败 2 已结束 3 已评价
      // { id: 1,  dorid: 1, uid: null, payUser: null, state: 0, price: '12.00', title: '水费、电费', business: '广东技术师范学院', startDate: '2020-02-02 12:00', endDate: '2020-02-23 12:00', payDate: '2020-02-22 12:00:00', payway: null, orderId: '202002021200120101' },
        {id: 1, dorId: 1, uid: 1, repairUser: '梁婉鸣', state: 0, price: '0.00', content: '电灯有问题', imgList: [''], title: '电灯', address: '西区A666', createDate: '2020-02-02 12:12', repairDate: '', repairWorker: '', remark: '', evaluate: {scope: null, content: ''}},
        {id: 1, dorId: 1, uid: 1, repairUser: '梁婉鸣', state: 1, price: '0.00', content: '电灯有问题', imgList: [''], title: '电灯', address: '西区A666', createDate: '2020-02-02 12:12', repairDate: '', repairWorker: '', remark: '不符合要求', evaluate: {scope: null, content: ''}},
        {id: 1, dorId: 1, uid: 1, repairUser: '梁婉鸣', state: 2, price: '0.00', content: '电灯有问题', imgList: [''], title: '电灯', address: '西区A666', createDate: '2020-02-02 12:12', repairDate: '2020-02-03 12:00', repairWorker: '大叔一号', remark: '这是备注', evaluate: {scope: null, content: ''}},
        {id: 1, dorId: 1, uid: 1, repairUser: '梁婉鸣', state: 3, price: '0.00', content: '电灯有问题', imgList: [''], title: '电灯', address: '西区A666', createDate: '2020-02-02 12:12', repairDate: '2020-02-03 12:00', repairWorker: '大叔一号', remark: '这是备注', evaluate: {scope: 5, content: '很好'}},
        {id: 1, dorId: 1, uid: 1, repairUser: '梁婉鸣', state: 3, price: '0.00', content: '电灯有问题', imgList: [''], title: '电灯', address: '西区A666', createDate: '2020-02-02 12:12', repairDate: '2020-02-03 12:00', repairWorker: '大叔一号', remark: '这是备注', evaluate: {scope: 5, content: '很好'}},
      ]
    }
  },
  methods: {
    onChange(e) {
      e = e.mp.detail.name
      this.active = e
    }
  }
}
</script>

<style lang="scss" scope>
@import "./index.scss";
</style>