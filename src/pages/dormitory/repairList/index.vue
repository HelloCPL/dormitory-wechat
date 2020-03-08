<template>
  <div class="apply-container">
    <van-tabs :active="active" color="#ed3f14" swipeable animated @change="onChange">
      <van-tab title="报修" :name="0">
        你好1
      </van-tab>
      <van-tab title="历史记录" :name="1">
        <!-- 子栏目 -->
        <div class="repair-menu">
          <template v-for="(item, index) in menuList">
            <span :class="{'active': item.active == activeChild}" :key="index" @click="setActiveChild(item.active)">{{item.name}}</span>
          </template>
        </div>
        你好2
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
export default {
  data() {
    return {
      active: 0,
      activeChild: 1,
      menuList: [
        { name: '全部', active: 1 },
        { name: '进行中', active: 2 },
        { name: '待评价', active: 3 },
        { name: '已结束', active: 4 },
        { name: '审核失败', active: 5 }
      ],
    }
  },
  methods: {
    // 切换
    onChange(e) {
      e = e.mp.detail.name
      this.active = e
    },

    // 切换子栏目
    setActiveChild(active) {
      console.log(active)
      this.activeChild = active
    },

  }
}
</script>

<style lang="scss" scope>
@import "./index.scss";
</style>