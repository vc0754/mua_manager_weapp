/**
 * Uniapp 专用
 * utils 工具
 * auth: vincent.cheng
 * qq: 52953973
 */

const debug = true
const utils = {
  log(...str) {
    if(debug) console.log('%cVC:', 'color: red; font-size: 12px;', ...str);
  },

	isAndroid() {
		const res = uni.getSystemInfoSync()
		return res.platform.toLocaleLowerCase() === 'android'
  },
  
	isPhoneX() {
		const res = uni.getSystemInfoSync()
		const models = [ 'iphonex', 'iphonexr', 'iphonexsmax', 'iphone11', 'iphone11pro', 'iphone11promax']
		const model = res.model.replace(/\s/g, '').toLowerCase()
		return models.includes(model)
  },
  
  /**
   * 前面补零
   * @param {*} str 
   * @param {*} len 
   * @param {*} pad 
   */
  pad_before(str, len, pad = '0') {
    return (Array(len).join(pad) + str).slice(-len)
  },
  
  toast(title, duration = 2000, icon = 'none') {
    uni.showToast({ title, icon, duration })
  },

  modal(title = '提示', content, callback, showCancel = true, cancelColor = '#555', confirmColor = '#5677fc', confirmText = '确定') {
    uni.showModal({ title, content, showCancel, cancelColor, confirmColor, confirmText,
			success(res) {
        callback && callback( res.confirm ? true : false )
			}
		})
  },

  request_payment(res) {
    return new Promise(async (resolve, reject) => {
      const provider = await uni.getProvider({ service: 'payment' })
      this.log(provider)
      // provider: 'wxpay',
      uni.requestPayment({
        provider,
        timeStamp : res.timeStamp,
        nonceStr  : res.nonceStr,
        package   : res.package,
        signType  : res.signType,
        paySign   : res.paySign,
        success   : res => resolve(res),
        fail      : err => reject(err)
      })
    })
  },
  
  /**
   * 拨打电话
   * @param {*} phoneNumber 
   */
  tel(phoneNumber) {
    if (!phoneNumber) return this.toast('电话号码必须')
    return new Promise((resolve, reject) => {
      uni.makePhoneCall({ phoneNumber,
        success : () => resolve(`拨打电话（${phoneNumber}）成功`),
        fail    : () => reject(`拨打电话（${phoneNumber}）失败`),
        complete: () => resolve(`拨打电话（${phoneNumber}）完成`)
      })
    })
  },

  /**
   * 复制到剪贴板
   * @param {*} data 
   */
  copy(data) {
    wx.setClipboardData({ data })
  },
  
  /**
   * 根据经纬度 打开地图
   * @param {*} obj 
   * @param {*} scale 
   */
  map(obj, scale = 18) {
    const { latitude, longitude } = obj
    wx.openLocation({ latitude, longitude, scale })
  },

  // 
  // constNum() {
	// 	let time = 0;
	// 	// #ifdef APP-PLUS
	// 	time = this.isAndroid() ? 300 : 0;
	// 	// #endif
	// 	return time
  // },
  
  // toJSONP
	// toJSONP: function(url, callback, callbackname) {
	// 	// #ifdef H5
	// 	window[callbackname] = callback;
	// 	let tuiScript = document.createElement("script");
	// 	tuiScript.src = url;
	// 	tuiScript.type = "text/javascript";
	// 	document.head.appendChild(tuiScript);
	// 	document.head.removeChild(tuiScript);
	// 	// #endif
  // },
  
  goto(e) {
    let page = e.type ? e.currentTarget.dataset.page : null || e.page
    if (!page) return this.toast('页面必须')

    if (page === 'back') return wx.navigateBack({ delta: 1 })

    if (page.indexOf('http') === 0) {
      let url = page.replace(/\?/g, '|')
      url = url.replace(/\=/g, '——')
      url = url.replace(/\&/g, '@')
      return wx.navigateTo({ url: `/pages/webview/index?url=${url}` })
    }
    this.log('====>', page, e)

    const tabbar_pages = [
      '/pages/index/index',
      '/pages/my/index'
    ]
    if (tabbar_pages.includes(page)) {
      wx.switchTab({ url: page })
    } else {
      wx.navigateTo({ url: page })
    }

    // let url = e.currentTarget.dataset.page
		// uni.navigateTo({
		//   url: url
		// })
  },

  auth() {
    // uni.showModal({
    //   title: '认证后再访问',
    //   success: res => {
    //     if (res.confirm) {
    //       this.goto({ page: '/pages/auth/index'})
    //     } else if (res.cancel) {
    //       console.log('用户点击取消');
    //     }
    //   }
    // })
  }
}

export const Utils = utils
export default {
  install (Vue) {
    Object.defineProperty(Vue.prototype, '$utils', { value: utils })
  }
}