<template>
  <div class="belongings-container">
    <!-- 添加人员输入框 -->
    <div class="we-padding we-bg-white">
      <div class="we-font-18 we-color-black we-padding-bottom-15 title">个人物品</div>
      <template v-for="(item, index) in goodsList">
        <div class="box" :key="index">
            <span>物品名称{{index + 1}}</span>
          <div class="we-padding-2 right">
            <van-field :value="item" maxlength="12" placeholder="请输入物品名称" @input="onInput($event, index)" />
          </div>
          <div class="we-padding-5 left" @click="deleteGoods(index)" v-if="goodsList.length > 1">
            <img :src="closeIcon" alt="">
          </div>
        </div>
      </template>
    </div>
    <!-- 新增人员 -->
    <div class="we-padding footer">
      <img :src="addIcon" alt="" class="we-margin-right-5" @click="addGoods">
      <span class="we-color-blue" @click="addGoods">新增物品</span>
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
      addIcon: require('@icon/icon_add_blue.png'),
      closeIcon: require('@icon/icon_close1.png'),
      goodsList: [''],
      currentDay: '0',
      clearFlag: true
    }
  },
  onLoad(query) {
    Object.assign(this.$data, this.$options.data())
  },
  // onHide() {
  // },
  methods: {
    onInput(e, index) {
      index = parseInt(index)
      e = e.mp.detail
      this.goodsList[index] = e
    },

    // 删除值班人员
    deleteGoods(index) {
      this.goodsList.splice(index, 1)
    },

    // 新增人员
    addGoods() {
      this.goodsList.push('')
    },

    // 发布
    onSubmit() {
      console.log('发布了', this.goodsList)
    }
  }
}
</script>

<style lang="scss" scope>
@import "./index.scss";
</style>