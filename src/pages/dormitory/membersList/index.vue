<template>
  <div class="we-bg-white members-list-container">
    <template v-for="(item, index) in membersList">
      <div class="we-padding-left-15 we-padding-right-15 members-wrapper" :index="index" @click="toMembersDetail(item.id)">
        <div class="we-padding-right-10">
          <van-image :src="item.headImg || item.avatarUrl || userIcon" width="30" height="30" :radius="4" />
        </div>
        <p class="right we-line-1"> {{item.name}}</p>
      </div>
    </template>

  </div>
</template>

<script>
export default {
  data() {
    return {
      userIcon: require('@icon/icon_user_login.png'),
      membersList: [], // 宿舍成员信息
    }
  },
  onLoad() {
    Object.assign(this.$data, this.$options.data())
    this.getMemberList()
  },
  methods: {
    // 获取宿舍成员信息
    async getMemberList() {
      let res = await this.$http.post('/dormitory/member/list')
      if (res.errorCode === 0) {
        if (res.data) {
          if (res.data.members && res.data.members.length)
            this.membersList = res.data.members
        }
      }
    },

    // 跳转到宿舍成员详情
    toMembersDetail(id) {
      this.$navigate.push('/pages/dormitory/membersDetail/main?id=' + id)
    }
  }
}
</script>

<style lang="scss" scope>
@import "./index.scss";
</style>