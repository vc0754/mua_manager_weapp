import Vue from 'vue'

export const USER_SIGNIN = 'USER_SIGNIN'
export const USER_SIGNOUT = 'USER_SIGNOUT'

export default {
  state: uni.getStorageSync('user') ? JSON.parse(uni.getStorageSync('user')) : {
    auth: false,
    id: 0,
    display_name: '',
    role: '',
    education: {
      college: {
        name: ''
      }
    }
  },
  mutations: {
    [USER_SIGNIN] (state, user) {
      Object.assign(state, user)
      uni.setStorageSync('user', JSON.stringify(state))
    },
    [USER_SIGNOUT] (state) {
      uni.removeStorageSync('user')
      Object.keys(state).forEach(k => Vue.delete(state, k))
      state.id = 0
      state.display_name = ''
    }
  },
  actions: {
    [USER_SIGNIN] ({ commit }, user) {
      commit(USER_SIGNIN, user)
    },
    [USER_SIGNOUT] ({ commit }) {
      commit(USER_SIGNOUT)
    }
  }
}