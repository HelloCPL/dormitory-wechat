<template>
  <div class="repair-container">
    <van-tabs :active="active" color="#ed3f14" swipeable animated @change="onChange">
      <van-tab title="报修" :name="0">
        <!-- 报修项目 -->
        <van-cell-group>
          <van-field :value="content" type="textarea" placeholder="请输入报修具体的事项..." autosize
            @input="onInputContent" />
        </van-cell-group>
        <!-- 图片上传 -->
        <upload-file v-model="imgList" />
        <!-- 提交 -->
        <div class="we-margin-btn we-padding">
          <van-button type="info" size="large" @click="onSubmit">提交</van-button>
        </div>
      </van-tab>
      <van-tab title="历史记录" :name="1">
        <!-- 子栏目 -->
        <div class="repair-menu">
          <template v-for="(item, index) in menuList">
            <span :class="{'active': item.active == activeChild}" :key="index" @click="setActiveChild(item.active)">{{item.name}}</span>
          </template>
        </div>
        <repair-list :dataList="dataList" v-if="activeChild == 1"/>
        <repair-list :dataList="dataList" v-if="activeChild == 2"/>
        <repair-list :dataList="dataList" v-if="activeChild == 3"/>
        <repair-list :dataList="dataList" v-if="activeChild == 4"/>
        <repair-list :dataList="dataList" v-if="activeChild == 5"/>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import uploadFile from '@com/common/uploadFile'
import repairList from '../components/repairList'
export default {
  components: {
    uploadFile,
    repairList
  },
  data() {
    return {
      rightIcon: require('@icon/icon_right_blue.png'),
      active: 0,
      content: '',
      imgList: [], // 上传图片集合
      activeChild: 1,
      menuList: [
        { name: '全部', active: 1 },
        { name: '进行中', active: 2 },
        { name: '待评价', active: 3 },
        { name: '已结束', active: 4 },
        { name: '审核失败', active: 5 }
      ],
      dataList: [ // state 0 进行中 1 审核失败 2 已结束 3 已评价
        { id: 1, dorId: 1, uid: 1, repairUser: '陈小子', state: 0, price: '0.00', content: '电灯有问题', imgList: [''], title: '电灯', address: '西区A666', createDate: '2020-02-02 12:12', repairDate: '', repairWorker: '', remark: '', evaluate: { scope: null, content: '' } },
        { id: 1, dorId: 1, uid: 1, repairUser: '陈小子', state: 1, price: '0.00', content: '电灯有问题', imgList: [''], title: '电灯', address: '西区A666', createDate: '2020-02-02 12:12', repairDate: '', repairWorker: '', remark: '不符合要求', evaluate: { scope: null, content: '' } },
        { id: 1, dorId: 1, uid: 1, repairUser: '陈小子', state: 2, price: '0.00', content: '电灯有问题', imgList: [''], title: '电灯', address: '西区A666', createDate: '2020-02-02 12:12', repairDate: '2020-02-03', repairWorker: '大叔一号', remark: '这是备注', evaluate: { scope: null, content: '' } },
        { id: 1, dorId: 1, uid: 1, repairUser: '陈小子', state: 3, price: '0.00', content: '电灯有问题', imgList: [''], title: '电灯', address: '西区A666', createDate: '2020-02-02 12:12', repairDate: '2020-02-03', repairWorker: '大叔一号', remark: '这是备注', evaluate: { scope: 5, content: '很好' } },
        { id: 1, dorId: 1, uid: 1, repairUser: '陈小子', state: 3, price: '0.00', content: '电灯有问题', imgList: [''], title: '电灯', address: '西区A666', createDate: '2020-02-02 12:12', repairDate: '2020-02-03', repairWorker: '大叔一号', remark: '这是备注', evaluate: { scope: 5, content: '很好' } },
      ]
    }
  },
  methods: {
    // 切换
    onChange(e) {
      e = e.mp.detail.name
      this.active = e
    },

    // 切换子栏目
    setActiveChild(active) {
      console.log(active)
      this.activeChild = active
    },

    // 设置报修事项
    onInputContent(e) {
      e = e.mp.detail
      this.content = e
    },

    // 提交
    onSubmit() {
      console.log(this.content, this.imgList)
    }
  }
}
</script>

<style lang="scss">
// 设置多行文本输入框最小高度
.repair-container {
  .van-field__body--textarea {
    min-height: 50px !important;
  }
}
</style>

<style lang="scss" scope>
@import "./index.scss";
</style>