<template>
  <div class="we-bg-white members-container" v-if="membersList.length">
    <!-- 宿舍成员 -->
    <van-cell :title="dormitoryName || '我的宿舍'" is-link @click="toMembersList">
      <!-- 头像 -->
      <div class="members-wrapper">
        <template v-for="(item, index) in membersList">
          <div :key="index" class="we-margin-right-2 members-img" v-if="index < maxValue">
            <van-image :src="item.headImg.fullName" round width="26" height="26" v-if="item.headImg && item.headImg.fullName" />
            <van-image :src="item.avatarUrl" round width="26" height="26" v-else-if="item.avatarUrl" />
            <van-image :src="userImg" round width="26" height="26" v-else />
          </div>
        </template>
        <div class="we-tips members-more" v-if="membersList.length > 5">+{{membersList.length - maxValue}}</div>
      </div>
    </van-cell>
    <!-- 宿舍值日表 -->
    <van-cell title="宿舍值日表" is-link @click="toSchedule">
      <div class="members-schedule" v-if="dutyPeople">
        <span class="we-tips members-time">
          <img :src="timeImg" class="we-margin-top-2" />
          <span>今天值日</span>
        </span>
        <div class="we-padding-left-2 we-color-red we-line-1 members-name">{{dutyPeople}}</div>
      </div>
    </van-cell>
  </div>
</template>

<script>
export default {
  props: {
    max: { //最多显示几个人
      type: Number,
      default: 5
    }
  },
  data() {
    return {
      userImg: require('@icon/icon_user_login.png'),
      timeImg: require('@icon/icon_time_blue.png'),
      dormitoryName: '', // 宿舍名称
      membersList: [], // 宿舍成员信息
      dutyPeople: '', // 值班人员
    }
  },
  computed: {
    maxValue() {
      if (this.membersList.length > this.max)
        return this.max - 1
      return this.max
    }
  },
  onLoad() {
    this.getMemberList()
    this.getDutyInfo()
  },
  methods: {
    // 跳转到宿舍成员列表
    toMembersList() {
      this.$navigate.push('/pages/dormitory/membersList/main')
    },

    // 跳转到值日页面
    toSchedule() {
      this.$navigate.push('/pages/dormitory/schedule/main')

    },

    // 获取宿舍成员信息
    async getMemberList() {
      let res = await this.$http.post('/dormitory/member/list')
      if (res.errorCode === 0) {
        if (res.data) {
          if (res.data.dorBuildingName || res.data.dorRoomName)
            this.dormitoryName = res.data.dorBuildingName + res.data.dorRoomName
          if (res.data.members && res.data.members.length)
            this.membersList = res.data.members
        }
      }
    },

    // 获取宿舍值班信息
    async getDutyInfo() {
      let res = await this.$http.post('/dormitory/duty/check')
      if (res.errorCode === 0) {
        if (res.data) {
          let arr = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday']
          let day = new Date().getDay()
          this.dutyPeople = res.data[arr[day]]
        }
      }
    }
  },
  watch: {
    isAuthGetter(val, oldVal) {
      if (val === oldVal) return
      setTimeout(() => {
        this.getMemberList()
        this.getDutyInfo()
      }, 1000)
    }
  }
}
</script>

<style lang="scss" scoped>
@import "./members.scss";
</style>


