<template>
  <div class="we-bg-white column-container" v-if="columnList.length">
    <!-- 图片栏目 -->
    <div class="column-wrapper">
      <template v-for="(item, index) in columnList">
        <div class="column-box" :style="{'width': columnValue}" :key="index">
          <img :src="item.imgList[0] || bgImg" alt="">
          <div class="we-padding-10 column-word">
            <span class="we-color-white we-font-14 we-line-2">{{item.title}}</span>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    column: { //一行栏目数量
      type: Number,
      default: 2.5
    }
  },
  data() {
    return {
      bgImg: require('@img/banner3.jpg'),
      columnList: [
        { imgList: ['', ''], title: '宿舍结构图', content: '' },
        { imgList: [require('@img/banner1.jpg'), ''], title: '保修价格表', content: '' },
        { imgList: ['', ''], title: '水费价格表', content: '' },
        { imgList: [require('@img/banner1.jpg'), ''], title: '电费价格表', content: '' },
        { imgList: ['', ''], title: '电费价格表', content: '' },
        { imgList: [require('@img/banner1.jpg'), ''], title: '电费价格表', content: '' },
        { imgList: ['', ''], title: '电费价格表', content: '' },
        { imgList: [require('@img/banner1.jpg'), ''], title: '电费价格表', content: '' },
        { imgList: ['', ''], title: '电费价格表', content: '' }
      ]
    }
  },
  computed: {
    columnValue() {
      let num = parseFloat(1 / this.column, 4)
      num = 100 * num
      return num + '%'
    }
  },
  methods: {

  }
}
</script>

<style lang="scss" scoped>
@import "./columnImg.scss";
</style>


