<template>
  <div class="we-bg-white we-padding schedule-container">
    <!-- 容器 -->
    <div class="table">
      <div class="tr">
        <div class="we-font-16 we-color-black td title">宿舍值日表</div>
      </div>
      <div class="tr">
        <div class="td week">周一</div>
        <div class="td name" :class="{'td-bg': currentDay == '1'}" @click="toAddSchedule('1', dataList['1'])">
          <span v-if="dataList['1']">{{dataList['1']}}</span>
          <img :src="addIcon" v-else />
        </div>
        <div class="td week">周五</div>
        <div class="td name" :class="{'td-bg': currentDay == '5'}" @click="toAddSchedule('5', dataList['5'])">
          <span v-if="dataList['5']">{{dataList['5']}}</span>
          <img :src="addIcon" v-else />
        </div>
      </div>
      <div class="tr bg-tr">
        <div class="td week">周二</div>
        <div class="td name" :class="{'td-bg': currentDay == '2'}" @click="toAddSchedule('2', dataList['2'])">
          <span v-if="dataList['2']">{{dataList['2']}}</span>
          <img :src="addIcon" v-else />
        </div>
        <div class="td week">周六</div>
        <div class="td name" :class="{'td-bg': currentDay == '6'}" @click="toAddSchedule('6', dataList['6'])">
          <span v-if="dataList['6']">{{dataList['6']}}</span>
          <img :src="addIcon" v-else />
        </div>
      </div>
      <div class="tr">
        <div class="td week">周三</div>
        <div class="td name" :class="{'td-bg': currentDay == '3'}" @click="toAddSchedule('3', dataList['3'])">
          <span v-if="dataList['3']">{{dataList['3']}}</span>
          <img :src="addIcon" v-else />
        </div>
        <div class="td week">周日</div>
        <div class="td name" :class="{'td-bg': currentDay == '0'}" @click="toAddSchedule('0', dataList['0'])">
          <span v-if="dataList['0']">{{dataList['0']}}</span>
          <img :src="addIcon" v-else />
        </div>
      </div>
      <div class="tr bg-tr">
        <div class="td week">周四</div>
        <div class="td name" :class="{'td-bg': currentDay == '1'}" @click="toAddSchedule('4', dataList['4'])">
          <span v-if="dataList['4']">{{dataList['4']}}</span>
          <img :src="addIcon" v-else />
        </div>
        <div class="td other"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      addIcon: require('@icon/icon_add.png'),
      dataList: {
        // dorId: 1, // 宿舍id
        '0': '', // 周日
        '1': '梁婉鸣1、梁婉鸣2',
        '2': '',
        '3': '梁婉鸣1、梁婉鸣2',
        '4': '',
        '5': '梁婉鸣1',
        '6': '',
      },
      currentDay: 1, // 周几
    }
  },
  created() {
    let currentDay = this.$dayjs().format('d')
    this.currentDay = currentDay
  },
  methods: {
    // 去添加人员
    toAddSchedule(day, value) {
      console.log(day, value)
       this.$navigate.push(`/pages/dormitory/scheduleAdd/main?day=${day}&value=${value}`)
    }
  }
}
</script>

<style lang="scss" scoped>
@import "./scheduleDormitory.scss";
</style>


