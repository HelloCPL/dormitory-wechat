<template>
  <div class="we-bg-white institution-container">
    <div class="we-padding we-border-bottom-1">
      <p class="we-title we-font-center we-font-bold  title">{{dataInfo.title}}</p>
      <div class="we-flex we-tips tips-box">
        <span class="we-margin-right-20 we-margin-top-10">发布人：{{dataInfo.releaseUserName}}</span>
        <span class="we-margin-right-20 we-margin-top-10">发布时间：{{dataInfo.updateTimeStr}}</span>
        <span class="we-margin-right-20 we-margin-top-10">浏览量：{{dataInfo.browseCount}}</span>
      </div>
    </div>
    <div class="we-padding">
      <div class="we-text content" v-html="dataInfo.content" v-if="dataInfo.content"></div>
    </div>
    <!-- 附件 -->
    <div v-if="dataInfo.fileUrl && dataInfo.fileUrl.length" class="we-margin-top-20 we-border-top-1">
      <p class="we-padding">附件({{dataInfo.fileUrl.length}})</p>
      <template v-for="(item, index) in dataInfo.fileUrl">
        <div class="we-padding" :key="index" @click="downloadFile(item.filePath)">
          <p class="we-color-blue">{{item.fileName}}</p>
          <p class="we-tips we-margin-top-2">{{item.fileSize}}</p>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import { wxDownloadFile } from '@/wx/index'
export default {
  data() {
    return {
      dataInfo: {}
    }
  },
  onLoad(e) {
    Object.assign(this.$data, this.$options.data())
    this.getDataInfo(e.id)
  },
  methods: {
    // 获取数据
    async getDataInfo(id) {
      let res = await this.$http.post('/management/notices/detail', { id })
      if (res.errorCode === 0) {
        this.dataInfo = res.data
      }
    },

    // 下载文件
    downloadFile(url) {
      if (!url) return
      wxDownloadFile(url)
        .then(res => { })
    }
  }
}
</script>

<style lang="scss" scope>
@import "./index.scss";
</style>