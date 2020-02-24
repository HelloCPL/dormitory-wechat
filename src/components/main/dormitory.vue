<template>
  <div class="dormitory-container">
    <!-- 宿舍时光 -->
    <records />
    <!-- 宿舍成员和值日表 -->
    <members />
    <!-- 功能 -->
    <functional :column="4" />
    <!-- 宿舍管理员 -->
    <worker :max="2" />

    <div class="we-margin-top-10">
      <title-divider title="宿舍有关信息" />
    </div>
    <!-- 宿舍有关信息图表 -->
    <column-img />
    <!-- 宿舍规章制度 -->
    <institution />

  </div>
</template>

<script>
import records from '@com/dormitory/records'
import members from '@com/dormitory/members'
import functional from '@com/dormitory/functional'
import worker from '@com/dormitory/worker'
import titleDivider from '@com/common/titleDivider'
import columnImg from '@com/dormitory/columnImg'
import institution from '@com/dormitory/institution'
export default {
  components: {
    records,
    members,
    functional,
    worker,
    titleDivider,
    columnImg,
    institution
  },
  data() {
    return {

    }
  },
  methods: {
    
  }
}
</script>

<style lang="scss" scope>
@import "./dormitory.scss";
</style>