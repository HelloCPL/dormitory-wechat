<template>
  <div class="we-bg-white upload-container">
    <!-- 标题 -->
    <title-divider :title="title" v-if="title">
      <template slot="icon">
        <img :src="uploadIcon" alt="" class="upload-icon">
      </template>
    </title-divider>
    <!-- 上传 -->
    <div class="we-padding-left-10 we-padding-right-10 upload-wrapper">
      <!-- 图片展示 -->
      <template v-for="(item, index) in value">
        <div class="we-margin-right-10 we-margin-bottom-10 upload-list" :key="index">
          <van-image :src="item" width="80" height="80" radius="4" @click="onPreview(index)" />
          <img :src="deleteIcon" alt="" class="we-padding-2 upload-delete" @click="onDelete(item, index)" v-if="isDelete">
        </div>
      </template>
      <!-- 上传按钮 -->
      <div class="we-margin-right-10 we-margin-bottom-10 upload-btn" @click="onChooseImage">
        <img :src="addIcon" alt="">
      </div>
    </div>
  </div>
</template>

<script>
import {
  wxUploadFile,
  wxChooseImage,
  wxPreviewImage
} from '@/wx/index'
import titleDivider from '@com/common/titleDivider'
export default {
  components: {
    titleDivider
  },
  props: {
    value: {
      type: Array,
      default: function () {
        return []
      }
    },
    maxCount: {
      type: Number,
      default: 9
    },
    title: {
      type: String,
      default: '上传图片'
    },
    isDelete: { // 是否显示删除按钮
      type: Boolean,
      default: true
    }
  },

  data() {
    return {
      uploadIcon: require('@icon/icon_upload_blue.png'),
      deleteIcon: require('@icon/icon_close1.png'),
      addIcon: require('@icon/icon_add.png'),
      imgList: [],
      fileList: []
    }
  },
  methods: {
    // 选择图片
    async onChooseImage() {
      let maxCount = this.maxCount - this.value.length
      if (maxCount <= 0) {
        this.$toast(`最多选择${this.maxCount}张图片`)
        return
      }
      // 选择照片前
      this.beforeChooseImage()
      let res = await wxChooseImage({ count: maxCount })
      this.afterChooseImage()
      console.log('选择的图片', res)
      if (res && this.$tools.isArray(res.tempFilePaths) && !this.$tools.isEmptyArray(res.tempFilePaths)) {
        let tempFilePaths = res.tempFilePaths
        this.onUpload(tempFilePaths)
      }
    },

    // 上传图片操作
    async onUpload(filePaths) {
      let imgList = this.$tools.deepCopy(this.value)
      if (this.$tools.isArray(filePaths)) {
        for (let i = 0, len = filePaths.length; i < len; i++) {
          let res = await wxUploadFile('/file/upload', filePaths[i])
          console.log('上传图片返回', res)
          if (res.errorCode === 0) {
            if (res.data && res.data.url)
              imgList.push(res.data.url)
          }
        }
        this.$emit('input', imgList)
      }
    },

    // 预览图片
    onPreview(index) {
      wxPreviewImage(this.value, index)
    },

    // 删除图片
    async onDelete(url, index) {
      console.log(url)
      let res = await this.$http.get('/file/delete', { url })
      if (res.errorCode === 0) {
        let temList = this.$tools.deepCopy(this.value)
        temList.splice(index, 1)
        this.$emit('input', temList)
      }
    },

    // 选择图片前
    beforeChooseImage() {
      console.log(1)
      this.wxSetStorage('chooseImage', true)
    },

    // 选择照片后
    afterChooseImage() {
      if (this.wxGetStorage('chooseImage')) {
        console.log(2)
        this.wxRemoveStorage('chooseImage')
      }
    }
  },

  watch: {
    value: {
      handler: function (val, oldVal) {
        if (val === oldVal) return
        this.$emit('input', val)
      },
      deep: true,
      immediate: true
    }
  }
}
</script>

<style lang="scss" scoped>
@import "./uploadFile.scss";
</style>


