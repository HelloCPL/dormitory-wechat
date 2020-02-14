<template>
  <div class="weather-container" v-if="isWeather">
    <div class="we-text we-padding weather-wrapper" :style="{'color': color, 'background-color': bgColor}">
      <span>{{weatherData.city.data}}
        <span class="we-font-16">{{weatherData.temperature.data}}°</span>
      </span>
      <span>{{weatherData.weather.data}} | 湿度 {{weatherData.humidity.data}}</span>
    </div>
  </div>
</template>
<script>
import amapFile from '@/lib/amap-wx.js'
export default {
  props: {
    bgColor: {
      type: String,
      default: 'rgba(255, 255, 255, 0)'
    },
    color: {
      type: String,
      default: 'white'
    },
    updateTime: { //天气每个多长时间更新，单位毫秒
      type: Number,
      default: 1000 * 60 * 30
    }
  },
  data() {
    return {
      isWeather: false,
      weatherData: {},
      timeId: null,
    }
  },
  created() {
    this.initWeather()
    this.updatedWeather()
  },
  methods: {
    // 初始化天气数据
    initWeather() {
      let self = this
      let keyName = process.env.gaode.keyName
      let keyValue = process.env.gaode.keyValue
      let myAmapFun = new amapFile.AMapWX({ key: keyValue })
      myAmapFun.getWeather({
        success: function (data) {
          self.isWeather = true
          //成功回调
          console.log(data)
          if (data && !self.$tools.isEmptyObject(data)) {
            self.weatherData = data
          }
        },
        fail: function (info) {
          self.isWeather = false
        }
      })
    },

    // 定时更新天气数据
    updatedWeather() {
      let self = this
      if (self.timeId)
        clearTimeout(self.timeId)
      self.timeId = setTimeout(() => {
        self.initWeather()
        self.updatedWeather()
      }, self.updateTime)
    },
  },

  // 组件销毁时清除定时器
  beforeDestroy() {
    if (this.timeId)
      clearTimeout(this.timeId)
  }
}
</script>

<style lang="scss" scope>
@import "./weather.scss";
</style>