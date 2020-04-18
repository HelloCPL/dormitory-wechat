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
      <div class="right" v-if="dutyPeople">
        <span class="we-tips we-margin-top-5">值日：</span>
        <span class="we-font-16 we-color-red we-line-1 name">{{dutyPeople}}</span>
      </div>
    </div>

    <!-- 宿舍值日表 -->
    <div class="we-margin-top-10">
      <schedule-dormitory :dutyInfo="dutyInfo" />
    </div>

    <!-- 自定义宿舍事件显示 -->
    <div class="we-margin-top-10" v-if="dataList.length">
      <title-divider title="宿舍日程" />
      <div class="we-padding-left-15 we-padding-right-15 we-padding-bottom-10 we-bg-white">
        <template v-for="(item, index) in dataList">
          <div class="schedule-event" :key="index">
            <div class="we-flex-jc">
              <p class="we-flex-1">
                <van-tag type="primary" plain class="we-margin-right-10">{{item.label}}</van-tag>
                <span>{{item.title}}</span>
              </p>
              <img :src="deleteIcon" v-if="item.isDelete == 1" alt="" class="delete-icon" @click="onDelete(item.id, index)" />
            </div>
            <p class="we-margin-top-5 we-color-tips">{{item.content}}</p>
            <div class="we-margin-top-5 time">
              <span class="we-color-tips">发布人：{{item.releaseUserName}}</span>
            </div>
            <div class="we-margin-top-5 time">
              <span class="we-color-tips">提醒时间：{{item.remindTimeStr}}</span>
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
      deleteIcon: require('@icon/icon_delete.png'),
      addIcon: require('@icon/icon_add_white.png'),
      weeks: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
      events: {},
      today: '', // 今天日期
      currentDate: '', // 当前选择日期
      currentDateInfo: {}, // 当前日期信息
      dataList: [], // 自定义事件
      dutyInfo: {}, // 值班信息
      dutyPeople: '', // 今日值班人员
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
  onLoad() {
    Object.assign(this.$data, this.$options.data())
    this.getDutyInfo()
  },
  onShow() {
    this.getDutyInfo()
    this.getMonthDataList(this.today)
    this.getDayDataInfo(this.today)
  },
  mounted() {
    this.initToday()
  },
  methods: {
    // 获取宿舍值班信息
    async getDutyInfo() {
      let res = await this.$http.post('/dormitory/duty/check')
      if (res.errorCode === 0) {
        if (res.data) {
          this.dutyInfo = res.data
          let arr = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday']
          let day = new Date().getDay()
          this.dutyPeople = res.data[arr[day]]
        }
      }
    },

    // 获取本月有数据的天数
    async getMonthDataList(month) {
      if (!month) return
      this.events = {}
      let res = await this.$http.post('/dormitory/schedule/month/list', { month })
      if (res.errorCode === 0) {
        let events = {}
        if (this.$tools.isArray(res.data)) {
          res.data.forEach(item => {
            item = this.$dayjs(item).format('YYYY-M-D')
            events[item] = 'a'
          })
        }
        this.events = events
        this.$forceUpdate()
      }
    },

    // 获取某天自定义事件
    async getDayDataInfo(day) {
      if (!day) return
      this.dataList = []
      let res = await this.$http.post('/dormitory/schedule/check', { day })
      if (res.errorCode === 0) {
        this.dataList = res.data || []
      }
    },

    async onDelete(id, index) {
      let res = await this.$http.post('/dormitory/schedule/delete', { id })
      if (res.errorCode === 0) {
        this.dataList.splice(index, 1)
        this.getMonthDataList(this.today)
      }
    },

    // 初始化日期
    initToday() {
      let today = this.$dayjs().format('YYYY-MM-DD')
      this.today = today
      this.currentDate = today
      this.getMonthDataList(today)
      this.getDayDataInfo(today)
      this.dateInfo(today)
    },

    // 返回今天
    setToday() {
      this.currentDate = this.today
      this.getDayDataInfo(currentDate)
      this.dateInfo(this.currentDate)
      // 根据日期请求谁值日
      this.$refs.calendar.setToday()
    },

    // 跳转到宿舍事件添加页面
    toScheduleDormitoryAdd() {
      this.$navigate.push('/pages/dormitory/scheduleDormitoryAdd/main')
    },

    // 获取某天 农历星程信息 设置值班人员信息
    dateInfo(dateValue) {
      dateValue = this.$dayjs(dateValue).format('YYYY-M-D')
      dateValue = dateValue.split('-')
      const info = this.$refs.calendar.dateInfo(dateValue[0], dateValue[1], dateValue[2])
      if (this.$tools.isObject(info))
        this.currentDateInfo = info
      let arr = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday']
      let day = this.$dayjs(dateValue).day()
      this.dutyPeople = this.dutyInfo[arr[day]]
      this.$forceUpdate()
    },

    // 选择上个月
    onPrev(year, month, weekIndex) {
      this.getMonthDataList(year + '-' + month)
    },

    // 选择了下个月
    onNext(year, month, weekIndex) {
      this.getMonthDataList(year + '-' + month)
    },

    // 选择了月份
    onSelectMonth(month, year) {
      this.getMonthDataList(year + '-' + month)
    },

    // 选择了日期
    onSelect(val1, val2) {
      let currentDate = val1.join('-')
      currentDate = this.$dayjs(currentDate).format('YYYY-MM-DD')
      this.currentDate = currentDate
      this.getDayDataInfo(currentDate)
      this.dateInfo(currentDate)
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