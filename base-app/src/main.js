import Vue from 'vue'
import App from './App.vue'
import router from './router'
import {registerMicroApps, start} from 'qiankun'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'
import {actions} from './globalState'

Vue.use(Antd)

Vue.config.productionTip = false




registerMicroApps([
  {
    name: 'react',
    entry: '//localhost:30001',
    activeRule: '/react',
    container: '#sub-app',
    props: actions
  },
  {
    name: 'vue',
    entry: '//localhost:30002',
    activeRule: '/vue',
    container: '#sub-app',
    props: actions
  }
])



new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

start()
