<template>
  <div class="container">
    <!-- 主页面路由 -->
    <div class="main-router">
      <div v-show="active == 0">
        <home />
      </div>
      <div v-show="active == 1">
        <dormitory />
      </div>
      <div v-show="active == 2">
        <mine />
      </div>
    </div>

    <!-- 底部标签栏 -->
    <van-tabbar :active="active" @change="onChange" z-index="9" active-color="#04C161" inactive-color="#b2b2b2">
      <van-tabbar-item :name="0">
        <img slot="icon" :src="homeUnselectIcon" style="width: 18px; height: 18px;" />
        <img slot="icon-active" :src="homeIcon" style="width: 18px; height: 18px;" />
        首页
      </van-tabbar-item>
      <van-tabbar-item :name="1">
        <img slot="icon" :src="functionUnselectIcon" style="width: 18px; height: 18px;" />
        <img slot="icon-active" :src="functionIcon" style="width: 18px; height: 18px;" />
        宿舍
      </van-tabbar-item>
      <van-tabbar-item :name="2" :dot="!isAuthGetter">
        <img slot="icon" :src="mineUnselectIcon" style="width: 18px; height: 18px;" />
        <img slot="icon-active" :src="mineIcon" style="width: 18px; height: 18px;" />
        我的
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
import home from '@com/main/home.vue'
import dormitory from '@com/main/dormitory.vue'
import mine from '@com/main/mine.vue'
import { wxSetNavigationBarTitle } from '@/wx/index'
export default {
  components: {
    home,
    dormitory,
    mine
  },
  data() {
    return {
      homeIcon: require('@icon/icon_home.png'),
      homeUnselectIcon: require('@icon/icon_home_unselect.png'),
      functionIcon: require('@icon/icon_function.png'),
      functionUnselectIcon: require('@icon/icon_function_unselect.png'),
      mineIcon: require('@icon/icon_mine.png'),
      mineUnselectIcon: require('@icon/icon_mine_unselect.png'),
      active: 0,
    }
  },
  computed: {
    //监听active 动态设置导航标题
    watchActive() {
      if (this.active == 0) {
        wxSetNavigationBarTitle('首页')
      } else if (this.active == 1) {
        wxSetNavigationBarTitle('宿舍')
      } else if (this.active == 2) {
        wxSetNavigationBarTitle('我的')
      }
      return this.active
    }
  },
  onShow() {
    console.log('home111')
  },
  methods: {
    // 点击底部栏
    onChange(e) {
      this.active = e.mp.detail
    }
  }
}

</script>

<style lang="scss" scope>
@import "./index.scss";
</style>
