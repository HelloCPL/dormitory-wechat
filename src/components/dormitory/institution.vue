<template>
  <div class="we-bg-white institution-container">
    <div class="institution-wrapper">
      <van-collapse :value="activeName" @change="onChange" accordion>
        <template v-for="(item, index) in institutionList">
            <van-collapse-item :title="item.name" value="查看" :name="index" :key="index">
              <chart-dormitory :dataList="item.data"/>
            </van-collapse-item>
        </template>
      </van-collapse>
    </div>
  </div>
</template>

<script>
import chartDormitory from '@com/dormitory/chartDormitory'
export default {
  components: {
    chartDormitory
  },
  props: {

  },
  data() {
    return {
      activeName: '',
      institutionList: [
        {          name: '管理规定', data: [
            { id: 1, title: '大学学生公寓消防安全管理规定', content: '' },
            { id: 1, title: '教育部关于加强高等学生公寓安全管理', content: '' },
            { id: 1, title: '学生公寓内务卫生达标制度', content: '' },
          ]        },
        {          name: '服务指南', data: [
            { id: 1, title: '大学学生公寓消防安全管理规定', content: '' },
            { id: 1, title: '教育部关于加强高等学生公寓安全管理', content: '' },
            { id: 1, title: '教育部关于加强高等学生公寓安全管理', content: '' },
            { id: 1, title: '教育部关于加强高等学生公寓安全管理', content: '' },
            { id: 1, title: '教育部关于加强高等学生公寓安全管理', content: '' },
            { id: 1, title: '教育部关于加强高等学生公寓安全管理', content: '' },
            { id: 1, title: '学生公寓内务卫生达标制度', content: '' },
            { id: 1, title: '学生公寓内务卫生达标制度', content: '' },
            { id: 1, title: '学生公寓内务卫生达标制度', content: '' },
          ]        },
        {          name: '安全警示', data: [
            { id: 1, title: '大学学生公寓消防安全管理规定', content: '' },
            { id: 1, title: '教育部关于加强高等学生公寓安全管理', content: '' },
            { id: 1, title: '学生公寓内务卫生达标制度', content: '' },
            { id: 1, title: '学生公寓内务卫生达标制度', content: '' },
          ]        },
        {          name: '中心简介', data: [
            { id: 1, title: '大学学生公寓消防安全管理规定', content: '' },
            { id: 1, title: '教育部关于加强高等学生公寓安全管理', content: '' },
          ]        },

      ]
    }
  },
  methods: {
    onChange(e) {
      this.activeName = e.mp.detail
    }
  }
}
</script>

<style lang="scss">
.institution-container {
  .van-collapse-item__content {
    padding: 0px !important;
  }
}
</style>

<style lang="scss" scoped>
@import "./institution.scss";
</style>


