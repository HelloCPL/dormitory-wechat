<template>
  <div class="we-bg-white title-divider-container">
    <div class="we-padding divider-content">
      <div class="title">
        <slot name="icon"><img :src="iconImg" v-if="icon" /></slot>
        <span class="we-color-tips we-font-12">{{title}}</span>
      </div>
      <div class="we-margin-left-20 side">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    icon: {
      type: Boolean,
      default: true
    },
    title: {
      type: String,
      default: '标题'
    }
  },
  data() {
    return {
      iconImg: require('@icon/icon_filter.png')
    }
  },
  methods: {

  }
}
</script>

<style lang="scss" scoped>
@import './titleDivider.scss';
</style>


