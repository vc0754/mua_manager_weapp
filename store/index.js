import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'

Vue.use(Vuex)

const store = new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  modules: {
    user
  },
  state: {
    auth: {
      show: false,
      step: 0
    },
    user_id: uni.getStorageSync("user_id") || '',
    //token
    x_token: uni.getStorageSync("x_token") || '',
    //昵称
    nick_name: uni.getStorageSync("nick_name") || '',
    //头像
    avatar: uni.getStorageSync("avatar") || '',
    //用户登录手机号
    mobile: uni.getStorageSync("mobile") || '',
    //登录后跳转的页面路径 + 页面参数
    return_url: "",
    //app版本
    version: "1.5.1"
  },
  getters: {
  },
  mutations: {
    AUTH_SHOW(state, show) {
      let step = 1
      if (state.user.role === 'user') {
        step = 1
        if (state.user.education && state.user.education.status === 'cert_submitted') step = 2
      }
      Object.assign(state.auth, { show, step })
      console.log(state)
    },
  },
  actions: {
    auth_show({ commit }, bool) {
      commit('AUTH_SHOW', bool)
    },
    //小程序开启获取openid
    async login({
      state
    }) {
      console.log("state", state)
      if((state.user_id == "") || (state.x_token == "")){
        let that = this
        let res2 = {code:0}
		
        let provider = ''
        let urlOpenID = ''
		
        // #ifdef MP-WEIXIN
        provider = 'weixin'
        urlOpenID = '/v1/token/wechat/get'
        // #endif
		
        // #ifdef MP-ALIPAY
        provider = 'alipay'
        urlOpenID = '/v1/token/alipay/get'
        // #endif
        
        const res1 = await uni.login({
          provider: provider
        })
		// console.log(res1)
        if (res1[1].errMsg == 'login:ok') {
          const code = res1[1].code
          res2 = await fetch.request(urlOpenID, "POST", {
            code
          })
          console.log(res2)
        }
         
        // #ifdef H5
        res2 = await fetch.request('/v1/token/h5/get', "POST", {})
        // #endif
        
        
        if (res2.code == 1) {
          state.x_token = res2.data.x_token
          state.nick_name = res2.data.nick_name
          state.mobile = res2.data.mobile
          state.avatar = res2.data.avatar
          state.user_id = res2.data.user_id
          uni.setStorageSync('x_token', res2.data.x_token)
          uni.setStorageSync('nick_name', res2.data.nick_name)
          uni.setStorageSync('mobile', res2.data.mobile)
          uni.setStorageSync('avatar', res2.data.avatar)
          uni.setStorageSync('user_id', res2.data.user_id)
        }
      }else{
        console.log('read userinfo from cache')
      }
    },

    //获取微信小程序授权的用户信息
    async getWechatUserInfo ({ state }, {
      detail
    } = {}) {
      if(detail.errMsg == 'getUserInfo:ok'){
        let userInfo = detail.userInfo
        let res = await fetch.request('/v1/user/wechat/update', "POST", {detail})
        if(res.code == 1){
          state.x_token = res.data.x_token
          state.nick_name = userInfo.nickName
          state.avatar = userInfo.avatarUrl
          uni.setStorageSync('x_token', res.data.x_token)
          uni.setStorageSync('nick_name', userInfo.nickName)
          uni.setStorageSync('avatar', userInfo.avatarUrl)
          return true
        }else{
          fetch.toast('更新信息失败!')
        }
      }else{
        fetch.toast('更新信息失败!')
      }
      return false
    }
  }
})

export default store
