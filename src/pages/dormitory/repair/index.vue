<template>
  <div class="repair-container">
    <van-tabs :active="active" color="#ed3f14" swipeable animated @change="onChange">
      <van-tab title="报修" :name="0">
        <!-- 报修项目 -->
        <van-cell-group>
          <van-field :value="content" type="textarea" placeholder="请输入报修具体的事项..." autosize @input="onInputContent" />
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
        <repair-list :dataList="dataList" :dormitoryName="dormitoryName" @delete="onDelete" />
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
        { name: '待审核', active: 2 },
        { name: '待维修', active: 3 },
        { name: '待评价', active: 4 },
        { name: '已完成', active: 5 },
        { name: '审核失败', active: 6 }
      ],

      dormitoryName: '',
      status: 'all',
      lock: false,
      finish: false,
      pageNo: 1,
      pageSize: 10,
      dataList: [], // 数据列表

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
      let res = await this.$http.post('/dormitory/repair/list', params)
      if (res.errorCode === 0) {
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
          this.status = 3
          break
        case 5:
          this.status = 4
          break
        case 6:
          this.status = 0
          break
      }
      this.onRefresh()
    },

    // 设置报修事项
    onInputContent(e) {
      e = e.mp.detail
      this.content = e
    },

    // 提交
    async onSubmit() {
      if (!this.content) {
        this.$toast('请输入维修内容')
        return
      }
      // 处理图片短路经
      let imgList
      if (this.$tools.isArray(this.imgList) && this.imgList.length) {
        imgList = []
        this.imgList.forEach(item => {
          imgList.push(item.shortName)
        })
      } else {
        imgList = null
      }
      let params = {
        content: this.content,
        imgList: imgList
      }
      let res = await this.$http.post('/dormitory/repair/add', params)
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
.repair-container {
  .van-field__body--textarea {
    min-height: 50px !important;
  }
}
</style>

<style lang="scss" scope>
@import "./index.scss";
</style>