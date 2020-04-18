<template>
  <div class="we-bg-white we-margin-top-10 worker-container" v-if="workerList && workerList.length">
    <title-divider title="宿舍管理员" />
    <!-- 管理员列表 -->
    <template v-for="(item, index) in workerList">
      <van-transition name="fade" :duration="600" :key="index" v-if="index < max || show">
        <div class="we-padding worker-wrapper" @click="toWorkerDetail(item.id)">
          <div class="left">
            <van-image :src="item.headImg || userImg" width="26" height="26" radius="2" lazy-load />
          </div>
          <div class="right">
            <p>{{item.name}}</p>
            <p class="we-color-tips we-margin-top-5 we-line-1">{{item.instroduce}}</p>
          </div>
        </div>
      </van-transition>
    </template>

    <!-- 更多展示 -->
    <div class="we-padding-15 worker-more" @click="toggle" v-if="workerList.length > max">
      <img :src="downImg" v-if="tipsWord == '展开'" />
      <img :src="upImg" v-else />
      <span class="we-color-tips">{{tipsWord}}</span>
    </div>
  </div>
</template>

<script>
import titleDivider from '@com/common/titleDivider'
export default {
  components: {
    titleDivider,
  },
  props: {
    max: {
      type: Number,
      default: 3
    }
  },
  data() {
    return {
      userImg: require('@icon/icon_user_login.png'),
      upImg: require('@icon/icon_up1_blue.png'),
      downImg: require('@icon/icon_down1_blue.png'),
      workerList: [], // 宿管成员信息
      show: false,
      tipsWord: '展开'
    }
  },
  onLoad() {
    this.getMemberList()
  },
  methods: {
    // 获取宿管成员信息
    async getMemberList() {
      let res = await this.$http.post('/dormitory/admin/list')
      if (res.errorCode === 0) {
        if (res.data) {
          this.workerList = res.data
        }
      }
    },

    // 收齐展开切换
    toggle() {
      let flag = this.show
      this.show = !flag
      setTimeout(() => {
        this.tipsWord = flag ? '展开' : '收起'
      }, 150)
    },

    // 跳转到管理员信息页面
    toWorkerDetail(id) {
      this.$navigate.push(`/pages/dormitory/workerDetail/main?id=${id}`)
    },
  },
  watch: {
    isLoginGetter(val, oldVal) {
      if (val === oldVal) return
      setTimeout(() => {
        this.getMemberList()
      }, 500)
    }
  }
}
</script>

<style lang="scss" scoped>
@import "./worker.scss";
</style>


