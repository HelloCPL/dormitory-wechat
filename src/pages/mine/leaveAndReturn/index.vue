<template>
  <div class="leave-container">
    <div class="we-padding we-border-bottom-1">
      <p class="">温馨提示：</p>
      <p class="we-tips we-margin-top-5">离返校登记仅需在寒暑假期内进行登记，每学期登记一次即可，正常周末无须登记。</p>
    </div>
    <!-- 离校日期和返校日期 -->
    <picker mode="date" :value="startTime" @change="setStartDate">
      <van-cell is-link>
        <span class="we-color-text" v-if="startTime">{{startTime}}</span>
        <span class="we-color-tips" v-else>请选择</span>
        <span slot="title" class="we-required">离校日期</span>
      </van-cell>
    </picker>
    <picker mode="date" :value="endTime" :start="startTime" @change="setEndDate">
      <van-cell is-link>
        <span class="we-color-text" v-if="endTime">{{endTime}}</span>
        <span class="we-color-tips" v-else>请选择</span>
        <span slot="title" class="we-required">返校日期</span>
      </van-cell>
    </picker>
    <!-- 备注 -->
    <van-cell-group>
      <van-field :value="remark" type="textarea" placeholder="请输入备注..." autosize @input="onInputRemark" />
    </van-cell-group>
    <!-- 提交按钮 -->
    <div class="we-margin-btn we-padding">
      <van-button type="info" size="large" @click="onSubmit">申请</van-button>
    </div>
    <!-- 我的离返校记录 -->
    <p class="we-padding we-color-tips we-border-bottom-1">我的离返校记录({{total}})</p>
    <div class="we-padding">
      <template v-for="(item, index) in dataList">
        <div class="we-padding-top-10 we-padding-bottom-15 we-border-bottom-1 apply-box" :key="index">
          <div class="we-margin-bottom-5 apply-side">
            <span class="we-flex-1">
              离校状态：
              <span v-if="item.status == 1">在校中</span>
              <span v-else-if="item.status == 2">离校中</span>
              <span v-else-if="item.status == 0">已返校</span>
            </span>
            <div class="we-flex">
              <van-tag plain type="primary" v-if="item.status == 2" @click="onEdit(item.id, 0, index)">确认返校</van-tag>
              <img :src="deleteIcon" alt="" class="delete-icon" @click="onDelete(item.id, index)" />
            </div>
          </div>
          <div class="we-margin-bottom-5 apply-side">
            <span class="we-nowrap">离校日期：</span>
            <span class="we-flex-1">{{item.startTimeStr}}</span>
          </div>
          <div class="we-margin-bottom-5 apply-side">
            <span class="we-nowrap">返校日期：</span>
            <span class="we-flex-1">{{item.endTimeStr}}</span>
          </div>
          <div class="we-margin-bottom-5 apply-side" v-if="item.remark">
            <span class="we-nowrap">备注：</span>
            <span class="we-flex-1">{{item.remark}}</span>
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
      startTime: '',
      endTime: '',
      remark: '',

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
      let res = await this.$http.post('/student/status/atschool/check', params)
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

    // 编辑 
    async onEdit(id, status, index) {
      let params = {
        id,
        status
      }
      let res = await this.$http.post('/student/status/atschool/edit', params)
      if (res.errorCode === 0) {
        this.$toast('修改成功')
        this.$set(this.dataList[index], 'status', status)
      }
    },

    // 删除 
    async onDelete(id, index) {
      if (this.lock) return
      this.lock = true
      let params = {
        id
      }
      let res = await this.$http.post('/student/status/atschool/delete', params)
      if (res.errorCode === 0) {
        this.$toast('删除成功')
        this.dataList.splice(index, 1)
        this.total -= 1
      }
      this.lock = false
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
        this.$toast('请先选择离校时间')
        return
      }
      e = e.mp.detail.value
      this.endTime = e
    },

    // 设置申请内容
    onInputRemark(e) {
      e = e.mp.detail
      this.remark = e
    },

    // 提交
    async onSubmit() {
      let msg = ''
      if (!this.startTime) {
        msg = '请选择离校日期'
      } else if (!this.endTime) {
        msg = '请选择返校日期'
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
        startTime,
        endTime,
        remark: this.remark
      }
      let res = await this.$http.post('/student/status/atschool/add', params)
      if (res.errorCode === 0) {
        this.$alert('提交成功')
          .then(() => {
            this.startTime = ''
            this.endTime = ''
            this.remark = ''
            this.onRefresh()
          })
      }
    }

  }
}
</script>

<style lang="scss">
// 设置多行文本输入框最小高度
.leave-container {
  .van-field__body--textarea {
    min-height: 50px !important;
  }
}
</style>

<style lang="scss" scope>
@import "./index.scss";
</style>