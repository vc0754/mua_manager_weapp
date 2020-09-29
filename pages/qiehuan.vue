<template>
	<view class="content">
		<view class="text-area">
			<text class="title">asad</text>
    <text @tap="goto" data-page="/pages/chanpinxinxi">产品信息</text>
		</view>
	</view>
</template>

<script>
export default {
  data() {
    return {
      title: 's'
    }
  },
  onLoad() {

  },
  methods: {
    goto(e) {
      const page = e.currentTarget.dataset.page
      this.$utils.goto(e)
    },
  }
}
</script>

<style>
</style>
