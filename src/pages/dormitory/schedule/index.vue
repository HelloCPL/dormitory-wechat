<template>
  <div class="schedule-container">
    <!-- 日历 -->
    <div class="we-bg-white schedule-calendar">
      <calendar ref="calendar" :weeks="weeks" :events="events" monFirst clean lunar @prev="onPrev" @next="onNext"
        @selectMonth="onSelectMonth" @select="onSelect" />
    </div>

    <!-- 显示今天 -->
    <div class="we-bg-white we-padding schedule-wrapper">
      <!-- 日期信息 -->
      <div class="left">
        <p class="we-font-16 we-color-black we-margin-bottom-10">
          <span class="we-padding-right-5" v-if="comDate">{{comDate}}</span>
          <span class="we-padding-right-5" v-if="currentDate">{{currentDate}}</span>
          <span v-if="currentDateInfo.ncWeek">{{currentDateInfo.ncWeek}}</span>
        </p>
        <p class="we-color-tips we-margin-bottom-5" v-if="currentDateInfo.IMonthCn && currentDateInfo.IDayCn">农历{{currentDateInfo.IMonthCn}}{{currentDateInfo.IDayCn}}</p>
        <p class="we-color-tips" v-if="currentDateInfo.gzYear && currentDateInfo.gzMonth && currentDateInfo.gzDay && currentDateInfo.Animal">{{currentDateInfo.gzYear}}{{currentDateInfo.Animal}}年
          {{currentDateInfo.gzMonth}}月 {{currentDateInfo.gzDay}}日</p>
      </div>
      <div class="right">
        <span class="we-tips we-margin-top-5">值日：</span>
        <span class="we-font-16 we-color-black we-line-1 name">梁婉鸣</span>
      </div>
    </div>

    <!-- 宿舍值日表 -->
    <div class="we-margin-top-10">
      <schedule-dormitory />
    </div>

    <!-- 自定义宿舍事件显示 -->
    <div class="we-margin-top-10" v-if="dataList.length">
      <title-divider title="宿舍日程" />
      <div class="we-padding-left-15 we-padding-right-15 we-padding-bottom-10 we-bg-white">
        <template v-for="(item, index) in dataList">
          <div class="schedule-event" :key="index">
            <p>{{item.title}}</p>
            <p class="we-margin-top-5 we-color-tips">{{item.content}}</p>
            <div class="we-margin-top-5 time">
              <div class="we-margin-right-10" v-if="item.tag">
                <van-tag type="primary" plain>{{item.tag}}</van-tag>
              </div>
              <span class="we-color-tips">{{item.startDate}}</span>
            </div>
          </div>
        </template>
      </div>
    </div>

    <!-- 今日和添加自定义事件按钮 -->
    <div class="we-color-white btn-today" @click="setToday" v-if="todayBtn">今</div>
    <div class="btn-add" @click="toScheduleDormitoryAdd">
      <img :src="addIcon" alt="">
    </div>

  </div>
</template>

