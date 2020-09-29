
import ToastComponent from './toast.vue'

export default {
  install (Vue, options) {
    let opt = {
      defaultType: 'buttom',
      duration: 2500
    }

    for (let property in options) {
      opt[property] = options[property]
    }
    
    // const ToastConstructor = Vue.extend(ToastComponent)
    // const instance = new ToastConstructor()
    
    // const instance = {}
    
    const toast = (msg = '', type) => {
      console.log('show')
      
      if (type) opt.defaultType = type
      // if (document.getElementsByClassName('vue-toast').length) return

      let toastTpl = Vue.extend(ToastComponent)
      let tpl = new toastTpl().$mount()
      // .$mount().$el
      // document.body.appendChild(tpl)

      console.log(tpl)

      // instance.message = msg
      // instance.show = true
    
      setTimeout(() => {
        // document.body.removeChild(tpl)
        // instance.show = false
        console.log('hide')
      }, opt.duration)
    }

    Object.defineProperty(Vue.prototype, '$toast', { value: toast })

    // Vue.component('toast', ToastComponent)

    // const ToastConstructor = Vue.extend(ToastComponent)
    // const instance = new ToastConstructor()

    // instance.$mount(document.createElement('div'))
    // document.body.appendChild(instance.$el)
  }
}
