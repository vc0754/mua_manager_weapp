<template>
	<view class="content">
		<!-- <image class="logo" src="/static/logo.png"></image> -->
		<view class="text-area">
			<text class="title">{{title}}</text>
		</view>
    <text @tap="goto" data-page="/pages/xiaoxitongzhi2">消息</text>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: 'Hello'
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

<style lang="scss" scoped>
.a {
  .s {
    font-size:12px;
  }
}
</style>
