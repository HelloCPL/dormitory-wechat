<template>
  <div class="schedule-dormitory-add-container">
    <!-- 标题 内容 -->
    <van-cell-group>
      <van-field label="标题" input-align="right" :value="title" placeholder="请输入日程标题" @input="onInputTitle" />
      <van-field :value="content" label="内容" input-align="right" type="textarea" placeholder="请输入日程内容" autosize @input="onInputContent" />
    </van-cell-group>
    <!-- 选择时间 -->
    <van-cell title="提醒时间" :value="remindTime" is-link @click="showFlag = true" />
    <!-- 选择标签 -->
    <div v-if="tagList.length">
      <van-cell title="选择标签" :border="false" />
      <div class="we-bg-white tag-wrapper tag-padding">
        <template v-for="(item, index) in tagList">
          <div class="we-margin-right-10 we-margin-bottom-10" :key="index" @click="onSelectTag(index)">
            <van-tag type="primary" plain v-if="index === tagActived">{{item}}</van-tag>
            <van-tag plain v-else>{{item}}</van-tag>
          </div>
        </template>
      </div>
      <!-- 自定义标签 -->
      <div class="we-bg-white we-padding-bottom-10 tag-padding">
        <input type="text" placeholder="自定义标签" maxlength="5" class="tag-input" @blur="addTag" />
      </div>
    </div>
    <!-- 发布按钮 -->
    <div class="we-margin-btn we-padding">
      <van-button type="info" size="large" @click="onSubmit">提交</van-button>
    </div>

    <!-- 选择时间 -->
    <van-popup :show="showFlag" close-on-click-overlay position="bottom" @close="closeOverlay">
      <van-datetime-picker type="datetime" :value="today" @cancel="showFlag = false" @confirm="onConfirm" v-if="today" />
    </van-popup>
  </div>
</template>

<script>
export default {
  data() {
    return {
      title: '',
      content: '',
      remindTime: '',
      showFlag: false,
      today: new Date().getTime(),
      tagList: ['日程', '活动', '聚会', '纪念日', '生日', '倒数日', '考试'],
      tagActived: 0,
      tagInput: true
    }
  },
  onLoad() {
    Object.assign(this.$data, this.$options.data())
  },

  methods: {
    // 设置标题
    onInputTitle(e) {
      e = e.mp.detail
      this.title = e
    },

    // 设置内容
    onInputContent(e) {
      e = e.mp.detail
      this.content = e
    },

    // 选择时间
    onConfirm(e) {
      e = e.mp.detail
      this.remindTime = this.$dayjs(e).format('YYYY-MM-DD hh:mm')
      this.showFlag = false
    },

    // 关闭遮罩层
    closeOverlay() {
      this.showFlag = false
    },

    // 选择标签
    onSelectTag(index) {
      this.tagActived = index
    },

    // 添加标签
    addTag(e) {
      e = e.mp.detail.value
      if (e.length > 0 && e.length <= 4 && this.tagList.indexOf(e) == -1) {
        this.tagList.unshift(e)
        this.tagActived = 0
      }
    },

    // 提交
    async onSubmit() {
      let msg = ''
      if (!this.title) {
        msg = '请输入日程标题'
      } else if (!this.content) {
        msg = '请输入日程内容'
      } else if (!this.remindTime) {
        msg = '请选择提醒时间'
      }
      if (msg) {
        this.$toast(msg)
        return
      }
      let params = {
        title: this.title,
        content: this.content,
        remindTime: this.$dayjs(this.remindTime).valueOf(),
        label: this.tagList[this.tagActived]
      }
      let res = await this.$http.post('/dormitory/schedule/add', params)
      if (res.errorCode === 0) {
        this.$toast('提交成功')
        setTimeout(() => {
          this.$navigate.back()
        }, 500)
      }
    }

  }
}
</script>

<style lang="scss" scope>
@import "./index.scss";
</style>