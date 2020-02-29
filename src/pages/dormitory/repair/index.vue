<template>
  <div class="repair-container">
    <div class="we-padding-15 we-bg-white header">
      <span class="we-color-blue" @click="toRepairDetail">报修记录</span>
      <img :src="rightIcon" alt=""  @click="toRepairDetail">
    </div>
    <!-- 报修项目 -->
    <van-cell-group>
      <van-field :value="content" label="内容" input-align="right" type="textarea" placeholder="请输入报修具体事项" autosize
        @input="onInputContent" />
    </van-cell-group>
    <!-- 图片上传 -->
    <upload-file v-model="imgList" />
    <!-- 提交 -->
    <div class="we-margin-btn we-padding">
      <van-button type="info" size="large" @click="onSubmit">提交</van-button>
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
      rightIcon: require('@icon/icon_right_blue.png'),
      content: '',
      imgList: [], // 上传图片集合
    }
  },
  methods: {
    // 跳转到报修记录
    toRepairDetail() {
      this.$navigate.push('/pages/dormitory/repairList/main')
    },
    
    // 设置报修事项
    onInputContent(e) {
      e = e.mp.detail
      this.content = e
    },

    // 提交
    onSubmit() {
      console.log(this.content, this.imgList)
    }
  }
}
</script>

<style lang="scss" scope>
@import "./index.scss";
</style>