<template>
	<view class="content">
		<!-- <image class="logo" src="/static/logo.png"></image> -->
		<view class="text-area">
			<text class="title">{{title}}</text>
		</view>
    <text @tap="dianhua">电话</text>
    <text @tap="weixin">微信</text>
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
      dianhua(e) {
        this.$utils.tel('123')
      },
      weixin(e) {
        this.$utils.modal({
          title: '微信号：123',
          content: '打开微信，搜索并添加微信号后进行交流哦～',
          showCancel: true,
          cancelText: '取消',
          cancelColor: '#000000',
          confirmText: '复制微信',
          confirmColor: '#24D9BA',
          success: result => {
            if(result.confirm){
              
            }
          },
          fail: ()=>{},
          complete: ()=>{}
        });
      }
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
