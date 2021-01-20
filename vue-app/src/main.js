import Vue from 'vue'
import App from './App.vue'
import router from './router'

Vue.config.productionTip = false
if(window.__POWERED_BY_QIANKUN__) {
  __webpack_public_path__ = window.__INJECTED_PUBLIC_PATH_BY_QIANKUN__;
  console.log(window.__INJECTED_PUBLIC_PATH_BY_QIANKUN__, 'window.__INJECTED_PUBLIC_PATH_BY_QIANKUN__');
  console.log(window.__POWERED_BY_QIANKUN__, 'window.__POWERED_BY_QIANKUN__');
}



let instance = null;

function render() {
  instance = new Vue({
    router,
    render: h => h(App)
  }).$mount('#app')
  
}
export async function bootstrap(){}
export async function mount(props) {
  render()
}

export async function unmount(){
  instance.$destroy();
}


if(!window.__POWERED_BY_QIANKUN__) {
  render()
}