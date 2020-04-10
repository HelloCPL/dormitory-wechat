<template>
  <div class="belongings-container">
    <div class="we-padding we-border-bottom-1">
      <p class="">温馨提示：</p>
      <p class="we-tips we-margin-top-5">学生可对个人贵重物品进行登记，更改存放状态，如未登记的物品发生任何后果自行承担！</p>
    </div>
    <!-- 添加人员输入框 -->
    <div class="we-padding we-bg-white">
      <!-- <div class="we-font-18 we-color-black we-padding-bottom-15 title">个人物品</div> -->
      <template v-for="(item, index) in goodsList">
        <div class="box" :key="index">
          <span v-if="goodsList.length > 1">物品名称{{index + 1}}</span>
          <span class="we-required" v-else>物品名称{{index + 1}}</span>
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
    <!-- 我的物品 -->
    <p class="we-padding we-color-tips we-border-bottom-1">我的物品({{total}})</p>
    <div class="we-padding">
      <template v-for="(item, index) in dataList">
        <div class="we-padding-top-10 we-padding-bottom-15 we-border-bottom-1 apply-box" :key="index">
          <div class="we-margin-bottom-5 apply-side">
            <span class="we-flex-1">物品名称：{{item.name}}</span>
            <div class="we-flex">
              <van-tag plain type="primary" v-if="item.status == 1" @click="onEdit(item.id, 2, index)">外带</van-tag>
              <van-tag plain type="primary" v-if="item.status == 2" @click="onEdit(item.id, 1, index)">带回</van-tag>
              <img :src="deleteIcon" alt="" class="delete-icon" @click="onDelete(item.id, index)" />
            </div>
          </div>
          <div class="we-margin-bottom-5 apply-side">
            <span class="we-nowrap">存放状态：</span>
            <span class="we-flex-1" v-if="item.status == 1">保存中</span>
            <span class="we-flex-1 we-color-orange" v-if="item.status == 2">外带中</span>
          </div>
          <div class="we-margin-bottom-5 we-color-red apply-side" v-if="item.remark">
            <span class="we-nowrap">备注：</span>
            <span class="we-flex-1">{{item.remark}}</span>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      addIcon: require('@icon/icon_add_blue.png'),
      closeIcon: require('@icon/icon_close1.png'),
      deleteIcon: require('@icon/icon_delete.png'),
      goodsList: [''],
      total: 0,
      dataList: [],
      pageNo: 1,
      pageSize: 10,
      finish: false,
      lock: false
    }
  },
  onLoad(query) {
    Object.assign(this.$data, this.$options.data())
    this.onRefresh()
  },
  // 上拉加载更多
  onReachBottom() {
    if (!this.finish) {
      this.getDataList()
    }
  },
  methods: {
    // 更新 数据
    onRefresh() {
      this.total = 0
      this.lock = false
      this.finish = false
      this.pageNo = 1
      this.pageSize = 10
      this.dataList = []
      this.getDataList()
    },

    // 请求数据
    async getDataList() {
      if (this.lock || this.finish) return
      this.lock = true
      let params = {
        pageNo: this.pageNo,
        pageSize: this.pageSize
      }
      let res = await this.$http.post('/student/property/check', params)
      if (res.errorCode === 0) {
        this.dataList = this.dataList.concat(res.data)
        this.total = res.total
        this.pageNo += 1
        if (this.dataList.length >= this.total) {
          this.finish = true
        }
      }
      this.lock = false
    },

    // 编辑 
    async onEdit(id, status, index) {
      let params = {
        id,
        status
      }
      let res = await this.$http.post('/student/property/edit', params)
      if (res.errorCode === 0) {
        this.$toast('修改成功')
        this.$set(this.dataList[index], 'status', status)
      }
    },

    // 删除 
    async onDelete(id, index) {
      if (this.lock) return
      this.lock = true
      let params = {
        id
      }
      let res = await this.$http.post('/student/property/delete', params)
      if (res.errorCode === 0) {
        this.$toast('删除成功')
        this.dataList.splice(index, 1)
        this.total -= 1
      }
      this.lock = false
    },

    // 处理输入
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
    async onSubmit() {
      let arr = []
      this.goodsList.forEach(item => {
        if (item)
          arr.push(item)
      })
      if (arr.length) {
        let res = await this.$http.post('/student/property/add', { name: arr })
        if (res.errorCode === 0) {
          this.$alert('提交成功')
            .then(() => {
              this.goodsList = ['']
              this.onRefresh()
            })
        } else {
          this.$toast(res.msg)
        }
      } else {
        this.$toast('请输入物品名称')
      }
    }
  }
}
</script>

<style lang="scss" scope>
@import "./index.scss";
</style>