<script>
import Calendar from 'mpvue-calendar'
import 'mpvue-calendar/src/style.css'
import scheduleDormitory from '@com/dormitory/scheduleDormitory'
import titleDivider from '@com/common/titleDivider'
export default {
  components: {
    Calendar,
    scheduleDormitory,
    titleDivider
  },
  data() {
    return {
      addIcon: require('@icon/icon_add_white.png'),
      weeks: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
      events: {
        '2020-2-11': '嗨嗨',
        '2020-2-13': '嗨嗨',
      },
      today: '', // 今天日期
      currentDate: '', // 当前选择日期
      currentDateInfo: {}, // 当前日期信息
      dataList: [
        { id: 1, dorId: 1, title: '事件标题', content: '我是内容', startDate: '2020-02-21 10:12' },
        { id: 1, dorId: 1, title: '事件标题水电费得到的等幅度发', content: '我是内容啥快递费阿里附近奥拉佛手动冯老师地方', startDate: '2020-02-21 10:12', tag: '活动' },
        { id: 1, dorId: 1, title: '事件标题水电费得到的等等等等多多多多多多多多多多多多多大幅度发', content: '我是内容啥快递费阿里附近奥拉夫乐山大佛实例地方是否的发送路径的福建省地方睡大觉方式拉德芳斯地方说了对方 手动乐山大佛手动冯老师地方', startDate: '2020-02-21 10:12', tag: '聚会' },
      ]
    }
  },
  computed: {
    comDate() { // 计算是否今天 明天 后天 或昨天
      if (!this.today || !this.currentDate)
        return ''
      let today = parseInt(this.$dayjs(this.today).format('YYYYMMDD'))
      let currentDate = parseInt(this.$dayjs(this.currentDate).format('YYYYMMDD'))
      switch (currentDate - today) {
        case 0:
          return '今天'
        case 1:
          return '明天'
        case 2:
          return '后天'
        case -1:
          return '昨天'
        default:
          return ''
      }
    },

    todayBtn() { // 显示今天显示按钮
      if (!this.currentDate)
        return false
      let today = this.$dayjs(this.today).format('M')
      let currentDate = this.$dayjs(this.currentDate).format('M')
      if (today !== currentDate)
        return true
      return false
    }
  },
  mounted() {
    this.initToday()
  },
  methods: {
    // 初始化日期
    initToday() {
      let today = this.$dayjs().format('YYYY-MM-DD')
      this.today = today
      this.currentDate = today
      this.dateInfo(today)
    },

    // 返回今天
    setToday() {
      this.currentDate = this.today
      this.dateInfo(this.currentDate)
      // 根据日期请求谁值日
      this.$refs.calendar.setToday()
    },

    // 跳转到宿舍事件添加页面
    toScheduleDormitoryAdd() {
      this.$navigate.push('/pages/dormitory/scheduleDormitoryAdd/main')
    },

    // 获取某天信息 2020 1 5
    dateInfo(dateValue) {
      dateValue = this.$dayjs(dateValue).format('YYYY-M-D')
      dateValue = dateValue.split('-')
      const info = this.$refs.calendar.dateInfo(dateValue[0], dateValue[1], dateValue[2])
      if (this.$tools.isObject(info))
        this.currentDateInfo = info
      console.log(info)
    },

    // 选择上个月
    onPrev(year, month, weekIndex) {
      console.log('选择上个月', year, month, weekIndex)
    },

    // 选择了下个月
    onNext(year, month, weekIndex) {
      console.log('选择了下个月', year, month, weekIndex)
    },

    // 选择了月份
    onSelectMonth(month, year) {
      console.log('选择了月份', month, year)
    },

    // 选择了日期
    onSelect(val1, val2) {
      let currentDate = val1.join('-')
      currentDate = this.$dayjs(currentDate).format('YYYY-MM-DD')
      this.currentDate = currentDate
      this.dateInfo(currentDate)
      // 根据日期请求谁值日
    },


  }
}
</script>

<style lang="scss">
.schedule-container {
  .calendar-info {
    width: auto !important;
  }

  .calendar-prev,
  .calendar-next {
    height: 100% !important;
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;
    width: 80px;
  }

  .mpvue-calendar ._table {
    margin-top: 10px !important;
  }

  .mc-dot {
    transform: translate(-50%) !important;
    bottom: 4px !important;
  }

  .mc-today {
    color: #19be6b !important;
  }

  .mpvue-calendar ._td.selected ._span,
  .mpvue-calendar ._td.selected ._span.mc-date-red {
    background: #fff;
    color: #000;
    border: 1px solid #ed3f14 !important;
    border-radius: 4px;
  }

  .selected .mc-text {
    color: #ed3f14 !important;
  }

  .mc-body .mc-today-element .calendar-date {
    background-color: rgba(25, 47, 89, 0.1) !important;
    border-radius: 4px !important;
  }
}
</style>


<style lang="scss" scope>
@import "./index.scss";
</style>