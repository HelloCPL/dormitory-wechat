<template>
  <div class="we-bg-white apply-container">
    <p class="we-padding we-font-center we-title">个人事务申请</p>
    <!-- 申请类型 -->
    <picker @change="onChangeType" :range="typeList">
      <van-cell title="申请类型" is-link>
        <span class="we-color-text" v-if="type">{{type}}</span>
        <span class="we-color-tips" v-else>请选择</span>
      </van-cell>
    </picker>
    <!-- 起始日期和结束日期 -->
    <picker mode="date" :value="startDate" @change="setStartDate">
      <van-cell title="起始日期" is-link>
        <span class="we-color-text" v-if="startDate">{{startDate}}</span>
        <span class="we-color-tips" v-else>请选择</span>
      </van-cell>
    </picker>
    <picker mode="date" :value="endDate" :start="startDate" @change="setEndDate">
      <van-cell title="结束日期" is-link>
        <span class="we-color-text" v-if="endDate">{{endDate}}</span>
        <span class="we-color-tips" v-else>请选择</span>
      </van-cell>
    </picker>
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

    <!-- 历史记录 -->
    <p class="we-padding we-color-tips">历史记录</p>
    <div class="we-padding">
      <div class="we-padding-top-10 we-padding-bottom-10 we-border-bottom-1 apply-box">
        <div class="we-margin-bottom-5 apply-side">
          <span class="we-flex-1">申请类型：其他</span>
          <span class="we-font-12 we-color-green we-padding-right-10 we-nowrap">审核中</span>
        </div>
        <div class="we-margin-bottom-5 apply-side">
          <span class="we-nowrap">申请内容：</span>
          <span class="we-flex-1">内容内容内容</span>
        </div>
        <div class="we-margin-bottom-5 apply-side">
          <span class="we-nowrap">申请原因：</span>
          <span class="we-flex-1">内容内容内容内容内容</span>
        </div>
        <div class="we-margin-bottom-5 apply-side">
          <span class="we-nowrap">申请时长：</span>
          <span class="we-flex-1">2020-02-02 至 2020-02-20</span>
        </div>
        <!-- 回复 -->
        <div class="we-margin-bottom-5 we-color-green apply-side">
          <span class="we-nowrap">陈小花回复：</span>
          <span class="we-flex-1">回复内容容回复内容回复内容回复内容</span>
        </div>
      </div>

      <div class="we-padding-top-10 we-padding-bottom-10 we-border-bottom-1 apply-box">
        <div class="we-margin-bottom-5 apply-side">
          <span class="we-flex-1">申请类型：其他</span>
          <span class="we-font-12 we-color-green we-padding-right-10 we-nowrap">审核中</span>
        </div>
        <div class="we-margin-bottom-5 apply-side">
          <span class="we-nowrap">申请内容：</span>
          <span class="we-flex-1">内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容</span>
        </div>
        <div class="we-margin-bottom-5 apply-side">
          <span class="we-nowrap">申请原因：</span>
          <span class="we-flex-1">内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容</span>
        </div>
        <div class="we-margin-bottom-5 apply-side">
          <span class="we-nowrap">申请时长：</span>
          <span class="we-flex-1">2020-02-02 至 2020-02-20</span>
        </div>
        <!-- 回复 -->
        <div class="we-margin-bottom-5 we-color-green apply-side">
          <span class="we-nowrap">陈小花回复：</span>
          <span class="we-flex-1">回复内容回复内容回复内容回复内容回复内容回复内容回复内容</span>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  data() {
    return {
      typeList: ['来访人员', '出入品', '托管', '其他'],

      type: '',
      startDate: '',
      endDate: '',
      content: '',
      reason: '',

      dataList: [ // state 0 审核中 1 审核通过 2 审核失败
        { id: 1, uid: 1, state: 0, type: '出入品', content: '带东西', reason: '原因', startDate: '2020-02-01', endDate: '2020-02-02', replyDate: '2020-10-10', replyWorker: '陈小花', replyPhone: '12312312323', replyContent: '回复内容' }
      ]

    }
  },
  methods: {
    // 设置类型
    onChangeType(e) {
      e = e.mp.detail.value
      this.type = this.typeList[e]
    },

    // 设置入学时间
    setStartDate(e) {
      e = e.mp.detail.value
      this.startDate = e
      this.endDate = ''
    },

    // 设置毕业时间
    setEndDate(e) {
      if (!this.startDate) {
        this.$toast('请先选择起始时间')
        return
      }
      e = e.mp.detail.value
      this.endDate = e
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