<template>
  <div class="we-bg-white assess-container">
    <!-- 图表 -->
    <div class="we-padding">
      <p class="we-font-center we-font-12 we-font-bold assess-charts-title">{{dataInfo.address}}宿舍近五个月评价等级图表</p>
      <div class="we-margin-top-5 assess-charts-box">
        <canvas canvas-id="lineCanvas" disable-scroll="true"></canvas>
      </div>
    </div>
    <div class="we-padding we-margin-top-10">
      <p class="we-title we-font-center we-margin-bottom-10">西区666宿舍评优</p>
      <div class="we-padding-top-10 we-padding-bottom-10 we-border-bottom-1 we-color-tips">
        <p class="we-padding-bottom-5">时间：2020-01</p>
        <div class="we-padding-bottom-2 assess-scope">
          <span>等级：</span>
          <van-rate :value="3" :count="3" disabled disabled-color="#ffd21e"  />
          <span class="we-tips">（合格）</span>
        </div>
        <p class="we-padding-bottom-2 assess-content">评价内容：好好好</p>
      </div>

      <div class="we-padding-top-10 we-padding-bottom-10 we-border-bottom-1 we-color-tips">
        <p class="we-padding-bottom-5">时间：2020-01</p>
        <div class="we-padding-bottom-2 assess-scope">
          <span>等级：</span>
          <van-rate :value="3" :count="3" disabled disabled-color="#ffd21e"  />
          <span class="we-tips">（合格）</span>
        </div>
        <p class="we-padding-bottom-2 assess-content">评价内容：好好好</p>
      </div>

      <div class="we-padding-top-10 we-padding-bottom-10 we-border-bottom-1 we-color-tips">
        <p class="we-padding-bottom-5">时间：2020-01</p>
        <div class="we-padding-bottom-2 assess-scope">
          <span>等级：</span>
          <van-rate :value="4" :count="4" disabled disabled-color="#ffd21e"  />
          <span class="we-tips">（良好）</span>
        </div>
        <p class="we-padding-bottom-2 assess-content">评价内容：好好好好好好好好好好好好好好好好好好好好好好好好好好好好好好好好好好好好好好好</p>
      </div>
    </div>
  </div>
</template>

<script>
import wxCharts from '@/lib/wxcharts-min'
export default {
  data() {
    return {
      dataInfo: { // scope 1-5级
        id: 1,
        dorId: 1, 
        address: '西区666',
        data: [
          {scope: 3, content: '嗨嗨嗨', month: '2020-01'},
          {scope: 3, content: '嗨嗨嗨', month: '2020-01'},
          {scope: 3, content: '嗨嗨嗨', month: '2020-01'},
          {scope: 3, content: '嗨嗨嗨', month: '2020-01'},
          {scope: 3, content: '嗨嗨嗨', month: '2020-01'},
          {scope: 3, content: '嗨嗨嗨', month: '2020-01'},
        ]
      }
    }
  },
  mounted() {
    let obj = {
      label: ['2019-10', '2019-11', '2019-12', '2020-1', '2020-2'], // 横坐标类别
      data: [3, 4, 2, 3, 5] // 数值 1-5
    }
    this.setCanvas(obj)
  },
  methods: {
    // 设置图表
    setCanvas(obj) {
      new wxCharts({
        canvasId: 'lineCanvas',
        type: 'line',
        width: 320,
        height: 180,
        animation: false,
        categories: obj.label,
        series: [{
          data: obj.data,
          format: function (val, name) {
            let arr = ['', '非常差', '差', '合格', '良好', '优秀']
            return arr[val]
          }
        }],
        xAirs: {
          disableGrid: true
        },
        yAxis: {
          title: '评价等级',
          min: 0,
          max: 5,
          format: function (val) {
            let arr = ['', '非常差', '差', '合格', '良好', '优秀']
            return arr[val]
          },
        }
      })
    }
  }
}
</script>

<style lang="scss" scope>
@import "./index.scss";
</style>