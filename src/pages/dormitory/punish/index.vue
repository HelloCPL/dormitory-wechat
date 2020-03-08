<template>
  <div class="we-bg-white punish-container">
    <!-- 标题 -->
    <p class="we-padding we-title we-font-center">西区666违纪记录</p>
    <!-- 列表 -->
    <div class="we-padding we-text we-color-tips we-border-bottom-1">
      <p>违纪类型：违规电器</p>
      <p class="we-margin-top-5">违纪时间：2020-01-02</p>
      <p class="we-margin-top-2 punish-content">违纪内容：嗨嗨嗨</p>
    </div>
    <div class="we-padding we-text we-color-tips we-border-bottom-1">
      <p>违纪类型：违规电器</p>
      <p class="we-margin-top-5">违纪时间：2020-01-02</p>
      <p class="we-margin-top-2 punish-content">违纪内容：嗨嗨嗨</p>
    </div>
    <div class="we-padding we-text we-color-tips we-border-bottom-1">
      <p>违纪类型：违规电器</p>
      <p class="we-margin-top-5">违纪时间：2020-01-02</p>
      <p class="we-margin-top-2 punish-content">违纪内容：嗨嗨嗨嗨嗨嗨嗨嗨嗨嗨嗨嗨嗨嗨嗨嗨嗨嗨嗨嗨嗨嗨嗨嗨嗨嗨嗨嗨嗨嗨</p>
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
          {type: '违规电器', content: '嗨嗨嗨', date: '2020-01-02'},
          {type: '违规电器', content: '嗨嗨嗨', date: '2020-01-02'},
          {type: '违规电器', content: '嗨嗨嗨', date: '2020-01-02'},
          {type: '违规电器', content: '嗨嗨嗨', date: '2020-01-02'},
          {type: '违规电器', content: '嗨嗨嗨', date: '2020-01-02'},
          {type: '违规电器', content: '嗨嗨嗨', date: '2020-01-02'},
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