import Vue from 'vue'
import App from './App.vue'
import router from './router'
import {registerMicroApps, start} from 'qiankun'

Vue.config.productionTip = false


registerMicroApps([
  {
    name: 'react',
    entry: '//localhost:30001',
    activeRule: '/react',
    container: '#react'
  },
  {
    name: 'vue',
    entry: '//localhost:30002',
    activeRule: '/vue',
    container: '#vue'
  }
])



new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

start()
