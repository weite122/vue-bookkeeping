import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import '@/assets/styles/reset.scss';
Vue.config.productionTip = false;
import Nav from '@/components/Nav.vue'

Vue.component('Nav', Nav)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
