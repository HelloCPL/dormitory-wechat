<template>
  <div class="suggest-container">
    <van-tabs :active="active" color="#ed3f14" swipeable animated @change="onChange">
      <van-tab title="投诉或建议" :name="0">
        <!-- 投诉或建议 -->
        <div class="we-padding we-bg-white">
          <!-- 选择投诉或建议 -->
          <div class="suggest-title">
            <div class="we-bg box" :class="{'active': type == 1}" @click="setType(1)">
              <img :src="editIcon" alt="">
              <span class="we-font-12 we-color-white">投诉</span>
            </div>
            <div class="we-bg-red box" :class="{'active': type == 2}" @click="setType(2)">
              <img :src="editIcon" alt="">
              <span class="we-font-12 we-color-white">建议</span>
            </div>
          </div>
          <!-- 投诉内容 -->
          <van-cell-group>
            <van-field :value="content" type="textarea" :placeholder="type == 1 ? '请输入你要投诉的内容...' : '请输入你的建议...'"
              autosize @input="onInput" />
          </van-cell-group>
          <!-- 图片上传 -->
          <upload-file v-model="imgList" />
          <!-- 提交按钮 -->
          <div class="we-margin-btn we-padding">
            <van-button type="info" size="large" @click="onSubmit">提交</van-button>
          </div>
        </div>
      </van-tab>
      <van-tab title="历史记录" :name="1">
        <!-- 子栏目 -->
        <div class="repair-menu">
          <template v-for="(item, index) in menuList">
            <span :class="{'active': item.active == activeChild}" :key="index" @click="setActiveChild(item.active)">{{item.name}}</span>
          </template>
        </div>
        <suggestHistory1 :data-list="dataList" v-if="activeChild == 1" />
        <suggestHistory2 :data-list="dataList" v-else-if="activeChild == 2" />
        <suggestHistory3 :data-list="dataList" v-else-if="activeChild == 3" />
        <suggestHistory4 :data-list="dataList" v-else-if="activeChild == 4" />
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import uploadFile from '@com/common/uploadFile'
import suggestHistory from '../components/suggestHistory'
export default {
  components: {
    uploadFile,
    'suggestHistory1': suggestHistory,
    'suggestHistory2': suggestHistory,
    'suggestHistory3': suggestHistory,
    'suggestHistory4': suggestHistory,
    'suggestHistory5': suggestHistory,
  },
  data() {
    return {
      editIcon: require('@icon/icon_edit_white.png'),
      active: 0,
      activeChild: 1,
      menuList: [
        { name: '全部', active: 1 },
        { name: '处理中', active: 2 },
        { name: '已采纳', active: 3 },
        { name: '未采纳', active: 4 }
      ],
      dataList: [ // state 0 处理中 1 已采纳 2 未采纳 type 1 投诉 2 建议
        {id: 1, dorId: 1, uid: 1, state: 0, type: 1, content: '我是内容', imgList: [], createDate: '2020-01-01 12:22', address: '西区666', applyUser: '梁婉鸣', replyDate: '2020-02-02', replyContent: '回复内容', replyWorker: '陈小花', replyPhone: '15850505050'},
        {id: 1, dorId: 1, uid: 1, state: 1, type: 1, content: '我是内容', imgList: [], createDate: '2020-01-01 12:22', address: '西区666', applyUser: '梁婉鸣', replyDate: '2020-02-02', replyContent: '回复内容', replyWorker: '陈小花', replyPhone: '15850505050'},
        {id: 1, dorId: 1, uid: 1, state: 2, type: 1, content: '我是内容', imgList: [], createDate: '2020-01-01 12:22', address: '西区666', applyUser: '梁婉鸣', replyDate: '2020-02-02', replyContent: '回复内容', replyWorker: '陈小花', replyPhone: '15850505050'},
         {id: 1, dorId: 1, uid: 1, state: 0, type: 2, content: '我是内容', imgList: [], createDate: '2020-01-01 12:22', address: '西区666', applyUser: '梁婉鸣', replyDate: '2020-02-02', replyContent: '回复内容', replyWorker: '陈小花', replyPhone: '15850505050'},
        {id: 1, dorId: 1, uid: 1, state: 1, type: 2, content: '我是内容', imgList: [], createDate: '2020-01-01 12:22', address: '西区666', applyUser: '梁婉鸣', replyDate: '2020-02-02', replyContent: '回复内容', replyWorker: '陈小花', replyPhone: '15850505050'},
        {id: 1, dorId: 1, uid: 1, state: 2, type: 2, content: '我是内容', imgList: [], createDate: '2020-01-01 12:22', address: '西区666', applyUser: '梁婉鸣', replyDate: '2020-02-02', replyContent: '回复内容', replyWorker: '陈小花', replyPhone: '15850505050'},
      ],

      //投诉或建议
      type: 1, // 1 投诉 2 建议
      content: '',
      imgList: [], // 上传图片集合
    }
  },
  methods: {
    // 切换
    onChange(e) {
      e = e.mp.detail.name
      this.active = e
    },

    // 切换子栏目
    setActiveChild(active) {
      console.log(active)
      this.activeChild = active
    },

    // 设置type
    setType(index) {
      this.type = index
    },

    // 设置内容
    onInput(e) {
      e = e.mp.detail
      this.content = e
    },

  }
}
</script>

<style lang="scss">
// 设置多行文本输入框最小高度
.suggest-container {
  .van-field__body--textarea {
    min-height: 50px !important;
  }
}
</style>

<style lang="scss" scope>
@import "./index.scss";
</style>