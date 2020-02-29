<template>
  <div class="we-bg-white payment-container">
    <van-tabs :active="active" color="#ed3f14" swipeable animated @change="onChange">
      <van-tab title="缴费" :name="0">
        <unpaid />
      </van-tab>
      <van-tab title="历史记录" :name="1">
        <paid />
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import paid from '../components/paid'
import unpaid from '../components/unpaid'
export default {
  components: {
    paid,
    unpaid
  },
  data() {
    return {
      active: 0,
    }
  },
  methods: {
    onChange(e) {
      e = e.mp.detail.name
      this.active = e
    }
  }
}
</script>
