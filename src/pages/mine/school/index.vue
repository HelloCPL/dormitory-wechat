<template>
  <div>
    <web-view :src="dataInfo.url"></web-view>
  </div>
</template>

<script>
import { wxSetNavigationBarTitle } from '@/wx/index'
export default {
  data() {
    return {
      dataInfo: {
        url: 'https://www.gpnu.edu.cn/',
        name: '广东技术师范学院'
      }
    }
  },

  mounted() {
    wxSetNavigationBarTitle(this.dataInfo.name)
  },

  methods: {

  }
}
</script>

<style lang="scss" scope>
@import "./index.scss";
</style>