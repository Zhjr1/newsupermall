import Vue from 'vue'
import App from './App.vue'
import router from './router'
import 'mint-ui/lib/style.css'
import store from './store'
// import "normalize.css"
// import toast from 'components/common/toast'
import FastClick from 'fastclick'
import VueLazyLoad from 'vue-lazyload'

Vue.config.productionTip = false

//事件总线:给$bus赋值成vue实例才可以做事件总线
Vue.prototype.$bus = new Vue()
//安装toast插件
// Vue.arguments(toast)

//解决移动端300ms延迟
FastClick.attach(document.body)

//使用图片懒加载插件,后面加上加载时显示的图片
Vue.use(VueLazyLoad, {
  loading: require('./assets/img/common/favor.png')
})

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
