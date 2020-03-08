<template>
  <div class="records-add-container">
    <!-- 输入内容 -->
    <van-field :value="content" type="textarea" placeholder="记录美好时光..." focus autosize @input="setContent" />
    <!-- 图片上传 -->
    <upload-file v-model="imgList" />

    <div class="we-margin-btn we-padding">
      <van-button type="info" size="large" @click="onSubmit">发布</van-button>
    </div>
  </div>
</template>

<script>
import uploadFile from '@com/common/uploadFile'
export default {
  components: {
    uploadFile
  },
  data() {
    return {
      comFlag: true,
      content: '',
      imgList: [], // 上传图片集合
    }
  },
  onShow() {
    if (!this.wxGetStorage('chooseImage'))
      Object.assign(this.$data, this.$options.data())
  },
  methods: {
    setContent(e) {
      console.log(e)
      e = e.mp.detail
      this.content = e
    },

    // 发布
    onSubmit() {
      let params = {
        content: this.handleText(this.content),
        imgList: this.imgList
      }
      console.log(params)
    },

    // 处理内容文本
    handleText(text) {
      text = text.replace(/ /g, '')
      let textList = text.split('\n')
      let str = ''
      for (let i = 0, len = textList.length; i < len; i++) {
        if (textList[i]) {
          str = str + '<p>' + textList[i] + '</p>'
        }
      }
      return str
    },
  },
}
</script>

<style lang="scss">
// 设置多行文本输入框最小高度
.records-add-container {
  .van-field__body--textarea {
    min-height: 50px !important;
  }
}
</style>

<style lang="scss" scope>
@import "./index.scss";
</style>