<template>
  <div class="we-bg-white userinfo-container">
    <van-cell-group>
      <van-cell value="去认证" is-link v-if="!isSign" @click="toAuthentication">
        <div slot="title" class="">
          <span class="van-cell-text we-margin-right-5">实名认证</span>
          <van-tag type="danger" round>未认证</van-tag>
        </div>
      </van-cell>
      <van-cell title="个人信息" value="修改" is-link v-else />
    </van-cell-group>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isSign: false
    }
  },
  methods: {
    // 跳转到实名认证
    toAuthentication() {
      this.$navigate.push('/pages/mine/authentication/main')
    }
  }
}
</script>

<style lang="scss" scoped>
@import './userInfoMine.scss';
</style>


