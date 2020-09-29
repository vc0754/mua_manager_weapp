/**
 * Uniapp 专用
 * http 通讯
 * auth: vincent.cheng
 * qq: 52953973
 */
import Vue from '../../main'
import store from '../../store'

const axios = {
  defaults: {
    baseURL: ''
  },

  /**
   * HTTP 请求
   * @param {*} url 
   * @param {*} data 
   * @param {*} config 
   */
  get(url, data, config = {}) {
		return this.request(url, data, 'GET', config.dataType)
  },
  post(url, data, config = {}) {
		return this.request(url, data, 'POST', config.dataType)
  },
  put(url, data, config = {}) {
		return this.request(url, data, 'PUT', config.dataType)
  },
  delete(url, data, config = {}) {
		return this.request(url, data, 'DELETE', config.dataType)
  },
  request(url, data, method = 'GET', dataType = 'json') {
    const api = this.defaults.baseURL ? `${this.defaults.baseURL}/${url}` : url
    const header = {
      'Content-Type': 'application/json; charset=utf-8',
      // 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
      'Authorization': this.get_token()
    }
    return new Promise((resolve, reject) => {
      if (!api) reject('接口地址必须')
      
      if (method === 'POST') wx.showLoading()

      uni.request({
        url: api, data, method, header, dataType,
	      success: res => {
          Vue.$utils.log(res)
          
          if (res.data.code === -97) {
            store.dispatch('auth_show', true)
            return reject(res.data)
          } else if (res.data.code === -98) {
            uni.showModal({
              title: '',
              content: res.data.message,
              showCancel: true,
              cancelText: '取消',
              cancelColor: '#000000',
              confirmText: '确定',
              confirmColor: '#3CC51F',
              success: (result) => {
                if(result.confirm){
                  wx.navigateTo({ url: '/pages/rider/application' })
                }
              }
            })
            return reject(res.data)
          } else if (res.data.code === -1) {
            uni.showModal({
              title: '',
              content: res.data.message,
              showCancel: false
            })
            return reject(res.data)
          }

          if (res.statusCode !== 200 && res.statusCode !== 201 && res.statusCode !== 204) {
            uni.showModal({
              title: '错误',
              content: res.data.message,
              showCancel: false
            })
            return reject(res.data)
          }
          resolve(res.data)
          
	        // clearTimeout(tui.delayed)
	        // tui.delayed = null;
	        // if (loadding && !hideLoading) {
	        //   uni.hideLoading()
	        // }
	        // if (res.data.code < 1) {
	        //   tui.toast(res.data.info)
	        // }
	        // // if (res.data && res.data.code == 1) {
	        // // 	uni.clearStorageSync()
	        // // 	tui.modal("登录信息已失效，请重新登录", false, () => {
	        // // 		//store.commit("logout") 登录页面执行
	        // // 		uni.redirectTo({
	        // // 			url: '/pages/common/login/login'
	        // // 		})
	        // // 	})
	        // // 	return
	        // // }
	      },
	      fail: err => {
	        // clearTimeout(tui.delayed)
	        // tui.delayed = null;
	        // if (loadding && !hideLoading) {
	        //   uni.hideLoading()
	        // }
          Vue.$utils.toast('网络不给力，请稍后再试~')
	        reject(err)
        },
        complete: () => {
          wx.hideLoading()
        }
	    });
    })
  },

	/**
	 * 上传文件
	 * @param string url 请求地址
	 * @param string src 文件路径
	 */
  upload(url, filePath, formData = {}, name = 'imageFile') {
    uni.showLoading({ title: '请稍候...' })
    const api = this.defaults.baseURL ? `${this.defaults.baseURL}/${url}` : url
    const header = {
      'Authorization': this.get_token()
    }
    return new Promise((resolve, reject) => {
      if (!api) reject('接口地址必须')
      if (!filePath) return reject('文件必须')

      const uploadTask = uni.uploadFile({
        url: api, filePath, name, header, formData,
				success: res => {
					// let d = JSON.parse(res.data.replace(/\ufeff/g, "") || "{}")
					// if (d.code % 100 == 0) {
					// 	//返回图片地址
					// 	let fileObj = d.data;
					// 	resolve(fileObj)
					// } else {
					// 	that.toast(res.msg);
          // }
          resolve(JSON.parse(res.data))
				},
				fail: err => {
          Vue.$utils.toast(err.msg)
					reject(err)
        },
        complete: () => {
					uni.hideLoading()
        }
      });
      // Vue.$utils.log('uploadTask', uploadTask)
    })
  },
  
  /**
   * 获取 Token
   */
	get_token() {
		return uni.getStorageSync("x_token")
	}
}

axios.defaults.baseURL = (process.env.NODE_ENV === 'development' ? 'https://api.topxuezhang.cn' : 'https://api.topxuezhang.cn')

export const Axios = axios
export default {
  install (Vue) {
    Object.defineProperty(Vue.prototype, '$http', { value: axios })
  }
}