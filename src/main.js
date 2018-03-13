// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './ComponentIndex'
import router from './router'
import 'babel-polyfill'

Vue.config.productionTip = false
window.bus = window.bus || new Vue()
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
