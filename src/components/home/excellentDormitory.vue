<template>
  <div class="we-bg-white excellent-dormitory-container" v-if="dataList && dataList.length">
    <!-- 标题 -->
    <div class="we-padding we-title">优秀宿舍展</div>
    <!-- 内容 -->
    <div class="wrapper">
      <template v-for="(item, index) in dataList">
        <div class="box" :key="index" v-if="item.url">
          <img :src="item.url" alt="" @click="onPreviewImage(index)">
          <p class="we-padding-5 we-tips">{{item.desc}}</p>
        </div>
      </template>
    </div>
    <!-- 加载更多 -->
    <div class="we-padding-15 worker-more" @click="getDataList" v-if="!finish">
      <img :src="downImg" />
      <span class="we-color-tips">加载更多</span>
    </div>
  </div>
</template>

<script>
import { wxPreviewImage } from '@/wx/index'
export default {
  data() {
    return {
      downImg: require('@icon/icon_down1_blue.png'),
      dataList: [], // 数据列表
      imgList: [], // 图片列表
      pageNo: 1,
      pageSize: 10,
      finish: false,
    }
  },
  onLoad(query) {
    Object.assign(this.$data, this.$options.data())
    this.onRefresh()
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
      if (this.pageNo === 1) {
        this.dataList = []
        this.imgList = []
      }
      this.lock = true
      let params = {
        type: 3,
        pageNo: this.pageNo,
        pageSize: this.pageSize
      }
      let res = await this.$http.postPub('/management/images/list', params)
      if (res.errorCode === 0) {
        this.dataList = this.dataList.concat(res.data)
        this.pageNo += 1
        if (this.dataList.length >= res.total)
          this.finish = true
        // 处理预览图片列表
        let arr = []
        res.data.forEach(item => {
          arr.push(item.url)
        })
        this.imgList = this.imgList.concat(arr)
      }
      this.lock = false
    },

    // 图片预览
    onPreviewImage(index) {
      wxPreviewImage(this.imgList, index)
    }

  }
}
</script>

<style lang="scss" scoped>
@import "./excellentDormitory.scss";
</style>


