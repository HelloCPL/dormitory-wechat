<template>
  <div class="we-bg-white authentication-container">
    <!-- 步骤条 -->
    <div class="authen-steps">
      <van-steps :steps="steps" :active="active" />
    </div>
    <!-- 填写步骤一信息 -->
    <div v-if="active == 0">
      <!-- 基础信息 -->
      <van-field label="真实姓名" :value="dataInfo.username" placeholder="请输入真实姓名" input-align="right" @input="setUsername" />
      <picker @change="setSex" :range="sexList">
        <van-cell title="性别" is-link>
          <span class="we-color-text" v-if="dataInfo.sex">{{dataInfo.sex}}</span>
          <span class="we-color-tips" v-else>请选择</span>
        </van-cell>
      </picker>
      <van-field label="电话号码" :value="dataInfo.phone" placeholder="请输入电话号码" input-align="right" @input="setPhone" />
      <picker @change="setSchool" :range="schoolList">
        <van-cell title="学校" is-link>
          <span class="we-color-text" v-if="dataInfo.schoolName">{{dataInfo.schoolName}}</span>
          <span class="we-color-tips" v-else>请选择</span>
        </van-cell>
      </picker>
      <van-field label="专业" :value="dataInfo.major" placeholder="请输入专业" input-align="right" @input="setMajor" />
      <!-- 下一步 -->
      <div class="we-margin-btn we-padding">
        <van-button type="info" size="large" @click="onNext">下一步</van-button>
      </div>
    </div>
    <!-- 填写步骤二信息 -->
    <div v-if="active == 1">
      <van-field label="学号" :value="dataInfo.studentId" placeholder="请输入学号" input-align="right" @input="setStudentId" />
      <!-- 宿舍 -->
      <div class="authen-dor">
        <van-field label="宿舍" :value="dataInfo.dorName" placeholder="请输入选择宿舍" input-align="right" @input="onRequestDor"
          is-link />
        <div class="we-border-1 we-shadow authen-dor-box" v-if="dorFlag">
          <template v-for="(item, index) in dorList">
            <div class="we-padding-right-10 we-font-right we-border-bottom-1 authen-dor-word" @click="setDor(item.id, item.name)"
              :key="index">{{item.name}}</div>
          </template>
        </div>
      </div>
      <picker mode="date" :value="dataInfo.startDate" @change="setStartDate">
        <van-cell title="入学时间" is-link>
          <span class="we-color-text" v-if="dataInfo.startDate">{{dataInfo.startDate}}</span>
          <span class="we-color-tips" v-else>请选择</span>
        </van-cell>
      </picker>
      <picker mode="date" :value="dataInfo.endDate" :start="dataInfo.startDate" @change="setEndDate">
        <van-cell title="毕业时间" is-link>
          <span class="we-color-text" v-if="dataInfo.endDate">{{dataInfo.endDate}}</span>
          <span class="we-color-tips" v-else>请选择</span>
        </van-cell>
      </picker>
      <!-- 上一步或提交 -->
      <div class="we-margin-btn we-padding">
        <div class="btn-box">
          <div class="btn">
            <van-button size="large" @click="onPrevious">上一步</van-button>
          </div>
          <div class="btn">
            <van-button type="info" size="large" @click="onSubmit">提交</van-button>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      steps: [
        { desc: '基本信息' },
        { desc: '其他信息' }
      ],
      active: 0,
      sexList: ['男', '女'],
      schoolList: ['广东技术师范学院'],
      schoolList2: [{ id: 1, name: '广东技术师范学院' }],
      lock: false,
      dorFlag: false,
      dorList: [
        // {id: 1, name: '西区666'},
        // {id: 1, name: '西区666'},
        // {id: 1, name: '西区666'},
        // {id: 1, name: '西区666'},
      ],
      startDateFlag: false,
      endDateFlag: false,
      // 实名认证字段 已有 昵称 头像
      // 个人信息 真实姓名 性别 电话 
      // 学习信息 学校（选择） 专业 学号 宿舍号（输入选择） 入学年月日 毕业年月日
      // 本地存储个信息 id 宿舍id 宿舍名称 姓名 昵称 微信openId 头像 性别 电话 学校 专业 学号 入学日期 毕业日期 权限
      // token信息 id 宿舍id openId 权限
      dataInfo: {
        username: '',
        sex: '',
        phone: '',
        schoolId: '',
        schoolName: '',
        major: '',

        studentId: '',
        dorId: '',
        dorName: '',
        startDate: '',
        endDate: ''
      }
    }
  },
  methods: {
    // 设置真实姓名
    setUsername(e) {
      e = e.mp.detail
      this.dataInfo.username = e
    },

    // 设置性别
    setSex(e) {
      e = e.mp.detail.value
      this.dataInfo.sex = this.sexList[e]
    },

    // 设置电话号码
    setPhone(e) {
      e = e.mp.detail
      this.dataInfo.phone = e
    },

    // 设置学校
    setSchool(e) {
      e = e.mp.detail.value
      console.log(e)
      this.dataInfo.schoolId = this.schoolList2[e]['id']
      this.dataInfo.schoolName = this.schoolList2[e]['name']
    },

    // 设置专业
    setMajor(e) {
      e = e.mp.detail
      this.dataInfo.major = e
    },

    // 校验基础信息
    validatorBasic() {
      if (!this.dataInfo.username) {
        this.$toast('请输入真实姓名')
        return false
      } else if (!this.dataInfo.sex) {
        this.$toast('请选择性别')
        return false
      } else if (!this.dataInfo.phone) {
        this.$toast('请输入电话号码')
        return false
      } else if (!(/^1[3456789]\d{9}$/.test(this.dataInfo.phone))) {
        this.$toast('电话号码格式不对')
        return false
      } else if (!this.dataInfo.schoolId || !this.dataInfo.schoolName) {
        this.$toast('请选择学校')
        return false
      } else if (!this.dataInfo.major) {
        this.$toast('请输入专业')
        return false
      } else {
        return true
      }
    },

    // 下一步
    onNext() {
      if (!this.validatorBasic()) return
      this.active = 1
    },

    // 设置学号
    setStudentId(e) {
      e = e.mp.detail
      this.dataInfo.studentId = e
    },

    // 请求宿舍列表
    onRequestDor(e) {
      e = e.mp.detail
      if (!e) {
        this.dorFlag = false
        return
      }
      this.dorFlag = true
      this.dorList = [
        { id: 1, name: '西区666' },
        { id: 1, name: '西区667' },
        { id: 1, name: '西区668' },
        { id: 1, name: '西区669' },
      ]
      // if(this.lock) return
      // this.lock = true
      // let params = {
      //   schoolId: this.schoolId,
      //   value: e
      // }
      // 根据学校id和输入内容选择宿舍
    },

    // 设置宿舍id
    setDor(id, name) {
      console.log(id, name)
      this.dataInfo.dorId = id
      this.dataInfo.dorName = name
      this.dorFlag = false
    },

    // 设置入学时间
    setStartDate(e) {
      e = e.mp.detail.value
      this.dataInfo.startDate = e
      this.dataInfo.endDate = ''
    },

    // 设置毕业时间
    setEndDate(e) {
      if (!this.dataInfo.startDate) {
        this.$toast('请先选择入学时间')
        return
      }
      e = e.mp.detail.value
      this.dataInfo.endDate = e
    },

    // 校验其他信息
    validatorOther() {
      if (!this.dataInfo.studentId) {
        this.$toast('请输入学号')
        return false
      } else if (!this.dataInfo.dorId || !this.dataInfo.dorName) {
        this.$toast('请输入选择宿舍')
        return false
      } else if (!this.dataInfo.startDate) {
        this.$toast('请选择入学时间')
        return false
      } else if (!this.dataInfo.endDate) {
        this.$toast('请选择毕业时间')
        return false
      } else {
        return true
      }
    },

    // 上一步
    onPrevious() {
      this.active = 0
    },

    onSubmit() {
      if (!this.validatorOther()) return
      console.log(this.dataInfo)
    }
  }
}
</script>

<style lang="scss" scope>
@import "./index.scss";
</style>