<template>
  <div class="apply-container">
    <van-tabs :active="active" color="#ed3f14" swipeable animated @change="onChange">
      <van-tab title="申请" :name="0">
        <!-- 申请类型选择 -->
        <picker @change="onChangeType" :range="typeList">
          <div>
            <van-cell is-link>
              <span slot="title" class="we-required">申请类型</span>
              <span class="we-color-text" v-if="type">{{type}}</span>
              <span class="we-color-tips" v-else>请选择</span>
            </van-cell>
          </div>
        </picker>
        <!-- 申请起始时间选择 -->
        <van-cell is-link :value="startTime" @click="startTimeFlag = true">
          <span slot="title" class="we-required">起始时间</span>
        </van-cell>
        <!-- 申请结束时间选择 -->
        <van-cell is-link :value="endTime" @click="endTimeFlag = true">
          <span slot="title" class="we-required">结束时间</span>
        </van-cell>
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
        <apply-history :dataList="dataList" :dormitoryName="dormitoryName" @delete="onDelete" />
      </van-tab>
    </van-tabs>

    <!-- 选择起始时间 -->
    <van-popup :show="startTimeFlag" close-on-click-overlay position="bottom" @close="closeOverlay">
      <van-datetime-picker type="datetime" @cancel="closeOverlay" :value="today" @confirm="onConfirmStartTime" />
    </van-popup>
    <!-- 选择结束时间 -->
    <van-popup :show="endTimeFlag" close-on-click-overlay position="bottom" @close="closeOverlay">
      <van-datetime-picker type="datetime" :value="today" @cancel="closeOverlay" @confirm="onConfirmEndTime" />
    </van-popup>
  </div>
</template>

<script>
import applyHistory from '../components/applyHistory'
export default {
  components: {
    'apply-history': applyHistory,
  },
  data() {
    return {
      active: 0,
      activeChild: 1,
      menuList: [
        { name: '全部', active: 1 },
        { name: '审核中', active: 2 },
        { name: '已通过', active: 3 },
        { name: '已拒绝', active: 4 },
      ],
      // 申请页面数据
      typeList: ['物品类', '工具类', '大功率电器', '活动类', '其他'], //后期可从数据库获取
      startTimeFlag: false,
      endTimeFlag: false,
      startTimeValue: 0,
      endTimeValue: 0,
      today: new Date().getTime(),

      type: '',
      startTime: '',
      endTime: '',
      content: '',
      reason: '',

      dormitoryName: '', // 宿舍名称
      status: 'all',
      lock: false,
      finish: false,
      pageNo: 1,
      pageSize: 5,
      dataList: [], // 数据列表
    }
  },
  onLoad() {
    Object.assign(this.$data, this.$options.data())
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
      let res = await this.$http.post('/dormitory/apply/list', params)
      if (res.errorCode === 0) {
        console.log(1111, res)
        this.dataList = this.dataList.concat(res.data)
        this.pageNo += 1
        if (!this.dormitoryName && this.dataList.length)
          this.dormitoryName = this.dataList[0]['dorBuildingName'] + this.dataList[0]['dorRoomName']
        if (this.dataList.length >= res.total)
          this.finish = true
      }
      this.lock = false
    },

    // 删除
    onDelete(index) {
      this.dataList.splice(index, 1)
    },

    // 切换
    onChange(e) {
      e = e.mp.detail.name
      this.active = e
      if (e == 1)
        this.onRefresh()
    },

    // 切换子栏目
    setActiveChild(active) {
      this.activeChild = active
      switch (active) {
        case 1:
          this.status = 'all'
          break
        case 2:
          this.status = 1
          break
        case 3:
          this.status = 2
          break
        case 4:
          this.status = 0
          break
      }
      this.onRefresh()
    },

    // 设置申请类型
    onChangeType(e) {
      e = e.mp.detail.value
      this.type = this.typeList[e]
    },

    // 关闭评论遮罩层
    closeOverlay() {
      this.startTimeFlag = false
      this.endTimeFlag = false
    },

    // 设置起始时间
    onConfirmStartTime(e) {
      e = e.mp.detail
      this.startTimeValue = e
      this.startTime = this.$dayjs(e).format('YYYY-MM-DD hh:mm')
      this.startTimeFlag = false
    },

    // 设置结束时间
    onConfirmEndTime(e) {
      e = e.mp.detail
      this.endTimeValue = e
      if (this.startTimeValue === 0) {
        this.endTimeFlag = false
        this.$toast('请先选择起始时间')
        return
      } else if (this.endTimeValue <= this.startTimeValue) {
        this.endTimeFlag = false
        this.$toast('请选择起始时间之后的时间')
        return
      }
      this.endTime = this.$dayjs(e).format('YYYY-MM-DD hh:mm')
      this.endTimeFlag = false
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
        msg = '请选择起始时间'
      } else if (!this.endTime) {
        msg = '请选择结束时间'
      } else if (!this.content) {
        msg = '请输入申请内容'
      } else if (!this.reason) {
        msg = '请输入申请原因'
      }
      if (msg) {
        this.$toast(msg)
        return
      }
      let startTime = this.$dayjs(this.startTime).valueOf()
      let endTime = this.$dayjs(this.endTime).valueOf()
      let params = {
        type: this.type,
        startTime,
        endTime,
        content: this.content,
        reason: this.reason

      }
      let res = await this.$http.post('/dormitory/apply/add', params)
      if (res.errorCode === 0) {
        this.$toast('提交成功')
        setTimeout(() => {
          this.$navigate.back()
        }, 1000)
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