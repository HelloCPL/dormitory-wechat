<template>
  <div class="suggest-container">
    <van-tabs :active="active" color="#ed3f14" swipeable animated @change="onChange">
      <van-tab title="投诉或建议" :name="0">
        <!-- 投诉或建议 -->
        <div class="we-padding we-bg-white">
          <!-- 选择投诉或建议 -->
          <div class="suggest-title">
            <div class="we-bg box" :class="{'active': type == 1}" @click="setType(1)">
              <img :src="editIcon" alt="">
              <span class="we-font-12 we-color-white">投诉</span>
            </div>
            <div class="we-bg-red box" :class="{'active': type == 2}" @click="setType(2)">
              <img :src="editIcon" alt="">
              <span class="we-font-12 we-color-white">建议</span>
            </div>
          </div>
          <!-- 投诉内容 -->
          <van-cell-group>
            <van-field :value="content" type="textarea" :placeholder="type == 1 ? '请输入你要投诉的内容...' : '请输入你的建议...'"
              autosize @input="onInput" />
          </van-cell-group>
          <!-- 图片上传 -->
          <upload-file v-model="imgList" />
          <!-- 提交按钮 -->
          <div class="we-margin-btn we-padding">
            <van-button type="info" size="large" @click="onSubmit">提交</van-button>
          </div>
        </div>
      </van-tab>
      <van-tab title="历史记录" :name="1">
        <!-- 子栏目 -->
        <div class="repair-menu">
          <template v-for="(item, index) in menuList">
            <span :class="{'active': item.active == activeChild}" :key="index" @click="setActiveChild(item.active)">{{item.name}}</span>
          </template>
        </div>
        <suggest-history :data-list="dataList" :dormitoryName="dormitoryName" @delete="onDelete" />
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import uploadFile from '@com/common/uploadFile'
import suggestHistory from '../components/suggestHistory'
export default {
  components: {
    uploadFile,
    'suggestHistory': suggestHistory,
  },
  data() {
    return {
      editIcon: require('@icon/icon_edit_white.png'),
      active: 0,
      activeChild: 1,
      menuList: [
        { name: '全部', active: 1 },
        { name: '处理中', active: 2 },
        { name: '已采纳', active: 3 },
        { name: '未采纳', active: 4 }
      ],

      dormitoryName: '', // 宿舍名称
      status: 'all',
      lock: false,
      finish: false,
      pageNo: 1,
      pageSize: 10,
      dataList: [], // 数据列表

      //投诉或建议
      type: 1, // 1 投诉 2 建议
      content: '',
      imgList: [], // 上传图片集合
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
      let res = await this.$http.post('/dormitory/suggestion/list', params)
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

    // 删除图片
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

    // 设置type
    setType(index) {
      this.type = index
    },

    // 设置内容
    onInput(e) {
      e = e.mp.detail
      this.content = e
    },

    // 提交
    async onSubmit() {
      if (!this.content) {
        let msg = this.type == 1 ? '请输入投诉内容' : '请输入建议内容'
        this.$toast(msg)
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
        type: this.type,
        content: this.content,
        imgList: imgList
      }
      let res = await this.$http.post('/dormitory/suggestion/add', params)
      if (res.errorCode === 0) {
        this.$toast('提交成功')
        setTimeout(() => {
          this.$navigate.back()
        }, 1000)
      }
    },

  }
}
</script>

<style lang="scss">
// 设置多行文本输入框最小高度
.suggest-container {
  .van-field__body--textarea {
    min-height: 50px !important;
  }
}
</style>

<style lang="scss" scope>
@import "./index.scss";
</style>