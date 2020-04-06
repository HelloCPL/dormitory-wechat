<template>
  <div class="we-bg-white">
    <template v-for="(item, index) in dataList">
      <div class="we-padding we-border-bottom-1" :key="index" @click="toDetail(item.id)">
        <p class="we-line-1 we-flex-al" v-if="item.title">
          <van-tag round type="warning" v-if="item.type" class="we-margin-right-5">{{item.type}}</van-tag>
          <span class="we-title">{{item.title}}</span>
        </p>
        <p class="we-line-1 we-margin-top-5" v-if="item.content" v-html="item.content"></p>
        <p class="we-margin-top-5 we-tips">
          <span class="we-padding-right-5" v-if="item.browseCount || item.browseCount == 0">浏览量：{{item.browseCount}}</span>
          <span v-if="item.createTime">{{item.createTime}}</span>
        </p>
      </div>
    </template>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dataList: [
        {
          id: 123,
          title: '通知详情标题通知详情知详情标题',
          createTime: '2020-10-10 12:12:12',
          createBy: '陈小花',
          type: '公告',
          content: '<p>这是一大段文本这是一大段文本这是一大段文本这是一大段文本</p><p>这是一大段文本这是一大段文本这是一大段文本这是一大段文本</p><p>这是一大段文本这是一大段文本这是一大段文本这是一大段文本这是一大段文本这是一大段文本这是一大段文本这是一大段文本</p>',
          isPublic: true,
          browseCount: 0,
          endTime: '2020-12-12 12:12:12', // 截止时间
          attachments: [
            { filePath: '', fileName: '合适的话.docx', fileSize: 123123 },
            { filePath: '', fileName: '合适的话123.docx', fileSize: 1231231 },
          ]
        },
        {
          id: 123,
          title: '通知详情标题通知详情知详情标题',
          createTime: '2020-10-10 12:12:12',
          createBy: '陈小花',
          type: '公告',
          content: '<p>这是一大段文本这是一大段文本这是一大段文本这是一大段文本</p><p>这是一大段文本这是一大段文本这是一大段文本这是一大段文本</p><p>这是一大段文本这是一大段文本这是一大段文本这是一大段文本这是一大段文本这是一大段文本这是一大段文本这是一大段文本</p>',
          isPublic: true,
          browseCount: 12,
          endTime: '2020-12-12 12:12:12', // 截止时间
          attachments: [
            { filePath: '', fileName: '合适的话.docx', fileSize: 123123 },
            { filePath: '', fileName: '合适的话123.docx', fileSize: 1231231 },
          ]
        },

      ]
    }
  },
  methods: {
    // 跳转到详情
    toDetail(id) {
      this.$navigate.push('/pages/home/noticeDetail/main?id=' + id)
    },
  }
}
</script>

<style lang="scss" scope>
@import "./index.scss";
</style>