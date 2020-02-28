<template>
  <div class="we-bg-white members-list-container">
    <template v-for="(item, index) in membersList">
      <div class="members-wrapper" :index="index" @click="toMembersDetail(item.id)">
        <div class="left">
          <van-image :src="item.avatarUrl || userIcon" width="30" height="30" :radius="4" />
        </div>
        <div class="right">
          <p class="we-line-1"> {{item.username}}</p>
        </div>
      </div>
    </template>

  </div>
</template>

<script>
export default {
  data() {
    return {
      userIcon: require('@icon/icon_user_login.png'),
      membersList: [
        { avatarUrl: 'https://wx.qlogo.cn/mmopen/vi_32/EB9hYpjibEZqibuHqcmKvJadoLIahX054hXiaFYocBsZcXzwd7dcC4C6z957aLKhYZGIqv6MDTfhI3FcbArpYrWNg/132', username: '梁婉鸣', id: 1 },
        { avatarUrl: '', username: '梁婉鸣', id: 2 },
        { avatarUrl: '', username: '梁婉鸣', id: 3 },
        { avatarUrl: '', username: '梁婉鸣', id: 4 },
        { avatarUrl: '', username: '梁婉鸣', id: 5 },
        { avatarUrl: '', username: '梁婉鸣', id: 6 },
      ],
    }
  },
  methods: {
    // 跳转到宿舍成员详情
    toMembersDetail(id) {
      this.$navigate.push('/pages/dormitory/membersDetail/main')
    }
  }
}
</script>

<style lang="scss" scope>
@import "./index.scss";
</style>