import Vue from 'vue'
import App from './App.vue'
import router from './router'
import 'mint-ui/lib/style.css'
// import "normalize.css"

Vue.config.productionTip = false

//事件总线:给$bus赋值成vue实例才可以做事件总线
Vue.prototype.$bus = new Vue()

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
