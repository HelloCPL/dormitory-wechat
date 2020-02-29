<template>
  <div class="schedule-add-container">
    <!-- 添加人员输入框 -->
    <div class="we-padding we-bg-white">
      <div class="we-font-18 we-color-black we-padding-bottom-15 title">值日人员 ({{weeks[currentDay]}})</div>
      <template v-for="(item, index) in peopleList">
        <div class="box" :key="index">
          <div class="left">
            <img :src="peopleIcon" alt="" class="we-margin-right-5">
            <span>值班人员{{index + 1}}</span>
          </div>
          <div class="we-padding-2 right">
            <van-field :value="item" maxlength="12" placeholder="请输入姓名" @input="onInput($event, index)" />
          </div>
          <div class="we-padding-5 left" @click="deletePeopleList(index)" v-if="peopleList.length > 1">
            <img :src="closeIcon" alt="">
          </div>
        </div>
      </template>
    </div>
    <!-- 新增人员 -->
    <div class="we-padding footer">
      <img :src="addIcon" alt="" class="we-margin-right-5" @click="addPeopleList">
      <span class="we-color-blue" @click="addPeopleList">新增人员</span>
    </div>
    <!-- 发布按钮 -->
    <div class="we-margin-btn we-padding">
      <van-button type="info" size="large" @click="onSubmit">提交</van-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      peopleIcon: require('@icon/icon_people.png'),
      addIcon: require('@icon/icon_add_blue.png'),
      closeIcon: require('@icon/icon_close1.png'),
      weeks: { '0': '星期日', '1': '星期一', '2': '星期二', '3': '星期三', '4': '星期四', '5': '星期五', '6': '星期六' },
      peopleList: [''],
      currentDay: '0',
      clearFlag: true
    }
  },
  onLoad(query) {
    Object.assign(this.$data, this.$options.data())
    let day = query.day
    let value = query.value
    if (day)
      this.currentDay = day
    if (value) {
      value = value.split('、')
      let arr = []
      for (let i = 0, len = value.length; i < len; i++) {
        if (value[i])
          arr.push(value[i])
      }
      if (arr.length)
        this.peopleList = arr
      this.clearFlag = false
    }
  },
  // onHide() {
  // },
  methods: {
    onInput(e, index) {
      index = parseInt(index)
      e = e.mp.detail
      this.peopleList[index] = e
    },

    // 删除值班人员
    deletePeopleList(index) {
      this.peopleList.splice(index, 1)
    },

    // 新增人员
    addPeopleList() {
      this.peopleList.push('')
    },

    // 发布
    onSubmit() {
      console.log('发布了', this.peopleList)
    }
  }
}
</script>

<style lang="scss" scope>
@import "./index.scss";
</style>