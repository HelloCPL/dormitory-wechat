<template>
  <div class="we-padding suggest-list-container">
    <template v-for="(item, index) in dataList">
      <div class="we-padding-10 we-margin-bottom-10 we-bg-white we-color-tips we-shadow" :key="index">
        <!-- 处理结果 -->
        <div class="we-margin-bottom-10 apply-success" v-if="item.state == 1">
          <img :src="successIcon" alt="" class="we-margin-right-2">
          <span class="we-color-green we-font-16" v-if="item.type == 1">你的投诉已被处理</span>
          <span class="we-color-green we-font-16" v-else-if="item.type == 2">你的建议已被采纳</span>
        </div>
        <div class="we-margin-bottom-10 apply-success" v-else-if="item.state == 2">
          <img :src="failIcon" alt="" class="we-margin-right-2">
          <span class="we-color-red we-font-16" v-if="item.type == 1">你的投诉未被采纳</span>
          <span class="we-color-red we-font-16" v-else-if="item.type == 2">你的建议未被采纳</span>
        </div>
        <!-- 投诉类型 -->
        <div class="we-margin-bottom-10 suggest-box-side">
          <span class="we-title title" v-if="item.type == 1">类型：{{item.type == 1 ? '投诉' : '建议'}}</span>
          <span class="we-color-green right" v-if="item.state == 0">处理中</span>
        </div>
        <!-- 详细信息 -->
        <div class="we-margin-bottom-2 suggest-box-side" v-if="item.content">
          <span class="left">{{item.type == 1 ? '投诉' : '建议'}}内容</span>
          <span class="right">{{item.content}}</span>
        </div>
        <div class="we-margin-bottom-2 suggest-box-side" v-if="item.createDate">
          <span class="left">{{item.type == 1 ? '投诉' : '建议'}}时间</span>
          <span class="right">{{item.createDate}}</span>
        </div>
        <div>
          <div class="we-margin-bottom-2 suggest-box-side" v-if="item.replyWorker">
            <span class="left">处理人</span>
            <span class="right">{{item.replyWorker}}</span>
          </div>
          <div class="we-margin-bottom-2 suggest-box-side" v-if="item.replyDate">
            <span class="left">处理时间</span>
            <span class="right">{{item.replyDate}}</span>
          </div>
          <div class="we-margin-bottom-2 suggest-box-side" v-if="item.replyContent">
            <span class="left">回复内容</span>
            <span class="right">{{item.replyContent}}</span>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
export default {
  props: {
    dataList: {
      type: Array,
      default: function () {
        return
      }
    }
  },
  data() {
    return {
      successIcon: require('@icon/icon_success_green.png'),
      failIcon: require('@icon/icon_warn_red.png'),
    }
  },
  methods: {

  },

  watch: {
    dataList: {
      handler(val, oldVal) {
        if (val === oldVal) return
        this.dataList = val
      },
      deep: true,
      immediate: true
    }
  }
}
</script>

<style lang="scss" scoped>
@import "./suggestHistory.scss";
</style>


