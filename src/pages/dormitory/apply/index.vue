<template>
  <div class="apply-container">
    <van-tabs :active="active" color="#ed3f14" swipeable animated @change="onChange">
      <van-tab title="申请" :name="0">
        <!-- 申请类型选择 -->
        <picker @change="onChangeType" :range="typeList">
          <div>
            <van-cell title="申请类型" is-link :value="type" />
          </div>
        </picker>
        <!-- 申请起始时间选择 -->
        <van-cell title="起始时间" is-link :value="startDate" @click="startDateFlag = true" />
        <!-- 申请结束时间选择 -->
        <van-cell title="结束时间" is-link :value="endDate" @click="endDateFlag = true" />
        <!-- 申请内容 -->
        <van-cell-group>
          <van-field :value="content" type="textarea" placeholder="请输入你要申请的具体内容..." autosize @input="onInputContent" />
        </van-cell-group>
        <!-- 申请原因 -->
        <van-cell-group>
          <van-field :value="reason" type="textarea" placeholder="请输入你申请的原因..." autosize @input="onInputReason" />
        </van-cell-group>
        <!-- 提交按钮 -->
        <div class="we-margin-btn we-padding">
          <van-button type="info" size="large" @click="onSubmit">申请</van-button>
        </div>
      </van-tab>
      <van-tab title="历史记录" :name="1">
        <!-- 子栏目 -->
        <div class="repair-menu">
          <template v-for="(item, index) in menuList">
            <span :class="{'active': item.active == activeChild}" :key="index" @click="setActiveChild(item.active)">{{item.name}}</span>
          </template>
        </div>
        <apply-history1 :dataList="dataList" v-if="activeChild == 1" />
        <apply-history2 :dataList="dataList" v-else-if="activeChild == 2" />
        <apply-history3 :dataList="dataList" v-else-if="activeChild == 3" />
        <apply-history4 :dataList="dataList" v-else-if="activeChild == 4" />
      </van-tab>
    </van-tabs>

    <!-- 选择起始时间 -->
    <van-popup :show="startDateFlag" close-on-click-overlay position="bottom" @close="closeOverlay">
      <van-datetime-picker type="datetime" @cancel="closeOverlay" :value="today" @confirm="onConfirmStartDate" />
    </van-popup>
    <!-- 选择结束时间 -->
    <van-popup :show="endDateFlag" close-on-click-overlay position="bottom" @close="closeOverlay">
      <van-datetime-picker type="datetime" :value="today" @cancel="closeOverlay" @confirm="onConfirmEndDate" />
    </van-popup>
  </div>
</template>

<script>
import applyHistory from '../components/applyHistory'
export default {
  components: {
    'apply-history1': applyHistory,
    'apply-history2': applyHistory,
    'apply-history3': applyHistory,
    'apply-history4': applyHistory,
  },
  data() {
    return {
      active: 0,
      activeChild: 1,
      menuList: [
        { name: '全部', active: 1 },
        { name: '审核中', active: 2 },
        { name: '审核通过', active: 3 },
        { name: '审核失败', active: 4 },
      ],
      dataList: [ // state 0 审核中 1 审核成功 2 审核失败
        { id: 1, dorId: 1, uid: 1, state: 0, type: '物品', content: '申请装空调', reason: '这是原因', createDate: '2020-01-10 12:11', startDate: '2020-02-02 12:00', endDate: '2020-02-02 12:00', address: '西区666', applyUser: '梁婉鸣', replyDate: '2020-02-02', replyContent: '备注', replyWorker: '陈小花', replyPhone: '15850505050' },
        { id: 1, dorId: 1, uid: 1, state: 1, type: '物品', content: '申请装空调', reason: '这是原因', createDate: '2020-01-10 12:11', startDate: '2020-02-02 12:00', endDate: '2020-02-02 12:00', address: '西区666', applyUser: '梁婉鸣', replyDate: '2020-02-02', replyContent: '备注', replyWorker: '陈小花', replyPhone: '15850505050' },
        { id: 1, dorId: 1, uid: 1, state: 2, type: '物品', content: '申请装空调', reason: '这是原因', createDate: '2020-01-10 12:11', startDate: '2020-02-02 12:00', endDate: '2020-02-02 12:00', address: '西区666', applyUser: '梁婉鸣', replyDate: '2020-02-02', replyContent: '备注', replyWorker: '陈小花', replyPhone: '15850505050' },
        { id: 1, dorId: 1, uid: 1, state: 0, type: '物品', content: '申请装空调', reason: '这是原因', createDate: '2020-01-10 12:11', startDate: '2020-02-02 12:00', endDate: '2020-02-02 12:00', address: '西区666', applyUser: '梁婉鸣', replyDate: '2020-02-02', replyContent: '备注', replyWorker: '陈小花', replyPhone: '15850505050' },
        { id: 1, dorId: 1, uid: 1, state: 1, type: '物品', content: '申请装空调', reason: '这是原因', createDate: '2020-01-10 12:11', startDate: '2020-02-02 12:00', endDate: '2020-02-02 12:00', address: '西区666', applyUser: '梁婉鸣', replyDate: '2020-02-02', replyContent: '备注', replyWorker: '陈小花', replyPhone: '15850505050' },
      ],
      // 申请页面数据
      typeList: ['物品类', '工具类', '大功率电器', '活动类', '其他'], //后期可从数据库获取
      startDateFlag: false,
      endDateFlag: false,
      startDateValue: 0,
      endDateValue: 0,
      today: new Date().getTime(),

      type: '',
      startDate: '',
      endDate: '',
      content: '',
      reason: '',
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
      this.activeChild = active
    },

    // 设置申请类型
    onChangeType(e) {
      e = e.mp.detail.value
      this.type = this.typeList[e]
    },

    // 关闭评论遮罩层
    closeOverlay() {
      this.startDateFlag = false
      this.endDateFlag = false
    },

    // 设置起始时间
    onConfirmStartDate(e) {
      e = e.mp.detail
      this.startDateValue = e
      this.startDate = this.$dayjs(e).format('YYYY-MM-DD hh:mm')
      this.startDateFlag = false
    },

    // 设置结束时间
    onConfirmEndDate(e) {
      e = e.mp.detail
      this.endDateValue = e
      if (this.startDateValue === 0) {
        this.endDateFlag = false
        this.$toast('请先选择起始时间')
        return
      } else if (this.endDateValue <= this.startDateValue) {
        this.endDateFlag = false
        this.$toast('请选择起始时间之后的时间')
        return
      }
      this.endDate = this.$dayjs(e).format('YYYY-MM-DD hh:mm')
      this.endDateFlag = false
    },

    // 设置申请内容
    onInputContent(e) {
      e = e.mp.detail
      this.content = e
    },

    // 设置申请原因
    onInputReason(e) {
      e = e.mp.detail
      this.reason = e
    },

    // 提交
    onSubmit() {
      console.log(this.type, this.startDate, this.endDate, this.content, this.reason)
    }

  }
}
</script>

<style lang="scss">
// 设置多行文本输入框最小高度
.apply-container {
  .van-field__body--textarea {
    min-height: 50px !important;
  }
}
</style>

<style lang="scss" scope>
@import "./index.scss";
</style>