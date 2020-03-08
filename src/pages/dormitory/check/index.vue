<template>
  <div class="we-bg-white check-container">
    <!-- 标题 -->
    <p class="we-padding we-title we-font-center">西区666卫生检查记录</p>
    <!-- 列表 -->
    <div class="we-padding we-text we-color-tips we-border-bottom-1">
      <p>检查时间：2020-01-02</p>
      <p class="we-margin-top-5">分数<span class="we-tips">(100分制)</span>：70</p>
      <p class="we-margin-top-2 check-content">违纪内容：嗨嗨嗨</p>
    </div>
    <div class="we-padding we-text we-color-tips we-border-bottom-1">
      <p>检查时间：2020-01-02</p>
      <p class="we-margin-top-5">分数<span class="we-tips">(100分制)</span>：70</p>
      <p class="we-margin-top-2 check-content">违纪内容：嗨嗨嗨</p>
    </div>
    <div class="we-padding we-text we-color-tips we-border-bottom-1">
      <p>检查时间：2020-01-02</p>
      <p class="we-margin-top-5">分数<span class="we-tips">(100分制)</span>：70</p>
      <p class="we-margin-top-2 check-content">违纪内容：嗨嗨嗨嗨嗨嗨嗨嗨嗨嗨嗨嗨嗨嗨嗨嗨嗨嗨嗨嗨嗨嗨嗨嗨</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dataInfo: { // scope 1-5级
        id: 1,
        dorId: 1, 
        address: '西区666',
        data: [
          {scope: '70', content: '嗨嗨嗨', date: '2020-01-02'},
          {scope: '70', content: '嗨嗨嗨', date: '2020-01-02'},
          {scope: '70', content: '嗨嗨嗨', date: '2020-01-02'},
          {scope: '70', content: '嗨嗨嗨', date: '2020-01-02'},
          {scope: '70', content: '嗨嗨嗨', date: '2020-01-02'},
          {scope: '70', content: '嗨嗨嗨', date: '2020-01-02'},
        ]
      }
    }
  },
  methods: {

  }
}
</script>

<style lang="scss" scope>
@import "./index.scss";
</style>