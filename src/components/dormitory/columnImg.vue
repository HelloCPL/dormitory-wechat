<template>
  <div class="we-bg-white column-container" v-if="columnList.length">
    <!-- 图片栏目 -->
    <div class="column-wrapper">
      <template v-for="(item, index) in columnList">
        <div class="column-box" :style="{'width': columnValue}" :key="index" @click="onPreviewImage(index)">
          <img :src="item.url" alt="" class="we-border-1">
          <div class="we-padding-10 we-font-center column-word">
            <span class="we-color-orange we-font-14 we-line-2 we-font-bold">{{item.desc}}</span>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import { wxPreviewImage } from '@/wx/index'
export default {
  props: {
    column: { //一行栏目数量
      type: Number,
      default: 2.5
    }
  },
  data() {
    return {
      columnList: [],
      imgList: [], // 图片预览列表
    }
  },
  computed: {
    columnValue() {
      let num = parseFloat(1 / this.column, 4)
      num = 100 * num
      return num + '%'
    },
  },
  onLoad() {
    this.getColumnList()
  },
  methods: {
    // 获取宿舍信息图
    async getColumnList() {
      let res = await this.$http.postPub('/management/images/list', { type: 2 })
      if (res.errorCode === 0) {
        this.columnList = res.data
        let arr = []
        res.data.forEach(item => {
          arr.push(item.url)
        })
        this.imgList = arr
      }
    },
    // 图片预览
    onPreviewImage(index) {
      wxPreviewImage(this.imgList, index)
    }
  }
}
</script>

<style lang="scss" scoped>
@import "./columnImg.scss";
</style>
