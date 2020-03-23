<template>
  <div class="we-bg-white column-container" v-if="columnList.length">
    <!-- 图片栏目 -->
    <div class="column-wrapper">
      <template v-for="(item, index) in columnList">
        <div class="column-box" :style="{'width': columnValue}" :key="index" @click="onPreviewImage(index)">
          <img :src="item.img || bgImg" alt="">
          <div class="we-padding-10 we-font-center column-word">
            <span class="we-color-white we-font-14 we-line-2">{{item.title}}</span>
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
      bgImg: require('@img/banner.jpg'),
      columnList: [
        { img: '', title: '水电费价格表', content: '' },
        { img: '', title: '宿舍报修价格表', content: '' },
        { img: '', title: '宿舍内容结构图', content: '' },
        { img: '', title: '学校平面图（本部）', content: '' },
        { img: '', title: '学校平面图（白云校区）', content: '' },
      ],
      imgList: [require('@img/banner.jpg'), require('@img/banner.jpg'), require('@img/banner.jpg'), require('@img/banner.jpg'), require('@img/banner.jpg')], // 图片列表
    }
  },
  computed: {
    columnValue() {
      let num = parseFloat(1 / this.column, 4)
      num = 100 * num
      return num + '%'
    },
  },
  methods: {
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


