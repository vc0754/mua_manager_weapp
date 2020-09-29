<template>
	<view class="content">
		<!-- <image class="logo" src="/static/logo.png"></image> -->
		<view class="text-area">
			<text class="title">{{title}}</text>
		</view>
    <text @tap="goto" data-page="/pages/qiehuan">切换小程序</text>
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
        // if (page.includes('/pages/errand/publish')) {
        //   if (this.user.role === 'user') return this.$store.dispatch('auth_show', true)
        // }
        // if (page.includes('/pages/errand/publish') && this.user.role === 'user') return this.$toast()
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
