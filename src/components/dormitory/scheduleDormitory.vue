<template>
  <div class="we-bg-white we-padding schedule-container">
    <!-- 容器 -->
    <div class="table">
      <div class="tr">
        <div class="we-font-16 we-color-black td title">宿舍值日表</div>
      </div>
      <div class="tr">
        <div class="td week">周一</div>
        <div class="td name" :class="{'td-bg': currentDay == '1'}" @click="toAddSchedule(1, 'monday', dutyInfo.monday)">
          <span v-if="dutyInfo.monday">{{dutyInfo.monday}}</span>
          <img :src="addIcon" v-else />
        </div>
        <div class="td week">周五</div>
        <div class="td name" :class="{'td-bg': currentDay == '5'}" @click="toAddSchedule(5,'friday', dutyInfo.friday)">
          <span v-if="dutyInfo.friday">{{dutyInfo.friday}}</span>
          <img :src="addIcon" v-else />
        </div>
      </div>
      <div class="tr bg-tr">
        <div class="td week">周二</div>
        <div class="td name" :class="{'td-bg': currentDay == '2'}" @click="toAddSchedule(2, 'tuesday', dutyInfo.tuesday)">
          <span v-if="dutyInfo.tuesday">{{dutyInfo.tuesday}}</span>
          <img :src="addIcon" v-else />
        </div>
        <div class="td week">周六</div>
        <div class="td name" :class="{'td-bg': currentDay == '6'}" @click="toAddSchedule(6, 'saturday', dutyInfo.saturday)">
          <span v-if="dutyInfo.saturday">{{dutyInfo.saturday}}</span>
          <img :src="addIcon" v-else />
        </div>
      </div>
      <div class="tr">
        <div class="td week">周三</div>
        <div class="td name" :class="{'td-bg': currentDay == '3'}" @click="toAddSchedule(3, 'wednesday', dutyInfo.wednesday)">
          <span v-if="dutyInfo.wednesday">{{dutyInfo.wednesday}}</span>
          <img :src="addIcon" v-else />
        </div>
        <div class="td week">周日</div>
        <div class="td name" :class="{'td-bg': currentDay == '0'}" @click="toAddSchedule(0, 'sunday', dutyInfo.sunday)">
          <span v-if="dutyInfo.sunday">{{dutyInfo.sunday}}</span>
          <img :src="addIcon" v-else />
        </div>
      </div>
      <div class="tr bg-tr">
        <div class="td week">周四</div>
        <div class="td name" :class="{'td-bg': currentDay == '1'}" @click="toAddSchedule(4, 'thursday', dutyInfo.thursday)">
          <span v-if="dutyInfo.thursday">{{dutyInfo.thursday}}</span>
          <img :src="addIcon" v-else />
        </div>
        <div class="td other"></div>
      </div>
      <div class="tr tr-bg">
        <div class="we-tips we-padding we-border-top-1 we-border-right-1 td title remark">
          备注：<span v-if="dutyInfo.releaseUserName">修改人：{{dutyInfo.releaseUserName}}，</span><span v-if="dutyInfo.updateTimeStr">修改时间：{{dutyInfo.updateTimeStr}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    dutyInfo: {
      type: Object,
      default: function() {
        return []
      }
    }
  },
  data() {
    return {
      addIcon: require('@icon/icon_add.png'),
      currentDay: 1, // 周几
    }
  },
  onLoad() {
    let currentDay = this.$dayjs().format('d')
    this.currentDay = currentDay
  },
  methods: {
    // 去添加人员
    toAddSchedule(day, dayType, value) {
      console.log(day, dayType, value)
       this.$navigate.push(`/pages/dormitory/scheduleAdd/main?day=${day}&dayType=${dayType}&value=${value}`)
    }
  },
  watch: {
    dutyInfo: {
      handler(val, oldVal) {
        if(val === oldVal) return
        this.dutyInfo = val
      },
      deep: true,
      immediate: true
    }
  }
}
</script>

<style lang="scss" scoped>
@import "./scheduleDormitory.scss";
</style>


