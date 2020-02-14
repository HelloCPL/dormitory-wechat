<template>
  <div class="we-bg-white members-container" v-if="membersList.length">
    <!-- 宿舍成员 -->
    <van-cell title="我的宿舍成员" is-link>
      <!-- 头像 -->
      <div class="members-wrapper">
        <template v-for="(item, index) in membersList">
          <div :key="index" class="we-margin-right-2 members-img" v-if="index < maxValue">
            <van-image :src="item.avartarImg || userImg" fit="fill" round width="26" height="26" />
          </div>
        </template>
        <div class="we-tips members-more" v-if="membersList.length > 5">+{{membersList.length - maxValue}}</div>
      </div>
    </van-cell>
    <!-- 宿舍值日表 -->
    <van-cell title="宿舍值日表" is-link>
      <div class="members-schedule">
        <span class="we-tips members-time">
          <img :src="timeImg" class="we-margin-top-2" />
          <span>今天值日</span>
        </span>
        <div class="we-padding-left-2 we-line-1 members-name">梁婉鸣</div>
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
      userImg: require('@icon/user.png'),
      timeImg: require('@icon/icon_time_blue.png'),
      membersList: [
        { avatarUrl: '', username: '梁婉鸣' },
        { avatarUrl: '', username: '梁婉鸣' },
        { avatarUrl: '', username: '梁婉鸣' },
        { avatarUrl: '', username: '梁婉鸣' },
        { avatarUrl: '', username: '梁婉鸣' },
        { avatarUrl: '', username: '梁婉鸣' },
        // {avatarUrl: '', username: '梁婉鸣' },
        // {avatarUrl: '', username: '梁婉鸣' },
      ],
    }
  },
  computed: {
    maxValue() {
      if (this.membersList.length > this.max)
        return this.max - 1
      return this.max
    }
  },
  methods: {

  }
}
</script>

<style lang="scss" scoped>
@import "./members.scss";
</style>


