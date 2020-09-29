import Vue from 'vue'
import App from './App'
import store from './store'
import Axios from './plugins/axios'
import Utils from './plugins/utils'

Vue.use(Axios)
Vue.use(Utils)

Vue.config.productionTip = false

App.mpType = 'app'

const vue = new Vue({
  store,
  ...App
}).$mount()

export default vue