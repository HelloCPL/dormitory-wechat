<template>
  <div class="we-bg-white apply-container">
    <div class="we-padding we-border-bottom-1">
      <p class="">温馨提示：</p>
      <p class="we-tips we-margin-top-5">学生个人可进行来访人员、出入品、托管或其他方面的申请，申请审核通过后会有相关工作人员联系！</p>
    </div>
    <!-- 申请类型 -->
    <picker @change="onChangeType" :range="typeList">
      <van-cell is-link>
        <span class="we-color-text" v-if="typeName">{{typeName}}</span>
        <span class="we-color-tips" v-else>请选择</span>
        <span slot="title" class="we-required">申请类型</span>
      </van-cell>
    </picker>
    <!-- 起始日期和结束日期 -->
    <picker mode="date" :value="startTime" @change="setStartDate">
      <van-cell is-link>
        <span class="we-color-text" v-if="startTime">{{startTime}}</span>
        <span class="we-color-tips" v-else>请选择</span>
        <span slot="title" class="we-required">起始日期</span>
      </van-cell>
    </picker>
    <picker mode="date" :value="endTime" :start="startTime" @change="setEndDate">
      <van-cell is-link>
        <span class="we-color-text" v-if="endTime">{{endTime}}</span>
        <span class="we-color-tips" v-else>请选择</span>
        <span slot="title" class="we-required">结束日期</span>
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
    <p class="we-padding we-color-tips we-border-bottom-1">我的申请({{dataList.length}})</p>
    <div class="we-padding">
      <template v-for="(item, index) in dataList">
        <div class="we-padding-top-10 we-padding-bottom-10 we-border-bottom-1 apply-box" :key="index">
          <div class="we-margin-bottom-5 apply-side">
            <span class="we-flex-1">
              申请类型：
              <span v-if="item.type == 1">来访人员</span>
              <span v-else-if="item.type == 2">生活用品领取</span>
              <span v-else-if="item.type == 3">物品托管</span>
              <span v-else>其他</span>
            </span>
            <div class="we-flex">
              <span class="we-font-12 we-color-green we-padding-right-10 we-nowrap" v-if="item.replyStatus == 1">审核中</span>
              <span class="we-font-12 we-color-green we-padding-right-10 we-nowrap" v-else-if="item.replyStatus == 2">审核成功</span>
              <span class="we-font-12 we-color-green we-padding-right-10 we-nowrap" v-else-if="item.replyStatus == 3">已处理</span>
              <span class="we-font-12 we-color-red we-padding-right-10 we-nowrap" v-else-if="item.replyStatus == 0">审核失败</span>
              <img :src="deleteIcon" alt="" class="delete-icon" v-if="item.replyStatus == 1" @click="onDelete(item.id, index)" />
            </div>
          </div>
          <div class="we-margin-bottom-5 apply-side">
            <span class="we-nowrap">申请内容：</span>
            <span class="we-flex-1">{{item.content}}</span>
          </div>
          <div class="we-margin-bottom-5 apply-side" v-if="item.reason">
            <span class="we-nowrap">申请原因：</span>
            <span class="we-flex-1">{{item.reason}}</span>
          </div>
          <div class="we-margin-bottom-5 apply-side">
            <span class="we-nowrap">申请时长：</span>
            <span class="we-flex-1">{{item.startTimeStr}} 至 {{item.endTimeStr}}</span>
          </div>
          <!-- 回复 -->
          <div class="we-margin-bottom-5 we-color-green apply-side" v-if="item.replyContent">
            <span class="we-nowrap">{{item.replyUserName}}回复：</span>
            <span class="we-flex-1">{{item.replyContent}}</span>
          </div>
        </div>
      </template>
      <div class="we-padding we-font-center" v-if="!dataList.length">
        <img :src="nodataIcon" alt="" style="width: 150px; height: 150px;">
        <p class="we-tips">暂没有记录</p>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  data() {
    return {
      deleteIcon: require('@icon/icon_delete.png'),
      nodataIcon: require('@icon/nodata.png'),
      typeList: ['来访人员', '出入品', '托管', '其他'],
      typeName: '',
      type: null,
      startTime: '',
      endTime: '',
      content: '',
      reason: '',

      dataList: [], // state 0 审核中 1 审核通过 2 审核失败
      total: 0,
      pageNo: 1,
      pageSize: 10,
      finish: false,
      lock: false
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
    // 更新 数据
    onRefresh() {
      this.total = 0
      this.lock = false
      this.finish = false
      this.pageNo = 1
      this.pageSize = 10
      this.dataList = []
      this.getDataList()
    },

    // 请求数据
    async getDataList() {
      if (this.lock || this.finish) return
      this.lock = true
      let params = {
        pageNo: this.pageNo,
        pageSize: this.pageSize
      }
      let res = await this.$http.post('/student/apply/check', params)
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

    // 删除 
    async onDelete(id, index) {
      if (this.lock) return
      this.lock = true
      let params = {
        id
      }
      let res = await this.$http.post('/student/apply/delete', params)
      if (res.errorCode === 0) {
        this.$toast('删除成功')
        this.dataList.splice(index, 1)
        this.total -= 1
      }
      this.lock = false
    },

    // 设置类型
    onChangeType(e) {
      e = e.mp.detail.value
      this.typeName = this.typeList[e]
      this.type = parseInt(e) + 1
    },

    // 设置入学时间
    setStartDate(e) {
      e = e.mp.detail.value
      this.startTime = e
      this.endTime = ''
    },

    // 设置毕业时间
    setEndDate(e) {
      if (!this.startTime) {
        this.$toast('请先选择起始时间')
        return
      }
      e = e.mp.detail.value
      this.endTime = e
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
    async onSubmit() {
      let msg = ''
      if (!this.type) {
        msg = '请选择申请类型'
      } else if (!this.startTime) {
        msg = '请选择申请起始日期'
      } else if (!this.endTime) {
        msg = '请选择申请结束日期'
      } else if (!this.content) {
        msg = '请输入申请内容'
      }
      if (msg) {
        this.$toast(msg)
        return
      }
      let startTime = this.startTime + ' 00:00:00'
      let endTime = this.endTime + ' 23:59:59'
      startTime = this.$dayjs(startTime).valueOf()
      endTime = this.$dayjs(endTime).valueOf()
      let params = {
        type: this.type,
        startTime,
        endTime,
        content: this.content,
        reason: this.reason
      }
      let res = await this.$http.post('/student/apply/add', params)
      if (res.errorCode === 0) {
        this.$alert('提交成功')
          .then(() => {
            this.typeName = ''
            this.type = null
            this.startTime = ''
            this.endTime = ''
            this.content = ''
            this.reason = ''
            this.onRefresh()
          })
      }
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