/**
 * Uniapp 专用
 * websocket 通讯
 * auth: vincent.cheng
 * qq: 52953973
 */

import Vue from '../../main'
// import store from '../../store'

const baseURL = (process.env.NODE_ENV === 'development' ? 'ws://localhost:7002' : 'ws://47.112.202.169:6088')

let websocket = uni.connectSocket({
  url: baseURL,
  // data() {
  //   return {
  //     x: '',
  //     y: ''
  //   };
  // },
  // header: {
  //   'content-type': 'application/json'
  // },
  // protocols: [ 'protocol1' ],
  // method: 'GET',
  complete: () => {}
})

uni.onSocketOpen(res => {
  Vue.$utils.log('WebSocket Open !', res)
  // uni.closeSocket()
})

uni.onSocketError(err => {
  Vue.$utils.log('WebSocket Error !', err)
})

uni.onSocketMessage(res => {
  Vue.$utils.log('WebSocket on message' + res)
  // store.commit('temp', res)
  // store.dispatch('ws', res)
})

uni.onSocketClose(res => {
  Vue.$utils.log('WebSocket Close !', res)
})

export const ws = websocket
export default {
  install (Vue) {
    Object.defineProperty(Vue.prototype, '$ws', { value: websocket })
  }
}