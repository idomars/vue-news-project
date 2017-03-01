// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router/route.config.js'
import axios from 'axios'
import {baseUrl} from './utils.js'


//设置axios, 与vue-reasource 用法一致
Vue.prototype.$http = axios
// Vue.config.productionTip = false

// import './assets/css/base.css'
import './assets/css/index.css'
/* eslint-disable no-new */



new Vue({
  el: '#app',
  router,
  render:h=>h(App)
})
