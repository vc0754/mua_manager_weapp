<template>
  <view class="auth-modal" v-if="show">
    <view class="inner">
      <image lazy-load mode="scaleToFill" src="" class="img" />
      <text class="text">悬赏代办是大学生专属社交平台\n请提交证明你是大学生的认证资料\n解锁全部权限</text>
      <view class="flex flex-x-between" style="padding: 0 15px;">
        <view class="btn btn1">暂不认证</view>
        <view class="btn btn2">前去认证</view>
      </view>
      <!-- <view class="text">
        <text>资料提交成功\n我们将在24小时内完成审核\n如有疑问，</text>
        <text class="copy" @click="copy">请联系我们</text>
      </view>
      <view class="flex flex-x-center">
        <view class="btn btn2" style="padding: 0 38px;">我知道啦</view>
      </view> -->
    </view>
  </view>
</template>

<script>
export default {
  name: '',
  data() {
    return {
    }
  },
  computed: {
    ...mapState({
      user: state => state.user
    })
  },
  methods: {
    goto(e) {
      this.$utils.goto(e)
    },
  },

  onLoad() {
    this.init_subnav_items()
    this.get_data()
  },
}
</script>


<style lang="scss" scoped>
@import '../../ui/common.scss';

.auth-modal {
  position: fixed; top: 0; left: 0; width: 100%; height: 100%; z-index: 999;
  .inner {
    box-sizing: border-box;
    background-color: #fff; width: 296px; height: 402px; padding: 26px 15px 30px; border-radius: 22px;
    position: fixed; top: 50%; left: 50%;
    transform: translate3d(-50%, -60%, 0);

    .img { width: 265px; height: 202px;}
    .text { text-align: center; color: #333; font-size: 15px; font-weight: 410; line-height: 23px; margin: 10px 0 24px; display: block;}

    .btn {
      box-sizing: border-box;
      font-size: 17px; font-weight: 410; padding: 0 20px;
      min-width: 110px; height: 40px; border-radius: 22px;
      display: flex; justify-content: center; align-items: center;
    }
    .btn1 { color: #24D9BA; border: solid 1px #24D9BA; }
    .btn2 { background-color: #24D9BA; color: #fff; }
    .copy { color: #24D9BA;}
  }
  &::before {
    display: block; content: ''; width: 100%; height: 100%;
    position: fixed; top: 0; left: 0;
    background-color: rgba(0, 0, 0, 0.9);
  }
}
</style>