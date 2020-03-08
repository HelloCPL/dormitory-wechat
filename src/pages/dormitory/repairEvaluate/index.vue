<template>
  <div class="evaluate-container">
    <div class="we-bg-white we-padding">
      <!-- 维修信息 -->
      <div class="we-padding-bottom-10 evaluate-header">
        <div class="we-color-white we-font-20 we-margin-right-10 left">修</div>
        <div class="we-color-tips right">
          <p>维修人员：大叔一号</p>
          <p>维修时间：2020-01-01</p>
          <p>维修内容：圣诞节楼上的圣诞节廊坊市</p>
        </div>
      </div>
      <!-- 评分 -->
      <div class="we-padding-top-10 we-padding-bottom-10 evaluate-rate">
        <p class="we-margin-bottom-20 we-title">请对本次维修进行评分</p>
        <div class="we-margin-bottom-10">
          <van-rate :value="scope" @change="onChange" />
        </div>
        <p class="we-margin-bottom-10 we-tips" v-if="scope == 1">“非常不满意”</p>
        <p class="we-margin-bottom-10 we-tips" v-else-if="scope == 2">“不满意”</p>
        <p class="we-margin-bottom-10 we-tips" v-else-if="scope == 3">“一般”</p>
        <p class="we-margin-bottom-10 we-tips" v-else-if="scope == 4">“满意”</p>
        <p class="we-margin-bottom-10 we-tips" v-else-if="scope == 5">“非常满意”</p>
      </div>
      <!-- 评论内容 -->
      <van-cell-group>
        <van-field :value="content" type="textarea" placeholder="请输入你对本次维修的评论内容..." autosize @input="onInputContent" />
      </van-cell-group>
    </div>
    <!-- 提交按钮 -->
    <div class="we-margin-btn we-padding">
      <van-button type="info" size="large" @click="onSubmit">提交</van-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      scope: 0,
      content: ''
    }
  },
  methods: {
    // 评分
    onChange(e) {
      e = e.mp.detail
      this.scope = e
    },

    // 设置内容
    onInputContent(e) {
      e = e.mp.detail
      this.content = e
    },

    // 提交
    onSubmit() {
      console.log(this.scope, this.content)
    }
  }
}
</script>

<style lang="scss">
// 设置多行文本输入框最小高度
.evaluate-container {
  .van-field__body--textarea {
    min-height: 50px !important;
  }
}
</style>


<style lang="scss" scope>
@import "./index.scss";
</style>