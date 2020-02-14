<template>
  <div class="dormitory-container">
    <!-- 宿舍时光 -->
    <records />
    <!-- 宿舍成员和值日表 -->
    <members />
    <!-- 功能 -->
    <div class="we-margin-top-10">
      <functional />
    </div>
  </div>
</template>

<script>
import records from '@com/dormitory/records'
import members from '@com/dormitory/members'
import functional from '@com/dormitory/functional'
export default {
  components: {
    records,
    members,
    functional,
  },
  data() {
    return {

    }
  }
}
</script>

<style lang="scss" scope>
@import "./dormitory.scss";
</style>