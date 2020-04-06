<template>
  <div class="we-padding we-bg-white notice-detail-container">
    <!-- 标题 -->
    <header class="we-padding we-border-bottom-1">
      <p class="we-padding-left-10 we-padding-right-10 we-font-center we-flex-al">
        <span class="we-title we-font-bold" v-if="dataInfo.title">{{dataInfo.title}}</span>
        <van-tag mark type="warning" v-if="dataInfo.type" class="we-margin-left-5">{{dataInfo.type}}</van-tag>
      </p>
      <div class="we-flex-al-jc we-tips we-margin-top-10">
        <span v-if="dataInfo.createBy">发布人：{{dataInfo.createBy}}</span>
        <span v-if="dataInfo.createTime">发布时间：{{dataInfo.createTime}}</span>
      </div>
    </header>
    <!-- 内容 -->
    <div class="content">
      <div class="we-text" v-html="dataInfo.content" v-if="dataInfo.content"></div>
    </div>
    <!-- 附件 -->
    <div v-if="dataInfo.attachments && dataInfo.attachments.length" class="we-margin-top-20">
      <p class="we-padding-top-5 we-padding-bottom-5 we-border-bottom-1">附件({{dataInfo.attachments.length}})</p>
      <template v-for="(item, index) in dataInfo.attachments">
        <div class="we-margin-top-10" :key="index" @click="downloadFile(item.filePath)">
          <p class="we-color-blue">{{item.fileName}}</p>
          <p class="we-tips we-margin-top-2">{{item.fileSize}}</p>
        </div>
      </template>
    </div>

  </div>
</template>

<script>
import {wxDownloadFile} from '@/wx/index'
export default {
  data() {
    return {
      dataInfo: {
        id: 123,
        title: '通知详情标题通知详情知详情标题',
        createTime: '2020-10-10 12:12:12',
        createBy: '陈小花',
        type: '公告',
        content: '<p>这是一大段文本这是一大段文本这是一大段文本这是一大段文本</p><p>这是一大段文本这是一大段文本这是一大段文本这是一大段文本</p><p>这是一大段文本这是一大段文本这是一大段文本这是一大段文本这是一大段文本这是一大段文本这是一大段文本这是一大段文本</p>',
        isPublic: true,
        endTime: '2020-12-12 12:12:12', // 截止时间
        attachments: [
          { filePath: '', fileName: '合适的话.docx', fileSize: 123123 },
          { filePath: '', fileName: '合适的话123.docx', fileSize: 1231231 },
        ]
      }
    }
  },
  methods: {
    // 下载文件
    downloadFile(url) {
      if(!url) return
      wxDownloadFile(url)
      .then(res => {
        console.log(res)
      })
    }
  }
}
</script>

<style lang="scss" scope>
@import "./index.scss";
</style>